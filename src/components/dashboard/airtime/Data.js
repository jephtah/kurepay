import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../../common/Button';
import Input from '../../common/Input';

import { buyData } from '../../../actions/dashActions'
import utilities from '../../../config/utility.json'

class Data extends Component {

    state = {
        network: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Data Provider'
                }
            },
            config: {
                name: 'network',
                options: [
                    { val: "", text: 'Choose Data Provider' },
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
                placeholder: 'Enter Number'
            }
        },
        plan: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Data Provider'
                }
            },
            config: {
                name: 'plan',
                options: [
                    { val: '', text: 'Choose Data Plan' },
                ]
            }
        },
        bundles: [],
        amount: ''
    }

    componentDidMount(){
        const { Data } = utilities

        const { network } = this.state
        const { config } = network
        const { options } = config

        Data.forEach(item => {
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
        const service_category_id = this.state.network.value
        const amount = this.state.amount
        const phone = this.state.number.value
        const bundleCode = this.state.plan.value

        if (service_category_id !== '' && amount !== '' && phone !== '' && bundleCode !== '') this.props.buyData({ service_category_id, amount, phone, bundleCode })
    }

    updateForm = (key, value) => {
        let data = this.state[key]
        data.value = value
        this.setState({
            [key]: data
        })

        if (key === 'network'){
            const { Data } = utilities
            const { plan } = this.state
            const { config } = plan
            let options = [{ val: '', text: 'Choose Data Plan' }]

            const data = Data.find(item => item.id === value)

            data.bundles.forEach(item => {
                options.push({
                    val: item.bundleCode,
                    text: `${item.name} - N${item.amount}`
                })
            })

            config.options = options
            plan.config = config
            this.setState({ plan, bundles: data.bundles })
        }

        if (key === 'plan'){
            const bundle = this.state.bundles.find(item => item.bundleCode === value)

            this.setState({ amount: bundle.amount })
        }
    }

    render() {
        const { network, number, plan } = this.state;
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
                <Input
                    formData={network}
                    change={this.updateForm}
                />
                <Input
                    formData={plan}
                    change={this.updateForm}
                />
                <Input
                    formData={number}
                    change={this.updateForm}
                />
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

export default connect(mapStateToProps, { buyData })(Data);
