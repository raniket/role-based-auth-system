import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  state = {}
  render() {
    return (
      <div className="blue-gradient animated fadeIn fast header-background">
        <div className="text-white text-center py-2 px-4 inline">
          <div className="py-2">
            {/* <NavLink exact to="/">Dashboard</NavLink> */}
            <h2 className="card-title h2  inline center-custom">Locus</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;