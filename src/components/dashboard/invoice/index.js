import React, { Component } from 'react';

import DashboardLayout from '../../../hoc/DashboardLayout';
import Tabs from '../../common/Tabs';

import Invoice from './Invoice';
import Invoices from './Invoices';

import '../transactions/transactions.css';

class index extends Component {
    state = {
        selectedTab: 'invoice'
    }

    componentDidMount() {
        const { match: { params: { tab } } } = this.props;
        if (tab) this.setState({ selectedTab: tab });
    }

    go = tab => this.props.history.replace(`/invoice/${tab}`);

    componentDidUpdate() {
        const { match: { params: { tab } } } = this.props;
        const { selectedTab } = this.state;
        if (tab && tab !== selectedTab) this.setState({ selectedTab: tab });
    }

    render() {
        const { selectedTab } = this.state;
        const tabs = [
            {
                title: 'Create Invoice',
                text: 'invoice',
                onSelectTab: () => this.go('invoice'),
                isSelected: selectedTab === 'invoice',
                headline: 'Mail your clients an invoice with multiple items',
                button: 'Send Invoice'
            },
            {
                title: 'Invoices',
                text: 'invoices',
                onSelectTab: () => this.go('invoices'),
                isSelected: selectedTab === 'invoices'
            }
        ]

        const renderView = (tab) => {
            if (selectedTab === 'invoice') {
                return <Invoice tab={tab} />
            } else if (selectedTab === 'invoices') {
                return <Invoices tab={tab} />
            }
        }

        return (
            <DashboardLayout history={this.props.history}>
                <div className="user_dashboard">
                    <div className="left">
                        <Tabs tabs={tabs} />
                    </div>
                    {tabs.map((tab, i) => selectedTab === tab.text && (
                        <div className="right" style={{ width: '100%' }} key={i}>{renderView(tab)}</div>))}
                </div>
            </DashboardLayout>
        )
    }
};

export default index;
