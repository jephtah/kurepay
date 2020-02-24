import React, { Component } from 'react';

import '../../styles/profile.css'

class Profile extends Component {
    render() {
        const {
            balance,
            curr,
            ref,
            name,
            initial,
            // countries,
            // toggleCountryMenu,
            toggleProfileMenu
        } = this.props.details;
        const { showProfileMenu } = this.props;
        // const { showCountry, showProfileMenu } = this.props;

        return (
            <div className="kure-profile">
                <div className="profile-text">
                    <p className="account-bal">{curr && curr.toUpperCase()} {balance && balance.toFixed(2)}</p>
                    <p className="ref-id">Ref ID: {ref}</p>
                    {/* <div className="select-cur">
                        <p onClick={() => toggleCountryMenu()}><span>{curr.toUpperCase()}</span><i className="material-icons">arrow_drop_down</i></p>
                        {
                            showCountry &&
                            <ul>
                                {countries.map((country, i) => <li key={i}> {country.country} ({country.currency_code})</li>)}
                            </ul>
                        }
                    </div> */}
                </div>
                <div className="profile-box">
                    <div onClick={() => toggleProfileMenu()}>
                        <p>{initial.toUpperCase()}</p>
                    </div>
                    {
                        showProfileMenu &&
                        <div className="overlay" onClick={toggleProfileMenu}>
                        <ul>
                            <li>{name}</li>
                            <li onClick={() => this.props.history.push('/edit-profile')}>Edit Profile</li>
                            <li onClick={() => this.props.history.push('/change-password')}>Change Password</li>
                            <li onClick={() => this.props.logout()}>Logout</li>
                        </ul>
                        </div>
                        
                    }

                </div>
            </div>
        )
    }
}

export default Profile;
