import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../common/Button'
import Input from '../../common/Input'

import { fundWithCard } from '../../../actions/dashActions'

class Card extends Component {
  state = {
    amount: {
      element: 'input',
      value: '',
      label: {
        left: {
          icon: false,
          text: 'Enter Amount'
        }
      },
      config: {
        name: 'amount',
        type: 'number',
        placeholder: 'e.g. 125,000'
      }
    },
    transactionFee: {
      element: 'input',
      value: 0,
      label: {
        left: {
          icon: false,
          text: 'Transaction Fees'
        }
      },
      config: {
        name: 'transactionFee',
        type: 'number',
        placeholder: '0',
        disabled: true
      },
      icon: {
        type: 'lock',
        color: false
      }
    },
    amountReceived: {
      element: 'input',
      value: 0,
      label: {
        left: {
          icon: false,
          text: 'Amount to receive in wallet'
        }
      },
      config: {
        name: 'amountReceived',
        type: 'number',
        placeholder: '0',
        disabled: true
      },
      icon: {
        type: 'lock',
        color: false
      }
    }
  }

  submitForm = e => {
    e.preventDefault()
    this.props.fundWithCard(parseInt(this.state.amount.value) || 0)
  }

  updateForm = (key, value) => {
    let data = this.state[key]
    data.value = value
    this.setState({
      [key]: data
    })

    if (key === 'amount') {
      let { transactionFee, amountReceived } = this.state
      //assuming the rate is 10%
      let fee = parseInt(value) * 0.015
      let amount = parseInt(value) * 0.985

      if (fee > 2500) {
        fee = 2500
        amount = value - 2500
      }

      transactionFee.value = fee
      amountReceived.value = amount

      this.setState({
        transactionFee,
        amountReceived
      })
    }
  }

  render () {
    const { amount, transactionFee, amountReceived } = this.state
    const { tab } = this.props
    return (
      <form onSubmit={this.submitForm}>
        {tab.headline ? (
          <div className='tab-headline'>
            <p className='title'>{tab.headline}</p>
            <p className='sub-title'>{tab.tagline}</p>
          </div>
        ) : null}
        <Input formData={amount} change={this.updateForm} />
        <Input formData={transactionFee} change={this.updateForm} />
        <Input formData={amountReceived} change={this.updateForm} />
        {this.props.error.message && (
          <p style={{ color: 'red' }}>{this.props.error.message}</p>
        )}
        {tab.button ? (
          <Button
            disabled={this.state.amount.value === '' || this.props.loading}
            type={'submit'}
            text={tab.button}
          />
        ) : null}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.errors
})

export default connect(mapStateToProps, { fundWithCard })(Card)
