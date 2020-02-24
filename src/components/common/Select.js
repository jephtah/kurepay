import React, { Component } from 'react';

class Select extends Component {
    state = {
        value: '',
        placeholder: 'Enter placeholder text here',
        showDropdown: false
    }

    openDropdown = () => {
        this.setState({
            showDropdown: !this.state.showDropdown
        })
    }

    onClickHandler = () => {
        this.setState({
            value: ''
        });
    }

    render() {
        const { value, placeholder, showDropdown } = this.state;
        const selectOptions = [
            'Access Bank',
            'Diamond Bank',
            'First Bank of Nigeria',
            'Guaranty Trust Bank',
            'United Bank of Africa',
            'Zenitth Bank'
        ];
        return (
            <div className="form-inputs" >
                <div className="select-input">
                    <div onClick={this.openDropdown}>
                        <input type="select" value={value} placeholder={placeholder} disabled aria-disabled="true" />
                        <i className="material-icons">keyboard_arrow_down</i>
                    </div>
                    {
                        showDropdown &&
                        <ul>
                            {selectOptions.map((option, i) => <li key={i} onClick={this.onClickHandler}>{option}</li>)}
                        </ul>
                    }

                </div>
            </div>
        );
    }

}

export default Select;
