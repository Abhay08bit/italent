import React from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_HEADERS } from '../../utils/api';
import axios from 'axios';
import { default as ModalSkills } from '../common/modal/Modal';
import Pagination from '@material-ui/lab/Pagination';
import { setEmail } from '../../redux/actions/detailsEmailAction';
import { connect } from 'react-redux';



class Admin extends React.Component {
    state = {
        notificationDataOriginal: [],
        notificationDataDisplay: [],
        showModal: false,
        indexer: {},
        searchName: "",
        currentPage: 1,
        itemsPerPage: 10,
        tabKey: 'tab1',
    }

    skillName = ['Skill Name', 'Experience in Years', 'Degree/Certification']
    educationDetails = ['Name of Institute', 'Degree', 'Field of Study', 'Year of Passing']
    languageDetails = ['Language', 'Speaking', 'Reading', 'Year of Passing', 'Certification']
    employementDetails = ['Company Name', 'Designation', 'Date Of Joining ', 'Current Company', 'Date Of Release']
    projectDetails = ['Project Name', 'Role', 'Date From ', 'Current Project', 'Date To', 'Project Details']

    // paginate = (pageNumber) => {
    //     this.setState({
    //         currentPage: pageNumber,
    //     });
    // };

    handlePageChange = (event, page) => {
        this.setState({
            currentPage: page,
        });
    };
    componentDidMount = () => {
        this.loadData()
    }



    async loadData() {
        const x = await axios.get(API_URL + "eaas/admin/inquiry/v1/api")
            .then((response) => {
                if (response.data.status) {
                    this.setState({
                        notificationDataOriginal: response.data.data,
                        notificationDataDisplay: response.data.data,
                    })
                }
            })
            .catch((error) => {
                // Handling errors if any
                console.error('Error fetching data:', error);
            });
    }
    toggleModal = (index) => {
        this.setState(prevState => ({
            ...prevState,
            showModal: true,
            indexer: prevState.notificationDataDisplay[index]
        }))

    }

    toggleModalForDetails = (index) => {
        this.setState(prevState => ({
            ...prevState,
            showModalForDetails: true,
            indexerDetails: prevState.notificationDataDisplay[index][""]
        }))

    }

    // toggleModal = (index) => {
    //     this.setState(prevState => ({
    //         ...prevState,
    //         showModalForDetails: true,
    //         indexerDetails: prevState.notificationDataDisplay[index]
    //     }))

    // }

    changeSearchInput = (ev) => {
        ev.persist();
        // this.setState(prevState => ({
        //     ...prevState,
        //     searchName: ev.target.value
        // }))
        let a = []
        this.state.notificationDataOriginal.map((i) => {
            // console.log(i.employer.Company)
            if (ev.target.value != "") {
                // console.log(ev.target.value)
                if (i.employer.Company.toLowerCase().includes(ev.target.value.toLowerCase()))
                    a = [...a, i]
            }
            else {
                a = this.state.notificationDataOriginal
            }
        })
        this.setState(prevState => ({
            ...prevState,
            searchName: ev.target.value,
            notificationDataDisplay: a
        }))
    }

    clickFind = () => {
        let a = []
        this.state.notificationDataOriginal.map((i) => {
            // console.log(i.employer.Company)
            if (this.state.searchName != "") {
                if (i.employer.Company.toLowerCase().includes(this.state.searchName.toLowerCase()))
                    a = [...a, i]
            }
            else {
                a = this.state.notificationDataOriginal
            }
        })
        this.setState(prevState => ({
            ...prevState,
            notificationDataDisplay: a
        }))

    }

    clickReset = () => {
        document.getElementById("findcompany").value = ""
        this.setState(prevState => ({
            ...prevState,
            notificationDataDisplay: prevState.notificationDataOriginal,
        }))

    }

    openTalentDetails = (prop) => {
        this.props.setEmail(prop);
        // this.props.history.push('/admin/talent-details?email=' + prop)
        this.props.history.push('/admin/talent-details')

    }

    render() {
        const { notificationDataDisplay, indexer, currentPage, itemsPerPage, indexerDetails } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = notificationDataDisplay.slice(indexOfFirstItem, indexOfLastItem);
        return (
            <React.Fragment>
                {Object.keys(indexer).length !== 0 &&
                    <ModalSkills isOpen={this.state.showModal} onClose={() => this.setState({
                        showModal: !this.state.showModal
                    })}>
                        <div>
                            <h4 style={{ margin: "10px" }}>Inquirer:</h4>

                            <div style={{ display: "flex", flexWrap: 'wrap', backgroundColor: '#f0e6e2', borderRadius: "10px" }}>
                                <p style={{ margin: '10px' }}>Name: {indexer.employer.Name}</p>
                                <p style={{ margin: '10px' }}>Email: {indexer.employer.Email}</p>
                                <p style={{ margin: '10px' }}>Company: {indexer.employer.Company}</p>
                                <p style={{ margin: '10px' }}>Date</p>
                            </div>

                            <h4 style={{ margin: "10px" }}>Talent:</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#f0e6e2', borderRadius: "10px" }}>
                                {indexer.candidate.map((candidate, index) => (
                                    <div className="card-list" key={index}>
                                        <article className="card shadow" key={index}>
                                            <div style={{ display: 'flex' }} key={index}>

                                                <div>
                                                    <p>Name: {candidate.Name}</p>
                                                    <p>Email: {candidate.Email}</p>
                                                    <p>Phone: {candidate.Phone}</p>
                                                    <input type="button" id="btn_details" onClick={() => this.openTalentDetails(candidate.Email)} name="" style={{ marginRight: "10px" }} value="Details" className="btn btn-primary btn-orange-color" />
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ModalSkills>
                }
                <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: '20px' }} className='shadow'>
                    <div >
                        <div className="list">
                            <h4 style={{ color: '#dc3545' }}>Request List</h4>
                            <br />
                            <div >
                                <div style={{ display: 'flex', margin: '0px 5px 0px,5px' }}>
                                    <div style={{ display: 'flex' }} className='vertical'>
                                        <span style={{ fontSize: '18px', color: '#dc3545', marginRight: "10px", display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>Search By</span>
                                        <span style={{ marginRight: "7px", display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>Company Name:</span>
                                        {/* <input type="text" style={{ borderColor: 'rgba(52, 46, 54, 0.5)', marginRight: "10px", borderRadius: '6px' }} value={this.state.searchName} onChange={ev => this.changeSearchInput(ev)} /> */}
                                        <input type="text" id= "findcompany" style={{ borderColor: 'rgba(52, 46, 54, 0.5)', marginRight: "10px", borderRadius: '6px' }} onChange={ev => this.changeSearchInput(ev)} />
                                        <div >
                                            <input type="button" name="find" style={{ marginRight: "10px" }} value="Find" className="btn btn-primary btn-orange-color my-2 my-sm-0" onClick={this.clickFind} />
                                            <input type="button" name="reset" value="Reset" className="btn btn-primary reset_btn" onClick={this.clickReset} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="list-ul" style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0, color: "#fff" }}>
                                {currentItems.map((notification, index) => (
                                    <div key={index} className="list-li" style={{ width: '250px' }} onClick={() => this.toggleModal(index)}>
                                        <div className="">
                                            <div ><span className="">Name: {notification.employer.Name}</span>
                                                <br />
                                                <span className="">Email: {notification.employer.Email}</span>
                                                <br />
                                                <span className="">Company: {notification.employer.Company}</span>
                                                <br />
                                                <span className="">Date: </span>
                                            </div >
                                        </div>
                                    </div>

                                ))}
                            </div >
                            <Pagination
                                count={Math.ceil(notificationDataDisplay.length / itemsPerPage)}
                                page={currentPage}
                                onChange={this.handlePageChange}
                                showFirstButton
                                showLastButton
                            // variant="outlined"
                            // shape="rounded"
                            // color="primary"
                            // className="pagination"
                            />

                            {/* <ul className="pagination">
                                {Array.from({ length: Math.ceil(notificationDataDisplay.length / itemsPerPage) }, (_, i) => (
                                    <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                                        <button onClick={() => this.paginate(i + 1)}>{i + 1}</button>
                                    </li>
                                ))}
                            </ul> */}
                        </div >
                    </div >
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setEmail: (email) => dispatch(setEmail(email))
});

const mapStateToProps = (state) => ({
    email: state.email
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));