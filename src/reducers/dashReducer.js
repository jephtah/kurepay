import { GET_CRYPTO_ADDRESS, GET_OTP, BANK_NAME, BANK_NAME_LOADING, BANK_NAME_ERROR, GET_TRANSACTIONS, GET_INVOICES,GET_REFERRALS,GET_DATA_AVAILABLE,GET_BUNDLE_NETWORK, GET_ELECTRICTY,GET_TV_SUBS,GET_BUNDLLE,GET_TRANS_STATUS} from '../actions/types'

const initialState = {
  cryptoAddress: null,
  otp: false,
  bankName: '',
  bankLoading: false,
  bankError: false,
  transactions: [],
  invoices: [],
  referals:[]
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
      case GET_REFERRALS:
      return {
        ...state,
        referals: action.payload
      }
      case GET_DATA_AVAILABLE:
      return {
        ...state,
        data_available: action.payload
      }
      case GET_BUNDLE_NETWORK:
        return {
          ...state,
          data_bundle: action.payload
        }
        case GET_ELECTRICTY:
        return {
          ...state,
          electricty: action.payload
        }
        case GET_TV_SUBS:
        return {
          ...state,
          tv: action.payload
        }
        case GET_BUNDLLE:
          return {
            ...state,
            bundle: action.payload
          }
          case GET_TRANS_STATUS:
          return {
            ...state,
            trans_stats: action.payload
          }
    default:
      return state
  }
}
