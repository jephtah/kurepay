import React from 'react';
import Table from '../../common/Table'

class Referrals extends React.Component {
    state = {
        referrals: null,
        headers: [],
        data: [],
        filterDate: '',
        page: 1,
        pageCount: 34,
    }

    populateHeaders = () => {
        let { referrals } = this.state
        let headers = []

        for (let referral in referrals[0]) {
            headers.push(referral)
        }

        this.setState({ headers })
    }

    populateData = () => {
        let { referrals } = this.state
        let data = []

        for (let row of referrals) {
            let referral = []
            for (let column in row) {
                referral.push(row[column])
            }
            data.push(referral)
        }

        this.setState({ data })
    }

    componentDidMount() {
        const referrals = [
            {
                id: '15623456010',
                referred: 'seungbade@yahoo.com',
                amount: 500.00,
                date: 'Dec 09, 2019'
            },
            {
                id: '15623456010',
                referred: 'seungbade@yahoo.com',
                amount: 500.00,
                date: 'Dec 09, 2019'
            }
        ]

        this.setState({ referrals }, () => {
            this.populateHeaders()
            this.populateData()
        })
    }

    handleInput(key, e) {
        console.log(key)
        this.setState({ [key]: e.target.value })
    }

    go = index => {
        let { page, pageCount } = this.state
        if (index === -1 && page > 1) this.setState({ page: page + index })
        else if (index === 1 && page < pageCount) this.setState({ page: page + index })
    }

    filterDate = filterDate => this.setState({ filterDate })

    render() {
        const {
            headers, data, filterDate, page, pageCount,
        } = this.state

        return (
            <div>
                <div className="filter-options">
                    <div>
                        <div className="date-range">
                            <div className="date-picker">
                                <label>Filter By Date</label>
                                <div>
                                    <input type="date" value={filterDate} onChange={e => this.filterDate(e.target.value)} />
                                    <i className="material-icons">event</i>
                                </div>
                            </div>
                            {/* <div className="date-picker">
                                <label>End Date</label>
                                <div>
                                    <input type="date" value={endDate} onChange={this.handleInput.bind(this, 'endDate')} />
                                    <i className="material-icons">event</i>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="pagi-nation">
                        <div className="prev-next">
                            <div className="arrow-prev" onClick={() => this.go(-1)}><i className="material-icons">keyboard_arrow_left</i></div>
                            <div className="page-count">
                                <p>{page} of {pageCount}</p>
                            </div>
                            <div className="arrow-next" onClick={() => this.go(1)}><i className="material-icons">keyboard_arrow_right</i></div>
                        </div>
                        <div className="count-picker">
                            <p>40 <i className="material-icons">keyboard_arrow_down</i></p>
                            <ul>
                                <li>20</li>
                                <li>30</li>
                                <li>40</li>
                                <li>50</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Table headers={headers} data={data} />
            </div>
        );
    }
}

export default Referrals;
