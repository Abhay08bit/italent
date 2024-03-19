import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";


import Layout from './components/layout/layout';
import Home from './components/pages/home';
import Categories from './components/pages/categories';
import Testimonials from './components/pages/testimonials';
import Login from './components/pages/login';
import Register from './components/pages/register';
import FindTalent from './components/pages/findTalent';
import Talent from './components/pages/talent';
import UpdateProfile from './components/pages/updateProfile';
import LoginAuth from './components/layout/loginAuth';
import LogoutAuth from './components/layout/logoutAuth';
import Team from './components/pages/team';
import AboutUs from './components/pages/aboutus';
import Analytics from './components/pages/analytics';
import Admin from './components/pages/admin';
import AdminTalentProfile from './components/pages/admin-talent-profile';
import NewUserPopup from './components/common/newUser/newUserPopup';
// import newUserPopup from './components/common/newUser/newUserPopup';

export default () => {
  return (
    <Switch>

      <Route exact path="/">
        <Layout hasNavigator={true} hasHeader={true}>
          <Home />
        </Layout>
      </Route>

      <Route path="/categories">
        <LogoutAuth>
          <Layout hasNavigator={true} hasHeader={true}>
            <Categories />
          </Layout>
        </LogoutAuth>
      </Route>

      <Route path="/testimonial">
        <LogoutAuth >
          <Layout hasNavigator={true} hasHeader={true}>
            <Testimonials />
          </Layout>
        </LogoutAuth>
      </Route>


      <Route path="/talent">
        <LogoutAuth>
          <Layout hasNavigator={true} hasHeader={true}>
            <Talent />
          </Layout>
        </LogoutAuth>
      </Route>

      <Route path="/aboutus">
        <LogoutAuth>
          <Layout hasNavigator={true} hasHeader={true}>
            <AboutUs />
          </Layout>
        </LogoutAuth>
      </Route>

      <Route path="/team">
        <Layout hasNavigator={false} hasHeader={true}>
          <Team />
        </Layout>
      </Route>

      <Route path="/analytics">
        <Layout hasNavigator={true} hasHeader={true}>
          <Analytics />
        </Layout>
      </Route>

      <Route path="/update-profile">
        <LoginAuth>
          <Layout hasNavigator={false} hasHeader={true}>
            <UpdateProfile />
          </Layout>
        </LoginAuth>
      </Route>

      <Route path="/login">
        <LogoutAuth>
          <Login />
        </LogoutAuth>
      </Route>

      <Route path="/register">
        <LogoutAuth>
          <Register />
        </LogoutAuth>
      </Route>

      <Route path="/pop">
        <Layout hasNavigator={false} hasHeader={false}>
          <NewUserPopup />
        </Layout>
      </Route>

      <Route exact path="/admin">
        <LoginAuth>

          <Layout hasNavigator={false} hasHeader={true}>
            <Admin />
          </Layout>
        </LoginAuth>

      </Route>

      <Route exact path="/admin/talent-details">
        <LoginAuth>

          <Layout hasNavigator={false} hasHeader={true}>
            <AdminTalentProfile />
          </Layout>
        </LoginAuth>

      </Route>

      <Route exact path="/find-talent">
        <LogoutAuth >
          <FindTalent hasHeader={true} />
        </LogoutAuth>
      </Route>

      <Route exact path="/popup-js">
        <LogoutAuth >
            <NewUserPopup />
        </LogoutAuth>
      </Route>

    </Switch>
  );
}