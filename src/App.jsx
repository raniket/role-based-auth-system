import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from './utils/ErrorBoundary';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Resources from './components/Resources';
import ListUsers from './components/ListUsers';
import UpdateUser from './components/UpdateUser';

import { getResource } from './actions';

class App extends Component {
  componentDidMount() {
    // this.props.getResource();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="container container-custom-css">
            <ErrorBoundary>
              <Switch>
                <Route exact path="/" render={() => (<Redirect to="/login" />)} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/resources" component={Resources} />
                <Route path="/listusers" component={ListUsers} />
                <Route exact path="/updateuser" component={UpdateUser} />
              </Switch>
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = {
  getResource: getResource
};

export default connect(null, mapDispatchToProps)(App);
