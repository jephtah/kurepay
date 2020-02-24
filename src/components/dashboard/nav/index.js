import React, { Component } from 'react';
import DashItem from './DashItem';
// import Calculator from './Calculator'

import { Link } from 'react-router-dom';

import './menu.css';
import Logo from '../../../assets/kp-logo-full.png';

class DashNav extends Component {
    state = {
        wasClicked: 'dashboard'
    }


    render() {
        const { wasClicked } = this.state;
        const menu = [
            {
                icon: 'tv',
                name: 'Dashboard',
                onSelectMenu: () => this.setState({ wasClicked: 'dashboard' }),
                activeMenu: wasClicked === 'dashboard',
                link: '/dashboard'
            },
            {
                icon: 'account_balance_wallet',
                name: 'Fund Wallet',
                dropdown: [
                    { text: 'Via Crypto', link: 'crypto', },
                    { text: 'Via Credit/Debit Card', link: 'card' },
                    { text: 'Via Bank Transfer', link: 'transfer' },
                    { text: 'Via USSD', link: 'ussd' }
                ],
                onSelectMenu: () => this.setState({ wasClicked: 'fund' }),
                activeMenu: wasClicked === 'fund',
                link: '/fund-wallet'
            },
            {
                icon: 'swap_horizontal_circle',
                name: 'Transfer Money',
                dropdown: [
                    { text: 'To Any Bank Account', link: 'bank' },
                    { text: 'To Crypto Account', link: 'crypto' },
                    { text: 'To KurePay Wallet', link: 'wallet' }
                ],
                onSelectMenu: () => this.setState({ wasClicked: 'transfer' }),
                activeMenu: wasClicked === 'transfer',
                link: '/transfer'
            },
            {
                icon: 'power',
                name: 'Pay Bills',
                dropdown: [
                    { text: 'Cable TV', link: 'cable' },
                    { text: 'Electricity', link: 'power' }
                ],
                onSelectMenu: () => this.setState({ wasClicked: 'bills' }),
                activeMenu: wasClicked === 'bills',
                link: '/paybills'
            },
            {
                icon: 'phone_iphone',
                name: 'Buy Airtime/Data',
                dropdown: [
                    { text: 'Airtime', link: 'airtime' },
                    { text: 'Data', link: 'data' }
                ],
                onSelectMenu: () => this.setState({ wasClicked: 'airtime' }),
                activeMenu: wasClicked === 'airtime',
                link: '/airtime'
            },
            {
                icon: 'description',
                name: 'Invoice',
                dropdown: [
                    { text: 'Create Invoice', link: 'invoice' },
                    { text: 'Invoices', link: 'invoices' }
                ],
                onSelectMenu: () => this.setState({ wasClicked: 'invoice' }),
                activeMenu: wasClicked === 'invoice',
                link: '/invoice'
            },
            {
                icon: 'autorenew',
                name: 'Referral',
                dropdown: [
                    { text: 'Share Links', link: 'links' },
                    { text: 'Referral List', link: 'referrals' }
                ],
                onSelectMenu: () => this.setState({ wasClicked: 'referral' }),
                activeMenu: wasClicked === 'referral',
                link: '/referral'
            },
            {
                icon: 'dns',
                name: 'Transactions',
                onSelectMenu: () => this.setState({ wasClicked: 'transact' }),
                activeMenu: wasClicked === 'transact',
                link: '/transactions'

            }
        ]

        return (
            <div className="kure-menu">
                <div className="kure-container">
                    <div className="kure-logo-box">
                        <Link to="/">
                            <img src={Logo} alt="Kure Pay Logo" />
                        </Link>
                    </div>
                    <div className="kure-menu-items">
                        {menu.map((item, i) => (
                            <div key={i} onClick={item.onSelectMenu}>
                                <DashItem item={item} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <Calculator/> */}
            </div>
        );
    }
}

export default DashNav;
