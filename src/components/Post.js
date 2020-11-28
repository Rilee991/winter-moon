import React, { useContext, useState } from 'react';

import { ContextProvider } from './../Global/Context';
import Comments from './Comments';
import Likes from './Likes';

function Post() {
    const { posts, user, updateLikes } = useContext(ContextProvider);
    const email = user?user.email:null;

    function toggleLike(id) {
        updateLikes({id});
    }

    return (
        <>
            {posts.map(post => (
                <div className="posts" key={post.id}>
                    <div className="posts__header">
                        <div className="posts__header-avator">{post.username[0]}</div>
                        <div className="posts__header-name">{post.username}</div>
                    </div>
                    <div className="posts__img">
                        <img src={post.image} alt="posts" onDoubleClick={() => toggleLike(post.id)}/>
                    </div>
                    <Likes id={post.id} email={email} username={post.username} caption={post.title} postedAt={post.postedAt}/>
                    <Comments id={post.id} />
                </div>
            ))}
        </>
    )
}

export default Post
