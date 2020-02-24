import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../../common/Button';
import Input from '../../common/Input';
import Popup from '../../common/Popup';
import { transferToBank, getOTP, getBankName, removeOTP } from '../../../actions/dashActions'

import axios from 'axios';
import './beneficiaries.css'

import banks from '../../../config/banks.json'
import { BASE_URL } from "../../../config/constants";

class Bank extends Component {

    state = {
        accountNumber: {
            element: 'input',
            value: '',
            label: {
                left: {
                    text: 'Account Number'
                },
            },
            config: {
                name: 'accountNumber',
                type: 'number',
                placeholder: 'Enter Account Number'
            }
        },
        bank: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Local Bank'
                }
            },
            config: {
                name: 'bank',
                options: [
                    { val: '', text: 'Choose Bank' },
                ]
            }
        },
        amount: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: `Amount ${'(NGN)'}`
                }
            },
            config: {
                name: 'amount',
                type: 'number',
                placeholder: 'Enter Amount to Transfer'
            }
        },
        accountName: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: `Account Name`
                }
            },
            config: {
                name: 'accountName',
                type: 'text',
                placeholder: 'Account Name',
                disabled: true
            },
            icon: {
                type: 'lock',
                color: false
            }
        },
        amountCharged: {
            element: 'input',
            value: 0,
            label: {
                left: {
                    icon: false,
                    text: `Amount you will be charged ${'(NGN)'}`
                }
            },
            config: {
                name: 'amountCharged',
                type: 'number',
                placeholder: '0',
                disabled: true
            },
            icon: {
                type: 'lock',
                color: false
            }
        },
        otp: {
            element: 'otp',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: `Enter the OTP sent to your email`
                }
            },
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

    componentDidMount() {
        this.props.removeOTP()

        let { bank } = this.state
        let { config } = bank
        let { options } = config
        banks.forEach(bank => {
            let newBank = { val: bank.bankCode, text: bank.bankName }
            options.push(newBank)
        })

        config.options = options
        bank.config = config
        this.setState({ bank })
    }

    submitForm = async (event) => {
        event.preventDefault();

        if (this.props.otp) {
            const { amount, bank, accountNumber, otp } = this.state
            this.props.transferToBank({
                amount: amount.value,
                bankCode: bank.value,
                accountNumber: accountNumber.value,
                token: otp.value
            }, this.state.save)
        } else {
            this.props.getOTP()
            // await this.setState({ show: true })
        }
    }

    updateForm = async (key, value) => {
        let data = this.state[key]
        data.value = value
        this.setState({
            [key]: data
        })

        let { accountNumber, bank } = this.state
        if (key === 'accountNumber' && accountNumber.value.length === 10) {
            if (bank.value !== '') {
                await this.props.getBankName(accountNumber.value, bank.value)
                // this.setState({ loading: true })
            }
        }

        if (key === 'amount') {
            let { amountCharged } = this.state
            //assuming the rate is 10%
            let fee = parseInt(value) * 0.015

            if (fee > 2500) {
                fee = 2500
            }

            amountCharged.value = fee

            this.setState({
                amountCharged
            })
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.bankName !== prevProps.bankName){
            let { accountName } = this.state
            accountName.value = this.props.bankName
            this.setState({ accountName })
        }

        if (this.props.otp && this.props.otp !== prevProps.otp){
            this.setState({ show: true })
        }
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

    selectBeneficiary = item => {
        let { accountNumber, accountName, bank } = this.state
        accountName.value = item.name
        accountNumber.value = item.number
        bank.value = item.code

        this.setState({
            accountName,
            accountNumber,
            bank,
            popup: false
        })
    }

    render() {
        const { accountNumber, bank, amount, amountCharged, otp, accountName, show,
            popupStatus, popupMessage } = this.state;
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
                    <Input formData={amount} change={this.updateForm} />
                    <Input formData={bank} change={this.updateForm} />
                    <Input formData={accountNumber} change={this.updateForm} />
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
                    {this.props.bankLoading && <p style={{ margin: 0, fontSize: 14 }}>Retrieving Bank Account Name, Please wait...</p>}
                    {(!this.props.bankLoading && this.props.bankError) && <p style={{ margin: 0, fontSize: 14, color: 'red' }}>Error fetching Bank Account Name</p>}
                    <Input formData={accountName} change={this.updateForm} />
                    <Input formData={amountCharged} change={this.updateForm} />
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
                            this.props.otp ? <Button disabled={this.props.loading} type={'submit'} text={'Transfer'} /> : <Button disabled={this.props.loading} type={'submit'} text={this.props.otp ? 'Complete Transaction' : 'Transfer'} /> : null
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
    error: state.errors,
    otp: state.dashboard.otp,
    bankName: state.dashboard.bankName,
    bankLoading: state.dashboard.bankLoading,
    bankError: state.dashboard.bankError,
})

export default connect(mapStateToProps, {
    transferToBank,
    getOTP,
    getBankName,
    removeOTP
})(Bank);
