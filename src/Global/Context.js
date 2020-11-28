import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { auth, db, storage } from '../config';

export const ContextProvider = createContext();

function Context(props) {
    const [model, setModel] = useState(false);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [posts, setPosts] = useState([]);
    const [manualUser, setManualUser] = useState({});
    const DEFAULT_PROFILE_IMAGE = "https://firebasestorage.googleapis.com/v0/b/winter-moon-6261b.appspot.com/o/defaultPics%2FdefaultProfilePicture.png?alt=media&token=e1abef6c-7e3b-496b-b7de-19a43c929f56";
    
    const openModel = () => {
        setModel(true);
    }

    const closeModel = () => {
        setModel(false);
    }

    const register = async (user) => {
        const { username, email, password } = user;
        try {
            const resp = await auth.createUserWithEmailAndPassword(email, password);
            resp.user.updateProfile({displayName: username});
            setModel(false);
            const bio = "", image = DEFAULT_PROFILE_IMAGE, followers = [], following = [];
            db.collection("users").doc(username).set({
                username,
                email,
                password,
                bio,
                image,
                followers,
                following
            });
            setManualUser({
                username,
                email,
                bio,
                image,
                followers,
                following
            });
        } catch (error) {
            console.log(error);
        }
    }

    const login = async (user) => {
        const { email, password } = user;
        try {
            const resp = await auth.signInWithEmailAndPassword(email, password);
            setModel(false);
            db.collection("users").where("email", "==", email).get().then(userSnap => {
                const { username, email, bio, image } = userSnap.docs[0].data();
                setManualUser({
                    username,
                    email,
                    bio,
                    image
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async (user) => {
        try {
            const resp = await auth.signOut()
            .then(() => {
                setUser(null);
                setManualUser({});
            })
            .catch(error => {
                console.log(error);
            }) ;
            setModel(false);
        } catch (error) {
            console.log(error);
        }
    }

    const create = (post) => {
        const { title, image } = post;
        const upload = storage.ref(`images/${image.name}`).put(image);
        upload.on("state_changed", (snap) => {
            //progress
            let progress = (snap.bytesTransferred/snap.totalBytes) * 100;
            console.log(progress);
        }, (err) => {
            //error
            console.log(err);
        }, () => {
            //success
            storage.ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            title,
                            image: url,
                            username: user.displayName,
                            currentTime: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    })
        })
    }

    const publishComment = (data) => {
        const { id, comment } = data;
        db.collection("posts").doc(id).collection("comments").add({
            comment,
            username: user.displayName,
            currentTime: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const publishLike = (data) => {
        const { id } = data;
        db.collection("posts").doc(id).collection("likes").add({
            email: user.email
        })
    }

    const updateLikes = (data) => {
        const { id } = data;
        db.collection("posts").doc(id).collection("likes").get().then(likeArray => {
            let contains = false;
            likeArray.docs.map(doc => {
                const { email } = doc.data();
                if(email == user.email) {
                    contains = true;
                }
            });
            
            if(contains) {
                removeLike(data);
            } else {
                publishLike(data);
            }
        });
    }

    const removeLike = (data) => {
        const { id } = data;
        db.collection("posts").doc(id).collection("likes")
        .where("email", "==", user.email)
        .get()
        .then(likeSnap => {
            likeSnap.docs[0].ref.delete();
        })
    }

    const updateUser = (newDetails) => {
        if(!isEmpty(newDetails)) {
            const { image } = newDetails;
            const upload = storage.ref(`profilePictures/${manualUser.username}`).put(image);
            upload.on("state_changed", (snap) => {
                //progress
                let progress = (snap.bytesTransferred/snap.totalBytes) * 100;
                console.log(progress);
            }, (err) => {
                //error
                console.log(err);
            }, () => {
                //success
                storage.ref("profilePictures")
                        .child(manualUser.username)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("users").doc(manualUser.username).update({
                                image: url
                            }).then(() => {
                                console.log("Document updated Successfully.");
                                setManualUser({
                                    ...manualUser,
                                    image: url
                                });
                            }).catch(err => {
                                console.log("Error while updating user details:",err);
                            })
                        })
            })
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);

            if(user) {
                db.collection("users").where("email", "==", user.email).get().then(userSnap => {
                    const { username, email, bio, image } = userSnap.docs[0].data();
                    setManualUser({
                        username,
                        email,
                        bio,
                        image
                    });
                });
            }

            setLoader(false);
        });

        //fetch posts from firebase
        db.collection("posts").orderBy("currentTime", "desc").onSnapshot(snap => {
            setPosts(snap.docs.map(doc => (
                {
                    id: doc.id,
                    title: doc.data().title,
                    image: doc.data().image,
                    username: doc.data().username,
                    postedAt: doc.data().currentTime ? moment(doc.data().currentTime.seconds*1000).format("h:mm A, ddd DD MMM YYYY") : "..."
                }
            )));
        })

    }, [user, loader]);

    return (
        <ContextProvider.Provider value={{
            model, 
            openModel, 
            closeModel, 
            register, 
            login, 
            user, 
            loader, 
            logout, 
            create, 
            posts, 
            publishComment,
            publishLike,
            removeLike,
            updateLikes,
            manualUser,
            DEFAULT_PROFILE_IMAGE,
            updateUser
        }}>
            {props.children}
        </ContextProvider.Provider>
    )
}

export default Context;