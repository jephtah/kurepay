import React, { useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../actions/authActions'

import { connect } from 'react-redux'

import Logo from '../../assets/kp-logo-full.png'
import './auth.css'

const initialState = {
  email: '',
  password: '',
  errors: {}
}

function reducer (state, { field, value }) {
  return {
    ...state,
    [field]: value
  }
}

const Login = props => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard')
    }
  })

  const onChangeHandler = e => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const onSubmitHandler = e => {
    e.preventDefault()

    const userData = {
      email: state.email,
      password: state.password
    }
    props.loginUser(userData, props.history)
  }
  const { errors } = state

  return (
    <div className='auth-body'>
      <div className='kure-login'>
        <div className='login-box'>
          {props.loading && (
            <div className='preloader'>
              <img src={require('../../assets/loading.gif')} alt='Loading' />
            </div>
          )}
          {/* <Link to="/" className="text-white" style={{ textDecoration: 'none' }}>
                            <i className="material-icons left text-white mb-4">keyboard_backspace</i> Back to
                            home
                        </Link> */}

          <form onSubmit={onSubmitHandler}>
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
                value={state.email}
                onChange={onChangeHandler}
                errors={errors.email}
              />
              <input
                type='password'
                name='password'
                placeholder='enter password'
                value={state.password}
                onChange={onChangeHandler}
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
                {props.error.message}
              </p>
              <button disabled={props.loading} className='main-button'>
                {props.loading ? '...' : 'Login'}
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

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.errors,
  loading: state.loading
})

export default connect(mapStateToProps, { loginUser })(Login)
