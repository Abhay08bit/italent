import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../common/logo/logo';
import { validateEmail } from '../../utils/helpers';
import { API_URL, API_HEADERS } from '../../utils/api';
import axios from 'axios';
import localforage from 'localforage';
import eyeImage from '../../assets/images/eye.png';

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        isValidEmail: false,
        isValidPassword: false,
        passwordType: "password",
        serverError: ""
    }

    onEmailChange = (ev) => {
        const email = ev.target.value;
        const isValidEmail = validateEmail(email);
        let emailError = "";
        if (!isValidEmail) {
            emailError = "Invalid email."
        }
        this.setState({ email, emailError, isValidEmail });
    }

    onPasswordChange = (ev) => {
        const password = ev.target.value;
        let passwordError = "";
        const isValidPassword = password !== "" ? true : false;
        if (!isValidPassword) {
            passwordError = "Password required."
        }
        this.setState({ password, isValidPassword, passwordError });
    }

    onSubmit = () => {
        let _this = this;
        if (this.state.isValidPassword && this.state.isValidEmail) {
            // axios.post(API_URL + "login/v1/api", {
            axios.post(API_URL + "eaas/login/v1/api", {
                "E_mail": this.state.email,
                "Pswd": this.state.password
            }, {
                headers: API_HEADERS
            })
                .then((response) => {
                    if (response.data.status) {
                        localforage.setItem('isLoggedin', true, function (err) {
                            localforage.setItem('user', response.data.data, function (err) {
                                localforage.setItem('completePercentage', response.data.completePercentage, function (err) {
                                    _this.props.history.push("/");
                                });
                            });
                        });
                    } else {
                        this.setState({
                            serverError: response.data.data
                        })
                    }
                })
                .catch((error) => {
                    this.setState({
                        serverError: error.message
                    })
                })
        } else {
            this.setState({
                emailError: "Invalid email.",
                passwordError: "Password required."
            })
        }
    }

    render() {
        return (
            <section className="login_section">
                <div className="row margin0 fullheight">
                    <div className="col-12  col-lg-8 login-bg"></div>
                    <div className="col-12  col-lg-4 login-sec">
                        <div className="login_logo text-center">
                            <Logo />
                        </div>
                        <h2 className="sign_in_text">Sign in</h2>

                        <form className="login-form">
                            <div className="text-center text-danger error_msg"><span className="server-error">{this.state.serverError}</span></div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" className="form-control" name="email" onChange={(ev) => { this.onEmailChange(ev) }} value={this.state.email} />
                                <span className="error">{this.state.emailError}</span>
                            </div>
                            <div className="form-group input-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input className="form-control password-input" type={this.state.passwordType} name="password" onChange={(ev) => { this.onPasswordChange(ev) }} value={this.state.password} />
                                <div className="input-group-append">
                                    <span className="input-group-text password-eye" onMouseEnter={() => { this.setState({ passwordType: "text" }) }} onMouseLeave={() => { this.setState({ passwordType: "password" }) }}><img className="password-eye-image" src={eyeImage} alt="view-password" /></span>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: "row",
                            }}>
                                <div>
                                    <span className="error  password-error-span">{this.state.passwordError}</span>
                                </div>
                                <div>
                                    <span className=' forgot-password1'>Forgot Password ?<a href="#" >  Click here to reset</a></span>
                                </div>
                            </div>


                            {/* <div className="Forgot-password"><Link to="/forgot-password">Forgot Password ?</Link></div> */}
                            <div className="btn_div">
                                <button type="button" onClick={this.onSubmit} className="btn btn-login float-right register_button">Sign in</button>
                            </div>
                            <div className="Already-have-an-account-Sign-in">
                                Don’t have an account?  <Link to="register">Register</Link>
                            </div>
                            <div className="copyright">Copyright 2020 iTalentHub</div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Login);