import React from 'react';

const Ussd = ({ tab }) => {
    const style = {
        textTransform: 'uppercase',
        color: '#006577',
        fontSize: '14px',
        fontWeight: '600'
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
            <div>
                <p style={style}>Coming Soon..</p>
            </div>
        </div>

    )
}

export default Ussd;