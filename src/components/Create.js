import React, { useState, useContext } from 'react';
import { FaCamera } from 'react-icons/fa';
import { FcMms } from 'react-icons/fc';

import { ContextProvider } from './../Global/Context';

function Create() {
    const { create, loader, user } = useContext(ContextProvider);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    
    const handleImage = (event) => {
        setImage(event.target.files[0]);
    }

    const createPost = (event) => {
        event.preventDefault();
        create({title, image});
        setTitle('');
        setImage('');
    }

    return (
        <> 
            { !loader && user ?
                <div className="create">
                    <form onSubmit={createPost}>
                        <div className="create__input">
                            <input 
                                type="text" 
                                className="create__inputt" 
                                placeholder="Create a dumbass post for anyone who's dumb enough to follow you :)" 
                                required
                                onChange={event => setTitle(event.target.value)}
                                value={title}
                            />
                        </div>
                        <div className="create__second">
                            <div className="create__second-a">
                                <label htmlFor="file">
                                    {image ? 
                                        <FcMms className="camera1" /> :
                                        <FcMms className="camera2" />
                                    }
                                </label>
                                <input type="file" id="file" onChange={handleImage} className="file" required/>
                            </div>
                            <div className="create__second-b">
                                <input type="submit" value="Post" className="btn-sweet"/>
                            </div>
                        </div>
                    </form>
                </div> :
                null
            }
        </>
    )
}

export default Create
