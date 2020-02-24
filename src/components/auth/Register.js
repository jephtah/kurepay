import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Logo from '../../assets/kp-logo-full.png'
import './auth.css';


class Register extends Component {

    state = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        errors: {}
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()


        const newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            confirmpassword: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history)
    }

    render() {
        const { errors, password, password2 } = this.state
        const regExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,/])(?=.{8,})')
        const disabled = password !== password2
            || !password.match(regExp)
        // ^ (?=.* [a - z])(?=.* [A - Z])(?=.* [0 - 9])(?=.* [!@#\$ %\^&\*]) (?=.{ 8,})

        return (
            <div className="auth-body">
                <div className="kure-login">
                    <div className="login-box signup-box">
                        {this.props.loading && <div className="preloader">
                            <img src={require('../../assets/loading.gif')} alt="Loading" />
                        </div>}
                        {/* <Link to="/" className="btn-flat waves-effect text-white" style={{ textDecoration: 'none' }}>
                            <i className="material-icons left mb-4 text-white">keyboard_backspace</i> Back to
                        home
                        </Link> */}
                        <form onSubmit={this.onSubmit}>
                            <div className="logo">
                                <Link to="/">
                                    <img src={Logo} alt="Kure Pay Logo" />
                                </Link>
                            </div>
                            {/* <div className="choose-form">
                                <p><i className="material-icons">check_box</i>Individual</p>
                                <p className="in-active"><i className="material-icons">check_box_outline_blank</i>Business</p>
                            </div> */}
                            <div className="form-inputs">
                                <input
                                    name="firstname"
                                    value={this.state.firstname}
                                    placeholder="first name"
                                    onChange={this.onChange}
                                    errors={errors.firstname}
                                    required
                                />
                                <input
                                    name="lastname"
                                    value={this.state.lastname}
                                    placeholder="last name"
                                    onChange={this.onChange}
                                    errors={errors.lastname}
                                    required
                                />
                                <input
                                    name="email"
                                    value={this.state.email}
                                    placeholder="email"
                                    onChange={this.onChange}
                                    errors={errors.email}
                                    required
                                />
                                <input
                                    name="phone"
                                    value={this.state.phone}
                                    placeholder="phone"
                                    onChange={this.onChange}
                                    errors={errors.phone}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    placeholder="password"
                                    onChange={this.onChange}
                                    errors={errors.email}
                                    required
                                />
                                {!password.match(regExp) && <p style={{ color: '#fff', textAlign: 'center' }}>
                                    Your password should contain at least 1 special character, one number and one uppercase letter, and must have more than eight characters
                                </p>}
                                <input
                                    type="password"
                                    name="password2"
                                    value={this.state.password2}
                                    placeholder="confirm password"
                                    onChange={this.onChange}
                                    errors={errors.password2}
                                    required
                                />
                                {password !== password2 && <p style={{ color: 'red', textAlign: 'center' }}>Passwords must match</p>}
                                {/* <p style={{ color: '#fff', textAlign: 'center' }}>Your password should contain at least 1 special character, one number and one uppercase letter, and must have more than eight characters</p> */}
                            </div>
                            <div className="form-buttons">
                                <p style={{ color: 'red', textAlign: 'center' }}>{this.props.error.message}</p>
                                <button disabled={disabled || this.props.loading} className="main-button">
                                    {this.props.loading ? '...' : 'Signup'}
                                </button>
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <button className="sub-button">Already have an account? Login here</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        error: state.errors,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
