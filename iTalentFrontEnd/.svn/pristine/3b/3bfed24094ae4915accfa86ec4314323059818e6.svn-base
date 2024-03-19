import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../common/logo/logo';
import { validateEmail, validatePhone } from '../../utils/helpers';
import { API_URL, API_HEADERS } from '../../utils/api';
import axios from 'axios';
import localforage from 'localforage';
import eyeImage from '../../assets/images/eye.png';
import PDF from '../../assets/iTalentHub-Disclaimer.pdf';
import Modal from 'simple-react-modal';
import SkillBar from 'react-skillbars';

const TabArray = [
    "Team 1", "Team 2", "Team 3", "Team 4", "Team 5"
];

class Register extends React.Component {
    state = {
        email: "",
        password: "",
        phone: "",
        nickName: "",
        name: "",
        terms: false,
        emailError: "",
        passwordError: "",
        phoneError: "",
        nameError: "",
        nickNameError: "",
        termsError: false,
        isValidEmail: false,
        isValidPassword: false,
        isValidPhone: false,
        isValidName: false,
        isValidNickName: false,
        passwordType: "password",
        serverError: "",
        showModal: false,
        emailOtp: "",
        emailOtpStatus: null
    }

    onOtpChange = (ev, isDirect = false) => {
        // console.log(this.state.otp)
        const otpa = isDirect ? this.state.otp : ev.target.value;
        this.setState({
            otp: otpa
        })
    }

    onOtpSubmit = () => {
        const otpStatus = false
        this.setState({
            otp: "",
            otpStatus,
            emailError: otpStatus ? "" : "Email Id Verification Failed!"
        })
    }

    onEmailChange = (ev, isDirect = false) => {
        const email = isDirect ? this.state.email : ev.target.value;
        const isValidEmail = validateEmail(email);
        let emailError = "";
        if (!isValidEmail) {
            emailError = "Invalid email."
        }
        const otpStatus = null
        this.setState({ email, emailError, isValidEmail, otpStatus });
    }

    onPasswordChange = (ev, isDirect = false) => {
        const password = isDirect ? this.state.password : ev.target.value;
        let passwordError = "";
        const isValidPassword = password !== "" ? true : false;
        if (!isValidPassword) {
            passwordError = "Password required."
        }
        this.setState({ password, isValidPassword, passwordError });
    }

    onPhoneChange = (ev, isDirect = false) => {
        const phone = isDirect ? this.state.phone : ev.target.value;
        const isValidPhone = validatePhone(phone);
        let phoneError = "";
        if (!isValidPhone) {
            phoneError = "Invalid phone number."
        }
        this.setState({ phone, phoneError, isValidPhone });
    }

    onNameChange = (ev, isDirect = false) => {
        const name = isDirect ? this.state.name : ev.target.value;
        let nameError = "";
        const isValidName = name !== "" ? true : false;
        if (!isValidName) {
            nameError = "Name required."
        }
        this.setState({ name, isValidName, nameError });
    }

    onVerifyClick = (ev, isDirect = false) => {
        const val = isDirect ? this.state.showModal : ev.target.checked;
        this.setState({
            showModal: true
        })
    }

    onNickNameChange = (ev, isDirect = false) => {
        const nickName = isDirect ? this.state.nickName : ev.target.value;
        let nickNameError = "";
        const isValidNickName = nickName !== "" ? true : false;
        if (!isValidNickName) {
            nickNameError = "Nick Name required."
        }
        this.setState({ nickName, isValidNickName, nickNameError });
    }

    onTermsCheck = (ev, isDirect = false) => {
        const val = isDirect ? this.state.terms : ev.target.checked;
        this.setState({
            terms: val,
            termsError: !val ? "Please accept terms and conditions." : ""
        })
    }


    onSubmit = () => {
        let _this = this;
        // if (this.state.terms && this.state.isValidPassword && this.state.isValidEmail && this.state.isValidName && this.state.isValidNickName && this.state.isValidPhone && this.state.emailOtpStatus) {
            if (this.state.terms && this.state.isValidPassword && this.state.isValidEmail && this.state.isValidName && this.state.isValidNickName && this.state.isValidPhone){
            // axios.post(API_URL + "reg/v1/api", {
            axios.post(API_URL + "eaas/reg/v1/api", {
                "query": {
                    "Name": this.state.name,
                    "E_mail": this.state.email,
                    "Phone": this.state.phone,
                    "Nickname": this.state.nickName,
                    "Pswd": this.state.password,
                    "terms": this.state.terms
                }
            }, {
                headers: API_HEADERS
            })
                .then((response) => {
                    if (response.data.status) {
                        localforage.setItem('isLoggedin', true, function (err) {
                            localforage.setItem('user', response.data.data, function (err) {
                                localforage.setItem('completePercentage', response.data.completePercentage, function (err) {
                                    _this.props.history.push("/");
                                })
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
            this.onEmailChange({}, true);
            this.onNameChange({}, true);
            this.onNickNameChange({}, true);
            this.onPhoneChange({}, true);
            this.onTermsCheck({}, true);
            this.onPasswordChange({}, true);
        }
    }


    render() {
        const colors = {
            "bar": "#ff6158",
            "title": {
                "text": "#fff",
                "background": "#ff6158"
            }
        }
        return (
            <section className="">
                <Modal show={this.state.showModal}>
                    <div>
                        <div className="col-12">
                            <span onClick={() => this.setState({ showModal: false })} className="modal-close">&times;</span>
                        </div>
                        <div className="col-12">
                            <h6 style={{ marginBottom: "20px" }}><b>Please enter the OTP sent to entered Email</b></h6>
                            <div className="form-group">
                                <input type="text" onChange={this.onOtpChange} className="form-control" placeholder="Enter OTP" />
                            </div>
                            <div className="btn_div">
                                <button onClick={this.onOtpSubmit} type="button" className="btn btn-login float-right register_button">Submit</button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="row margin0 fullheight">
                    <div className="col-12  col-lg-8 register-bg"></div>
                    <div className="col-12  col-lg-4 login-sec">
                        <div className="login_logo text-center"><Logo /></div>
                        <h2 className="sign_in_text">Register</h2>
                        <form className="register-form">
                            <div className="text-center text-danger error_msg"><span className="server-error">{this.state.serverError}</span></div>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" onChange={(ev) => { this.onNameChange(ev) }} value={this.state.name} />
                                <span className="error">{this.state.nameError}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nickname" className="form-label">Nick Name</label>
                                <input type="text" className="form-control" name="nickname" onChange={(ev) => { this.onNickNameChange(ev) }} value={this.state.nickName} />
                                <span className="error">{this.state.nickNameError}</span>
                            </div>
                            <div className="form-group"style={{marginBottom:'8px'}}>
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input className="form-control" type="email" name="email" onChange={(ev) => { this.onEmailChange(ev) }} value={this.state.email} />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: "row",
                                }}>
                                    <div>
                                        <span className="error">{this.state.emailError}</span>
                                    </div>
                                    <div>
                                        {(this.state.otpStatus == null || this.state.otpStatus == false) && <span ><a href="#" onClick={() => this.setState({ showModal: true })} >Verify</a></span>}
                                        {this.state.otpStatus == true && <span style={{
                                            color: "green"
                                        }}>Verifed </span>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" >
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input className="form-control" type="text" name="phone" maxLength={10} onChange={(ev) => { this.onPhoneChange(ev) }} value={this.state.phone} />
                                <span className="error">{this.state.phoneError}</span>
                            </div>
                            <div className="form-group input-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input className="form-control  password-input" type={this.state.passwordType} name="password" onChange={(ev) => { this.onPasswordChange(ev) }} value={this.state.password} />
                                <div className="input-group-append">
                                    <span className="input-group-text  password-eye" onMouseEnter={() => { this.setState({ passwordType: "text" }) }} onMouseLeave={() => { this.setState({ passwordType: "password" }) }}><img className="password-eye-image" src={eyeImage} alt="view-password" /></span>
                                </div>
                            </div>
                            <span className="error  password-error-span">{this.state.passwordError}</span>
                            <div className="form-group">
                                <input type="checkbox" style={{ display: "inline" }} name="terms" onChange={(ev) => { this.onTermsCheck(ev) }} checked={this.state.terms} />
                                <span style={{ display: "inline", marginLeft: "10px" }} htmlFor="terms" className="form-label">I accept <a href={PDF} target="_blank" >terms & Conditions.</a></span>
                            </div>
                            <span className="error" style={{ top: "-10px" }}>{this.state.termsError}</span>
                            <div className="btn_div">
                                <button onClick={this.onSubmit} type="button" className="btn btn-login float-right register_button">Register</button>
                            </div>
                            <div className="Already-have-an-account-Sign-in">
                                Already have an account?  <Link to="login">Sign in</Link>
                            </div>
                            <div className="copyright">Copyright 2020 iTalentHub</div>
                        </form>

                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(Register);