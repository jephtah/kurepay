import React, { Component } from 'react';
import { connect } from 'react-redux'
import './beneficiaries.css'
import Popup from '../../common/Popup';
import axios from 'axios';
import { BASE_URL } from "../../../config/constants";
import Button from '../../common/Button';
import Input from '../../common/Input';

import utilities from '../../../config/utility.json'
import { buyAirtime } from '../../../actions/dashActions'

class Airtime extends Component {
  state = {
    // airtime: {
    network: {
      element: 'select',
      value: '',
      label: {
        left: {
          icon: false,
          text: 'Network Provider'
        }
      },
      config: {
        name: 'network',
        options: [
          { val: '', text: 'Choose Network Provider' },
        ]
      }
    },
    number: {
      element: 'input',
      value: '',
      label: {
        left: {
          icon: false,
          text: 'Phone Number'
        }
      },
      config: {
        name: 'number',
        type: 'number',
        placeholder: 'Enter your Phone Number'
      }
    },
    amount: {
      element: 'input',
      value: '',
      label: {
        left: {
          icon: false,
          text: 'Amount'
        }
      },
      config: {
        name: 'amount',
        type: 'number',
        placeholder: 'Enter Credit Amount'
      }
    },
    save: false,
    popup: false,
    // }
  }

  componentDidMount(){
    const { network } = this.state
    const { config } = network
    const { options } = config
    const { Airtime } = utilities
    
    Airtime.forEach(item => {
      options.push({
        val: item.id,
        text: item.name
      })
    })

    config.options = options
    network.config = config
    this.setState({ network })
  }

  submitForm = (event) => {
    event.preventDefault();

    const id = this.state.network.value
    const amount = this.state.amount.value
    const phone = this.state.number.value

    if (id !== '' && amount !== '' && phone !== '') this.props.buyAirtime({ id, amount, phone },this.state.save)
  }

  updateForm = (key, value) => {
    let data = this.state[key]
    data.value = value
    this.setState({
      [key]: data
    })
  }

  getBeneficaries = () => {
    this.setState({ popup: true, loading: true })
    axios
        .get(`${BASE_URL}/users/beneficiary`)
        .then(res => {
          console.log(res)
            let benefiCiaries = []
            res.data.data.forEach(beneficiaries => {
                
                if (beneficiaries.service === "payment_airtime_data") benefiCiaries.push(beneficiaries)
            })
           
            this.setState({ beneficiaries: benefiCiaries })
        })
        .catch(err => {
            console.log(err.response)
        })
        .finally(() => this.setState({ loading: false }))
}
selectBeneficiary = item => {
  //  console.log(item)
    let { number } = this.state
    number.value = item.name 
   
    this.setState({
        number,
        popup: false
    })
}
showPopup = () => {
  this.setState({ show: true });
  // this.setState({ popupStatus: 'status' });
  // this.setState({ popupMessage: 'message' });
}

closePopup = () => {
  this.setState({ show: false });
}


  render() {
    const { network, number, amount,popupStatus,show, popupMessage } = this.state;
    const { tab } = this.props;
    return (
      <div>
<Popup show={show} status={popupStatus} message={popupMessage} closePopup={this.closePopup} />
<form onSubmit={this.submitForm}>
        {
          tab.headline ?
            <div className="tab-headline">
              <p className="title">{tab.headline}</p>
              <p className="sub-title">{tab.tagline}</p>
            </div> : null
        }
        <Input formData={network} change={this.updateForm} />
        <Input formData={number} change={this.updateForm} />
        <p
                        onClick={this.getBeneficaries}
                        style={{
                            textAlign: 'right',
                            margin: 0,
                            marginTop: -10,
                            textTransform: 'uppercase',
                            fontSize: 10,
                            cursor: 'pointer',
                            color: '#418298'
                        }}
                    >Choose from Beneficiaries</p>
        <Input formData={amount} change={this.updateForm} />
        <p style={{ color: 'red' }}>{this.props.error.message}</p>
        <div>
                        <input
                            type="checkbox"
                            value={this.state.save}
                            onChange={(e) => this.setState({ save: !this.state.save })}
                        />
                        &nbsp;&nbsp;Save as beneficiary
                    </div>
        {
          tab.button ?
            <Button type={'submit'} text={tab.button} /> : null
        }
          {this.state.popup && (
                        <div className="overlay">
                            <div className="modal-container">
                                <div style={{ textAlign: 'right', padding: 15 }}>
                                    <span onClick={() => this.setState({ popup: false })} className="close">&times;</span>
                                </div>
                                {this.state.loading ? <div className="loading-container">
                                    <img src={require('../../../assets/loading.gif')} alt="Loading" />
                                </div> : <div className="beneficiaries">
                                    {this.state.beneficiaries.map(item => (
                                        <p onClick={() => this.selectBeneficiary(item)} key={item._id} className="item">
                                          Phone Number -  {item.name} 
                                        </p>
                                    ))}
                                </div>}
                            </div>
                        </div>
                    )}
      </form>
    
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.errors
})

export default connect(mapStateToProps, { buyAirtime })(Airtime);
