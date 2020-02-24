import React, { Component } from 'react';

import Input from './Input';

class Form extends Component {

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};

        for (let key in this.props.formData) {
            dataToSubmit[key] = this.props.formData[key].value
        }

        console.log(dataToSubmit);
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState
        })
    }

    render() {
        const { formData } = this.props;
        return (
            <form onSubmit={this.submitForm}>
                <Input
                    formData={formData}
                    change={(newState) => this.updateForm(newState)}
                />
                z
            </form>
        )
    }
}

export default Form;