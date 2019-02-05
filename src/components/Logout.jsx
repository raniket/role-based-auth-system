import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { userLogout } from '../actions';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    this.props.userLogout();
    // this.props.history.push('/login');
    toast.info("Logging out... ");
    setTimeout(() => {
      this.props.history.push('/login');
    }, 1500);
  }

  render() { 
    return ( 
      <div>
        <h1 style={{width: '200px', height: '200px', margin: '0 auto', marginTop: '20vh'}}>Bye...</h1>
        <ToastContainer />
      </div>
    );
  }
}
 
const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading,
    logedIn: state.logedIn,
    logoutFailed: state.logoutFailed,
  }
}

const mapDispatchToProps = {
  userLogout: userLogout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);