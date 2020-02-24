import React, { Component } from 'react';

import DashboardLayout from '../../../hoc/DashboardLayout';
import Tabs from '../../common/Tabs';

import Links from './Links';
import Referrals from './Referrals';

import '../transactions/transactions.css';

class index extends Component {
    state = {
        selectedTab: 'links'
    }

    componentDidMount() {
        const { match: { params: { tab } } } = this.props;
        if (tab) this.setState({ selectedTab: tab });
    }

    go = tab => this.props.history.replace(`/referral/${tab}`);

    componentDidUpdate() {
        const { match: { params: { tab } } } = this.props;
        const { selectedTab } = this.state;
        if (tab && tab !== selectedTab) this.setState({ selectedTab: tab });
    }

    render() {
        const { selectedTab } = this.state;
        const tabs = [
            {
                title: 'Share Links',
                text: 'links',
                onSelectTab: () => this.go('links'),
                isSelected: selectedTab === 'links',
                headline: 'Get bonus by referring new members'
            },
            {
                title: 'Referral List',
                text: 'referrals',
                onSelectTab: () => this.go('referrals'),
                isSelected: selectedTab === 'referrals'
            }
        ]

        const renderView = (tab) => {
            if (selectedTab === 'links') {
                return <Links tab={tab} />
            } else if (selectedTab === 'referrals') {
                return <Referrals tab={tab} />
            }
        }

        return (
            <DashboardLayout history={this.props.history}>
                <div className="user_dashboard">
                    <div className="left">
                        <Tabs tabs={tabs} />
                    </div>
                    {tabs.map((tab, i) => selectedTab === tab.text && (
                        <div className="right" style={{ width: '100%' }} key={i}>{renderView(tab)}</div>
                    ))}
                </div>
            </DashboardLayout>
        )
    }
};

export default index;
