import React, { Component } from 'react';

import DashboardLayout from '../../../hoc/DashboardLayout';
import Tabs from '../../common/Tabs';

import Crypto from './Crypto';
import Card from './Card';
import Transfer from './Transfer';
import Ussd from './Ussd';


class index extends Component {
    state = {
        selectedTab: 'crypto'
    }

    componentDidMount() {
        const { match: { params: { tab } } } = this.props
        if (tab) this.setState({ selectedTab: tab })
    }

    componentWillUpdate(prevProps) {
        const { match: { params: { tab } } } = prevProps
        const { selectedTab } = this.state

        if (tab && tab !== selectedTab) this.setState({ selectedTab: tab })
    }

    go = tab => {
        this.props.history.replace(`/fund-wallet/${tab}`)
    }

    render() {
        const { selectedTab } = this.state;
        const tabs = [
            {
                title: 'Via Crypto',
                text: 'crypto',
                onSelectTab: () => this.go('crypto'),
                isSelected: selectedTab === 'crypto',
                headline: 'Choose a cryptocurrency to fund your wallet',
                button: 'test submit'
            },
            {
                title: 'Via Credit/Debit Card',
                text: 'card',
                onSelectTab: () => this.go('card'),
                isSelected: selectedTab === 'card',
                headline: 'Enter an amount to fund your wallet with',
                button: 'Pay with Credit/Debit Card'
            },
            {
                title: 'Via Bank Transfer',
                text: 'transfer',
                onSelectTab: () => this.go('transfer'),
                isSelected: selectedTab === 'transfer',
                headline: 'Transfer to the account below to fund your wallet'
            },
            {
                title: 'Via USSD',
                text: 'ussd',
                onSelectTab: () => this.go('ussd'),
                isSelected: selectedTab === 'ussd',
                headline: 'Fund your wallet via USSD'
            }
        ]

        const renderView = (tab) => {
            if (selectedTab === 'crypto') {
                return <Crypto tab={tab} />
            } else if (selectedTab === 'card') {
                return <Card tab={tab} />
            } else if (selectedTab === 'transfer') {
                return <Transfer tab={tab} />
            } else if (selectedTab === 'ussd') {
                return <Ussd tab={tab} />
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
