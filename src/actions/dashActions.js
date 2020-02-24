import axios from 'axios'

import {
  LOADING,
  GET_CRYPTO_ADDRESS,
  GET_ERRORS,
  GET_OTP,
  BANK_NAME,
  BANK_NAME_ERROR,
  BANK_NAME_LOADING,
  GET_TRANSACTIONS,
  GET_INVOICES
} from './types'
import { BASE_URL } from '../config/constants'

export const fundWithCard = amount => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/fundWallet/credit_card`, { amount })
    .then(res => {
      console.warn(res)
      window.location = res.data.paymenturl
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() =>
      dispatch({
        type: LOADING,
        payload: false
      })
    )
}

export const fundWithCrypto = crypto => dispatch => {
  console.log(crypto)
  dispatch({
    type: GET_CRYPTO_ADDRESS,
    payload: null
  })

  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/fundWallet/address`, crypto)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: GET_CRYPTO_ADDRESS,
        payload: res.data.message
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() =>
      dispatch({
        type: LOADING,
        payload: false
      })
    )
}

export const transferToBank = (data, save) => (dispatch, store) => {
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/transfer/bank`, data)
    .then(res => {
      console.log(res.data)
      alert(res.data.message)

      dispatch({
        type: LOADING,
        payload: false
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() =>
      dispatch({
        type: LOADING,
        payload: false
      })
    )

  if (save) {
    const datum = {
      number: data.accountNumber,
      name: store().dashboard.bankName,
      code: data.bankCode
    }
    console.log(datum)

    axios
      .post(`${BASE_URL}/users/beneficiary`, datum)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err.response))
  }
}

export const transferToCrypto = data => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/transfer/crypto`, data)
    .then(res => {
      console.log(res.data)
      alert(res.data.message)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })

      dispatch({
        type: GET_OTP,
        payload: false
      })
    })
}

export const transferToWallet = data => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/transfer/wallet`, data)
    .then(res => {
      console.log(res.data)
      alert(res.data.message)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })

      dispatch({
        type: GET_OTP,
        payload: false
      })
    })
}

export const getOTP = () => dispatch => {
  console.log('otp')
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .get(`${BASE_URL}/transfer/token`)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: GET_OTP,
        payload: true
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() =>
      dispatch({
        type: LOADING,
        payload: false
      })
    )
}

export const removeOTP = () => ({
  type: GET_OTP,
  payload: false
})

export const buyAirtime = data => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/utilities/airtime`, data)
    .then(res => {
      alert('Transaction successful')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}

export const buyData = data => dispatch => {
  console.log(data)
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/utilities/data`, data)
    .then(res => {
      console.log(res.data)
      alert(res.data.message)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}

export const payElectricity = data => dispatch => {
  console.log(data)
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/utilities/electricity`, data)
    .then(res => {
      console.log(res.data)
      alert(res.data.message)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}

export const payTV = data => dispatch => {
  console.log(data)
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/utilities/tv`, data)
    .then(res => {
      console.log(res.data)
      alert(res.data.message)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}

export const getBankName = (account_number, settlement_bank) => dispatch => {
  // dispatch => {
  //   console.log('resolve')
  //   dispatch({
  //     type: BANK_NAME_LOADING,
  //     payload: true
  //   })

  //   dispatch({
  //     type: BANK_NAME_ERROR,
  //     payload: false
  //   })
  console.log(settlement_bank)

  axios
    .post(`${BASE_URL}/transfer/resolve`, {
      account_number,
      settlement_bank
    })
    .then(res => {
      console.log(res)
      const {
        data: { data }
      } = res
      dispatch({
        type: BANK_NAME,
        payload: data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: BANK_NAME_ERROR,
        payload: true
      })
    })
    .finally(() =>
      dispatch({
        type: BANK_NAME_LOADING,
        payload: false
      })
    )
}

export const getTransactions = () => (dispatch, store) => {
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .get(`${BASE_URL}/transactions`)
    .then(async res => {
      const { data } = res

      dispatch({
        type: GET_TRANSACTIONS,
        payload: data.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}

export const getInvoices = () => (dispatch, store) => {
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .get(`${BASE_URL}/invoice`)
    .then(async res => {
      const { data } = res
      console.log(data)

      dispatch({
        type: GET_INVOICES,
        payload: data.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}

export const addInvoice = data => dispatch => {
  console.log(data)
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/invoice`, data)
    .then(res => {
      console.log(res.data)
      alert(res.data.message)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data
          : { message: 'Something went wrong. Please try again' }
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}
