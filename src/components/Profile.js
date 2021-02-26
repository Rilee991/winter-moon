import React, { useContext, useState, useEffect } from 'react';
import  { TiCamera, TiInfoLargeOutline } from 'react-icons/ti';
import { SiMinutemailer } from 'react-icons/si';
import { MdPerson, MdCallMade, MdCallReceived } from 'react-icons/md';
import { FcCameraIdentification, FcCamera } from 'react-icons/fc';

import { ContextProvider } from './../Global/Context';
import { db } from '../config';

function Profile() {
    const { manualUser, DEFAULT_PROFILE_IMAGE, updateUser } = useContext(ContextProvider);
    const { username, email, bio, image, followers = [], following = [] } = manualUser;
    const [posts, setPosts] = useState([]);
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
        if(username) {
            db.collection("posts").where("username", "==", username).orderBy("currentTime", "desc").onSnapshot(snap => {
                setPosts(snap.docs.map(doc => (
                    {
                        id: doc.id,
                        image: doc.data().image,
                    }
                )));
            })
        }
    },[]);

    const updateUserDetails = (event) => {
        event.preventDefault();
        const detailsToBeUpdated = {};
        if(newImage) {
            detailsToBeUpdated.image = newImage;
        }
        updateUser(detailsToBeUpdated);
        setNewImage("");
    }

    return (
        <div className="profile">
            <div className="profile__top">
                <div className="profile__top__left">
                    <div className="profile__top__left__img">
                        <span>
                            <img src={image ? image : DEFAULT_PROFILE_IMAGE} alt="user"/>
                        </span>
                    </div>
                    <div className="profile__top__left__form">
                        <form onSubmit={updateUserDetails}>
                            <div className="profile__a">
                                <label htmlFor="file">
                                    {newImage ? 
                                        <FcCamera className="profile__icon" /> :
                                        <FcCameraIdentification className="profile__icon" />
                                    }
                                </label>
                                <input type="file" id="file" className="file" required onChange={(event) => setNewImage(event.target.files[0])}/>
                            </div>
                            <div className="profile__b">
                                <input type="submit" value="Save" className="btn-update"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="profile__top__right">
                    <div className="profile__details">
                        <MdPerson className="profile__details__icon"/>
                        <div className="profile__details__item">{username ? username : "..."}</div>
                    </div>
                    <div className="profile__details">
                        <SiMinutemailer className="profile__details__icon"/>
                        <div className="profile__details__item">{email ? email : "..."}</div>
                    </div>
                    <div className="profile__details">
                        <TiInfoLargeOutline className="profile__details__icon"/>
                        <div className="profile__details__item">{bio ? bio : "..."}</div>
                    </div>
                    <div className="profile__details">
                        <MdCallReceived className="profile__details__icon"/>
                        <div className="profile__details__item">{followers ? followers.length : 0} followers</div>
                    </div>
                    <div className="profile__details">
                        <MdCallMade className="profile__details__icon"/>
                        <div className="profile__details__item">{following ? following.length : 0} following</div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="profile__bottom">
                {posts ? posts.map(post => (
                    <img className="profile__bottom__posts" key={post.id} src={post.image}/>
                )): "Please wait..."}
            </div>
        </div>
    )
}

export default Profile
