import React, { Component } from 'react'
import { connect } from 'react-redux'

import DashboardLayout from '../../../hoc/DashboardLayout'

import Button from '../../common/Button'
import Input from '../../common/Input'

class EditProfile extends Component {
  state = {
    firstName: {
      element: 'input',
      value: this.props.user.firstname,
      label: {
        left: {
          icon: false,
          text: `First Name`
        }
      },
      config: {
        name: 'firstName',
        type: 'text',
        placeholder: 'First Name'
      }
    },
    lastName: {
      element: 'input',
      value: this.props.user.lastname,
      label: {
        left: {
          icon: false,
          text: `Last Name`
        }
      },
      config: {
        name: 'lastName',
        type: 'text',
        placeholder: 'Last Name'
      }
    },
    phone: {
      element: 'input',
      value: this.props.user.phone,
      label: {
        left: {
          icon: false,
          text: 'Phone'
        }
      },
      config: {
        name: 'phone',
        type: 'text',
        placeholder: 'Phone Number'
      }
    },

    webHook: {
      element: 'input',
      value: this.props.user.webhook,
      label: {
        left: {
          icon: false,
          text: `webHook`
        }
      },
      config: {
        name: 'webHook',
        type: 'text',
        placeholder: 'Webhook Url'
      }
    },
    localCurrency: {
      element: 'select',
      value: this.props.user.localCurrency,
      label: {
        left: {
          icon: false,
          text: `Currency`
        }
      },
      config: {
        name: 'localCurrency',
        options: [
          { val: '', text: 'Select Currency' },
          {
            text: 'Nigeria - NGN',
            val: 'NGN'
          },
          {
            text: 'United States - USD',
            val: 'USD'
          },
          {
            text: 'United Kingdom - EUR',
            val: 'EUR'
          },
          {
            text: 'Great Britian - CBP',
            val: 'CBP'
          }
        ]
      }
    }
  }

  submitForm = event => {
    event.preventDefault()
  }

  updateForm = (key, value) => {
    let data = this.state[key]
    data.value = value
    this.setState({
      [key]: data
    })
  }

  render () {
    console.log(this.props.user.phone)
    const { firstName, lastName, phone, localCurrency, webHook } = this.state

    return (
      <DashboardLayout history={this.props.history}>
        <form onSubmit={this.submitForm} style={{ padding: '0 30px' }}>
          <div className='tab-headline'>
            <p className='title'></p>
          </div>
          <Input formData={firstName} change={this.updateForm} />
          <Input formData={lastName} change={this.updateForm} />
          <Input formData={phone} change={this.updateForm} />
          <Input formData={webHook} change={this.updateForm} />
          <Input formData={localCurrency} change={this.updateForm} />
          <p style={{ color: 'red' }}>{this.props.error.message}</p>
          <Button type={'submit'} text={'Submit'} />
        </form>
      </DashboardLayout>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.errors
})

export default connect(mapStateToProps, {})(EditProfile)
