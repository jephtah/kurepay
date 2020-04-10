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
  GET_INVOICES,
  GET_REFERRALS,
  GET_BUNDLE_NETWORK,
  GET_DATA_AVAILABLE,
  GET_ELECTRICTY,
  GET_TV_SUBS,
  GET_BUNDLLE,
  GET_TRANS_STATUS


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
      localStorage.setItem('rand',res.data.result.transId)
     // console.log(res.data.result.transId)
      window.location = res.data.result.paymenturl
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
      code: data.bankCode,
      service: "payment_bank",

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

export const transferToWallet = (data, save) => dispatch => {
  console.log(data)
  console.log(save)
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
    if(save){
        const datum = {
        name: data.email,
        service: "payment_wallet",
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

export const buyAirtime = (data,save) => dispatch => {
  console.log(save)
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

    if(save){
      const datum = {
      number:data.phone,
      name:data.phone,
      service: "payment_airtime_data",
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

export const buyData = (data,save) => dispatch => {
  console.log(save)
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

    if(save){
      const datum = {
      number:data.phone,
      name:data.phone,
      service: "payment_airtime_data",
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

export const payElectricity = (data,save) => dispatch => {
  console.log(save,data.meter)
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
          : { message: 'Something went wrong. Please try again'}
      })
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })

    if(save){
      const datum = {
      number:data.meter,
      name:data.meter,
      service: "payment_electricity",
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

export const payTV = (data,save) => dispatch => {
  console.log(data,save)
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
    if(save){
      const datum = {
      number:data.smartcard,
      name:data.tvType,
      service: "payment_tv",
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
  console.log("kk")
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


export const getReferals = () => (dispatch, store) => {
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .get(`${BASE_URL}/users/referrals`)
    .then(async res => {
      const { data } = res
      console.log(data)

      dispatch({
        type: GET_REFERRALS,
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
          ? err.response.data.message
          : { message: 'Something went wrong. Please try again' }
      })
     // console.log(err)
    //  {
    //    console.log(err.response.data)
    //  }
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}


export const getServices = () => (dispatch, store) => {
 
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .get(`${BASE_URL}/utilities/service`)
    .then(res => {
      const { data } = res
      const myArray = data.data
      const newArray = myArray.filter(element => element.name ==='Data'||element.name ==='data');
      console.log(newArray);
      axios.get(`${BASE_URL}/utilities/service/`+newArray[0].id)
      .then(res2=>{  
        console.log(res2.data.data.service_categories)
        dispatch({
          type: GET_DATA_AVAILABLE,
          payload: res2.data.data.service_categories
        })
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



export const getDataBundle = (id) => (dispatch, store) => {
 
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/utilities/serviceproduct/`+id)
    .then(res => {
      console.log(res)
      dispatch({
        type: GET_BUNDLE_NETWORK,
        payload: 'll'
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


export const getElectricity = () => (dispatch, store) => {
 
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .get(`${BASE_URL}/utilities/service`)
    .then(res => {
      const { data } = res
      const myArray = data.data
      const newArray = myArray.filter(element => element.name =='Electricity Bills'||element.name =='electricity bills');
      console.log(newArray);
      axios.get(`${BASE_URL}/utilities/service/`+newArray[0].id)
      .then(res2=>{  
        console.log(res2.data.data.service_categories)
        dispatch({
          type: GET_ELECTRICTY,
          payload: res2.data.data.service_categories
        })
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


export const getTv = () => (dispatch, store) => {
 
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .get(`${BASE_URL}/utilities/service`)
    .then(res => {
      const { data } = res
      const myArray = data.data
      const newArray = myArray.filter(element => element.name =='TV Subscription'||element.name =='TV subscription');
      console.log(newArray);
      axios.get(`${BASE_URL}/utilities/service/`+newArray[0].id)
      .then(res2=>{  
        console.log(res2.data.data.service_categories)
        dispatch({
          type: GET_TV_SUBS,
          payload: res2.data.data.service_categories
        })
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

export const ConfirmSmartCard = (no,id) => dispatch => {
  const data = ({
    "account":no,
    "serviceId":id
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
    .post(`${BASE_URL}/utilities/verify`, data)
    .then(res => {
      console.log(res)
      if(res.data.status=='error'){
        alert(res.data.message)
      }
      if(res.data.status=='success'){
        //we get the bouques
        axios.post(`${BASE_URL}/utilities/serviceproduct/`+id,data)
        .then(res2=>{
          dispatch({
            type: GET_BUNDLLE,
            payload: res2.data.body.data.productCategories
          })
         
        })
      }
     
      
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
          ? err.response.data.message
          : { message: 'Something went wrong. Please try again' }
      })
     // console.log(err)
    //  {
    //    console.log(err.response.data)
    //  }
    )
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false
      })
    })
}

export const confirmTrans = (data) => (dispatch, store) => {
  dispatch({
    type: LOADING,
    payload: true
  })

  dispatch({
    type: GET_ERRORS,
    payload: {}
  })

  axios
    .post(`${BASE_URL}/fundWallet/card_response`,data)
    .then(async res => {
      const { data } = res
      console.log(data)

      dispatch({
        type: GET_TRANS_STATUS,
        payload: data
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










