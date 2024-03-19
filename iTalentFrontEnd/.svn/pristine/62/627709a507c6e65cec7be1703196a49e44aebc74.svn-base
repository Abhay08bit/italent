import React from 'react';
import Loader from '../../assets/images/loader.gif';
import { API_URL, API_HEADERS } from '../../utils/api';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

class Analytics extends React.Component {
    state = {
        data: {},
        loader: true
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        let _this = this;
        // axios.get(API_URL + "analytics/v1/api", {
            axios.get(API_URL + "eaas/analytics/v1/api",{
            headers: API_HEADERS
        })
            .then((response) => {
                if (response.data.status) {
                    _this.setState({
                        data: response.data.data,
                        loader: false
                    })
                } else {
                    console.log("Server error", response.data.data)
                    _this.setState({
                        loader: false
                    })
                }

            })
            .catch((error) => {
                console.log("Error", error.message);
                _this.setState({
                    loader: false
                })
            })
    }

    render() {
        if (this.state.loader) {
            return (
                <div style={{ textAlign: "center" }}>
                    <img class="" src={Loader} style={{ margin: "0 auto", height: "500px", width: "auto" }} alt="loader" />
                </div>
            )
        } else if (this.state.data.skills) {
            let label = [];
            let datas = [];
            let bgcolor = [];
            let count = 0;
            Object.keys(this.state.data.skills).map(key => {
                label.push(key);
                datas.push(this.state.data.skills[key]);
                bgcolor.push(colorArray[count]);
                if (count < colorArray.length) {
                    count++;
                } else {
                    count = 0;
                }

            })
            const data = {
                labels: label,
                datasets: [{
                    data: datas,
                    backgroundColor: bgcolor,
                    hoverBackgroundColor: bgcolor
                }
                ]
            };
            label = [];
            datas = [];
            bgcolor = [];
            count = 0;
            Object.keys(this.state.data.sought_skills).map(key => {
                label.push(key);
                datas.push(this.state.data.skills[key]);
                bgcolor.push(colorArray[count]);
                if (count < colorArray.length) {
                    count++;
                } else {
                    count = 0;
                }

            })
            const dataskills = {
                labels: label,
                datasets: [{
                    data: datas,
                    backgroundColor: bgcolor,
                    hoverBackgroundColor: bgcolor
                }
                ]
            };

            return (
                <React.Fragment>
                    <div className="container chart-title-analytics-wrapper">
                        <p className="chart-title-analytics">We have total <span className="skill-count">{this.state.data.total_count}</span> skills.</p>
                    </div>
                    <div className="col-12 col-lg-12" style={{ display: "flex" }}>
                        <div className="col-sm-6 col-md-6 col-6 chart-block">
                            <div className="custom-column shadow rounded" style={{ paddingBottom: "20px", cursor: "pointer" }}>
                                <span className="chart_title">Top skills</span>
                                <Doughnut data={data} />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-6 chart-block">
                            <div className="custom-column shadow rounded" style={{ paddingBottom: "20px", cursor: "pointer" }}>
                                <span className="chart_title">Most sought after skills.</span>
                                <Doughnut data={dataskills} />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="container chart-title-analytics-wrapper">
                        <p className="chart-title-analytics">Something went wrong. We are not able to fetch the data.</p>
                    </div>
                    <div className="container chart-block">
                        <div className="row">
                            <button type="button" style={{display: "block", width: "50%", margin:"10px auto"}} className="row btn btn-login float-right register_button" onClick={this.fetchData}>Try again</button>
                        </div>
                        <div className="row">
                        <button type="button" onClick={() => {this.props.history.push("/")}} style={{display: "block", width: "50%", margin:"10px auto"}} className="row btn btn-login float-right register_button">Go back</button>
                        </div>

                    </div>

                </React.Fragment>
            )
        }
    }
}

export default withRouter(Analytics);