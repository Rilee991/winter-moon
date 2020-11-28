import React, { useContext, useState, useEffect } from 'react';
import { FcLike } from 'react-icons/fc';
import { HiOutlineHeart } from 'react-icons/hi';

import { db } from '../config';
import { ContextProvider } from './../Global/Context';

function Likes(props) {
    const { loader, user, publishLike, removeLike } = useContext(ContextProvider);
    const { email, id, username, caption, postedAt } = props;
    const [likes, setLikes] = useState([]);

    const addLike = (event) => {
        event.preventDefault();
        publishLike({
            id: props.id
        });
    }

    const deleteLike = (event) => {
        event.preventDefault();
        console.log("e");
        removeLike({
            id: props.id
        });
    }

    useEffect(() => {
        db.collection("posts").doc(id).collection("likes").onSnapshot(snap => {
            setLikes(snap.docs.map(doc => (doc.data().email)));
        });
    },[]);

    return (
        <div className="likes">
            {!loader && user ? (likes.includes(email) ?
                <div className="likes__icon"><FcLike className="likes__icon-button" onClick={deleteLike}/></div> :
                <div className="likes__icon"><HiOutlineHeart className="likes__icon-button" onClick={addLike} /></div>) : null
            }
            <div className="likes__length">{likes? likes.length:0} likes</div>
            <div className="likes__body">
            <div className="likes__username">{username}: &nbsp;</div>
                <div className="likes__caption">{caption}</div>
            </div>
            <div className="likes__postedTime">{postedAt}</div>
        </div>
    )
}

export default Likes
