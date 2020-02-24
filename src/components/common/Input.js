import React from 'react';
// import Select from './Select';

import '../../styles/input.css';

const Input = (props) => {
    const { formData, index } = props;

    const showIcon = (show, checked) => {
        return show ?
            (
                checked ?
                    <i className="material-icons">radio_button_checked</i>
                    : <i className="material-icons">radio_button_unchecked</i>
            )
            : null
    }

    const renderLabel = (load) => {
        let labelArray = [];

        for (let option in load) {
            labelArray.push({
                position: option,
                details: load[option]
            })
        }

        return labelArray.map((item, i) => (
            <label key={i}>
                {showIcon(item.details.icon, item.details.checked)}
                {item.details.text}
            </label>
        ))
    }

    const showLockCopy = (icon) => {
        return icon ?
            <i className={icon.color ? 'material-icons green' : 'material-icons gray'} >
                {icon.type === 'copy' ? 'filter_none' : 'lock'}
            </i>
            : null;
    }

    const showSubLabel = (content) => {
        return content ?
            <label className="below-input">
                <i className="material-icons">{content.icon}</i>
                {content.text}
            </label>
            : null;
    }

    const renderTemplate = (data) => {
        let values = data;
        let formTemplate = '';

        switch (values.element) {
            case ('input'):
                formTemplate = (
                    <div className="text-input" style={{ marginBottom: index !== undefined ? 0 : 15 }}>
                        <div className="label-options">
                            {renderLabel(values.label)}
                        </div>
                        <div className={values.icon ? 'text-input-icon' : ''}>
                            <input
                                {...values.config}
                                value={values.value}
                                onChange={
                                    e => props.change(values.config.name, e.target.value, index)
                                }
                            />
                            {showLockCopy(values.icon)}
                            {showSubLabel(values.subLabel)}
                        </div>
                    </div>
                )
                break;
            case ('select'):
                formTemplate = (
                    <div className="text-input" style={{ marginBottom: index !== undefined ? 0 : 15 }}>
                        <div className="label-options">
                            {renderLabel(values.label)}
                        </div>
                        <select
                            value={values.value}
                            onChange={
                                e => props.change(values.config.name, e.target.value, index)
                            }
                        >
                            {values.config.options.map((item, i) =>
                                <option key={i} value={item.val}>
                                    {item.text}
                                </option>
                            )}
                        </select>
                    </div>
                )
                break;
            case ('otp'):
                formTemplate = (
                    <div className="otp-code">
                        <div className="text-input" style={{ marginBottom: index !== undefined ? 0 : 15 }}>
                            <div className="label-options">
                                <label className="white">Enter the OTP sent to your email</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    value={values.value}
                                    onChange={
                                        e => props.change(values.config.name, e.target.value, index)
                                    }
                                />
                            </div>
                        </div>
                    </div >
                )
                break;
            default:
                formTemplate = '';
        }

        return formTemplate;
    }
    return (
        <div className="form-inputs norm">
            {renderTemplate(formData)}
        </div>
    );
}

export default Input;
