import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reset } from '../../actions/authActions';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Logo from '../../assets/kp-logo-full.png'
import './auth.css';


class Login extends Component {

  state = {
    email: '',
    errors: {}
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    };

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitHandler = e => {
    e.preventDefault()
    this.props.reset(this.state.email, this.props.history);
  }

  render() {
    const { errors } = this.state
    return (
      <div className="auth-body">
        {this.props.loading && <div className="preloader">
          <img src={require('../../assets/loading.gif')} alt="Loading" />
        </div>}
        <div className="kure-login">
          <div className="login-box">
            {/* <Link to="/" className="text-white" style={{ textDecoration: 'none' }}>
                            <i className="material-icons left text-white mb-4">keyboard_backspace</i> Back to
                            home
                        </Link> */}
            <form onSubmit={this.onSubmitHandler}>
              <div className="logo">
                <Link to="/">
                  <img src={Logo} alt="Kure Pay Logo" />
                </Link>
              </div>
              <p style={{ color: "#fff", textAlign: 'center' }}>
                Enter your email
                             </p>
              <div className="form-inputs">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChangeHandler}
                  errors={errors.token}
                  required
                />
              </div>
              <div className="form-buttons">
                <p style={{ color: 'red', textAlign: 'center' }}>{this.props.error.message}</p>
                <button disabled={this.props.loading} type="submit" className="main-button">{this.props.loading ? '...' : 'Reset Password'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Login.propTypes = {
//     loginUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// }


const mapStateToProps = state => ({
  auth: state.auth,
  error: state.errors,
  loading: state.loading
})

export default connect(mapStateToProps, { reset })(Login);

