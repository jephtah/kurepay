import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../../common/Button';
import Input from '../../common/Input';

import utilities from '../../../config/utility.json'
import { payTV } from '../../../actions/dashActions'

class Cable extends Component {
    state = {
        packageType: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Cable TV Package'
                }
            },
            config: {
                name: 'packageType',
                options: [
                    { val: '', text: 'Choose Package' },
                ]
            }
        },
        cardNumber: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: true,
                    checked: true,
                    text: 'Smartcard Number'
                },
                right: {
                    icon: true,
                    checked: false,
                    text: 'Choose from Beneficiaries'
                }
            },
            config: {
                name: 'cardNumber',
                type: 'number',
                placeholder: 'Enter Smart Card Number'
            },
            subLabel: {
                icon: 'add_circle',
                text: 'Save as Beneficiary'
            }
        },
        phone: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Phone Number'
                },
            },
            config: {
                name: 'phone',
                type: 'number',
                placeholder: 'Enter Phone Number'
            }
        },
        bouquet: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Bouquet'
                }
            },
            config: {
                name: 'bouquet',
                options: [
                    { val: '', text: 'Choose Bouquet' },
                ]
            }
        },
        bouquets: [],
        selectedBouquet: null
    }

    componentDidMount(){
        const { TV } = utilities
        const { packageType } = this.state
        const { config } = packageType
        const { options } = config

        TV.forEach(item => {
            options.push({
                val: item.id,
                text: item.name
            })
        })

        config.options = options
        packageType.config = config
        this.setState({ packageType })
    }

    submitForm = (event) => {
        event.preventDefault();
        
        if (this.state.selectedBouquet){
            const Id = this.state.packageType.value,
                smartcard = this.state.cardNumber.value,
                amount = this.state.selectedBouquet.amount,
                phone = this.state.phone.value,
                name = this.state.selectedBouquet.name,
                bundleCode = this.state.selectedBouquet.bundleCode

            if (Id !== '' && smartcard !== '' && phone !== '') this.props.payTV({ Id, smartcard, amount, phone, name, bundleCode })
        }
    }

    updateForm = (key, value) => {
        let data = this.state[key]
        data.value = value
        this.setState({
            [key]: data
        })

        if (key === 'packageType'){
            const { TV } = utilities
            const { bouquet } = this.state
            const { config } = bouquet
            let options = [{ val: '', text: 'Choose a Bouquet' }]

            const data = TV.find(item => item.id === value)

            data.bundles.forEach(item => {
                options.push({
                    val: item.bundleCode,
                    text: item.name
                })
            })

            config.options = options
            bouquet.config = config
            this.setState({ bouquet, bouquets: data.bundles })
        }

        if (key === 'bouquet'){
            const { bouquets } = this.state
            this.setState({
                selectedBouquet: bouquets.find(item => item.bundleCode === value)
            })
        }
    }

    render() {
        const { packageType, cardNumber, bouquet, phone } = this.state;
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
                <Input formData={packageType} change={this.updateForm} />
                <Input formData={cardNumber} change={this.updateForm} />
                <Input formData={phone} change={this.updateForm} />
                <Input formData={bouquet} change={this.updateForm} />
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
    error: state.errors
})

export default connect(mapStateToProps, { payTV })(Cable);
