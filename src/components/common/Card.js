import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../../styles/card.css';

class Card extends Component {

    render() {
        const { day, title, span, figure, currency, type } = this.props.details;
        return (
            <div className={type === 'yellow' ? "card yellow" : "card green"}>
                <div className="content">
                    <p className="day">{day}</p>
                    <p className="title">{title}{span && (<Link to="/transactions">
                        <span style={{ color: "#fff" }}>{span}</span>
                    </Link>)}</p>
                    <h3 className="figure">
                        {currency} {figure}{currency && (<span>.00</span>)}</h3>
                </div>
            </div>
        )
    }
}

export default Card;
