import React, { Component } from 'react';
import { connect } from 'react-redux'

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
                right: {
                    icon: true,
                    checked: false,
                    text: 'Choose from Beneficiaries'
                }
            },
            config: {
                name: 'email',
                type: 'email',
                placeholder: 'Email Address'
            },
            subLabel: {
                icon: 'add_circle',
                text: 'Save Beneficiary'
            }
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
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        if (this.props.otp) {
            const { otp, amount, email  } = this.state
            this.props.transferToWallet({
                token: otp.value,
                amount: amount.value,
                email: email.value
            })
        } else this.props.getOTP()
    }

    updateForm = (key, value) => {
        let data = this.state[key]
        data.value = value
        this.setState({
            [key]: data
        })
    }

    componentDidMount(){
        this.props.removeOTP()
    }

    render() {
        const { email, amount, otp } = this.state;
        const { tab } = this.props;
        return (
            <form onSubmit={this.submitForm}>
                {
                    tab.headline ?
                        <div className="tab-headline">
                            <p className="title">{tab.headline}</p>
                            <p className="sub-title">{tab.tagline}</p>
                        </div> : null
                }
                <Input formData={email} change={this.updateForm} />
                <Input formData={amount} change={this.updateForm} />
                {this.props.otp && <Input formData={otp} change={this.updateForm} />}
                <p style={{ color: 'red' }}>{this.props.error.message}</p>
                {
                    tab.button ?
                        this.props.otp ? <Button disabled={this.props.loading} type={'submit'} text={'Transfer'} /> : <Button disabled={this.props.loading} type={'submit'} text={'Generate OTP'} /> : null
                }
            </form>
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
