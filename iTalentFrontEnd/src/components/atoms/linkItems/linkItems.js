import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function LinkItems(props) {
    return (
        props.useLink ? <Link to={props.href} >{props.text}</Link> : <a href={props.href} >{props.text}</a>
    );
}

LinkItems.propTypes = {
    isActive: PropTypes.bool,
    useLink: PropTypes.bool
}

LinkItems.defaultProps = {
    isActive: false,
    useLink: false
}

export default LinkItems;