import React, { Component } from 'react';

import DashboardLayout from '../../../hoc/DashboardLayout';
import Tabs from '../../common/Tabs';

import Cable from './Cable';
import Electricity from './Electricity';


class index extends Component {
    state = {
        selectedTab: 'cable'
    }

    componentDidMount() {
        const { match: { params: { tab } } } = this.props;
        if (tab) this.setState({ selectedTab: tab });
    }

    componentWillUpdate(prevProps) {
        const { match: { params: { tab } } } = prevProps;
        if (tab && tab !== this.state.selectedTab) this.setState({ selectedTab: tab })
    }

    go = tab => this.props.history.replace(`/paybills/${tab}`)

    render() {
        const { selectedTab } = this.state;
        const tabs = [
            {
                title: 'Cable TV',
                text: 'cable',
                onSelectTab: () => this.go('cable'),
                isSelected: selectedTab === 'cable',
                headline: 'Subscribe to your favourite Cable TV',
                button: 'Pay Bill'
            },
            {
                title: 'Electricity',
                text: 'power',
                onSelectTab: () => this.go('power'),
                isSelected: selectedTab === 'power',
                headline: 'Pay for Electricity to your Provider',
                button: 'Pay Bill'
            }
        ]

        const renderView = (tab) => {
            if (selectedTab === 'cable') {
                return <Cable tab={tab} />
            } else if (selectedTab === 'power') {
                return <Electricity tab={tab} />
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
