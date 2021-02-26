import React, { useContext, useState } from 'react'

import { ContextProvider } from './../Global/Context';
import WinterMoonLogo from '../images/winter-moon.png';

function Model() {
    const { model, closeModel, register, login } = useContext(ContextProvider);
    const [state,setState] = useState({
        login: false,
        register: true
    });
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInputs = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }

    const formsToggle = () => {
        setState({
            ...state,
            register: !state.register,
            login: !state.login
        });
    }

    const closeForm = (event) => {
        const className = event.target.getAttribute("class");

        if(className === "model") {
            closeModel();
        }
    }

    const registerUser = (event) => {
        event.preventDefault();
        register(inputs);
        setInputs({
            username: '',
            email: '',
            password: ''
        })
    }

    const loginUser = (event) => {
        event.preventDefault();
        login(inputs);
    }

    return (
        <>
            { model ? 
                (
                    <div className="model" onClick={closeForm}>
                        <div className="model__container">
                            { state.register ? 
                                (
                                    <div className="model__form">
                                        <form onSubmit={registerUser}>
                                            <div className="model__group">
                                                <img src={WinterMoonLogo} alt="winter-moon-logo"/>
                                            </div>
                                            <div className="model__group">
                                                <input type="text" name="username" className="model__input" placeholder="Username..." onChange={handleInputs} value={inputs.username} required />
                                            </div>
                                            <div className="model__group">
                                                <input type="text" name="email" className="model__input" placeholder="Email..." onChange={handleInputs} value={inputs.email} required/>
                                            </div>
                                            <div className="model__group">
                                                <input type="password" name="password" className="model__input" placeholder="Create password..." onChange={handleInputs} value={inputs.password} required/>
                                            </div>
                                            <div className="model__group">
                                                <input type="submit" value="Register" className="btn btn-smart" />
                                            </div>
                                            <div className="model__group">
                                                <span onClick={formsToggle}>Already have an account ?</span>
                                            </div>
                                        </form>
                                    </div>
                                ) : 
                                (
                                    <div className="model__form">
                                        <form onSubmit={loginUser}>
                                            <div className="model__group">
                                                <img src={WinterMoonLogo} alt="winter-moon-logo"/>
                                            </div>
                                            <div className="model__group">
                                                <input type="text" name="email" className="model__input" placeholder="Email..." onChange={handleInputs} value={inputs.email} required/>
                                            </div>
                                            <div className="model__group">
                                                <input type="password" name="password" className="model__input" placeholder="Enter password..." onChange={handleInputs} value={inputs.password} required/>
                                            </div>
                                            <div className="model__group">
                                                <input type="submit" value="Login" className="btn btn-smart" />
                                            </div>
                                            <div className="model__group">
                                                <span onClick={formsToggle}>Don't have an account ?</span>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : 
                (
                    ""
                )
            }
        </>
    )
}

export default Model;
