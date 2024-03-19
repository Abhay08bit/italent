import React from 'react';
import arrow from '../../assets/images/arrow.png';
import { validateEmail, validatePhone } from '../../utils/helpers';
import { API_URL, API_HEADERS } from '../../utils/api';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import localforage from 'localforage';
import map from '../../assets/images/map.png';
import email from '../../assets/images/email.png';
import phoneCall from '../../assets/images/phone-call.png';
import values from '../../assets/images/values.png';
import mission from '../../assets/images/mission.png';
import Vision from '../../assets/images/vision.png';

class AboutUs extends React.Component {

    state = {
        activeTab: 0,
        isDisable: false,
        email: "",
        phone: "",
        name: "",
        message: "",
        emailError: "",
        phoneError: "",
        nameError: "",
        messageError: "",
        isValidEmail: false,
        isValidPhone: false,
        isValidName: false,
        isValidMessage: false,
        serverError: "",
        serverSuccess: ""
    }

    onEmailChange = (ev, isDirect = false) => {
        const email = isDirect ? this.state.email : ev.target.value;
        const isValidEmail = validateEmail(email);
        let emailError = "";
        if (!isValidEmail) {
            emailError = "Invalid email."
        }
        this.setState({ email, emailError, isValidEmail });
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

    onMessageChange = (ev, isDirect = false) => {
        const message = isDirect ? this.state.message : ev.target.value;
        let messageError = "";
        const isValidMessage = message !== "" ? true : false;
        if (!isValidMessage) {
            messageError = "Name required."
        }
        this.setState({ message, isValidMessage, messageError });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        if (this.state.isValidEmail && this.state.isValidName && this.state.isValidMessage && this.state.isValidPhone) {
            this.setState({
                isDisable: true
            })
            // axios.post(API_URL + "contact_us/v1/api", {
            axios.post(API_URL + "eaas/contact_us/v1/api", {
                "query": {
                    "Name": this.state.name,
                    "E_mail": this.state.email,
                    "Phone": this.state.phone,
                    "Message": this.state.message,
                }
            }, {
                headers: API_HEADERS
            })
                .then((response) => {
                    if (response.data.status) {
                        this.setState({
                            serverSuccess: response.data.data,
                            name: "",
                            email: "",
                            phone: "",
                            message: "",
                            isDisable: false
                        })
                    } else {
                        this.setState({
                            serverError: response.data.data,
                            isDisable: false
                        })
                    }
                })
                .catch((error) => {
                    this.setState({
                        serverError: error.message,
                        isDisable: false
                    })
                })
        } else {
            this.onEmailChange({}, true);
            this.onNameChange({}, true);
            this.onPhoneChange({}, true);
            this.onMessageChange({}, true);
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="row contactus-wrapper">
                    <div className="col-12 col-lg-12" >
                        <ul className="nav  about_us_tab">
                            <li className="nav-item col-4 col-lg-4" onClick={() => this.setState({ activeTab: 0 })} style={{ cursor: "pointer" }}>
                                <a className={`nav-link ${this.state.activeTab === 0 ? "active" : ""}`} href data-toggle="tab" role="tab" aria-controls="about_us" aria-selected="true">About Us</a>
                            </li>
                            <li className="nav-item  col-4 col-lg-4" onClick={() => this.setState({ activeTab: 1, serverError: "", serverSuccess: "" })} style={{ cursor: "pointer" }}>
                                <a className={`nav-link ${this.state.activeTab === 1 ? "active" : ""}`} href data-toggle="tab" role="tab" aria-controls="mission-tab" aria-selected="true">Mission/Vision/Values</a>
                            </li>
                            <li className="nav-item  col-4 col-lg-4" onClick={() => this.setState({ activeTab: 2, serverError: "", serverSuccess: "" })} style={{ cursor: "pointer" }}>
                                <a className={`nav-link ${this.state.activeTab === 2 ? "active" : ""}`} href data-toggle="tab" role="tab" aria-controls="contact_us" aria-selected="true">Contact Us</a>
                            </li>
                        </ul>
                        {this.state.activeTab === 1 &&
                            <div id="about_us" className={`about_us_desc tab-pane fade show active`} role="tabpanel" aria-labelledby="about_us-tab">
                                <div className="col-12 col-lg-12" style={{ display: "flex" }}>
                                    <div className="col-sm-4 col-md-4 col-4 chart-block">
                                        <div className="custom-column shadow rounded">
                                            <div className="custom-column-header">
                                                <div className="contact_cards">
                                                    <img src={mission} className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="custom-column-content">
                                                <div className="card-title contact-card-title">Mission</div>
                                                <p className="card-desc contact-card-desc" style={{ overflow: "hidden", minHeight: "150px", maxHeight: "150px" }}>We connect the world’s talents to make them more productive and successful. With us corporates will easily be able to set up team of their choice.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-4 chart-block">
                                        <div className="custom-column shadow rounded">
                                            <div className="custom-column-header">
                                                <div className="contact_cards">
                                                    <img src={Vision} className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="custom-column-content">
                                                <div className="card-title contact-card-title">Vision</div>
                                                <p className="card-desc contact-card-desc" style={{ overflow: "hidden", minHeight: "150px", maxHeight: "150px" }}>Realising the need of our client, Providing them universal access to our subscribed talents, full participation in culture - to drive a new era of development, growth, and productivity.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-4 chart-block">
                                        <div className="custom-column shadow rounded">
                                            <div className="custom-column-header">
                                                <div className="contact_cards">
                                                    <img src={values} className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="custom-column-content">
                                                <div className="card-title contact-card-title">Values</div>
                                                <p className="card-desc contact-card-desc" style={{ overflow: "hidden", minHeight: "150px", maxHeight: "150px" }}>Life at iTalentHub revolves around our core values of innovation and strong execution.
                                                    Integrity, Ethics , Innovation and individual respect is our all time values.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {this.state.activeTab === 0 &&
                            <div id="mission" className={`mission_desc tab-pane fade show active`} role="tabpanel" aria-labelledby="mission-tab">
                                <p>
                                    iTalentHub is the largest fully-remote company globally. With over 500 core team members in 60+ countries and operations in many more, we connect the world's top talent with the world's top organizations.
                                </p>
                                <p>
                                    Life at iTalentHub revolves around our core values of innovation and strong execution. We set our sights high and believe that attitude is everything.
                                </p>
                                <p>
                                    Being global means having opportunities to meet people all over the world. We organize and sponsor hundreds of conferences, coworking days, workshops, and networking events each year.
                                </p>
                            </div>
                        }
                        {this.state.activeTab === 2 &&
                            <div id="contact_us" className={`tab-pane fade show active`} role="tabpanel" aria-labelledby="contact_us-tab" >
                                <div className="col-12 col-md-12 col-lg-12 contact-wraper" style={{ display: "flex" }}>
                                    <div className="col-6 col-lg-6 col-md-6 shadow">
                                        <div className="get-in-touch">
                                            <p>We'd love to hear from you.</p>
                                            <span>Whether you have a question about our team, services we offer or anything else, our team is ready to answer all your questions.</span>
                                        </div>
                                        <div className="get-in-touch-button">
                                            <button type="button" onClick={() => this.props.history.push("/talent")} className="btn btn-login float-right register_button">Our Team</button>
                                            <button type="button" onClick={() => this.props.history.push("/categories")} className="btn btn-login float-right register_button">Services</button>
                                        </div>

                                    </div>
                                    <div className="col-6 col-lg-6 col-md-6 contact-form">
                                        <form className="login-form" onSubmit={(e) => this.onSubmit(e)} method="post">
                                            {this.state.serverError !== "" && <div className="text-center text-danger error_msg"><span className="server-error">{this.state.serverError}</span></div>}
                                            {this.state.serverSuccess !== "" && <div className="text-center text-success error_msg"><span className="server-success">{this.state.serverSuccess}</span></div>}
                                            <div class="form-name-main">
                                                <div className="form-group">
                                                    <label htmlFor="name" className="form-label">Name</label>
                                                    <input type="text" className="form-control" name="name" onChange={(ev) => { this.onNameChange(ev) }} value={this.state.name} />
                                                    <span className="error">{this.state.nameError}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email" className="form-label">Email Address</label>
                                                    <input className="form-control" type="email" name="email" onChange={(ev) => { this.onEmailChange(ev) }} value={this.state.email} />
                                                    <span className="error">{this.state.emailError}</span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                                <input className="form-control" type="text" name="phone" maxLength={10} onChange={(ev) => { this.onPhoneChange(ev) }} value={this.state.phone} />
                                                <span className="error">{this.state.phoneError}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="message" className="form-label" aria-placeholder="">Message</label>
                                                <textarea className="form-control" name="message" value={this.state.message} onChange={(ev) => { this.onMessageChange(ev) }} placeholder="Write Your message"></textarea>
                                                <span className="error">{this.state.messageError}</span>
                                            </div>

                                            <div className="btn_div">
                                                <button type="submit" disabled={this.state.isDisable} className="btn btn-login float-right register_button">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                    <div className="col-12 col-lg-12 row contact-details" style={{ paddingLeft: "10%" }} >
                        <div className="col-3 col-lg-3 contact_us_add">
                            <div className="country">
                                <img src={map} />
                                <span className="country-name">India</span>
                            </div>
                            <p className="contact-footer"> #44, Chamundeshwari Complex,
                                100 feet ring road,
                                BSK-III Stage, Bengaluru, Karnataka</p>
                        </div>
                        <div className="col-3 col-lg-3">
                            <div className="country">
                                <img src={map} />
                                <span className="country-name">Japan</span>
                            </div>
                            <p className="contact-footer"> 7-F, Raukuty Building, Toyo 3-5-5, Koto-Ku, Tokyo</p>
                        </div>
                        <div className="col-3 col-lg-3">
                            <div className="country">
                                <img src={email} />
                                <span className="country-name">Email Us</span>
                            </div>
                            <p className="numbers contact-footer" href="tel: +1 562-627-7429">- info.india@indosakura.com
                                <span>- info.japan@indosakura.com</span></p>
                        </div>
                        <div className="col-3 col-lg-3">
                            <div className="country">
                                <img src={phoneCall} />
                                <span className="country-name">Call Us</span>
                            </div>
                            <p className="numbers contact-footer" href="tel: +1 562-627-7429">- +91-96863-91210
                                <span>- +81-90-4407-8453</span></p>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(AboutUs);