import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentPath } from '../../actions';
import './Header.css';

class Header extends Component {
  state = {}

  render() {

    const { currentPath, user, logedIn } = this.props;

    const navLinks = (logedIn === true) ? (
      <ul className="navbar-nav ml-auto">
        <li className={`${(currentPath === '/firstTab') ? 'nav-item active' : 'nav-item'}`}>
          <span className="nav-link">
            <Link to="/resources"><span style={{ color: 'white ' }}>Resources</span></Link>
            <span className="sr-only">(current)</span>
          </span>
        </li>
        <li className={`${(currentPath === '/secondTab') ? 'nav-item active' : 'nav-item'}`}>
          <span className="nav-link">
            <Link to="/listusers"><span style={{ color: 'white ' }}>Users</span></Link>
            <span className="sr-only">(current)</span>
          </span>
        </li>
        <li className={`${(currentPath === '/thirdTab') ? 'nav-item active' : 'nav-item'}`}>
          <span className="nav-link">
            <Link to="/logout"><span style={{ color: 'white ' }}>Logout</span></Link>
            <span className="sr-only">(current)</span>
          </span>
        </li>
      </ul>
    ) : (
        <ul className="navbar-nav ml-auto">
          <li className={`${(currentPath === '/firstTab') ? 'nav-item active' : 'nav-item'}`}>
            <span className="nav-link">
              <Link to="/signup"><span style={{ color: 'white ' }}>Signup</span></Link>
              <span className="sr-only">(current)</span>
            </span>
          </li>
          <li className={`${(currentPath === '/secondTab') ? 'nav-item active' : 'nav-item'}`}>
            <span className="nav-link">
              <Link to="/login"><span style={{ color: 'white ' }}>Login</span></Link>
              <span className="sr-only">(current)</span>
            </span>
          </li>
        </ul>
      );

    return (

      <nav className="blue-gradient animated fadeIn fast header-background mb-1 navbar navbar-expand-lg navbar-dark info-color">
        <span className="navbar-brand">Locus</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
          aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
          {navLinks}
        </div>
      </nav>

    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    currentPath: state.currentPath,
    user: state.user,
    logedIn: state.logedIn,
  }
}

const mapDispatchToProps = {
  updateCurrentPath: updateCurrentPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
