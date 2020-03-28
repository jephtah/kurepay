import React from 'react';

import '../../styles/button.css';

const Button = (props) => {
    const style = {
        outline: 'none'
    }
    return (
        <button type="button"  {...props} style={style} type="submit">{props.text}</button>
    )
}

export default Button;
