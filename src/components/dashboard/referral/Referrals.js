import React from 'react';
import { connect } from 'react-redux'
import Table from '../../common/Table'
import { getReferals } from '../../../actions/dashActions'

class Refferals extends React.Component {
    state = {
        invoices: null,
        filtered: [],
        headers: [],
        data: [],
        data2:[],
        data_final:[],
        filterDueDate: '',
        filterCreatedDate: '',
      // filterRecieverName:'',
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

        if (this.props.invoices.length < 1){
            headers = ['Name', 'Email', 'Amount', 'Date']
        } else {
            for (let invoice in filtered[0]) {
                
                headers.push(invoice)
            }
        }
        console.log(this.props.invoices.length)
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

        for (let row of filtered2) {
            let invoice = []
            for (let column in row) {
                invoice.push(row[column])
            }
           
            data.push(invoice)
        }

        for (let row of filtered) {
            let invoice2 = []
            for (let column in row) {
                invoice2.push(row[column])
            }
           
            data2.push(invoice2)
        }
    
       if(Math.ceil(filtered.length/this.state.total_no_data)==0){
        this.state.pageCount = 1
       }
       else{
        this.state.pageCount = Math.ceil(filtered.length/this.state.total_no_data)
       }
       
       this.state.page_2 = filtered2.length
        
       this.setState({ data2,data})
     }

    formatData = async () => {
        const { invoices } = this.props
        console.log(this.props)
        console.log(invoices)

        const formatted = await invoices.map((invoice,index) => {
            console.log(invoice)
            let i =0
            const formatted = {
                'Name': invoice.firstname + ' ' + invoice.lastname,
                'Email': invoice.email,
                'Amount': 'NGN'+invoice.amount,
                'created_date': new Date(invoice.date).toDateString(),
            }

            return formatted;
        })

        console.log(formatted)
        this.setState({ invoices: formatted, filtered: formatted })
    }

    async componentDidMount() {
        this.props.getReferals()
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

    filterDueDate = filterDueDate => {
        const { invoices } = this.state
       console.log(filterDueDate)
        let filtered = []

        if (filterDueDate !== '') {
            invoices.forEach(invoice => {
                console.log(new Date(invoice.due_date).toDateString())
               //console.log(invoice)
                console.log(new Date(filterDueDate).toDateString())
                if (new Date(invoice.due_date).toDateString() === new Date(filterDueDate).toDateString()) filtered.push(invoice)
            })
        } 
        else filtered = invoices

        this.setState({ filterDueDate, filtered }, this.populateData)
    }

    filterCreatedDate = filterCreatedDate => {
        const { invoices } = this.state
        let filtered = []

        if (filterCreatedDate !== '') {
            invoices.forEach(invoice => {
                if (new Date(invoice.created_date).toDateString() === new Date(filterCreatedDate).toDateString()) filtered.push(invoice)
            })
        } else filtered = invoices

        this.setState({ filterCreatedDate, filtered }, this.populateData)
    }

    filterRecieverName = filtername => {
        const { invoices } = this.state
        let filtered = []
      //  console.log(filtername)

        if (filtername !== '') {
            invoices.forEach(invoice => {
                console.log(invoice.receiver_name)
                console.log(filtername)
              if (invoice.Name.toLowerCase() === filtername.toLowerCase()) filtered.push(invoice)
            })
        } else filtered = invoices

        this.setState({ filtername, filtered }, this.populateData)
    }

    

    render() {
        const {
            headers, data, filterRecieverName, filterDueDate, page_2, page, pageCount,minPage, maxPage, filterCreatedDate
        } = this.state

        return (
            <div>
                <div className="filter-options">
                    <div>
                        <div className="date-range">
                           
                            <div className="date-picker">
                                <label>Filter By Date Created</label>
                                <div>
                                    <input type="date" value={filterCreatedDate} onChange={e => this.filterCreatedDate(e.target.value)} />
                                    <i className="material-icons">event</i>
                                </div>
                            </div>
                            <div className="date-picker">
                                <label>Filter By Reciever Name</label>
                                <div>
                                    <input type="text" value={filterRecieverName} onChange={e => this.filterRecieverName(e.target.value)} />
                                  
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
                <Table headers={headers} data={data} title="Invoices" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    invoices: state.dashboard.referals
})

export default connect(mapStateToProps, { getReferals })(Refferals);
