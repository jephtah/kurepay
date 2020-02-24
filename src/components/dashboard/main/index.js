import React, { Component } from 'react';
import DashboardLayout from '../../../hoc/DashboardLayout';
import { connect } from 'react-redux'
import Card from '../../common/Card';
import { Link } from 'react-router-dom';
import ItemsCarousel from 'react-items-carousel';

import './main.css'

class Dashboard extends Component {
    state = {
        yellowCard: {
            day: 'Today',
            title: 'Balance',
            figure: '',
            currency: '',
            type: 'yellow'
        },
        greenCard: {
            day: 'Last 7 days',
            title: 'Transactions',
            span: 'View All',
            figure: '19',
            type: 'green'
        },
        activeItemIndex: 0
    }

    componentDidUpdate(prevProps){
        if (this.props.user !== prevProps.user){
            let { yellowCard } = this.state
            yellowCard.figure = this.props.user.balance
            yellowCard.currency = this.props.user.localCurrency

            this.setState({ yellowCard })
        }
    }

    changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

    render() {
        const { yellowCard, greenCard } = this.state;
        return (
            <DashboardLayout history={this.props.history}>
                <div className="main_dashboard">
                    {/* <div className="cards">
                        <Card details={yellowCard} />
                        <Card details={greenCard} />
                    </div> */}

                    <ItemsCarousel
                        // Placeholder configurations
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        minimumPlaceholderTime={1000}
                        placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

                        // Carousel configurations
                        numberOfCards={
                            window.innerWidth < 601
                                ? 1
                                : window.innerWidth < 993
                                    ? 2
                                    : 3
                            }
                        gutter={0}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={false}

                        // Active item configurations
                        requestToChangeActive={this.changeActiveItem}
                        activeItemIndex={this.state.activeItemIndex}
                        activePosition={'center'}

                        chevronWidth={24}
                        rightChevron={<div className="slider-arrow">&rsaquo;</div>}
                        leftChevron={<div className="slider-arrow">&lsaquo;</div>}
                        outsideChevron={false}
                    >
                        <Card details={yellowCard} />
                        <Card details={greenCard} />
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                    </ItemsCarousel>

                    <div className="buttons">
                        <Link to="/fund-wallet/crypto">
                            <button>
                                <i className="material-icons">account_balance_wallet</i>
                                <span>Fund Wallet With Crypto</span>
                            </button>
                        </Link>
                        <Link to="/transfer/bank">
                            <button>
                                <i className="material-icons">swap_horizontal_circle</i>
                                <span>Transfer to Any Bank Account</span>
                            </button>
                        </Link>
                        <Link to="/#!">
                            <button>
                                <i className="material-icons">casino</i>
                                <span>Sports Betting with KurePay</span>
                            </button>
                        </Link>
                    </div>
                    <div className="cards">
                        <div className="card-button">
                            <div className="title">
                                <i className="material-icons">phone_iphone</i>
                                <div>
                                    <Link to="/airtime">
                                        <h5>Buy Airtime/Data</h5>
                                    </Link>
                                    <p>Recharge your Airtime or Subsribe for Data</p>
                                </div>
                            </div>
                            <div className="images">
                                <img src={require('../../../assets/9mobile-logo.png')} alt="" />
                                <img src={require('../../../assets/mtn-logo.png')} alt="" />
                                <img src={require('../../../assets/airtel-logo.jpeg')} alt="" />
                                <img src={require('../../../assets/glo-logo.jpg')} alt=""/>
                            </div>
                        </div>
                        <div className="card-button">
                            <div className="title">
                                <i className="material-icons">language</i>
                                <div>
                                    <Link to="/paybills">
                                        <h5>Pay your Bills and Utilities</h5>
                                    </Link>
                                    <p>Pay for Electricity, Cable TV and more</p>
                                </div>
                            </div>
                            <div className="images">
                                <img src={require('../../../assets/dstv-logo.png')} alt="" />
                                <img src={require('../../../assets/gotv-logo.png')} alt="" />
                                <img src={require('../../../assets/startimes-logo.png')} alt="" />
                                <img src={require('../../../assets/ibedc-logo.png')} alt="" />
                                <img src={require('../../../assets/phed-logo.jpg')} alt="" />
                            </div>
                        </div>
                        <div className="card-button">
                            <div className="title">
                                <i className="material-icons">hotel</i>
                                <div>
                                    <Link to="/#!">
                                        <h5>Hotel and Accomodation</h5>
                                    </Link>
                                    <p>Book hotels, resorts, rent houses, buy lands and more</p>
                                </div>
                            </div>
                            <div className="card-row min">
                                <div className="card-col">
                                    <img src={require('../../../assets/hotel-1.jpg')} alt=""/>
                                    <div className="details">
                                        <h6>Continental Hotel</h6>
                                        <p>Victoria Island</p>
                                        <p>Lagos, Nigeria</p>
                                        <p className="price">FROM NGN 40,000</p>
                                    </div>
                                </div>
                                <div className="card-col">
                                    <img src={require('../../../assets/hotel-2.jpg')} alt="" />
                                    <div className="details">
                                        <h6>4 Bedroom Duplex</h6>
                                        <p>Lekki Phase 1</p>
                                        <p>Lagos, Nigeria</p>
                                        <p className="price">FROM NGN 200,000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-button">
                            <div className="title">
                                <i className="material-icons">language</i>
                                <div>
                                    <Link to="/#!">
                                        <h5>Flights and Transportation</h5>
                                    </Link>
                                    <p>Book your preferred means of Transportation</p>
                                </div>
                            </div>
                            <div className="card-row">
                                <div className="card-col transport">
                                    <div className="icon">
                                        <i className="material-icons">airplanemode_active</i>
                                    </div>
                                    <h6>Flights</h6>
                                </div>
                                <div className="card-col transport">
                                    <div className="icon">
                                        <i className="material-icons">train</i>
                                    </div>
                                    <h6>Trains</h6>
                                </div>
                                <div className="card-col transport">
                                    <div className="icon">
                                        <i className="material-icons">directions_bus</i>
                                    </div>
                                    <h6>Buses</h6>
                                </div>
                                <div className="card-col transport">
                                    <div className="icon">
                                        <i className="material-icons">directions_car</i>
                                    </div>
                                    <h6>Taxis</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

};

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps, {})(Dashboard);
