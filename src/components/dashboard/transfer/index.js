import React, { Component } from 'react';

import DashboardLayout from '../../../hoc/DashboardLayout';
import Tabs from '../../common/Tabs';

import Bank from './Bank';
import Crypto from './Crypto';
import Wallet from './Wallet';


class index extends Component {
    state = {
        selectedTab: 'bank'
    }

    componentDidMount() {
        const { match: { params: { tab } } } = this.props;
        if (tab) this.setState({ selectedTab: tab });
    }

    componentWillUpdate(prevProps) {
        const { match: { params: { tab } } } = prevProps;
        if (tab && tab !== this.state.selectedTab) this.setState({ selectedTab: tab })
    }

    go = tab => this.props.history.replace(`/transfer/${tab}`)

    render() {
        const { selectedTab } = this.state;
        const tabs = [
            {
                title: 'To Any Bank Account',
                text: 'bank',
                onSelectTab: () => this.go('bank'),
                isSelected: selectedTab === 'bank',
                headline: 'Transfer money to any bank account',
                button: 'Generate OTP Code',
                tagline: 'Supported in Nigeria only for now'
            },
            {
                title: 'To Crypto Account',
                text: 'crypto',
                onSelectTab: () => this.go('crypto'),
                isSelected: selectedTab === 'crypto',
                headline: 'Transfer money to a crypto currency account',
                button: 'Transfer Money'
            },
            {
                title: 'To Kurepay Wallet',
                text: 'wallet',
                onSelectTab: () => this.go('wallet'),
                isSelected: selectedTab === 'wallet',
                headline: 'Transfer money to another KurePay wallet',
                button: 'Transfer Money'
            }
        ]

        const renderView = (tab) => {
            if (selectedTab === 'bank') {
                return <Bank tab={tab} />
            } else if (selectedTab === 'crypto') {
                return <Crypto tab={tab} />
            } else if (selectedTab === 'wallet') {
                return <Wallet tab={tab} />
            }
        }

        return (
            <DashboardLayout history={this.props.history}>
                <div className="user_dashboard">
                    <div className="left">
                        <Tabs tabs={tabs} />
                    </div>
                    {tabs.map((tab, i) => selectedTab === tab.text && (
                        <div className="right" key={i}>{renderView(tab)}</div>))}
                </div>
            </DashboardLayout>
        )
    }
};

export default index;
