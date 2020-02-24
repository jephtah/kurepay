import React from 'react';
import { connect } from 'react-redux'

import DashboardLayout from '../../../hoc/DashboardLayout';
import Table from '../../common/Table'
import { getTransactions } from '../../../actions/dashActions'

import './transactions.css'

class Transactions extends React.Component {
    state = {
        transactions: null,
        filtered: [],
        headers: [],
        data: [],
        filterDate: '',
        minPage: 0,
        maxPage: 0,
        filterType: '',
        filterCategory: '',
    }

    populateHeaders = () => {
        let { filtered } = this.state
        let headers = []

        if (this.props.transactions.length < 1){
            headers = ['', 'transactionId', 'from/to', 'amount', 'status', 'date', 'category']
        } else {
            for (let transaction in filtered[0]){
                headers.push(transaction)
            }
        }

        this.setState({ headers })
    }

    populateData = () => {
        let { filtered } = this.state
        let { maxPage, minPage } = this.state
        let data = []

        for (let row of filtered){
            let transaction = []
            for (let column in row) {
                transaction.push(row[column])
            }
            data.push(transaction)
        }

        if (filtered.length < 20) maxPage = filtered.length
        else maxPage = 20


        this.paginate(minPage)
        this.setState({ maxPage, data })
    }

    formatData = async () => {
        const { transactions } = this.props

        let formatted = []
        formatted = await transactions.map(transaction => {
            const { transactionId, from, to, originalAmount, receivedAmount, receivedCurrency, sentCurrency, status, updatedAt, transactionType } = transaction
            const statuses = ['Pending', 'Confirmed', 'Cancelled']
            const types = ['Wallet To Wallet', 'Wallet To Bank', 'Card To Wallet', 'Wallet To Crypto', 'Crypto To Wallet', 'Naira To Wallet', 'Admin Fiat To Wallet', 'Wallet To Utilies']
            const isSender = from === this.props.user.email
            const amountSent = `${sentCurrency} ${originalAmount}`
            const amountReceived = `${receivedCurrency} ${receivedAmount}`

            const formatted = {
                '': isSender ? 'Debit' : 'Credit',
                transactionId,
                'from/to': isSender ? to : from,
                amount: isSender ? amountSent : amountReceived,
                status: statuses[status - 1],
                date: new Date(updatedAt).toDateString(),
                category: types[transactionType - 1]
            }
            
            return formatted
        })

        console.log(formatted)
        this.setState({ transactions: formatted, filtered: formatted })
    }

    async componentDidMount(){
        await this.props.getTransactions()
        await this.formatData()
        await this.populateHeaders()
        await this.populateData()
    }

    async componentDidUpdate(prevProps){
        if (prevProps.transactions !== this.props.transactions){
            await this.formatData()
            await this.populateHeaders()
            await this.populateData()
        }
    }

    handleInput(key, e) {
        console.log(key)
        this.setState({ [key]: e.target.value })
    }

    go = index => {
        const pageCount = this.props.transactions.length
        let { minPage, maxPage } = this.state

        if (maxPage > 20){
            if (maxPage < pageCount - index) maxPage += index
            else maxPage = pageCount
        }

        if (minPage > 20 && minPage < pageCount - index) minPage += index

        this.setState({ maxPage, minPage })
        this.paginate(minPage)
    }

    paginate = (minPage) => {
        let { data } = this.state

        --minPage
        data.slice(minPage * 20, (minPage + 1) * 20)

        this.setState({ data })
    }

    filterType = filterType => {
        const { transactions } = this.state
        let filtered = []
        if (filterType !== 'all') {
            transactions.forEach(transaction => {
                if (transaction[''] === filterType) filtered.push(transaction)
            })
        } else filtered = transactions

        console.log(filtered)

        this.setState({ filterType, filtered }, this.populateData)
        // this.populateData()
    }

    filterDate = filterDate => {
        const { transactions } = this.state
        let filtered = []

        if (filterDate !== ''){
            transactions.forEach(transaction => {
                if (new Date(transaction.date).toDateString() === new Date(filterDate).toDateString()) filtered.push(transaction)
            })
        } else filtered = transactions

        this.setState({ filterDate, filtered }, this.populateData)
    }

    filterCategory = filterCategory => {
        const { transactions } = this.state
        let filtered = []
        if (filterCategory !== 'All') {
            transactions.forEach(transaction => {
                if (transaction.category === filterCategory) filtered.push(transaction)
            })
        } else filtered = transactions

        console.log(filtered)

        this.setState({ filterCategory, filtered }, this.populateData)
    }

    render(){
        const {
            headers, data, filterDate, minPage, maxPage, filterType, filterCategory
        } = this.state
        const types = ['All', 'Wallet To Wallet', 'Wallet To Bank', 'Card To Wallet', 'Wallet To Crypto', 'Crypto To Wallet', 'Naira To Wallet', 'Admin Fiat To Wallet', 'Wallet To Utilies']

        return (
            <DashboardLayout history={this.props.history}>
                <div className="user_dashboard row">
                    <div className="filter-options">
                        {/* <div> */}
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
                                <div className="date-picker">
                                    <label>Filter By Type</label>
                                    <div>
                                        <select value={filterType} onChange={e => this.filterType(e.target.value)}>
                                            <option value="" disabled>Pick a Type</option>
                                            <option value="all">All</option>
                                            <option value="Debit">Debit</option>
                                            <option value="Credit">Credit</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="date-picker">
                                    <label>Filter By Category</label>
                                    <div>
                                        <select value={filterCategory} onChange={e => this.filterCategory(e.target.value)}>
                                            <option value="" disabled>Pick a Category</option>
                                            {types.map(type => (<option key={type} value={type}>{type}</option>))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        {/* </div> */}
                        <div className="pagi-nation">
                            <div className="prev-next">
                                <div className="arrow-prev" onClick={() => this.go(-20)}><i className="material-icons">keyboard_arrow_left</i></div>
                                <div className="page-count">
                                    <p>{minPage} - {maxPage} of {this.state.filtered.length}</p>
                                </div>
                                <div className="arrow-next" onClick={() => this.go(20)}><i className="material-icons">keyboard_arrow_right</i></div>
                            </div>
                            {/* <div className="count-picker">
                                <p>40 <i className="material-icons">keyboard_arrow_down</i></p>
                                <ul>
                                    <li>20</li>
                                    <li>30</li>
                                    <li>40</li>
                                    <li>50</li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                    <Table headers={headers} data={data} title="Transactions" />
                </div>
            </DashboardLayout>
        );
    }
};

const mapStateToProps = state => ({
    error: state.errors,
    transactions: state.dashboard.transactions,
    user: state.auth.user
})

export default connect(mapStateToProps, { getTransactions })(Transactions);
