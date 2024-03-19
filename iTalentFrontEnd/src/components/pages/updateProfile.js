import React from 'react';
import localforage from 'localforage';
import { withRouter } from 'react-router-dom';
import { API_URL, API_HEADERS } from '../../utils/api';
import axios from 'axios';
import ProgressBar from 'react-percent-bar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';



class UpdateProfile extends React.Component {
    state = {
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
        projectHistory: [{ projectName: '', role: '', dateFrom: '', currentProject: '', dateTo: '', projectDetails: '' }]
    }

    skillName = ['Skill Name', 'Experience in Years', 'Degree/Certification']
    educationDetails = ['Name of Institute', 'Degree', 'Field of Study', 'Year of Passing']
    languageDetails = ['Language', 'Speaking', 'Reading', 'Year of Passing', 'Certification']
    employementDetails = ['Company Name', 'Designation', 'Date Of Joining ', 'Current Company', 'Date Of Release']
    projectDetails = ['Project Name', 'Role', 'Date From ', 'Current Project', 'Date To', 'Project Details']

    async componentDidMount() {
        let profilePer = await localforage.getItem("completePercentage");
        let user = await localforage.getItem("user");
        if (profilePer) {
            this.setState({
                profilePer
            });
        }
        if (user) {
            this.setState({
                user
            });
        }
    }

    s = (x) => {
        console.log(x)
        return x ? { paddingBottom: '15px', width: '180px' } : { paddingBottom: '15px' }
    }

    onSubmit = () => {
        const _this = this;
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

                "E_mail": _this.state.user.E_mail,
                "data": _this.state.user
            }, {
                headers: API_HEADERS
            })
                .then((response) => {
                    if (response.data.status) {
                        localforage.setItem('user', response.data.data, function (err) {
                            localforage.setItem('completePercentage', response.data.completePercentage, function (err) {
                                localforage.setItem('successMsg', "Profile updated successfully!!", function (err) {
                                    _this.setState({
                                        profilePer: response.data.completePercentage,
                                        isDisable: false
                                    });
                                    _this.goHome();
                                })
                            });
                        });
                    } else {
                        _this.setState({
                            messageError: "Something went wrong.",
                            isDisable: false
                        })
                    }
                })
                .catch((error) => {
                    _this.setState({
                        messageError: "Something went wrong.",
                        isDisable: false
                    })
                })
        }
    }


    goHome = () => {
        this.props.history.push("/")
    }

    handleAddRowTech = () => {
        const newRow = { skillName: '', experience: '', certification: '' };
        this.setState(prevState => ({
            ...prevState,
            techskills: [...prevState.techskills, newRow]
        }));
    };

    handleDeleteRowTech = (rowIndex) => {

        const comp = this.state.techskills
        const deleteRow = this.state.techskills[rowIndex]
        const x = comp.indexOf(deleteRow)
        if (x > -1) {
            comp.splice(x, 1);
        }
        this.setState(prevState => ({
            ...prevState,
            techskills: comp
        }));
    }

    handleAddRowEducational = () => {
        const newRow = { instituteName: '', degree: '', fieldOfStudy: '', yearOfPassing: '' };
        this.setState(prevState => ({
            ...prevState,
            educationalDetails: [...prevState.educationalDetails, newRow]
        }));
    };

    handleDeleteRowEducational = (rowIndex) => {
        let educationalDetails1 = [...this.state.educationalDetails];
        const deleteRow = this.state.educationalDetails[rowIndex]
        const x = educationalDetails1.indexOf(deleteRow)
        if (x > -1) {
            educationalDetails1.splice(x, 1);
        }
        this.setState(prevState => ({
            ...prevState,
            educationalDetails: educationalDetails1
        }));
    }

    handleAddRowLanguage = () => {
        const newRow = { language: '', speaking: '', reading: '', writing: '', certification: '' };
        this.setState(prevState => ({
            ...prevState,
            languageSkills: [...prevState.languageSkills, newRow]
        }));
    };

    handleDeleteRowLanguage = (rowIndex) => {
        const comp = this.state.languageSkills
        const deleteRow = this.state.languageSkills[rowIndex]
        const x = comp.indexOf(deleteRow)
        if (x > -1) {
            comp.splice(x, 1);
        }
        this.setState(prevState => ({
            ...prevState,
            languageSkills: comp
        }));
    }

    handleAddRowEmployment = () => {
        const newRow = { companyName: '', designation: '', dateOfJoining: '', currentCompany: false, dateOfRelease: '' };
        this.setState(prevState => ({
            ...prevState,
            employmentHistory: [...prevState.employmentHistory, newRow]
        }));
    };

    handleDeleteRowEmployment = (rowIndex) => {
        const comp = this.state.employmentHistory
        const deleteRow = this.state.employmentHistory[rowIndex]
        const x = comp.indexOf(deleteRow)
        if (x > -1) {
            comp.splice(x, 1);
        }
        this.setState(prevState => ({
            ...prevState,
            employmentHistory: comp
        }));
    }

    handleAddRowProjectDetails = () => {
        const newRow = { projectName: '', role: '', dateFrom: '', currentProject: '', dateTo: '', projectDetails: '' };
        this.setState(prevState => ({
            ...prevState,
            projectHistory: [...prevState.projectHistory, newRow]
        }));
    };

    handleDeleteRowProjectDetails = (rowIndex) => {
        const comp = this.state.projectHistory
        const deleteRow = this.state.projectHistory[rowIndex]
        const x = comp.indexOf(deleteRow)
        if (x > -1) {
            comp.splice(x, 1);
        }
        this.setState(prevState => ({
            ...prevState,
            projectHistory: comp
        }));
    }

    handleChangeTech = (e, rowIndex, inputKey) => {
        const { value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            techskills: prevState.techskills.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        [inputKey]: value
                    };
                }
                return row;
            })
        }));
        console.log(this.state)
    };

    handleChangeEducation = (e, rowIndex, inputKey) => {
        const { value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            educationalDetails: prevState.educationalDetails.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        [inputKey]: value
                    };
                }
                return row;
            })
        }));
        console.log(this.state)
    };

    handleChangeLanguage = (e, rowIndex, inputKey) => {
        const { value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            languageSkills: prevState.languageSkills.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        [inputKey]: value
                    };
                }
                return row;
            })
        }));
        console.log(this.state)
    };

    handleChangeEmployment = (e, rowIndex, inputKey) => {
        let { value } = e.target;
        value = e.target.type === 'checkbox' ? e.target.checked : value
        this.setState(prevState => ({
            ...prevState,
            employmentHistory: prevState.employmentHistory.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        [inputKey]: value
                    };
                }
                return row;
            })
        }));
        console.log(this.state)
    };


    handleChangeProjectDetails = (e, rowIndex, inputKey) => {
        let { value } = e.target;
        value = e.target.type === 'checkbox' ? e.target.checked : value
        this.setState(prevState => ({
            ...prevState,
            projectHistory: prevState.projectHistory.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        [inputKey]: value
                    };
                }
                return row;
            })
        }));
        console.log(this.state)
    };

    // handleChange = (e, rowIndex, inputKey) => {
    //     const { value } = e.target;
    //     const updatedRows = [...this.state.techskills];
    //     updatedRows[rowIndex][inputKey] = value; // Update the value of the input
    //     this.setState({ techskills: [...this.state.techskills, newRow] }); // Update the state
    // };
    render() {

        return (
            <section style={{ marginTop: "20px" }}>

                <div style={{ paddingBottom: "20px", display: "flex" }} className="container">
                    <h6 style={{ marginRight: "20px" }}>your profile is completed {this.state.profilePer <= 100 ? this.state.profilePer : 100}%</h6>
                    <ProgressBar colorShift={false} borderColor="black" fillColor="#ff6158" percent={this.state.profilePer} />
                </div>

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
                                        <input type="email" disabled value={this.state.user.E_mail} className="form-control" name="email" />
                                    </div>
                                    <div className="form-group col-lg-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="text" disabled onChange={(ev) => this.setState({ user: { ...this.state.user, "Phone": ev.target.value } })} value={this.state.user.Phone} className="form-control" name="phone" />
                                    </div>
                                    <div className="form-group col-lg-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" style={this.state.user.Name === "" ? { borderColor: "red" } : {}} onChange={(ev) => this.setState({ user: { ...this.state.user, "Name": ev.target.value } })} value={this.state.user.Name} name="name" />
                                    </div>
                                    <div className="form-group col-lg-3">
                                        <label htmlFor="nickname" className="form-label">Nick Name</label>
                                        <input type="text" className="form-control" style={this.state.user.Nickname === "" ? { borderColor: "red" } : {}} onChange={(ev) => this.setState({ user: { ...this.state.user, "Nickname": ev.target.value } })} value={this.state.user.Nickname} name="nickname" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-inline profile-padding">
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="exp" className="form-label">Experience in years</label>
                                        <input type="number" className="form-control" value={this.state.user.Exp} onChange={(ev) => this.setState({ user: { ...this.state.user, "Exp": ev.target.value } })} name="Exp" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="designation" className="form-label">Designation</label>
                                        <input type="text" className="form-control" value={this.state.user.Designation} onChange={(ev) => this.setState({ user: { ...this.state.user, "Designation": ev.target.value } })} name="designation" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="primary_skills" className="form-label">Primary Skills</label>
                                        <input type="text" className="form-control" value={this.state.user["Primary Skills"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Primary Skills": ev.target.value } })} name="primary_skills" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="secondary_skills" className="form-label">Secondary Skills</label>
                                        <input type="text" className="form-control" value={this.state.user["Secondary Skills"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Secondary Skills": ev.target.value } })} name="secondary_skills" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-inline profile-padding">
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="education" className="form-label">Education</label>
                                        <input type="text" value={this.state.user["Education"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Education": ev.target.value } })} className="form-control" name="education" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="Jpskills" className="form-label">JP Skills</label>
                                        <input type="text" className="form-control" value={this.state.user["Jpskills"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Jpskills": ev.target.value } })} name="Jpskills" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="Jplevel" className="form-label">JP Level</label>
                                        <input type="text" className="form-control" value={this.state.user["Jplevel"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Jplevel": ev.target.value } })} name="Jplevel" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="Jpcertification" className="form-label">JP Certification</label>
                                        <input type="text" className="form-control" value={this.state.user["Jpcertification"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Jpcertification": ev.target.value } })} name="Jpcertification" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-inline profile-padding">
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="Per_hr_charge" className="form-label">Per hour charge</label>
                                        <input type="number" className="form-control" value={this.state.user["Per_hr_charge"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Per_hr_charge": ev.target.value } })} name="Per_hr_charge" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="english_skill" className="form-label">English Skills</label>
                                        <input type="text" className="form-control" value={this.state.user["EngSkills"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "EngSkills": ev.target.value } })} name="english_skill" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="english_level" className="form-label">English level</label>
                                        <input type="text" className="form-control" value={this.state.user["EngLevel"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "EngLevel": ev.target.value } })} name="english_level" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="english_certification" className="form-label">English Certification</label>
                                        <input type="text" className="form-control" value={this.state.user["EngCertification"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "EngCertification": ev.target.value } })} name="english_certification" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-inline profile-padding">
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="DOB" className="form-label">DOB</label>
                                        <input type="date" className="form-control" value={this.state.user["DOB"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "DOB": ev.target.value } })} name="DOB" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="location" className="form-label">Location</label>
                                        <input type="text" className="form-control" value={this.state.user["Location"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Location": ev.target.value } })} name="location" />
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <select className="form-control" value={this.state.user["Gender"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Gender": ev.target.value } })} name="gender" >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group  col-lg-3">
                                        <label htmlFor="ext_platform" className="form-label">External Platform</label>
                                        <input type="text" className="form-control" value={this.state.user["Ext_Platform"]} onChange={(ev) => this.setState({ user: { ...this.state.user, "Ext_Platform": ev.target.value } })} name="ext_platform" />
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
                                                                < input type="number" className="form-control" key={inputKey}
                                                                    value={row[inputKey]}
                                                                    onChange={(e) => this.handleChangeTech(e, rowIndex, inputKey)} name="" />}
                                                            {(inputKey === 'skillName' || inputKey === 'certification') &&
                                                                < input type="text" className="form-control" key={inputKey}
                                                                    value={row[inputKey]}
                                                                    onChange={(e) => this.handleChangeTech(e, rowIndex, inputKey)} name="" />}

                                                        </div>
                                                    </div>
                                                ))}

                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20px', marginBottom: '15px' }}>
                                                <button className='btn btn-secondary btn-danger  my-2 my-sm-0' onClick={() => this.handleDeleteRowTech(rowIndex)} ><i className="bi bi-trash"></i></button>
                                            </div>
                                        </div>
                                        <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />

                                    </div>
                                ))}
                                <div style={{
                                    verticalAlign: 'middle'
                                }}>
                                    <button className='btn btn-secondary btn-grey-color my-2 my-sm-0' onClick={this.handleAddRowTech}>Add Row</button>
                                </div>
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
                                                                    value={row[inputKey]}
                                                                    onChange={(e) => this.handleChangeEducation(e, rowIndex, inputKey)} name="" />}

                                                        </div>

                                                    </div>

                                                ))}
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20px', marginBottom: '15px' }}>
                                                <button className='btn btn-secondary btn-danger  my-2 my-sm-0' onClick={() => this.handleDeleteRowEducational(rowIndex)} ><i className="bi bi-trash"></i></button>
                                            </div>
                                        </div>
                                        <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />
                                    </div>

                                ))}
                                <div style={{
                                    verticalAlign: 'middle'
                                }}>
                                    <button className='btn btn-secondary btn-grey-color my-2 my-sm-0' onClick={this.handleAddRowEducational}>Add Row</button>
                                </div>
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
                                                                    value={row[inputKey]}
                                                                    onChange={(e) => this.handleChangeLanguage(e, rowIndex, inputKey)} name="" />}

                                                        </div>

                                                    </div>

                                                ))}
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20px', marginBottom: '15px' }}>
                                                <button className='btn btn-secondary btn-danger  my-2 my-sm-0' onClick={() => this.handleDeleteRowLanguage(rowIndex)} ><i className="bi bi-trash"></i></button>
                                            </div>
                                        </div>
                                        <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />
                                    </div>
                                ))}
                                <div style={{
                                    verticalAlign: 'middle'
                                }}>
                                    <button className='btn btn-secondary btn-grey-color my-2 my-sm-0' onClick={this.handleAddRowLanguage}>Add Row</button>
                                </div>
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
                                                                            value={row[inputKey]}
                                                                            onChange={(e) => this.handleChangeEmployment(e, rowIndex, inputKey)} name="" />}
                                                                    {(inputKey === 'dateOfJoining') &&
                                                                        < input type="date" className="form-control" key={inputKey}
                                                                            value={row[inputKey]}
                                                                            onChange={(e) => this.handleChangeEmployment(e, rowIndex, inputKey)} />}
                                                                    {inputKey === 'currentCompany' && < input type="checkbox" className="form-control" key={inputKey}
                                                                        value={row[inputKey]}
                                                                        onChange={(e) => this.handleChangeEmployment(e, rowIndex, inputKey)} name="" />}
                                                                    {(inputKey === 'dateOfRelease' && !row['currentCompany']) &&
                                                                        < input type="date" className="form-control" key={inputKey}
                                                                            value={row[inputKey]}
                                                                            onChange={(e) => this.handleChangeEmployment(e, rowIndex, inputKey)} name="" />}
                                                                    {(inputKey === 'profileDetails') &&
                                                                        < input type="text" className="form-control" key={inputKey}
                                                                            value={row[inputKey]}
                                                                            onChange={(e) => this.handleChangeEmployment(e, rowIndex, inputKey)} name="" />}


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
                                                                        value={row[inputKey]}
                                                                        onChange={(e) => this.handleChangeEmployment(e, rowIndex, inputKey)} name="" />}
                                                                {(inputKey === 'dateOfJoining') &&
                                                                    < input type="date" className="form-control" key={inputKey}
                                                                        value={row[inputKey]}
                                                                        onChange={(e) => this.handleChangeEmployment(e, rowIndex, inputKey)} />}
                                                                {inputKey === 'currentCompany' && < input type="checkbox" className="form-control" key={inputKey} style={{ width: '13px' }}
                                                                    value={row[inputKey]}
                                                                    onChange={(e) => this.handleChangeEmployment(e, rowIndex, inputKey)} name="" />}
                                                                {(inputKey === 'dateOfRelease' && !row['currentCompany']) &&
                                                                    < input type="date" className="form-control" key={inputKey}
                                                                        value={row[inputKey]}
                                                                        onChange={(e) => this.handleChangeEmployment(e, rowIndex, inputKey)} name="" />}
                                                            </div>
                                                        </div>
                                                        }
                                                    </div>
                                                ))}

                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20px', marginBottom: '15px' }}>
                                                <button className='btn btn-secondary btn-danger  my-2 my-sm-0' onClick={() => this.handleDeleteRowEmployment(rowIndex)} ><i className="bi bi-trash"></i></button>
                                            </div>
                                        </div>
                                        <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />
                                    </div>
                                ))}
                                <div style={{
                                    verticalAlign: 'middle'
                                }}>
                                    <button className='btn btn-secondary btn-grey-color my-2 my-sm-0' onClick={this.handleAddRowEmployment}>Add Row</button>
                                </div>
                            </div>
                            <div className="container margin0" style={{ marginTop: "20px" }}>
                                <h6 style={{ marginBottom: "20px" }}>Project Details</h6>
                                {this.state.projectHistory.map((row, rowIndex) => (
                                    
                                    < div key = { rowIndex } style = { this.projectDetails[rowIndex] == 5 ? { width: '400px' } : {} } >
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        { console.log(rowIndex) }
                                            <div key={rowIndex} className="row" style={{ maxWidth: '1150px' }}>
                                                {Object.keys(row).map((inputKey, index) => (
                                                    <div key={inputKey} >
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
                                                                            value={row[inputKey]}
                                                                            onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} name="" />}
                                                                    {(inputKey === 'dateFrom') &&
                                                                        < input type="date" className="form-control" key={inputKey}
                                                                            value={row[inputKey]}
                                                                            onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} />}
                                                                    {inputKey === 'currentProject' && < input type="checkbox" className="form-control" key={inputKey}
                                                                        value={row[inputKey]}
                                                                        onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} name="" />}
                                                                    {(inputKey === 'dateTo' && !row['currentCompany']) &&
                                                                        < input type="date" className="form-control" key={inputKey}
                                                                            value={row[inputKey]}
                                                                            onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} name="" />}
                                                                    {(inputKey === 'projectDetails') &&
                                                                        < textarea className="form-control" key={inputKey} rows='3' cols='5000' style={{ width: '100%', marginTop: '8px' }}
                                                                            value={row[inputKey]}
                                                                            onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} name="" />}


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
                                                                        value={row[inputKey]}
                                                                        onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} name="" />}
                                                                {(inputKey === 'dateFrom') &&
                                                                    < input type="date" className="form-control" key={inputKey}
                                                                        value={row[inputKey]}
                                                                        onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} />}
                                                                {inputKey === 'currentProject' && < input type="checkbox" className="form-control" key={inputKey} style={{ width: '13px' }}
                                                                    value={row[inputKey]}
                                                                    onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} name="" />}
                                                                {(inputKey === 'dateTo' && !row['currentCompany']) &&
                                                                    < input type="date" className="form-control" key={inputKey}
                                                                        value={row[inputKey]}
                                                                        onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} name="" />}
                                                                {(inputKey === 'projectDetails') &&
                                                                    <div >
                                                                        < textarea className="form-control" key={inputKey} rows='3' cols='50'
                                                                            value={row[inputKey]}
                                                                            onChange={(e) => this.handleChangeProjectDetails(e, rowIndex, inputKey)} name="" /></div>}



                                                            </div>
                                                        </div>
                                                        }
                                                    </div>
                                                ))}

                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20px', marginBottom: '15px' }}>
                                                <button className='btn btn-secondary btn-danger  my-2 my-sm-0' onClick={() => this.handleDeleteRowProjectDetails(rowIndex)} ><i className="bi bi-trash"></i></button>
                                            </div>
                                        </div>
                                        <hr style={{ marginTop: '0px', marginBottom: '15px', paddingTop: '0px' }} />
                                    </div>
                                ))}
                            <div style={{
                                verticalAlign: 'middle'
                            }}>
                                <button className='btn btn-secondary btn-grey-color my-2 my-sm-0' onClick={this.handleAddRowProjectDetails}>Add Row</button>
                            </div>
                        </div>
                        </div>
                    }
            </div>
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
        <div className="text-center">
            <button className="btn btn-secondary btn-grey-color my-2 my-sm-0" onClick={this.goHome}>Cancel</button>
            <button style={{ margin: "0 10px" }} disabled={this.state.isDisable} onClick={this.onSubmit} className="btn btn-primary btn-orange-color my-2 my-sm-0">Submit</button>
        </div>
            </section >
        )
    }
}

export default withRouter(UpdateProfile);