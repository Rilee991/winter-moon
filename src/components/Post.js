import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdRemoveCircle } from 'react-icons/io';

import { ContextProvider } from './../Global/Context';
import Comments from './Comments';
import Likes from './Likes';

function Post() {
    const { posts, user, updateLikes, manualUser, DEFAULT_PROFILE_IMAGE, removePost } = useContext(ContextProvider);
    const email = user?user.email:null;

    function toggleLike(id) {
        updateLikes({id});
    }

    function deletePost(id) {
        removePost({id});
    }
    
    console.log("Posts:",posts);

    return (
        <>
            {posts.map(post => (
                <div className="posts" key={post.id}>
                    <div className="posts__header">
                        {post.username == manualUser.username?
                            <Link
                                to="/profile"
                                className="posts_header-link"
                            > 
                                <div className="posts__header-avator"><img src={post.userProfileImage ? post.userProfileImage : DEFAULT_PROFILE_IMAGE} alt="user"/></div>
                                <div className="posts__header-name">{post.username}</div>
                            </Link> :
                            <Link
                                to="/profile"
                                className="posts_header-link"
                            >
                                <div className="posts__header-avator">{post.username[0]}</div>
                                <div className="posts__header-name">{post.username}</div>
                            </Link>
                        }
                        <div className="posts__header-delete">
                            <IoMdRemoveCircle color="red" className="navbar__icons" onClick={() => deletePost(post.id)}/>
                        </div>
                    </div>
                    <div className="posts__img">
                        {post.image.includes(".jpg") || post.image.includes(".png") ? <img src={post.image} alt="posts" onDoubleClick={() => toggleLike(post.id)}/>
                        :    <video width="720" height="500" controls autoplay onDoubleClick={() => toggleLike(post.id)}>
                                <source src={post.image} type="video/mp4"/>
                            </video>
                        }
                    </div>
                    <Likes id={post.id} email={email} username={post.username} caption={post.title} postedAt={post.postedAt}/>
                    <Comments id={post.id} />
                </div>
            ))}
        </>
    )
}

export default Post
