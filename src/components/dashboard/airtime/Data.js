import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import Button from '../../common/Button';
import Input from '../../common/Input';
import { getServices } from '../../../actions/dashActions'
import { buyData } from '../../../actions/dashActions'
import utilities from '../../../config/utility.json'
import { getDataBundle } from '../../../actions/dashActions'
import Popup from '../../common/Popup';
import './beneficiaries.css'
import { BASE_URL } from "../../../config/constants";
class Data extends Component {

    state = {
        network: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Data Provider'
                }
            },
            config: {
                name: 'network',
                options: [
                    { val: "", text: 'Choose Data Provider' },
                ]
            }
        },
        number: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Phone Number'
                }
            },
            config: {
                name: 'number',
                type: 'number',
                placeholder: 'Enter Number'
            }
        },
        plan: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Data Provider'
                }
            },
            config: {
                name: 'plan',
                options: [
                    { val: '', text: 'Choose Data Plan' },
                ]
            }
        },
        save: false,
        popup: false,
        bundles: [],
        amount: ''
    }
    formatData = async () => {
        console.log(utilities)
        console.log(this.props)
        // const { Data } = utilities
        // console.log(Data)
        const { network } = this.state
        const { config } = network
        const { options } = config

        this.props.data_types.forEach(item => {
            options.push({
                val: item._id,
                text: item.name
            })
        })

        console.log(this.state)

        config.options = options
        network.config = config
        this.setState({ network })
    }
   async componentDidMount(){
        this.props.getServices()
       // await this.formatData()
        // console.log(this.props)
        // const { Data } = utilities

        // const { network } = this.state
        // const { config } = network
        // const { options } = config

        // Data.forEach(item => {
        //     options.push({
        //         val: item.id,
        //         text: item.name
        //     })
        // })

        // config.options = options
        // network.config = config
        // this.setState({ network })
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.data_types !== this.props.data_types) {
            await this.formatData()
           
        }
       
    }

    submitForm = (event) => {
        event.preventDefault();
        const id = this.state.network.value
        const amount = this.state.amount
        const phone = this.state.number.value
        const bundleCode = this.state.plan.value
        if (id !== '' && amount !== '' && phone !== '' && bundleCode !== '') this.props.buyData({ id, amount, phone, bundleCode },this.state.save)
     }

    updateForm = (key, value) => {
          
                let data = this.state[key]
                data.value = value
                this.setState({
                    [key]: data
                })
                if (key === 'network'){
                    if(value){
                        console.log(value)
                    this.props.getDataBundle(value)
                    axios
                    .post(`${BASE_URL}/utilities/serviceproduct/`+value)
                    .then(res => {
                        console.log(res)
                    const { plan } = this.state
                    const { config } = plan
                    let options = [{ val: '', text: 'Choose Data Plan' }]
                    res.data.body.data.productCategories.forEach(item => {
                        options.push({
                            val: item.bundleCode,
                            text: `${item.name} - N${item.amount}`
                        })
                    })
        
                    config.options = options
                    plan.config = config
                    this.setState({ plan, bundles: res.data.body.data.productCategories })
                    })
                    }
                    
                }
              
            
     
        if (key === 'plan'){
            if(value){
                const bundle = this.state.bundles.filter(item => item.bundleCode === value)
            this.setState({ amount: bundle[0].amount })
            }
        }
    }

    getBeneficaries = () => {
        this.setState({ popup: true, loading: true })
        axios
            .get(`${BASE_URL}/users/beneficiary`)
            .then(res => {
              console.log(res)
                let benefiCiaries = []
                res.data.data.forEach(beneficiaries => {
                    
                    if (beneficiaries.service === "payment_airtime_data") benefiCiaries.push(beneficiaries)
                })
               
                this.setState({ beneficiaries: benefiCiaries })
            })
            .catch(err => {
                console.log(err.response)
            })
            .finally(() => this.setState({ loading: false }))
    }
    selectBeneficiary = item => {
      //  console.log(item)
        let { number } = this.state
        number.value = item.name 
       
        this.setState({
            number,
            popup: false
        })
    }
    showPopup = () => {
      this.setState({ show: true });
      // this.setState({ popupStatus: 'status' });
      // this.setState({ popupMessage: 'message' });
    }
    
    closePopup = () => {
      this.setState({ show: false });
    }

    render() {
        const { network, number, plan,popupStatus,show, popupMessage } = this.state;
        const { tab } = this.props;
        return (
            <div>
                <Popup show={show} status={popupStatus} message={popupMessage} closePopup={this.closePopup} />
                 <form onSubmit={this.submitForm}>
                {
                    tab.headline ?
                        <div className="tab-headline">
                            <p className="title">{tab.headline}</p>
                            <p className="sub-title">{tab.tagline}</p>
                        </div> : null
                }
                <Input
                    formData={network}
                    change={this.updateForm}
                />
                <Input
                    formData={plan}
                    change={this.updateForm}
                />
                <Input
                    formData={number}
                    change={this.updateForm}
                />
                 <p
                        onClick={this.getBeneficaries}
                        style={{
                            textAlign: 'right',
                            margin: 0,
                            marginTop: -10,
                            textTransform: 'uppercase',
                            fontSize: 10,
                            cursor: 'pointer',
                            color: '#418298'
                        }}
                    >Choose from Beneficiaries</p>
                <p style={{ color: 'red' }}>{this.props.error.message}</p>
                <div>
                        <input
                            type="checkbox"
                            value={this.state.save}
                            onChange={(e) => this.setState({ save: !this.state.save })}
                        />
                        &nbsp;&nbsp;Save as beneficiary
                    </div>
                {
                    tab.button ?
                        <Button type={'submit'} text={tab.button} /> : null
                }
                {this.state.popup && (
                        <div className="overlay">
                            <div className="modal-container">
                                <div style={{ textAlign: 'right', padding: 15 }}>
                                    <span onClick={() => this.setState({ popup: false })} className="close">&times;</span>
                                </div>
                                {this.state.loading ? <div className="loading-container">
                                    <img src={require('../../../assets/loading.gif')} alt="Loading" />
                                </div> : <div className="beneficiaries">
                                    {this.state.beneficiaries.map(item => (
                                        <p onClick={() => this.selectBeneficiary(item)} key={item._id} className="item">
                                          Phone Number -  {item.name} 
                                        </p>
                                    ))}
                                </div>}
                            </div>
                        </div>
                    )}
            </form>
        
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    data_types:state.dashboard.data_available,
    data_bundles:state.dashboard.data_bundle
})

export default connect(mapStateToProps, {getDataBundle,getServices,buyData })(Data);
