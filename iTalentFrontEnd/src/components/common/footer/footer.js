import React from 'react';
import Linkedin from '../../../assets/images/linked-in.png';
import Facebook from '../../../assets/images/facebook.png';
import Twitter from '../../../assets/images/twitter.png';

function Footer(props) {
    return (
        <div className={`container-fluid ${props.hasBackground  ? "footer-background": 'footer-background-grey'}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 footer-copyright">Copyright 2020 iTalentHub</div>
                    <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 text-right">
                        <ul className="list-inline footer-social-media">
                            <li className="list-inline-item"><a taregt="_blank" href="https://linkedin.com"><img src={Linkedin} alt="linkedin" className="img-fluid" /></a></li>
                            <li className="list-inline-item"><a taregt="_blank" href="https://facebook.com"><img src={Facebook} alt="facebook" className="img-fluid" /></a></li>
                            <li className="list-inline-item"><a taregt="_blank" href="https://twitter.com"><img src={Twitter} alt="twitter" className="img-fluid" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

Footer.defaultProps = {
hasBackground: true
}

export default Footer;