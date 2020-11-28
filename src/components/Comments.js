import React, { useContext, useState, useEffect } from 'react';

import { db } from '../config';
import { ContextProvider } from './../Global/Context';

function Comments(props) {
    const { loader, user, publishComment } = useContext(ContextProvider);
    const [state, setState] = useState('');
    const [comments, setComments] = useState([]);

    const postComment = (event) => {
        event.preventDefault();
        publishComment({
            id: props.id,
            comment: state
        });
        setState('');
    }

    useEffect(() => {
        db.collection("posts").doc(props.id).collection("comments").orderBy("currentTime", "desc").onSnapshot(snap => {
            setComments(snap.docs.map(doc => (doc.data())))
        });
    },[]);

    return (
        <div className="comments">
            <div className="comments__length">{comments?comments.length:0} comments</div>
            {
                comments.map(comment => (
                    <div className="comments__container" key={comment.id}>
                        <div className="comments__container-name">{comment.username}</div>
                        <div className="comments__container-comment">{comment.comment}</div>
                    </div>
                ))
            }
            <div className="comments__section">
                {!loader && user ? (
                    <form onSubmit={postComment}>
                        <input 
                            required 
                            type="text" 
                            className="comments__input" 
                            placeholder="Say something for the above bastard..." 
                            onChange={event => setState(event.target.value)}
                            value={state}
                        />
                    </form>
                ): null}
            </div>
        </div>
    )
}

export default Comments
