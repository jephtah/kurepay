import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div>
                <div className="landing">
                    <div className="landing-inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h1 className="display-6 mb-4 mt-5 ">Kurepay Test Site</h1>
                                    <p className="lead">Please check out the dashboard and login for progress</p>
                                    <hr />
                                    <Link to="/dashboard" className="btn btn-lg btn-dark mr-2 mt-5">Dashboard</Link>
                                    <Link to="/login" className="btn btn-lg btn-light mt-5">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;