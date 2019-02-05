import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import FormValidator from '../utils/FormValidator';
import { userSignup, resetSignedUp } from '../actions';
import './Signup.css';

class Login extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: 'firstName',
        method: 'isEmpty',
        validWhen: false,
        message: 'first name is required.',
      },
      {
        field: 'firstName',
        method: 'isLength',
        args: [{ min: 1, max: 100 }],
        validWhen: true,
        message: 'fist name must be between 1 - 100 charachers',
      },
      {
        field: 'lastName',
        method: 'isLength',
        args: [{ min: 0, max: 100 }],
        validWhen: true,
        message: 'middle name must be between 1 - 100 charachers',
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'email is required.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'you must provide valid email.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'password is required.',
      },
    ]);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user',
      validation: this.validator.valid(),
    }

    this.submited = false;
  }

  handleInputValueChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSighup = (event) => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submited = true;
    if (validation.isValid) {
      // handle actual form submission here
      const { firstName, lastName, email, password, role } = this.state;
      this.props.userSignup({ firstName, lastName, email, password, role });
    }
  }

  render() {
    const { signedUp } = this.props;
    if (signedUp === true) {
      toast.success('Your account is created successfully! 👍');
      setTimeout(() => {
        this.props.history.push('/login');
        this.props.resetSignedUp();
      }, 1500);
    }

    let validation = this.submited ? this.validator.validate(this.state) : this.state.validation;

    return (
      <div>
        <form onSubmit={this.handleSighup} className="text-center border border-light mt-5 p-5  rounded cloudy-knoxville-gradient z-depth-1-half animated fadeInRightBig fast max-width">

          <div className={validation.firstName.isInvalid.toString() && 'has-error'}>
            <input type="text" id="firstName" name="firstName" className="form-control mb-4" onChange={this.handleInputValueChange} placeholder="First name" />
            <span className="help-block deep-orange-text">{validation.firstName.message}</span>
          </div>

          <div className={validation.lastName.isInvalid.toString() && 'has-error'}>
            <input type="text" id="lastName" name="lastName" className="form-control mb-4" onChange={this.handleInputValueChange} placeholder="Last name" />
            <span className="help-block deep-orange-text">{validation.lastName.message}</span>
          </div>

          <div className={validation.email.isInvalid.toString() && 'has-error'}>
            <input type="text" id="email" name="email" className="form-control mb-4" onChange={this.handleInputValueChange} placeholder="email" />
            <span className="help-block deep-orange-text">{validation.email.message}</span>
          </div>

          <div className={validation.password.isInvalid.toString() && 'has-error'}>
            <input type="password" id="password" name="password" onChange={this.handleInputValueChange} className="form-control mb-4" placeholder="password" />
            <span className="help-block deep-orange-text">{validation.password.message}</span>
          </div>

          <div className="row justify-content-md-center ml-2 mr-2 mb-4">
            <div className="col-5 mt-1">
              <label htmlFor="role" className="float-right">Choose a role: </label>
            </div>
            <div className="col-5">
              <select value={this.state.role || 'user'} className="browser-default custom-select" name="role" onChange={this.handleInputValueChange}>
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="both">both</option>
              </select>
              <br />
            </div>
          </div>

          <button className="btn btn-info btn-block " type="submit" >
            {(this.props.loading === true) ? <i className="fas fa-circle-notch fa-spin"></i> : 'SIGNUP'}
          </button>
          <br />
          <p>Already have an account? <NavLink to="/login">Login here</NavLink></p>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading,
    signedUp: state.signedUp
  }
}

const mapDispatchToProps = {
  userSignup: userSignup,
  resetSignedUp: resetSignedUp,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);