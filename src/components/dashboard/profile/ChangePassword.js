import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardLayout from '../../../hoc/DashboardLayout';
import { changePassword } from '../../../actions/authActions'

import Button from '../../common/Button'
import Input from '../../common/Input'

class ChangePassword extends Component {
  state = {
    oldPassword: {
      element: 'input',
      value: '',
      label: {
        left: {
          icon: false,
          text: `Old Password`
        }
      },
      config: {
        name: 'oldPassword',
        type: 'password',
        placeholder: 'Old Password'
      }
    },
    newPassword: {
      element: 'input',
      value: '',
      label: {
        left: {
          icon: false,
          text: `New Password`
        }
      },
      config: {
        name: 'newPassword',
        type: 'password',
        placeholder: 'New Password'
      }
    },
    confirmPassword: {
      element: 'input',
      value: '',
      label: {
        left: {
          icon: false,
          text: `Confirm New Password`
        }
      },
      config: {
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Confirm New Password'
      }
    },
  }

  submitForm = (event) => {
    event.preventDefault();

    const { newPassword, oldPassword, confirmPassword } = this.state
    if (newPassword.value !== '' && oldPassword.value !== '' && newPassword.value === confirmPassword.value){
      this.props.changePassword({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
      })
    }
  }

  updateForm = (key, value) => {
    let data = this.state[key]
    data.value = value
    this.setState({
      [key]: data
    })
  }

  render(){
    const { oldPassword, newPassword, confirmPassword } = this.state

    return (
      <DashboardLayout history={this.props.history}>
        <form onSubmit={this.submitForm} style={{ padding: '0 30px' }}>
          <div className="tab-headline">
            <p className="title"></p>
          </div>
          <Input formData={oldPassword} change={this.updateForm} />
          <Input formData={newPassword} change={this.updateForm} />
          <Input formData={confirmPassword} change={this.updateForm} />
          {newPassword.value !== confirmPassword.value && <p style={{ color: 'red' }}>Passwords don't match</p>}
          <p style={{ color: 'red' }}>{this.props.error.message}</p>
          <Button type={'submit'} text={"Submit"} />
        </form>
      </DashboardLayout>
    )
  }
}

const mapStateToProps = state => ({
  error: state.errors
})

export default connect(mapStateToProps, { changePassword })(ChangePassword)
