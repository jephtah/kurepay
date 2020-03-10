import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/home'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Verify from './components/auth/Verify'
import Forgot from './components/auth/Forgot'
import Reset from './components/auth/Reset'

import Dashboard from './components/dashboard/main'
import Airtime from './components/dashboard/airtime'
import FundWallet from './components/dashboard/fund_wallet'
import PayBills from './components/dashboard/pay_bills'
import Referral from './components/dashboard/referral'
import Invoice from './components/dashboard/invoice'
import Transactions from './components/dashboard/transactions'
import Transfer from './components/dashboard/transfer'

import EditProfile from './components/dashboard/profile/Edit'
import ChangePassword from './components/dashboard/profile/ChangePassword'

const Routes = () => {
  return (
    <Switch>
      <Route exact component={FundWallet} path='/fund-wallet' />
      <Route component={FundWallet} path='/fund-wallet/:tab' />
      <Route exact component={PayBills} path='/paybills' />
      <Route component={PayBills} path='/paybills/:tab' />
      <Route exact component={Referral} path='/referral' />
      <Route component={Referral} path='/referral/:tab' />
      <Route exact component={Invoice} path='/invoice' />
      <Route component={Invoice} path='/invoice/:tab' />
      <Route exact component={Transactions} path='/transactions' />
      <Route component={Transactions} path='/transactions/:tab' />
      <Route exact component={Transfer} path='/transfer' />
      <Route component={Transfer} path='/transfer/:tab' />
      <Route exact component={Airtime} path='/airtime' />
      <Route component={Airtime} path='/airtime/:tab' />
      <Route component={Dashboard} path='/dashboard' />
      <Route component={EditProfile} path='/edit-profile' />
      <Route component={ChangePassword} path='/change-password' />
      <Route exact component={Login} path='/login' />
      <Route component={Register} path='/register' />
      <Route component={Verify} path='/verify' />
      <Route component={Forgot} path='/forgot-password' />
      <Route component={Reset} path='/reset/:token' />
    </Switch>
  )
}

export default Routes
