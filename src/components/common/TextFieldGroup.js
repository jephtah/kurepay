import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({
        name,
        placeholder,
        value,
        label,
        info, 
        type,
        onChange,
        disabled,
        errors
    }) => {
    return (
        <Fragment>
            <input 
            type={type}
            className={classnames({'is-invalid':errors})}
            placeholder={placeholder} 
            label={label}
            name={name} 
            value={value}
            onChange = {onChange}
            disabled = {disabled}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {errors && (<div className='invalid-feedback'>{errors}</div>)}
        </Fragment>
    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    errors: PropTypes.string,
    info: PropTypes.string,
    type: PropTypes.string.isRequired,
    disabled:PropTypes.string,
}

TextFieldGroup.defaultProps =  {
    type: 'text'
}
export default TextFieldGroup;