import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/i-talenthub-logo.png';

function Logo(props) {
    return <Link className={props.linkClass} to="/"><img className={props.imgClass} src={logo} alt="logo" /></Link>
}

Logo.defaulProps = {
linkClass: "",
imgClass: ""
}

export default Logo;