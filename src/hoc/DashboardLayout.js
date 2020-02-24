import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import TopBar from '../components/dashboard/Topbar';
import DashNav from '../components/dashboard/nav';
import { fetchUser } from '../actions/authActions'

class DashboardLayout extends Component {
    // const [loading, setLoading] = useState()
    state = {
        showMenu: true
    }

    fetchUserData = async () => {
        await this.props.fetchUser(this.props.history)
    }

    componentDidMount() {
        this.fetchUserData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) this.fetchUserData()
    }



    render() {
        const { props } = this;
        const { showMenu } = this.state;
        const toggleMenu = () => {
            this.setState({ showMenu: !this.state.showMenu });
        }

        return (
            props.isAuthenticated ? <div className="dashboard_container">
                <div className={showMenu ? 'dashboard_left_nav' : 'dashboard_left_nav mobile-menu'}>
                    {/* <div className="dashboard_left_nav mobile-menu"> */}
                    <DashNav />
                </div>
                <div className="mobile" onClick={toggleMenu}>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div className="dashboard_right">
                    <TopBar history={this.props.history} />
                    {props.children}
                </div>
                {props.loading && <div className="preloader">
                    <img src={require('../assets/loading.gif')} alt="Loading" />
                </div>}
            </div> : <Redirect to="/login" />
        );
    }
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.loading
})

export default connect(mapStateToProps, {
    fetchUser
})(DashboardLayout);
