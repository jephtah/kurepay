import React, { Component } from 'react'
import { connect } from 'react-redux'

import Profile from '../common/Profile'
import './styles.css'
import { logoutUser } from '../../actions/authActions'

class Topbar extends Component {
  state = {
    showCountry: false,
    showProfileMenu: false,
    pageTitle: ''
  }

  componentDidMount () {
    // let pageTitle = window.location.pathname.split('/')[1]
    // const title = pageTitle
    //   .split('-')
    //   .map(item => {
    //     return item[0].toUpperCase() + item.slice(1)
    //   })
    //   .join(' ')
    // this.setState({ pageTitle: title })
  }

  render () {
    const { showCountry, showProfileMenu, pageTitle } = this.state
    const { user } = this.props

    const { firstname, lastname, localCurrency, referralID, balance } = user

    const details = {
      balance: balance,
      curr: localCurrency,
      ref: referralID,
      name: `${firstname} ${lastname}`,
      initial: firstname[0] + lastname[0],

      countries: [
        {
          country: 'Nigeria',
          currency_code: 'NGN'
        },
        {
          country: 'United States',
          currency_code: 'USD'
        },
        {
          country: 'United Kingdom',
          currency_code: 'EUR'
        },
        {
          country: 'Great Britian',
          currency_code: 'CBP'
        },
        {
          country: 'United States',
          currency_code: 'USD'
        },
        {
          country: 'United Kingdom',
          currency_code: 'EUR'
        },
        {
          country: 'Great Britian',
          currency_code: 'CBP'
        }
      ],
      toggleCountryMenu: () =>
        this.setState({ showCountry: !this.state.showCountry }),
      toggleProfileMenu: () =>
        this.setState({ showProfileMenu: !this.state.showProfileMenu })
    }
    return (
      <div className='topbar'>
        <div className='first'>
          <h1>{pageTitle === 'Airtime' ? 'Airtime/Data' : pageTitle}</h1>
        </div>
        <div className='second'>
          <Profile
            details={details}
            showCountry={showCountry}
            logout={this.props.logoutUser}
            showProfileMenu={showProfileMenu}
            history={this.props.history}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { logoutUser })(Topbar)
