import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { completeReset } from '../../actions/authActions';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Logo from '../../assets/kp-logo-full.png'
import './auth.css';


class Login extends Component {

  state = {
    password: '',
    confirmPassword: '',
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
    this.props.completeReset(this.state.password, this.props.match.params.token, this.props.history);
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
                Reset Password
                             </p>
              <div className="form-inputs">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter New Password"
                  value={this.state.password}
                  onChange={this.onChangeHandler}
                  errors={errors.token}
                  required
                />
              </div>
              {/* <p style={{ color: "#fff", textAlign: 'center' }}>
                Confirm your New Password
                             </p> */}
              <div className="form-inputs">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={this.state.confirmPassword}
                  onChange={this.onChangeHandler}
                  errors={errors.token}
                  required
                />
              </div>
              <div className="form-buttons">
                {this.state.password !== this.state.confirmPassword && <p style={{ color: 'red', textAlign: 'center' }}>Passwords must match</p>}
                <p style={{ color: 'red', textAlign: 'center' }}>{this.props.error.message}</p>
                <button disabled={this.props.loading || this.state.password !== this.state.confirmPassword} type="submit" className="main-button">{this.props.loading ? '...' : 'Reset Password'}</button>
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

export default connect(mapStateToProps, { completeReset })(Login);

