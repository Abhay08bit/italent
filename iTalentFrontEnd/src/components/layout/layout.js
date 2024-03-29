import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Navigator from '../atoms/navigator/navigator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import localforage from 'localforage';

const navigatorArray = [
    "/",
    "/categories",
    "/talent",
    "/aboutus",
    "/testimonial",
    "/analytics"
];


class Layout extends React.Component {

    state = {
        activeLink: navigatorArray.findIndex(el => el === this.props.location.pathname),
        isLogin: false,
        isAdmin: false
    }

    updateActiveLink = (key) => {
        this.setState({ activeLink: key });
    }

    componentDidMount() {
        this.notify();
        this.updateLogin();
        if (this.state.activeLink !== navigatorArray.findIndex(el => el === this.props.location.pathname)) {
            this.setState({
                activeLink: navigatorArray.findIndex(el => el === this.props.location.pathname)
            });
        }
    }

    componentDidUpdate() {
        //this.notify();
        this.updateLogin();
        if (this.state.activeLink !== navigatorArray.findIndex(el => el === this.props.location.pathname)) {
            this.setState({
                activeLink: navigatorArray.findIndex(el => el === this.props.location.pathname)
            });
        }
    }

    notify = async () => {
        let msg = await localforage.getItem("successMsg");
        if (msg) {
            toast.success(msg);
            localforage.removeItem("successMsg");
        }
    };

    updateLogin = async () => {
        let user = await localforage.getItem('user');
        let isLogin = await localforage.getItem('isLoggedin');
        this.setState({
            isLogin: isLogin,
            isAdmin: user != null && user["isAdmin"] ? user["isAdmin"] : false
        })
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <div className={`container-fluid ${(this.state.activeLink !== 1 && this.state.activeLink !== -1 && this.state.activeLink !== 4 && this.state.activeLink !== 3) || this.props.location.pathname === "/team" || this.props.location.pathname === "/admin" || this.props.location.pathname === "/admin/talent-details" || this.props.location.pathname === "/pop" ? "header-background-color" : ''}`} style={{ position: 'relative' }}>
                    <div className="container">
                        <Header hasNavbar={this.props.hasHeader} />
                        <section className="section-1">
                            {this.props.hasNavigator && !this.state.isLogin && <Navigator active={this.state.activeLink} links={navigatorArray} updateActiveLink={(key) => this.updateActiveLink(key)} />}
                            {this.props.children}
                        </section>
                    </div>
                </div>
                <Footer hasBackground={(this.state.activeLink === 1 || this.state.activeLink === 4 || this.state.activeLink === 3  || this.state.activeLink === -1) && this.props.location.pathname !== "/team" ? false : true} />
            </React.Fragment>
        );
    }

}

// Layout.defaultProps = {
//     hasNavigator: true,
//     hasNavbar:true
// }

export default withRouter(Layout);