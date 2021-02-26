import React, { useState, useContext } from 'react';
import { FcMms } from 'react-icons/fc';
import { BiWebcam } from 'react-icons/bi';
import { Line } from 'rc-progress';

import { ContextProvider } from './../Global/Context';

function Create() {
    const { create, loader, user, postUploadProgress } = useContext(ContextProvider);
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
                    {postUploadProgress > 0 ?<Line className="create__progressBar" percent={postUploadProgress} strokeWidth="3" strokeColor="blue" />
                    :""}<form onSubmit={createPost}>
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
                                        <BiWebcam className="camera1" /> :
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
