import React, { useContext } from 'react';
import { FaRegCompass, FaRegHeart, FaSearch, FaTelegramPlane, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { MdPersonPin } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { ContextProvider } from './../Global/Context';
import WinterMoonLogo from '../images/winter-moon.png';

function Navbar() {
    const { model, openModel, user, loader, logout } = useContext(ContextProvider);

    const openForms = () => {
        openModel();
    }

    const userLogout = () => {
        logout();
    }

    const checkUser = () => {
        return !loader ? !loader && user ? (
            <li onClick={openForms}>
                <span onClick={userLogout}><FaSignOutAlt className="logout"/></span>
            </li> ) : (
                <li onClick={openForms}>
                    <FaSignInAlt className="login"/>
                </li>
            ) : "..."
    }

    return (
        <div className="navbar">
            <div className="navbar__first">
                <div className="navbar__first-logo">
                    <Link to="/">
                        <img src={WinterMoonLogo} alt="Winter Moon Logo" />
                    </Link>
                </div>
            </div>
            <div className="navbar__middle">
                <div className="navbar__middle-search">
                    <input type="text" className="navbar__search" placeholder="Search..." />
                    <FaSearch className="searchIcon" />
                </div>
            </div>
            <div className="navbar__last">
                <li>
                    <Link to="/profile">
                        <MdPersonPin className="navbar__icons" />
                    </Link>
                </li>
                <li>
                    <FaTelegramPlane className="navbar__icons" />
                </li>
                <li>
                    <FaRegCompass className="navbar__icons" />
                </li>
                <li>
                    <FaRegHeart className="navbar__icons" />
                </li>
                {checkUser()}
            </div>
        </div>
    )
}

export default Navbar
