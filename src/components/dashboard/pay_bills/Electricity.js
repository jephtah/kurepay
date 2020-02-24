import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../../common/Button';
import Input from '../../common/Input';

import { payElectricity } from '../../../actions/dashActions'
import utilities from '../../../config/utility.json'

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
                    text: 'Cable Provider'
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
        }
    }

    // componentDidMount() {
    //     const { provider } = this.state
    //     const { config } = provider
    //     const { options } = config
    //     const { Electricity } = utilities

    //     Electricity.forEach(item => {
    //         options.push({
    //             val: item.id,
    //             text: item.name
    //         })
    //     })

    //     config.options = options
    //     provider.config = config
    //     this.setState({ provider })
    // }

    submitForm = (event) => {
        event.preventDefault();
        
        const phone = this.state.phone.value
        const amount = this.state.amount.value
        const service_category_id = this.state.provider.value
        const meter = this.state.meterNumber.value

        if (phone !== '' && amount !== '' && service_category_id !== '' && meter !== '') this.props.payElectricity({
            phone, amount, service_category_id, meter
        })
    }

    updateForm = (key, value) => {
        let data = this.state[key]
        data.value = value
        this.setState({
            [key]: data
        })

        if (key === 'meterType'){
            const { provider } = this.state
            const { config } = provider
            const { options } = config
            const { ElectricityPrepaid, ElectricityPostpaid } = utilities
            const Electricity = value === 'prepaid' ? ElectricityPrepaid : ElectricityPostpaid

            Electricity.forEach(item => {
                options.push({
                    val: item.id,
                    text: item.name
                })
            })

            config.options = options
            provider.config = config
            this.setState({ provider })
        }
    }

    render() {
        const { provider, meterNumber, amount, phone, meterType } = this.state;
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
                <Input formData={meterType} change={this.updateForm} />
                <Input formData={provider} change={this.updateForm} />
                <Input formData={meterNumber} change={this.updateForm} />
                <Input formData={amount} change={this.updateForm} />
                <Input formData={phone} change={this.updateForm} />
                <p style={{ color: 'red' }}>{this.props.error.message}</p>
                {
                    tab.button ?
                        <Button type={'submit'} text={tab.button} /> : null
                }
            </form>
        )
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    user: state.auth.user
})

export default connect(mapStateToProps, { payElectricity })(Electricity);
