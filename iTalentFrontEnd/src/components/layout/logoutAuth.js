import React from 'react';
import { withRouter } from 'react-router-dom';
import localforage from 'localforage';

class LogoutAuth extends React.Component {
    async componentWillMount() {
        let isLogin = await localforage.getItem('isLoggedin');
        let user = await localforage.getItem('user');
        if (isLogin) {
            if (user["isAdmin"])
                this.props.history.push("/find-talent");
            else
                this.props.history.push("/");
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(LogoutAuth);