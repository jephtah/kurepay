import React, { Component } from 'react';
import { connect } from 'react-redux'

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
    }
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

    if (id !== '' && amount !== '' && phone !== '') this.props.buyAirtime({ id, amount, phone })
  }

  updateForm = (key, value) => {
    let data = this.state[key]
    data.value = value
    this.setState({
      [key]: data
    })
  }

  render() {
    const { network, number, amount } = this.state;
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
        <Input formData={network} change={this.updateForm} />
        <Input formData={number} change={this.updateForm} />
        <Input formData={amount} change={this.updateForm} />
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
  loading: state.loading,
  error: state.errors
})

export default connect(mapStateToProps, { buyAirtime })(Airtime);
