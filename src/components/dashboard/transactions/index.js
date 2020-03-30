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
        data2:[],
        filterDate: '',
        minPage: 0,
        maxPage: 0,
        filterType: '',
        filterCategory: '',
        minPage: 0,
        maxPage: 0,
        page: 1,
        page_2:0,
        pageCount:0,
        currentpage:0,
        total_no_data:2,
    }

    populateHeaders = () => {
        let { filtered } = this.state
        let headers = []

        if (this.props.transactions.length < 1){
            headers = ['', 'transaction Id', 'from/to', 'amount', 'status', 'date', 'category']
        } else {
            for (let transaction in filtered[0]){
                headers.push(transaction)
            }
        }

        this.setState({ headers })
    }

    populateData = () => {
        let { filtered } = this.state
        let filtered2 = []
        for(var i=0;i<this.state.total_no_data;i++){
            filtered2.push(filtered[i])
        }
       
        let data = []
        let data2 = []

        for (let row of filtered2){
            let transaction = []
            for (let column in row) {
                transaction.push(row[column])
            }
            data.push(transaction)
        }

        for (let row of filtered) {
            let transaction2 = []
            for (let column in row) {
                transaction2.push(row[column])
            }
           
            data2.push(transaction2)
        }

        if(Math.ceil(filtered.length/this.state.total_no_data)==0){
            this.state.pageCount = 1
           }
           else{
            this.state.pageCount = Math.ceil(filtered.length/this.state.total_no_data)
           }
           


        
           this.setState({ data2,data})
    }

    formatData = async () => {
        const { transactions } = this.props

        let formatted = []
        formatted = await transactions.map(transaction => {
            const { transactionId, from, to, originalAmount, receivedAmount, receivedCurrency, sentCurrency, status, updatedAt, transactionType } = transaction
            const statuses = ['Pending', 'Confirmed', 'Cancelled']
            const types = ['Wallet To Wallet', 'Wallet To Bank', 'Card To Wallet', 'Wallet To Crypto', 'Crypto To Wallet', 'Naira To Wallet', 'Admin Fiat To Wallet', 'Wallet To Utilies','Airtime']
            const isSender = from === this.props.user.email
            //const isSender = to === this.props.user.email
            const amountSent = `${sentCurrency} ${originalAmount}`
            const amountReceived = `${receivedCurrency} ${receivedAmount}`
            

            const formatted = {
                '': isSender ? 'Debit' : 'Credit',
                transactionId,
                'from/to': transaction.initiator,
                amount: isSender ? amountSent : amountReceived,
                status: transaction.status,
                date: new Date(updatedAt).toDateString(),
                category: transaction.description
            }
            console.log(this.props)
            console.log(transaction)
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
        
        console.log(this.state.pageCount)
        if(this.state.page+1<=this.state.pageCount){
            this.state.currentpage = this.state.currentpage + index
            let { page, pageCount } = this.state
            if (index === -1 && page > 1) this.setState({ page: page + index }
                
                )
            else if (index === 1 && page < pageCount) this.setState({ page: page + index })
            
           let filtdata = []
           if(this.state.page==this.state.pageCount-1){
            
          let left =    this.state.data2.length-(this.state.total_no_data*this.state.currentpage)
          console.log(left)
          let k = 1
          for(var i=0;i<left;i++){
            filtdata.push(this.state.data2[this.state.data2.length-k])
            k = k+1
          }
           }
           else{
            
            for(var i=this.state.currentpage;i<this.state.currentpage+this.state.total_no_data;i++){
               // console.log(i)
                 filtdata.push(this.state.data2[i+1])
             }
           }
           
            
             
             this.state.data = filtdata
        }
        else{
            //console.log("jj")
        }
      
   
    }

    prev = index => {
      console.log(this.state.currentpage)
        
        if(this.state.currentpage>=1){
            this.state.currentpage = this.state.currentpage+ index
 
            let { page, pageCount } = this.state
            if (index === -1 && page > 1) this.setState({ page: page + index }
                
                )
            else if (index === 1 && page < pageCount) this.setState({ page: page + index })
            
           let filtdata = []
            for(var i=this.state.currentpage;i<this.state.currentpage+this.state.total_no_data;i++){
              // console.log(i)
                filtdata.push(this.state.data2[i])
            }
            
             
             this.state.data = filtdata
        }
       
    
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
            headers, data, filterDate,page, pageCount, minPage, maxPage, filterType, filterCategory
        } = this.state
        const types = ['All', 'Wallet to Wallet Transfer', 'Wallet to Bank Transfer', 'Card To Wallet', 'Wallet To Crypto', 'Crypto To Wallet', 'Naira To Wallet', 'Admin Fiat To Wallet', 'Wallet To Utilies','Airtime']

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
                            <div className="arrow-prev" onClick={() => this.prev(-1)}><i className="material-icons">keyboard_arrow_left</i></div>
                            <div className="page-count">
                                <p>{page} of {pageCount}</p>
                            </div>
                            <div className="arrow-next" onClick={() => this.go(1)}><i className="material-icons">keyboard_arrow_right</i></div>
                        </div>
                        <div className="count-picker">
                           
                        </div>
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
