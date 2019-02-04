import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import FormValidator from '../utils/FormValidator';
import { userLogin } from '../actions';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
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
      email: '',
      password: '',
      validation: this.validator.valid(),
    }

    this.submited = false;
  }

  handleInputValueChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handlerLogin = (event) => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submited = true;
    if (validation.isValid) {
      // handle actual form submission here
      const { email, password } = this.state;
      this.props.userLogin({ email, password });
    }
  }

  render() {
    const { logedIn } = this.props;
    if (logedIn === true) {
      toast.success('You are loggedin! 👍');
      // this.props.resetTeacherCreated({ teacherCreated: null });
      setTimeout(() => {
        this.props.history.push('/resources');
      }, 1500);
    }

    let validation = this.submited ? this.validator.validate(this.state) : this.state.validation;

    return (
      <div>
        <form onSubmit={this.handlerLogin} className="text-center border border-light mt-5 p-5  rounded cloudy-knoxville-gradient z-depth-1-half animated fadeInRightBig fast max-width">
          <div className={validation.email.isInvalid.toString() && 'has-error'}>
            <input type="text" id="email" name="email" className="form-control mb-4" onChange={this.handleInputValueChange} placeholder="email" />
            <span className="help-block deep-orange-text">{validation.email.message}</span>
          </div>

          <div className={validation.password.isInvalid.toString() && 'has-error'}>
            <input type="password" id="password" name="password" onChange={this.handleInputValueChange} className="form-control mb-4" placeholder="password" />
            <span className="help-block deep-orange-text">{validation.password.message}</span>
          </div>

          <button className="btn btn-info btn-block " type="submit" >
            {(this.props.loading === true) ? <i className="fas fa-circle-notch fa-spin"></i> : 'LOGIN'}
          </button>
          <br />
          <p>Don't have an account? <NavLink to="/signup">Signup here</NavLink></p>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading,
    logedIn: state.logedIn
  }
}

const mapDispatchToProps = {
  userLogin: userLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);