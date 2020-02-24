import React from 'react';

import '../../styles/popup.css';

const Popup = ({ show, status, message, closePopup }) => {
    const showPopup = show ? 'popup display-block' : 'popup display-none';
    // console.log(showPopup);
    // console.log(status);
    return (
        <div className={showPopup} onClick={closePopup}>
            <div className="content-area">
                <div className="icons">
                    {
                        status === 'success' &&
                        <i className="material-icons success">check_circle</i>
                    }
                    {
                        status === 'failure' &&
                        <i className="material-icons failure">cancel</i>
                    }
                    {
                        status === 'info' &&
                        <i className="material-icons info">info</i>
                    }
                </div>
                <p className="display-text">{message}</p>
                <div className="popup-button">
                    <button onClick={closePopup}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Popup;
