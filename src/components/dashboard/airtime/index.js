import React, { Component } from 'react';

import DashboardLayout from '../../../hoc/DashboardLayout';
import Tabs from '../../common/Tabs';

import Airtime from './Airtime';
import Data from './Data';


class index extends Component {
    state = {
        selectedTab: 'airtime'
    }

    componentDidMount() {
        const { match: { params: { tab } } } = this.props;
        if (tab) this.setState({ selectedTab: tab });
    }

    componentWillUpdate(prevProps) {
        const { match: { params: { tab } } } = prevProps;
        const { selectedTab } = this.state;
        if (tab && tab !== selectedTab) this.setState({ selectedTab: tab });
    }

    go = tab => this.props.history.replace(`/airtime/${tab}`);

    render() {
        const { selectedTab } = this.state;
        const tabs = [
            {
                title: 'Airtime',
                text: 'airtime',
                onSelectTab: () => this.go('airtime'),
                isSelected: selectedTab === 'airtime',
                headline: 'Load airtime on any local network',
                button: 'Buy Airtime'
            },
            {
                title: 'Data',
                text: 'data',
                onSelectTab: () => this.go('data'),
                isSelected: selectedTab === 'data',
                headline: 'Load data on any local network',
                button: 'Buy Data'
            }
        ]

        const renderView = (tab) => {
            if (selectedTab === 'airtime') {
                return <Airtime tab={tab} />
            } else if (selectedTab === 'data') {
                return <Data tab={tab} />
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
