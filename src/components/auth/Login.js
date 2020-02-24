import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../actions/authActions'

// import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Logo from '../../assets/kp-logo-full.png'
import './auth.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitHandler = e => {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history)
  }

  render () {
    const { errors } = this.state
    return (
      <div className='auth-body'>
        <div className='kure-login'>
          <div className='login-box'>
            {this.props.loading && (
              <div className='preloader'>
                <img src={require('../../assets/loading.gif')} alt='Loading' />
              </div>
            )}
            {/* <Link to="/" className="text-white" style={{ textDecoration: 'none' }}>
                            <i className="material-icons left text-white mb-4">keyboard_backspace</i> Back to
                            home
                        </Link> */}

            <form onSubmit={this.onSubmitHandler}>
              <div className='logo'>
                <Link to='/'>
                  <img src={Logo} alt='Kure Pay Logo' />
                </Link>
              </div>
              <div className='form-inputs'>
                <input
                  type='email'
                  name='email'
                  placeholder='enter email'
                  value={this.state.email}
                  onChange={this.onChangeHandler}
                  errors={errors.email}
                />
                <input
                  type='password'
                  name='password'
                  placeholder='enter password'
                  value={this.state.password}
                  onChange={this.onChangeHandler}
                  errors={errors.email}
                />
              </div>
              <div className='sub-controls'>
                <p>
                  <i className='material-icons'>check_box_outline_blank</i>
                  Remember me
                </p>
                <Link to='/forgot-password'>
                  <p style={{ color: '#fff8' }}>Forgot Password?</p>
                </Link>
              </div>
              <div className='form-buttons'>
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {this.props.error.message}
                </p>
                <button disabled={this.props.loading} className='main-button'>
                  {this.props.loading ? '...' : 'Login'}
                </button>
                <Link to='/register' style={{ textDecoration: 'none' }}>
                  <button className='sub-button'>
                    Don't have an account? Sign up here
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.errors,
  loading: state.loading
})

export default connect(mapStateToProps, { loginUser })(Login)
