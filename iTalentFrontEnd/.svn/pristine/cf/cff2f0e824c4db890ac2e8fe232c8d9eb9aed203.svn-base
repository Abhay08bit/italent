import React, { useState } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
import Header from '../header/header';

function NewUserPopup() {
    const [state, setState] = useState({
        slider: "right"
    })

    let signIn = () => {
        setState({
            slider: "left"
        })
    }

    let signUp = () => {
        setState({
            slider: "right"
        })
    }
    // const signUp = container.classNameList.add("right-panel-active");
    // const signIn = container.classNameList.remove("right-panel-active");

    return (
        <div className='header-background-color'>
            <div className="container">
                <Header hasNavbar={true} />
            </div>
            < div className='body-cont'>
                {console.log(state.slider)}
                < div id="container-sign " className={state.slider === "right" ? "container-sign right-panel-active" : "container-sign"} >
                    <div className="form-container-sign sign-up-container-sign">
                        <form className="form-sign" action="#">
                            <h1 className='h1-sign'>Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social a-sign "><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social a-sign "><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social a-sign "><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className='span-sign'>or use your email for registration</span>
                            <input className="input-sign" type="text" placeholder="Name" />
                            <input className="input-sign" type="email" placeholder="Email" />
                            <input className="input-sign" type="password" placeholder="Password" />
                            <button className='button-sign '>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container-sign sign-in-container-sign">
                        <form action="#" className='form-sign'>
                            <h1 className='h1-sign'>Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social a-sign "><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social a-sign "><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social a-sign "><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className='span-sign'>or use your account</span>
                            <input className="input-sign" type="email" placeholder="Email" />
                            <input className="input-sign" type="password" placeholder="Password" />
                            <a href="#" className='a-sign '>Forgot your password?</a>
                            <button className='button-sign '>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container-sign">
                        <div className="overlay-sign ">
                            <div className="overlay-panel-sign overlay-left-sign">
                                <h1 className='h1-sign'>Welcome Back!</h1>
                                <p className='p-sign'>To keep connected with us please login with your personal info</p>
                                <button className="ghost button-sign" id="signIn" onClick={signIn}>Sign In</button>
                            </div>
                            <div className="overlay-panel-sign overlay-right-sign">
                                <h1 className='h1-sign'>Hello, Friend!</h1>
                                <p className='p-sign'>Enter your personal details and start journey with us</p>
                                <button className="ghost button-sign" id="signUp" onClick={signUp}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div >

                {/* <footer>
                <p>
                    Created with <i className="fa fa-heart"></i> by
                    <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
                    - Read how I created this and how you can join the challenge
                    <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
                </p>
            </footer> */}
            </div >
        </div>
    )

}

export default withRouter(NewUserPopup);