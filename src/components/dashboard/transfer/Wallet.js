import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import Popup from '../../common/Popup';
import './beneficiaries.css'
import { BASE_URL } from "../../../config/constants";
import Button from '../../common/Button';
import Input from '../../common/Input';
import { getOTP, transferToWallet, removeOTP } from '../../../actions/dashActions'

class Wallet extends Component {

    state = {
        email: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: true,
                    checked: true,
                    text: 'Email Address of Recipient'
                },
                
            },
            config: {
                name: 'email',
                type: 'email',
                placeholder: 'Email Address'
            },
        },
        amount: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: `Amount '(${this.props.user.localCurrency}')`
                }
            },
            config: {
                name: 'amount',
                type: 'number',
                placeholder: 'Enter Amount to Transfer'
            }
        },
        otp: {
            element: 'otp',
            value: '',
            config: {
                name: 'otp'
            }
        },

        show: false,
        popupStatus: 'info',
        popupMessage: 'Token sent to your email. Please check!',
        popup: false,
        loading: false,
        loadingError: false,
        save: false,
        beneficiaries: []
    }
    showPopup = () => {
        this.setState({ show: true });
        // this.setState({ popupStatus: 'status' });
        // this.setState({ popupMessage: 'message' });
    }

    closePopup = () => {
        this.setState({ show: false });
    }

    submitForm = (event) => {
        event.preventDefault();
        if (this.props.otp) {
            const { otp, amount, email  } = this.state
            this.props.transferToWallet({
                token: otp.value,
                amount: amount.value,
                email: email.value
            },this.state.save)
        } else this.props.getOTP()
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
                console.log(res.data)
                this.setState({ beneficiaries: res.data.data })
            })
            .catch(err => {
                console.log(err.response)
            })
            .finally(() => this.setState({ loading: false }))
    }

    componentDidMount(){
        this.props.removeOTP()
    }

    selectBeneficiary = item => {
      //  console.log(item)
        let { email } = this.state
        email.value = item.name 
       
        this.setState({
            email,
            popup: false
        })
    }

    render() {
        const { email, amount, otp , show, popupStatus, popupMessage} = this.state;
        const { tab } = this.props;
        return (
            <div>
                 {/* <p onClick={this.showPopup}>show the popup</p> */}
                 <Popup show={show} status={popupStatus} message={popupMessage} closePopup={this.closePopup} />
                   <form onSubmit={this.submitForm}>
                {
                    tab.headline ?
                        <div className="tab-headline">
                            <p className="title">{tab.headline}</p>
                            <p className="sub-title">{tab.tagline}</p>
                        </div> : null
                }
                <Input formData={email} change={this.updateForm} />
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
                {this.props.otp && <Input formData={otp} change={this.updateForm} />}
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
                        this.props.otp ? <Button disabled={this.props.loading} type={'submit'} text={'Transfer'} /> : <Button disabled={this.props.loading} type={'submit'} text={'Generate OTP'} /> : null
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
                                            {item.name} - {item.number}
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
    otp: state.dashboard.otp,
    error: state.errors,
    user: state.auth.user
})

export default connect(mapStateToProps, {
    getOTP,
    transferToWallet,
    removeOTP
})(Wallet);
