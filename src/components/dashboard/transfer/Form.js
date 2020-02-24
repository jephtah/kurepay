import React, { Component } from 'react';

import Input from '../../common/Input';
import Button from '../../common/Button';

class Form extends Component {
    state = {
        formData: {
            number: {
                element: 'input',
                value: '',
                label: {
                    left: {
                        icon: true,
                        checked: true,
                        text: 'Default input label here'
                    },
                    right: {
                        icon: true,
                        checked: false,
                        text: 'Choose from beneficiaries'
                    }
                },
                config: {
                    name: 'name_input',
                    type: 'number',
                    placeholder: 'Enter your phone number'
                }
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
        }

        console.log(dataToSubmit);
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState
        })
    }

    render() {
        const { formData } = this.state;
        return (
            <form onSubmit={this.submitForm}>

                <Input
                    formData={formData}
                    change={(newState) => this.updateForm(newState)}
                />

                <Button type="submit" text="Transfer Money" />
            </form>
        )
    }
}

export default Form;