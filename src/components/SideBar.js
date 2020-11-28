import React, { useContext, useState } from 'react';

import { ContextProvider } from './../Global/Context';
import pic1 from '../images/1.jpg';

function SideBar() {
    const { loader, user } = useContext(ContextProvider);
    const username = user ? user.displayName: 'User info not present';
    const [state, setState] = useState([
        { id: 1, image: pic1, name: 'Ahmed'},
        { id: 2, image: pic1, name: 'Ahmed'},
        { id: 3, image: pic1, name: 'Ahmed'},
        { id: 4, image: pic1, name: 'Ahmed'}
    ]);

    return (
        <div className="sidebar">
            {
                !loader && user && user.displayName ? 
                <div className="sidebar__user">
                    <div className="sidebar__user-avator">{username[0]}</div>
                    <div className="sidebar__user-name">{username}</div>
                </div> :
                null
            }
            <div className="sidebar__list">
                <h3>Suggestions for you</h3>
                {state.map(user => (
                    <div className="sidebar__list-user" key={user.id}>
                        <div className="sidebar__list-a">
                            <div className="sidebar__list-a-img">
                                <img src={user.image} />
                            </div>
                           <div className="sidebar__list-a-name">{user.name}</div>
                        </div>
                        <div className="sidebar__list-b">
                            <a href="">Follow</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar
