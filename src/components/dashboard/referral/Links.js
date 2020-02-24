import React from 'react';
import { connect } from 'react-redux'

const Links = props => {
    const style = {
        marginBottom: '5px',
        lineHeight: '120%'
    }
    return (
        <div>
            {
                props.tab.headline ?
                    <div className="tab-headline">
                        <p className="title">{props.tab.headline}</p>
                        <p className="sub-title">{props.tab.tagline}</p>
                    </div> : null
            }
            <div>
                <p style={style}>Your Referral Link</p>
                <p style={style}><a href={`wallet.kurepay.com/signup/?refId=${props.refId}`}>wallet.kurepay.com/signup/?refId={props.refId}</a></p>
            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    refId: state.auth.user.referralID
})

export default connect(mapStateToProps, {})(Links);
