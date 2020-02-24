import React from 'react';

const Transfer = ({ tab }) => {
    const style = {
        marginBottom: '5px',
        lineHeight: '120%'
    }
    return (
        <div>
            {
                tab.headline ?
                    <div className="tab-headline">
                        <p className="title">{tab.headline}</p>
                        <p className="sub-title">{tab.tagline}</p>
                    </div> : null
            }
            <div className="account-details">
                <h5>Account Details</h5>
                {/* <i className="material-icons">filter_none</i> */}
                <p style={style}>0069606129</p>
                <p style={style}>Baywise Technology Ltd.</p>
                <p style={style}>Sterling Bank</p>
            </div>
        </div>

    )
}

export default Transfer;
