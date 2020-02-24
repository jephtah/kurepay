import { GET_CRYPTO_ADDRESS, GET_OTP, BANK_NAME, BANK_NAME_LOADING, BANK_NAME_ERROR, GET_TRANSACTIONS, GET_INVOICES } from '../actions/types'

const initialState = {
  cryptoAddress: null,
  otp: false,
  bankName: '',
  bankLoading: false,
  bankError: false,
  transactions: [],
  invoices: []
}

export default function(state = initialState, action) {
  switch(action.type){
    case GET_CRYPTO_ADDRESS:
      return {
        ...state,
        cryptoAddress: action.payload
      }
    case GET_OTP: 
      return {
        ...state,
        otp: action.payload
      }
    case BANK_NAME:
      return {
        ...state,
        bankName: action.payload
      }
    case BANK_NAME_ERROR:
      return {
        ...state,
        bankError: action.payload
      }
    case BANK_NAME_LOADING:
      return {
        ...state,
        bankLoading: action.payload
      }
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      }
    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload
      }
    default:
      return state
  }
}
