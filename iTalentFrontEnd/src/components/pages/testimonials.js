import React from 'react';
import commaImg from '../../assets/images/comma.png';
import maleTest from '../../assets/images/male-test.png';
import femaleTest from '../../assets/images/female-test.png';
import LeftArrow from '../../assets/images/left-arrow.png';
import RightArrowHighlight from '../../assets/images/right-arrow-highlight.png';
import LeftArrowHighlight from '../../assets/images/left-arrow-highlight.png';
import RightArrow from '../../assets/images/right-arrow.png';

const tData = [
    {
        image: maleTest,
        name: "A major japan IT firm",
        testimonial: `We are grateful to iTalentHub for assisting us in our IT projects in short time. 
        The IT engineers we interacted with are experienced, skilled and humble that made our working experience exciting. Basically they are strong in logical thinking, mathematics which is instrumental in data science related work. 
        There were initial hitches due to our poor English skills, however they adjust themselves patiently assisted us in explaining our technical requirements to them
        Overall it was rewarding work experience with the team.`,
        designation: ""
    },
    {
        image: femaleTest,
        name: "A top tier home electronics maker",
        testimonial: `We had worked with IT vendor earlier and knew how to interact with IT engineers from overseas. That made our journey to screen and interview right candidates from iTalentHub. 
        Currently we are engaged on a small project, however I believe sooner its going to be a long term association as our engagement is rewarding unlike previous outsourcing model. `,
        designation: ""
    },
    {
        image: maleTest,
        name: "Mobile game development company",
        testimonial: `Our projects on mobile application constantly requires design change, screen development and modification, it was hard to allocate such tasks to local staff due to cost factor. iTalentHub provided us a platform to choose right candidate at right time with surprisingly low cost.
        Thank you for your support and look for a long term association.`,
        designation: ""
    }
]
class Testimonials extends React.Component {
    state = {
        active: 0,
        data: tData[0]
    }

    changeTestimonial = (key) => {
        this.setState({
            active: key,
            data: tData[key]
        });
    }

    leftArrowFn = () => {
        if (this.state.active > 0) {
            this.setState({ active: this.state.active - 1, data: tData[this.state.active - 1] })
        }
    }

    rightArrowFn = () => {
        if (this.state.active !== tData.length - 1) {
            this.setState({ active: this.state.active + 1, data: tData[this.state.active + 1] })
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            if (this.state.active !== tData.length - 1) {
                this.setState({ active: this.state.active + 1, data: tData[this.state.active + 1] })
            } else {
                this.setState({ active: 0, data: tData[0] })
            }
        }, 5000)
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="text-center testonomial_heading">Why do people praise about <span className="red-color">iTalent?</span>
                </h1>
                <div className="col-12 col-md-6 testimonial-image-container">
                        <img src={this.state.data.image} alt="testimonial" className="img-fluid testimonial-image" />
                </div>
                <div className="test-wrapper">
                    <div className="col-12 col-md-6 testonomial_left_pannel">
                        <div className="comma_img_div">
                            <img src={commaImg} alt="comma" className="img-fluid comma_img" />
                        </div>
                        <p className="testonimal_left_description">
                            {this.state.data.testimonial}
                        </p>
                        <h4 className="testonimal_sub_heading">
                            {this.state.data.name}
                        </h4>
                        <div className="testonimal_sub_description">{this.state.data.designation}</div>
                    </div>
                    <ul className="list-inline verticle-slider text-center m-auto">
                        <li className="list-inline-item" onClick={this.leftArrowFn}><a><img src={this.state.active > 0 ? LeftArrowHighlight : LeftArrow} alt="left-arrow" className="img-fluid slider_img" /></a></li>
                        {
                            tData.map((e, key) => {
                                return <li className={`list-inline-item ${this.state.active === key ? "active" : ""}`} key={key} onClick={() => this.changeTestimonial(key)} onMouseEnter={() => this.changeTestimonial(key)} ></li>
                            })
                        }
                        <li className="list-inline-item" onClick={this.rightArrowFn}><a><img src={this.state.active < tData.length - 1 ? RightArrowHighlight : RightArrow} alt="right-arrow" className="img-fluid slider_img" /></a></li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Testimonials;