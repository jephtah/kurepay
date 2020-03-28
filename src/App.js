import React from 'react'
import './App.css'

import Routes from './routes'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { HashRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

if (localStorage.jwtToken) {
  //Set auth token as header
  setAuthToken(localStorage.jwtToken)
  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken)
  //SET USER and is Authenticated
  store.dispatch(setCurrentUser(decoded, localStorage.jwtToken))

  //Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser())

    //TODO: Clear user profile too

    //Redirect to login
    window.location.href = '/login'
  }
}
// else {
//   window.location.href = '/login';
// }

// const composeEnhancers =
//   process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

function App () {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    </div>
  )
}

export default App
