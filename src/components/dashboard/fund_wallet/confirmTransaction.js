import React, { Component } from 'react'
import { connect } from 'react-redux'
import {confirmTrans} from '../../../actions/dashActions'
import axios from 'axios'
import { fundWithCard } from '../../../actions/dashActions'
import { BASE_URL } from "../../../config/constants";

class Cfirm extends Component {
  status
    async componentDidMount(){
      //this.status = "Please wait while we confirm your transaction"
       const details= ({
        transId:localStorage.getItem('rand')
       })
       
    axios
    .post(`${BASE_URL}/fundWallet/card_response`,details)
    .then(res => { 
        this.status =  res.data.status
        console.log(res.data.status)
    })
    
    

      this.props.confirmTrans(details)
       
    }

    

  render () {
    if(this.status == null){
        return  <button>
       
        <span>Please wait while confirm your transaction</span>
    </button>
    }
    if(this.status==false){
        return  <button>
        
        <span>Transaction Failed</span>
    </button>
    }
    if(this.status==true){
        return  <button>
       
        <span>Succesfull</span>
    </button>
    }
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.errors,
  status:state.dashboard.trans_stats
})

export default connect(mapStateToProps, {confirmTrans })(Cfirm)
