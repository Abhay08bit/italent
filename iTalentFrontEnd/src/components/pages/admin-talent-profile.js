import React from 'react';
import localforage from 'localforage';
import { withRouter } from 'react-router-dom';
import { API_URL, API_HEADERS } from '../../utils/api';
import axios from 'axios';
import ProgressBar from 'react-percent-bar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { connect } from 'react-redux';

class AdminTalentProfile extends React.Component {

    state = {
        Email: '',
        profilePer: 0,
        user: {},
        messageError: "",
        messageSuccess: "",
        isDisable: false,
        tabKey: 'tab1',
        techskills: [{ skillName: '', experience: '', certification: '' }],
        educationalDetails: [{ instituteName: '', degree: '', fieldOfStudy: '', yearOfPassing: '' }],
        languageSkills: [{ language: '', speaking: '', reading: '', writing: '', certification: '' }],
        employmentHistory: [{ companyName: '', designation: '', dateOfJoining: '', currentCompany: false, dateOfRelease: '' }],
        projectHistory: [{ projectName: '', role: '', dateFrom: '', currentProject: '', dateTo: '', projectDetails: '' }],
        isLoading: true
    }

    skillName = ['Skill Name', 'Experience in Years', 'Degree/Certification']
    educationDetails = ['Name of Institute', 'Degree', 'Field of Study', 'Year of Passing']
    languageDetails = ['Language', 'Speaking', 'Reading', 'Year of Passing', 'Certification']
    employementDetails = ['Company Name', 'Designation', 'Date Of Joining ', 'Current Company', 'Date Of Release']
    projectDetails = ['Project Name', 'Role', 'Date From ', 'Current Project', 'Date To', 'Project Details']

    async componentDidMount() {
        const { email } = this.props;
        // const params = new URLSearchParams(this.props.location.search);
        // const email = params.get('email');
        await axios.post(API_URL + "eaas/profileinfo/v1/api", {
            "E_mail": email,
        }, {
            headers: API_HEADERS
        })
            .then((response) => {
                if (response.data.status) {
                    this.setState({
                        Email: this.email1,
                        user: response.data.data[0],
                        isLoading: false
                    })
                } else {
                    this.setState({
                        messageError: "Something went wrong.",
                        isDisable: false,
                        isLoading: false
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    messageError: "Something went wrong.",
                    isDisable: false,
                    isLoading: false
                })
            })
    }

    s = (x) => {
        console.log(x)
        return x ? { paddingBottom: '15px', width: '180px' } : { paddingBottom: '15px' }
    }

    onSubmit = () => {
        if (this.state.user.Name === "" || this.state.user.Nickname === "" || this.state.user.Phone === "") {
            this.setState({
                messageError: "Please fill mandatory fields."
            });
            return;
        } else {
            this.setState({
                isDisable: true
            })
            // axios.post(API_URL + "reg_update/v1/api", {
            axios.post(API_URL + "eaas/reg_update/v1/api", {

                "E_mail": this.state.user.E_mail,
                "data": this.state.user
            }, {
                headers: API_HEADERS
            })
                .then((response) => {
                    if (response.data.status) {
                        localforage.setItem('user', response.data.data, function (err) {
                            localforage.setItem('completePercentage', response.data.completePercentage, function (err) {
                                localforage.setItem('successMsg', "Profile updated successfully!!", function (err) {
                                    this.setState({
                                        profilePer: response.data.completePercentage,
                                        isDisable: false
                                    });
                                    this.goHome();
                                })
                            });
                        });
                    } else {
                        this.setState({
                            messageError: "Something went wrong.",
                            isDisable: false
                        })
                    }
                })
                .catch((error) => {
                    this.setState({
                        messageError: "Something went wrong.",
                        isDisable: false
                    })
                })
        }
    }


    goHome = () => {
        this.props.history.push("/")
    }


    render() {
        return (
            <React.Fragment>
                <div >
                    <section style={{ backgroundColor: "#fff", marginTop: "20px", padding: '20px', borderRadius: '20px' }} className='shadow'>
                        <h4 style={{ color: '#dc3545' }}>Talent Details</h4>
                        {/* <div style={{ paddingBottom: "20px", display: "flex" }} className="container">
                    <h6 style={{ marginRight: "20px" }}>your profile is completed {this.state.profilePer <= 100 ? this.state.profilePer : 100}%</h6>
                    <ProgressBar colorShift={false} borderColor="black" fillColor="#ff6158" percent={this.state.profilePer} />
                </div> */}
                        {!this.state.isLoading &&
                            <div className="container mt-3">
                                {/* <button onClick={() => { this.setState({ tabKey: 'tab1' }) }} className={this.state.tabKey === 'tab1' ? 'active' : ''}>Tab 1</button>
                    <button onClick={() => { this.setState({ tabKey: 'tab2' }) }} className={this.state.tabKey === 'tab2' ? 'active' : ''}>Tab 2</button>
                    <button onClick={() => { this.setState({ tabKey: 'tab3' }) }} className={this.state.tabKey === 'tab3' ? 'active' : ''}>Tab 3</button> */}
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className='nav-item'>
                                        <a className={this.state.tabKey === 'tab1' ? ' nav-link active' : "nav-link "} data-bs-toggle="tab" onClick={() => { this.setState({ tabKey: 'tab1' }) }}>Basic Information</a>
                                    </li>
                                    <li className='nav-item'>
                                        <a className={this.state.tabKey === 'tab2' ? ' nav-link active' : "nav-link "} data-bs-toggle="tab" onClick={() => { this.setState({ tabKey: 'tab2' }) }}>Skills</a>
                                    </li>
                                    <li className='nav-item'>
                                        <a className={this.state.tabKey === 'tab3' ? ' nav-link active' : "nav-link "} data-bs-toggle="tab" onClick={() => { this.setState({ tabKey: 'tab3' }) }}>Employment Information</a>
                                    </li>
                                </ul>
                                {this.state.tabKey === 'tab1' &&
                                    <div className="container margin0" style={{ marginTop: "20px" }}>
                                        <div className="row">
                                            <div className="form-inline profile-padding">
                                                <div className="form-group  col-lg-3" >
                                                    <label htmlFor="email" className="form-label">Email Address</label>
                                                    <input type="email" readOnly value={this.state.user.E_mail} className="form-control" name="email" />
                                                </div>
                                                <div className="form-group col-lg-3">
                                                    <label htmlFor="phone" className="form-label">Phone</label>
                                                    <input type="text" readOnly value={this.state.user.Phone} className="form-control" name="phone" />
                                                </div>
                                                <div className="form-group col-lg-3">
                                                    <label htmlFor="name" className="form-label">Name</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user.Name} name="name" />
                                                </div>
                                                <div className="form-group col-lg-3">
                                                    <label htmlFor="nickname" className="form-label">Nick Name</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user.Nickname} name="nickname" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-inline profile-padding">
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="exp" className="form-label">Experience in years</label>
                                                    <input type="number" readOnly className="form-control" value={this.state.user.Exp} name="Exp" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="designation" className="form-label">Designation</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user.Designation} name="designation" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="primary_skills" className="form-label">Primary Skills</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["Primary Skills"]} name="primary_skills" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="secondary_skills" className="form-label">Secondary Skills</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["Secondary Skills"]} name="secondary_skills" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-inline profile-padding">
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="education" className="form-label">Education</label>
                                                    <input type="text" readOnly value={this.state.user["Education"]} className="form-control" name="education" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="Jpskills" className="form-label">JP Skills</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["Jpskills"]} name="Jpskills" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="Jplevel" className="form-label">JP Level</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["Jplevel"]} name="Jplevel" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="Jpcertification" className="form-label">JP Certification</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["Jpcertification"]} name="Jpcertification" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-inline profile-padding">
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="Per_hr_charge" className="form-label">Per hour charge</label>
                                                    <input type="number" readOnly className="form-control" value={this.state.user["Per_hr_charge"]} name="Per_hr_charge" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="english_skill" className="form-label">English Skills</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["EngSkills"]} name="english_skill" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="english_level" className="form-label">English level</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["EngLevel"]} name="english_level" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="english_certification" className="form-label">English Certification</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["EngCertification"]} name="english_certification" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-inline profile-padding">
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="DOB" className="form-label">DOB</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["DOB"]} name="DOB" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="location" className="form-label">Location</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["Location"]} name="location" />
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="gender" className="form-label">Gender</label>
                                                    <input className="form-control" value={this.state.user["Gender"]} name="gender" readOnly />
                                                    {/* <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select> */}
                                                </div>
                                                <div className="form-group  col-lg-3">
                                                    <label htmlFor="ext_platform" className="form-label">External Platform</label>
                                                    <input type="text" readOnly className="form-control" value={this.state.user["Ext_Platform"]} name="ext_platform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {this.state.tabKey === 'tab2' &&
                                    <div >
                                        <div className="container margin0" style={{ marginTop: "20px" }}>
                                            <h6 style={{ marginBottom: "20px" }}>Technical Skills</h6>
                                            {this.state.techskills.map((row, rowIndex) => (
                                                <div key={rowIndex}>
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <div key={rowIndex} className="row ">
                                                            {Object.keys(row).map((inputKey, index) => (
                                                                <div className="form-inline profile-padding " style={{ paddingBottom: '15px' }} key={inputKey}>
                                                                    <div className="form-group  col-lg-3">
                                                                        <label htmlFor="exp" className="form-label" style={
                                                                            {
                                                                                whiteSpace: 'nowrap'
                                                                            }
                                                                        }>{this.skillName[index]}</label>
                                                                        {inputKey === 'experience' &&
                                                                            < input type="number" className="form-control" key={inputKey} readOnly
                                                                                value={row[inputKey]}
                                                                                name="" />}
                                                                        {(inputKey === 'skillName' || inputKey === 'certification') &&
                                                                            < input type="text" className="form-control" key={inputKey} readOnly
                                                                                value={row[inputKey]}
                                                                                name="" />}

                                                                    </div>
                                                                </div>
                                                            ))}

                                                        </div>


                                                    </div>
                                                    <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />

                                                </div>
                                            ))}

                                        </div>
                                        <div className="container margin0" style={{ marginTop: "20px" }}>
                                            <h6 style={{ marginBottom: "20px" }}>Educational Details</h6>
                                            {this.state.educationalDetails.map((row, rowIndex) => (
                                                <div key={rowIndex}>
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <div key={rowIndex} className="row">
                                                            {Object.keys(row).map((inputKey, index) => (
                                                                <div className="form-inline profile-padding" style={{ paddingBottom: '15px' }} key={inputKey}>
                                                                    <div className="form-group  col-lg-3">
                                                                        <label htmlFor="exp" className="form-label" style={
                                                                            {
                                                                                whiteSpace: 'nowrap'
                                                                            }
                                                                        }>{this.educationDetails[index]}</label>
                                                                        {(inputKey === 'instituteName' || inputKey === 'degree' || inputKey === 'fieldOfStudy' || inputKey === 'yearOfPassing') &&
                                                                            < input type="text" className="form-control" key={inputKey}
                                                                                value={row[inputKey]} readOnly
                                                                                name="" />}

                                                                    </div>

                                                                </div>

                                                            ))}
                                                        </div>

                                                    </div>
                                                    <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />
                                                </div>

                                            ))}

                                        </div>
                                        <div className="container margin0" style={{ marginTop: "20px" }}>
                                            <h6 style={{ marginBottom: "20px" }}>Language Details</h6>
                                            {this.state.languageSkills.map((row, rowIndex) => (
                                                <div key={rowIndex}>
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <div key={rowIndex} className="row">
                                                            {Object.keys(row).map((inputKey, index) => (
                                                                <div className="form-inline profile-padding" style={{ paddingBottom: '15px' }} key={inputKey}>
                                                                    <div className="form-group  col-lg-3">
                                                                        <label htmlFor="exp" className="form-label" style={
                                                                            {
                                                                                whiteSpace: 'nowrap'
                                                                            }
                                                                        }>{this.languageDetails[index]}</label>
                                                                        {(inputKey === 'language' || inputKey === 'speaking' || inputKey === 'reading' || inputKey === 'writing' || inputKey === 'certification') &&
                                                                            < input type="text" className="form-control" key={inputKey}
                                                                                value={row[inputKey]} readOnly
                                                                                name="" />}

                                                                    </div>

                                                                </div>

                                                            ))}
                                                        </div>

                                                    </div>
                                                    <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />
                                                </div>
                                            ))}

                                        </div>
                                    </div>

                                }
                                {this.state.tabKey === 'tab3' &&
                                    <div>
                                        <div className="container margin0" style={{ marginTop: "20px" }}>
                                            <h6 style={{ marginBottom: "20px" }}>Employment History</h6>
                                            {this.state.employmentHistory.map((row, rowIndex) => (
                                                <div key={rowIndex}>
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <div key={rowIndex} className="row">
                                                            {Object.keys(row).map((inputKey, index) => (
                                                                <div key={inputKey}>
                                                                    {this.employementDetails[index] === 'Date Of Release' ? !row['currentCompany'] ?
                                                                        <div className="form-inline profile-padding " style={{ paddingBottom: '15px' }} key={inputKey}>
                                                                            <div className="form-group  col-lg-3" >
                                                                                <label htmlFor="exp" className="form-label" style={
                                                                                    {
                                                                                        whiteSpace: 'nowrap'
                                                                                    }
                                                                                }>{this.employementDetails[index]}</label>

                                                                                {(inputKey === 'companyName' || inputKey === 'designation') &&
                                                                                    < input type="text" className="form-control" key={inputKey}
                                                                                        value={row[inputKey]} readOnly
                                                                                        name="" />}
                                                                                {(inputKey === 'dateOfJoining') &&
                                                                                    < input type="date" className="form-control" key={inputKey}
                                                                                        value={row[inputKey]} readOnly
                                                                                    />}
                                                                                {inputKey === 'currentCompany' && < input type="checkbox" className="form-control" key={inputKey}
                                                                                    value={row[inputKey]} readOnly
                                                                                    name="" />}
                                                                                {(inputKey === 'dateOfRelease' && !row['currentCompany']) &&
                                                                                    < input type="date" className="form-control" key={inputKey}
                                                                                        value={row[inputKey]} readOnly
                                                                                        name="" />}
                                                                                {(inputKey === 'profileDetails') &&
                                                                                    < input type="text" className="form-control" key={inputKey}
                                                                                        value={row[inputKey]} readOnly
                                                                                        name="" />}


                                                                            </div>
                                                                        </div>
                                                                        : '' : <div className="form-inline profile-padding " style={this.s(this.employementDetails[index] === 'Current Company')} key={inputKey}>
                                                                        <div className="form-group  col-lg-3" >
                                                                            {this.employementDetails[index] === 'Date Of Release' ? !row['currentCompany'] ?
                                                                                <label htmlFor="exp" className="form-label" style={
                                                                                    {
                                                                                        whiteSpace: 'nowrap'
                                                                                    }
                                                                                }>{this.employementDetails[index]}</label> : '' :
                                                                                <label htmlFor="exp" className="form-label" style={
                                                                                    {
                                                                                        whiteSpace: 'nowrap'
                                                                                    }
                                                                                }>{this.employementDetails[index]}</label>
                                                                            }

                                                                            {(inputKey === 'companyName' || inputKey === 'designation') &&
                                                                                < input type="text" className="form-control" key={inputKey}
                                                                                    value={row[inputKey]} readOnly
                                                                                    name="" />}
                                                                            {(inputKey === 'dateOfJoining') &&
                                                                                < input type="date" className="form-control" key={inputKey}
                                                                                    value={row[inputKey]} readOnly
                                                                                />}
                                                                            {inputKey === 'currentCompany' && < input type="checkbox" className="form-control" key={inputKey} style={{ width: '13px' }}
                                                                                value={row[inputKey]} readOnly
                                                                                name="" />}
                                                                            {(inputKey === 'dateOfRelease' && !row['currentCompany']) &&
                                                                                < input type="date" className="form-control" key={inputKey}
                                                                                    value={row[inputKey]} readOnly
                                                                                    name="" />}
                                                                        </div>
                                                                    </div>
                                                                    }
                                                                </div>
                                                            ))}

                                                        </div>

                                                    </div>
                                                    <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />
                                                </div>
                                            ))}

                                        </div>
                                        <div className="container margin0" style={{ marginTop: "20px" }}>
                                            <h6 style={{ marginBottom: "20px" }}>Project Details</h6>
                                            {this.state.projectHistory.map((row, rowIndex) => (
                                                <div key={rowIndex}>
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                                                        <div key={rowIndex} className="row" style={{ maxWidth: '1150px' }}>
                                                            {Object.keys(row).map((inputKey, index) => (
                                                                <div key={inputKey}>
                                                                    {this.projectDetails[index] === 'Date To' ? !row['currentProject'] ?
                                                                        <div className="form-inline profile-padding " style={{ paddingBottom: '15px' }} key={inputKey}>
                                                                            <div className="form-group  col-lg-3" >

                                                                                <label htmlFor="exp" className="form-label" style={
                                                                                    {
                                                                                        whiteSpace: 'nowrap'
                                                                                    }
                                                                                }>{this.projectDetails[index]}</label>

                                                                                {(inputKey === 'projectName' || inputKey === 'role') &&
                                                                                    < input type="text" className="form-control" key={inputKey}
                                                                                        value={row[inputKey]} readOnly
                                                                                        name="" />}
                                                                                {(inputKey === 'dateFrom') &&
                                                                                    < input type="date" className="form-control" key={inputKey}
                                                                                        value={row[inputKey]} readOnly
                                                                                    />}
                                                                                {inputKey === 'currentProject' && < input type="checkbox" className="form-control" key={inputKey}
                                                                                    value={row[inputKey]} disabled
                                                                                    name="" />}
                                                                                {(inputKey === 'dateTo' && !row['currentCompany']) &&
                                                                                    < input type="date" className="form-control" key={inputKey}
                                                                                        value={row[inputKey]} readOnly
                                                                                        name="" />}
                                                                                {(inputKey === 'projectDetails') &&
                                                                                    < textarea className="form-control" key={inputKey} rows='3' cols='5000' style={{ width: '100%', marginTop: '8px' }}
                                                                                        value={row[inputKey]} readOnly
                                                                                        name="" />}


                                                                            </div>
                                                                        </div>
                                                                        : '' : <div className="form-inline profile-padding " style={this.s(this.employementDetails[index] === 'Current Company')} key={inputKey}>
                                                                        <div className="form-group  col-lg-3" >
                                                                            {this.projectDetails[index] === 'Date Of Release' ? !row['currentCompany'] ?
                                                                                <label htmlFor="exp" className="form-label" style={
                                                                                    {
                                                                                        whiteSpace: 'nowrap'
                                                                                    }
                                                                                }>{this.employementDetails[index]}</label> : '' :
                                                                                <label htmlFor="exp" className="form-label" style={
                                                                                    {
                                                                                        whiteSpace: 'nowrap'
                                                                                    }
                                                                                }>{this.projectDetails[index]}</label>
                                                                            }

                                                                            {(inputKey === 'projectName' || inputKey === 'role') &&
                                                                                < input type="text" className="form-control" key={inputKey}
                                                                                    value={row[inputKey]} readOnly
                                                                                    name="" />}
                                                                            {(inputKey === 'dateFrom') &&
                                                                                < input type="date" className="form-control" key={inputKey}
                                                                                    value={row[inputKey]} readOnly
                                                                                />}
                                                                            {inputKey === 'currentProject' && < input type="checkbox" className="form-control" key={inputKey} style={{ width: '13px' }}
                                                                                value={row[inputKey]} disabled
                                                                                name="" />}
                                                                            {(inputKey === 'dateTo' && !row['currentCompany']) &&
                                                                                < input type="date" className="form-control" key={inputKey}
                                                                                    value={row[inputKey]} readOnly
                                                                                    name="" />}
                                                                            {(inputKey === 'projectDetails') &&
                                                                                <div >
                                                                                    < textarea className="form-control" key={inputKey} rows='3' cols='50'
                                                                                        value={row[inputKey]} readOnly
                                                                                        name="" /></div>}



                                                                        </div>
                                                                    </div>
                                                                    }
                                                                </div>
                                                            ))}

                                                        </div>

                                                    </div>
                                                    <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        {
                            this.state.messageSuccess !== "" &&
                            <div className="row">
                                <span style={{ color: "green", display: "block", margin: "20px auto" }}>{this.state.messageSuccess}</span>
                            </div>
                        }
                        {
                            this.state.messageError !== "" &&
                            <div className="row">
                                <span style={{ color: "red", display: "block", margin: "20px auto" }}>{this.state.messageError}</span>
                            </div>
                        }

                    </section >
                </div>
            </React.Fragment >
        )

    }
}

const mapStateToProps = (state) => ({
    email: state.detailsEmail.email
});

export default withRouter(connect(mapStateToProps)(AdminTalentProfile));
// export default withRouter(AdminTalentProfile)