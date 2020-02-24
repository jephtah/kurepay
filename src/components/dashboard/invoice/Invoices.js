import React from 'react';
import { connect } from 'react-redux'

import Table from '../../common/Table'
import { getInvoices } from '../../../actions/dashActions'

class Invoices extends React.Component {
    state = {
        invoices: null,
        filtered: [],
        headers: [],
        data: [],
        filterDueDate: '',
        filterCreatedDate: '',
        minPage: 0,
        maxPage: 0,
    }

    populateHeaders = () => {
        let { filtered } = this.state
        let headers = []

        if (this.props.invoices.length < 1){
            headers = ['invoice id', 'receiver email', 'due Date', 'created date']
        } else {
            for (let invoice in filtered[0]) {
                headers.push(invoice)
            }
        }

        this.setState({ headers })
    }

    populateData = () => {
        let { filtered } = this.state
        let { maxPage, minPage } = this.state
        let data = []

        for (let row of filtered) {
            let invoice = []
            for (let column in row) {
                invoice.push(row[column])
            }
            data.push(invoice)
        }

        if (filtered.length < 20) maxPage = filtered.length
        else maxPage = 20


        this.paginate(minPage)
        this.setState({ maxPage, data })
    }

    formatData = async () => {
        const { invoices } = this.props
        console.log(invoices)

        const formatted = await invoices.map(invoice => {
            const formatted = {
                'invoice id': invoice.invoiceId,
                'receiver email': invoice.receiver_mail,
                'due date': new Date(invoice.due_date).toDateString(),
                'created date': new Date(invoice.createdAt).toDateString(),
            }

            return formatted;
        })

        console.log(formatted)
        this.setState({ invoices: formatted, filtered: formatted })
    }

    async componentDidMount() {
        this.props.getInvoices()
        await this.formatData()
        await this.populateHeaders()
        await this.populateData()
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.invoices !== this.props.invoices) {
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
        const pageCount = this.props.invoices.length
        let { minPage, maxPage } = this.state

        if (maxPage > 20) {
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

    filterDueDate = filterDueDate => {
        const { invoices } = this.state
        let filtered = []

        if (filterDueDate !== '') {
            invoices.forEach(invoice => {
                if (new Date(invoice.dueDate).toDateString() === new Date(filterDueDate).toDateString()) filtered.push(invoice)
            })
        } else filtered = invoices

        this.setState({ filterDueDate, filtered }, this.populateData)
    }

    filterCreatedDate = filterCreatedDate => {
        const { invoices } = this.state
        let filtered = []

        if (filterCreatedDate !== '') {
            invoices.forEach(invoice => {
                if (new Date(invoice.createdAt).toDateString() === new Date(filterCreatedDate).toDateString()) filtered.push(invoice)
            })
        } else filtered = invoices

        this.setState({ filterCreatedDate, filtered }, this.populateData)
    }

    render() {
        const {
            headers, data, filterDueDate, minPage, maxPage, filterCreatedDate
        } = this.state

        return (
            <div>
                <div className="filter-options">
                    <div>
                        <div className="date-range">
                            <div className="date-picker">
                                <label>Filter By Due Date</label>
                                <div>
                                    <input type="date" value={filterDueDate} onChange={e => this.filterDueDate(e.target.value)} />
                                    <i className="material-icons">event</i>
                                </div>
                            </div>
                            <div className="date-picker">
                                <label>Filter By Date Created</label>
                                <div>
                                    <input type="date" value={filterCreatedDate} onChange={e => this.filterCreatedDate(e.target.value)} />
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
                <Table headers={headers} data={data} title="Invoices" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    invoices: state.dashboard.invoices
})

export default connect(mapStateToProps, { getInvoices })(Invoices);
