import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '../../common/Button';
import Input from '../../common/Input';
import { getElectricity } from '../../../actions/dashActions'
import { payElectricity } from '../../../actions/dashActions'
import utilities from '../../../config/utility.json'
import Popup from '../../common/Popup';
import './beneficiaries.css'
import { BASE_URL } from "../../../config/constants";
import axios from 'axios'
class Electricity extends Component {
    state = {
        meterType: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Meter Type'
                }
            },
            config: {
                name: 'meterType',
                options: [
                    { val: '', text: 'Choose Meter Type' },
                    { val: 'prepaid', text: 'Prepaid' },
                    { val: 'postpaid', text: 'Postpaid' },
                ]
            }
        },
        provider: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Electricty Provider'
                }
            },
            config: {
                name: 'provider',
                options: [
                    { val: '', text: 'Choose Provider' },
                ]
            }
        },
        meterNumber: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Meter Number'
                }
            },
            config: {
                name: 'meterNumber',
                type: 'number',
                placeholder: 'Enter Meter Number'
            }
        },
        amount: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: `Amount '(${this.props.user.localCurrency})'`
                }
            },
            config: {
                name: 'amount',
                type: 'number',
                placeholder: 'Enter Amount'
            }
        },
        phone: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: `Phone Number`
                }
            },
            config: {
                name: 'phone',
                type: 'number',
                placeholder: 'Enter Phone Number'
            }
        },
        save: false,
        popup: false,
    }

    async componentDidMount(){
        this.props.getElectricity()
    }

    

    submitForm = (event) => {
        console.log(this.state.provider)
        event.preventDefault();
        
        const phone = this.state.phone.value
        const amount = this.state.amount.value
        const service_category_id = this.state.provider.value
        const meter = this.state.meterNumber.value
        
        if (phone !== '' && amount >= 600 && service_category_id !== '' && meter !== '') this.props.payElectricity({
            phone, amount, service_category_id, meter
        },this.state.save)
    }

    updateForm = (key, value) => {
        console.log(key,value)
        console.log(this.state)
        let data = this.state[key]
        data.value = value
        this.setState({
            [key]: data
        })

        if (key === 'meterType'){
            console.log(this.props)
            const { provider } = this.state
            const { config } = provider
            const { options } = config
            console.log(options)
            if(options.length==1){
            this.props.electricty.forEach(item => {
                options.push({
                    val: item._id,
                    text: item.name
                })
            })
            }
            config.options = options
            provider.config = config
            this.setState({ provider })
        }
    }

    getBeneficaries = () => {
        this.setState({ popup: true, loading: true })
        axios
            .get(`${BASE_URL}/users/beneficiary`)
            .then(res => {
              console.log(res)
                let benefiCiaries = []
                res.data.data.forEach(beneficiaries => {
                    
                    if (beneficiaries.service === "payment_electricity") benefiCiaries.push(beneficiaries)
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
        let { meterNumber } = this.state
        meterNumber.value = item.name 
       
        this.setState({
            meterNumber,
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
        const { provider, meterNumber, amount, phone, meterType,popupStatus,show, popupMessage } = this.state;
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
                <Input formData={meterType} change={this.updateForm} />
                <Input formData={provider} change={this.updateForm} />
                <Input formData={meterNumber} change={this.updateForm} />
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
                <p
                        style={{
                            textAlign: 'right',
                            margin: 0,
                            marginTop: -10,
                            textTransform: 'uppercase',
                            fontSize: 10,
                            cursor: 'pointer',
                            color: 'red'
                        }}
                    >minimum amount is 600</p>
                <Input formData={phone} change={this.updateForm} />
                <div>
                        <input
                            type="checkbox"
                            value={this.state.save}
                            onChange={(e) => this.setState({ save: !this.state.save })}
                        />
                        &nbsp;&nbsp;Save as beneficiary
                    </div>
                <p style={{ color: 'red' }}>{this.props.error.message}</p>
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
                                          Meter Number -  {item.name} 
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

    formatData = async () => {
      
        const { network } = this.state
        const { config } = network
        const { options } = config

        this.props.data_types.forEach(item => {
            options.push({
                val: item._id,
                text: item.name
            })
        })

        console.log(this.state)

        config.options = options
        network.config = config
        this.setState({ network })
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    user: state.auth.user,
    electricty:state.dashboard.electricty
})

export default connect(mapStateToProps, { payElectricity,getElectricity })(Electricity);
