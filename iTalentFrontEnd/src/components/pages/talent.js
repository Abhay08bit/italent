import React from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_HEADERS } from '../../utils/api';
import axios from 'axios';
import Modal from 'simple-react-modal';
import SkillBar from 'react-skillbars';
import maleImage from '../../assets/images/male-red-120-x-120.png';
import femaleImage from '../../assets/images/female-red-120-x-120.png';
import starImage from '../../assets/images/star.png';
import LeftArrow from '../../assets/images/left-arrow.png';
import RightArrowHighlight from '../../assets/images/right-arrow-highlight.png';
import LeftArrowHighlight from '../../assets/images/left-arrow-highlight.png';
import RightArrow from '../../assets/images/right-arrow.png';
import Loader from '../../assets/images/loader.gif';
import { default as ModalSkills } from '../common/modal/Modal';

const TabArray = [
    "Developer", "Consultant", "QA", "UI"
];

let totalPage = 0;
let tempFrom = 0;
let tempTo = 0;
class Talent extends React.Component {
    state = {
        activeTab: 0,
        data: [],
        activePage: 1,
        from: 0,
        to: 4,
        showModal: false,
        skills: [],
        talentName: "",
        isLoading: true,
        techskills: [{ skillName: '', experience: '', certification: '' }],
        languageSkills: [{ language: '', speaking: '', reading: '', writing: '', certification: '' }],
        user: { Exp: '', Designation: '', Education: '' }
    }

    skillName = ['Skill Name', 'Experience in Years', 'Degree/Certification']
    languageDetails = ['Language', 'Speaking', 'Reading', 'Year of Passing', 'Certification']

    componentDidMount() {
        let _this = this;
        // axios.post(API_URL + "skill_collection/v1/api", {
        axios.post(API_URL + "eaas/skill_collection/v1/api", {

            "skills": TabArray
        }, {
            headers: API_HEADERS
        })
            .then((response) => {
                if (response.data.status) {
                    _this.setState({
                        data: response.data.data,
                        isLoading: false
                    })
                } else {
                    console.log("Server error", response.data.data)
                    _this.setState({
                        isLoading: false
                    })
                }

            })
            .catch((error) => {
                console.log("Error", error.message);
            })
    }

    slideLeft = () => {
        if (this.state.activePage > 1) {
            let activePage = this.state.activePage - 1;
            let from = this.state.from - 4;
            let to = this.state.from;
            this.setState({
                activePage,
                from,
                to
            })
        }
    }

    slideRight = () => {
        if (this.state.activePage < totalPage) {
            let activePage = this.state.activePage + 1;
            let from = this.state.to;
            let to = this.state.to + 4;
            this.setState({
                activePage,
                from,
                to
            })
        }
    }

    changeActive = key => {
        if (key === this.state.activePage) return;
        if (key === 1) {
            return this.setState({
                activePage: key,
                from: 0,
                to: 4
            })
        }
        if (key > this.state.activePage) {
            let activePage = key;
            let from = 0;
            let to = 4;
            for (let i = 0; i < key - 1; i++) {
                from += 4;
                to += 4;
            }
            this.setState({
                activePage,
                from,
                to
            })
        } else {
            let activePage = key;
            let from = tempFrom === 0 ? this.state.data[this.state.activeTab].length - 4 : tempFrom;
            let to = tempTo === 0 ? this.state.data[this.state.activeTab].length : tempTo;
            for (let i = 0; i < key - 1; i++) {
                from -= 4;
                to -= 4;
            }
            tempFrom = from;
            tempTo = to;
            this.setState({
                activePage,
                from,
                to
            })
        }
    }

    goRegister = () => {
        this.props.history.push("/register");
    }

    showSkillsModal = (el) => {
        const skills = [];
        el[`Primary Skills`].split(',').map((element) => {
            if (element === "") return;
            return skills.push(
                {
                    "type": element,
                    "level": Math.floor(Math.random() * (85 - 60 + 1) + 60)
                }
            );
        });

        el[`Secondary Skills`].split(',').map((element) => {
            if (element === "") return;
            return skills.push(
                {
                    "type": element,
                    "level": Math.floor(Math.random() * (50 - 20 + 1) + 20)
                }
            );
        })
        this.setState({
            skills,
            talentName: el.Name,
            showModal: true
        })
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

    render() {
        console.log(this.state.data)
        const _this = this;
        const colors = {
            "bar": "#ff6158",
            "title": {
                "text": "#fff",
                "background": "#ff6158"
            }
        }
        let tagCount = true;
        totalPage = this.state.data[this.state.activeTab] ? Math.floor((this.state.data[this.state.activeTab].length + 4 - 1) / 4) <= 25 ? Math.floor((this.state.data[this.state.activeTab].length + 4 - 1) / 4) : 25 : 0;
        if (!this.state.isLoading) {
            return (
                <React.Fragment>
                    <ModalSkills isOpen={this.state.showModal} onClose={() => this.setState({
                        showModal: !this.state.showModal
                    })}>

                        <div className="container mt-3">

                            <div className="skills-modal-body" >
                                {/* <div className="col-12" style={{ display: "flex" }}>
                                    <span onClick={() => this.setState({ showModal: false })} className="modal-close">&times;</span>
                                </div> */}

                                <div className="container margin0" style={{ marginTop: "20px" }}>
                                    <div className="row">
                                        <div className="form-inline profile-padding">
                                            <div className="form-group  col-lg-3">
                                                <label htmlFor="exp" className="form-label" style={
                                                    {
                                                        whiteSpace: 'nowrap'
                                                    }
                                                }>Experience in years</label>
                                                <input type="number" className="form-control" disabled value={this.state.user.Exp}  name="Exp" />
                                            </div>
                                        </div>
                                        <div className="form-inline profile-padding">

                                            <div className="form-group  col-lg-3">
                                                <label htmlFor="designation" className="form-label">Designation</label>
                                                <input type="text"  className="form-control" disabled value={this.state.user.Designation}  name="designation" />
                                            </div>
                                        </div>
                                        <div className="form-inline profile-padding">

                                            <div className="form-group  col-lg-3">
                                                <label htmlFor="education" className="form-label">Education</label>
                                                <input type="text" value={this.state.user["Education"]} disabled  className="form-control" name="education" />
                                            </div>
                                        </div>
                                    </div>
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
                                                                        value={row[inputKey]} disabled
                                                                         name="" />}
                                                                {(inputKey === 'skillName' || inputKey === 'certification') &&
                                                                    < input type="text" className="form-control" key={inputKey}
                                                                        value={row[inputKey]} disabled
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
                                                                        value={row[inputKey]} disabled
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
                        </div>
                    </ModalSkills>
                    {/* <Modal show={this.state.showModal}>
                        <div className="skills-modal-body">
                            <div className="col-12">
                                <span onClick={() => this.setState({ showModal: false })} className="modal-close">&times;</span>
                            </div>
                            <div className="col-12">
                                <h6 style={{ marginBottom: "20px", textAlign: "center" }}>{this.state.talentName}</h6>
                                <SkillBar skills={this.state.skills} colors={colors} animationDelay={500} />
                            </div>
                        </div>
                    </Modal> */}
                    <h1 className="main_box_heading">Meet Talent in Our Network</h1>
                    <div>
                        <ul className="nav justify-content-center menu_content">
                            {
                                TabArray.map((el, key) => {
                                    return (
                                        <li className="nav-item" key={key} onClick={() => {
                                            this.setState({
                                                activeTab: key,
                                                activePage: 1,
                                                from: 0,
                                                to: 4
                                            });
                                        }}>
                                            <a href="#" className={`nav-link ${this.state.activeTab === key ? "active" : ""}`}>{el}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="row categories">
                        {
                            this.state.data[this.state.activeTab] && this.state.data[this.state.activeTab].slice(this.state.from, this.state.to).map((el, key) => {
                                return (
                                    <div className="col-sm-12 col-md-3 chart-block" key={key} >
                                        <div className="custom-column shadow rounded">
                                            <div className="custom-column-header">
                                                <div className="profile_img">
                                                    <img src={el.Gender === "Male" ? maleImage : femaleImage} className="img-fluid" />
                                                </div>
                                                <div className="rating_div">
                                                    <div>{el.rating}</div>
                                                    <div className="ratings">
                                                        {
                                                            Array.from(Array(el.rating), (x, index) => index + 1).map(keyIn => {
                                                                return (
                                                                    <span key={keyIn}><img src={starImage} className="img-fluid" /></span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="custom-column-content">
                                                <div className="card-title">{el.Name}</div>
                                                <p className="card-desc">{el.Designation}</p>
                                                <div className="keywords">
                                                    {el[`Primary Skills`].split(',').map((element, pKey) => {
                                                        if (pKey > 2) {
                                                            return false;
                                                        }
                                                        if (pKey > 1) {
                                                            tagCount = false;
                                                            return <span key={pKey}>...</span>;
                                                        }
                                                        return element !== "" ? <span key={pKey}>{element}</span> : "";
                                                    })}
                                                    {el[`Secondary Skills`].split(',').map((element, pKey) => {
                                                        if (tagCount) {
                                                            return element !== "" ? <span key={pKey}>{element}</span> : "";
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                            <div className="custom-column-footer"><button className="btn btn-lg details_btn" onClick={() => this.showSkillsModal(el)}>Details</button></div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        {
                            totalPage > 0 && Array.from(Array(totalPage)).length > 1 &&
                            <ul className="list-inline verticle-slider text-center">
                                <li className="list-inline-item" onClick={_this.state.activePage !== 1 ? this.slideLeft : () => { }}><a><img src={_this.state.activePage !== 1 ? LeftArrowHighlight : LeftArrow} alt="left-arrow" className="img-fluid slider_img" /></a></li>
                                {
                                    Array.from(Array(totalPage), (x, index) => index + 1).map(keyIn => {
                                        return <li key={keyIn} onClick={() => { _this.changeActive(keyIn) }} className={`list-inline-item ${keyIn === _this.state.activePage ? "active" : ""}`}></li>
                                    })
                                }
                                <li className="list-inline-item" onClick={_this.state.activePage < totalPage ? this.slideRight : () => { }}><a><img src={_this.state.activePage < totalPage ? RightArrowHighlight : RightArrow} alt="right-arrow" className="img-fluid slider_img" /></a></li>
                            </ul>
                        }
                    </div>
                    <div className="text-center Do-you-want-to-join-experts-Dont-wait">Do you want to join the talent? Don't wait!</div>
                    <div className="text-center"><button onClick={this.goRegister} className="become_an_expert btn btn-primary btn-orange-color my-2 my-sm-0" type="button">Join Talent</button></div>
                </React.Fragment>
            );
        } else {
            return (
                <div style={{ textAlign: "center" }}>
                    <img class="" src={Loader} style={{ margin: "0 auto", height: "500px", width: "auto" }} alt="loader" />
                </div>
            )
        }
    }
}

export default withRouter(Talent);