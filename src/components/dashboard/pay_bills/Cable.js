import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import Popup from '../../common/Popup';
import './beneficiaries.css'
import Button from '../../common/Button';
import Input from '../../common/Input';
import { BASE_URL } from "../../../config/constants";
import utilities from '../../../config/utility.json'
import { payTV ,getDataBundle,ConfirmSmartCard} from '../../../actions/dashActions'
import { getTv } from '../../../actions/dashActions'

class Cable extends Component {
    state = {
        packageType: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Cable TV Package'
                }
            },
            config: {
                name: 'packageType',
                options: [
                    { val: '', text: 'Choose Package' },
                ]
            }
        },
        cardNumber: {
            element: 'input',
            value: '',
            label: {
                left: {
                   
                    text: 'Smartcard Number'
                },
                
            },
            config: {
                name: 'cardNumber',
                type: 'number',
                placeholder: 'Enter Smart Card Number'
            },
            
        },
        phone: {
            element: 'input',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Phone Number'
                },
            },
            config: {
                name: 'phone',
                type: 'number',
                placeholder: 'Enter Phone Number'
            }
        },
        bouquet: {
            element: 'select',
            value: '',
            label: {
                left: {
                    icon: false,
                    text: 'Bouquet'
                }
            },
            config: {
                name: 'bouquet',
                options: [
                    { val: '', text: 'Choose Bouquet' },
                ]
            }
        },
        save:false,
        popup: false,
        bouquets: [],
        selectedBouquet: [],
        tvType:null
    }

    componentDidMount(){
        this.props.getTv()
    }

    async componentDidUpdate(prevProps) {
     
        if (prevProps.tv !== this.props.tv) {
           
            const { packageType } = this.state
            const { config } = packageType
            const { options } = config
            this.props.tv.forEach(item=>{
                options.push({
                    val: item._id,
                    text: item.name
                })
            })
           
            config.options = options
            packageType.config = config
            this.setState({ packageType })
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        console.log(this.state.selectedBouquet)
        if (this.state.selectedBouquet){
               const service_category_id = this.state.packageType.value,
                smartcard = this.state.cardNumber.value,
                amount = this.state.selectedBouquet[0].amount,
                phone = this.state.phone.value,
                name = this.state.selectedBouquet[0].name,
                bundleCode = this.state.selectedBouquet[0].val,
                tvType=this.state.tvType
               

            if (service_category_id !== '' && smartcard !== '' && phone !== '') this.props.payTV({ service_category_id, smartcard, amount, phone, name, bundleCode,tvType },this.state.save)
        }
    }

    updateForm = (key, value) => {
        console.log(key,value)
        let data = this.state[key]
        data.value = value
        this.setState({
            [key]: data
        })

        if (key === 'packageType'){
    const tv_selected =  this.state.packageType.config.options.filter(element=>element.val==value)
    console.log(tv_selected)
       if(tv_selected[0].text=='DSTV'||tv_selected[0].text=='GOTV'){
           this.state.tvType = tv_selected[0].text
       }
       else{
        this.state.tvType = tv_selected[0].text
           const { bouquet } = this.state
            const { config } = bouquet
           //we get bouque for the tv
          this.props.getDataBundle(value)
           axios
           .post(`${BASE_URL}/utilities/serviceproduct/`+value)
           .then(res => {
               console.log(res)
    
           let options = [{ val: '', text: 'Choose Subscription',name:'',amount:'' }]
           res.data.body.data.productCategories.forEach(item => {
               options.push({
                   val: item.bundleCode,
                   text: `${item.name} - N${item.amount}`,
                   name:item.name,
                   amount:item.amount
               })
           })

           config.options = options
            bouquet.config = config
            this.setState({ bouquet, bouquets: options })
           })

       }
        }

if(key=='cardNumber'&&value.length==10&&(this.state.tvType=='DSTV'||this.state.tvType=='GOTV')){
    //weconfirm smart card no
    const data = ({
        account:value,
        serviceId:this.state.packageType.value,
    })
    console.log(data)
    this.props.ConfirmSmartCard(value,this.state.packageType.value)
    axios
    .post(`${BASE_URL}/utilities/verify`, data)
    .then(res => {
      console.log(res)
      if(res.data.status=='error'){
      }
      if(res.data.status=='success'){
        axios.post(`${BASE_URL}/utilities/serviceproduct/`+this.state.packageType.value,data)
        .then(res2=>{
            
            const { bouquet } = this.state
                const { config } = bouquet
            let options = [{ val: '', text: 'Choose Subscription',name:'',amount:'' }]
            res2.data.body.data.productCategories.forEach(item => {
                options.push({
                    val: item.bundleCode,
                     text: `${item.name} - N${item.amount}`,
                     name:item.name,
                    amount:item.amount
                })
            })
    
            config.options = options
             bouquet.config = config
             this.setState({ bouquet, bouquets: options })
         console.log(res2.data.body.data.productCategories)
        })
      }
     
      
    })
    
}

        if (key === 'bouquet'){
            console.log(value)
            const { bouquets } = this.state
            console.log(bouquets)
            const boq_selected =  bouquets.filter(element=>element.val==value)
            this.setState({
                selectedBouquet: boq_selected
            })
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
                    
                    if (beneficiaries.service === "payment_tv") benefiCiaries.push(beneficiaries)
                })
               
                this.setState({ beneficiaries: benefiCiaries })
            })
            .catch(err => {
                console.log(err.response)
            })
            .finally(() => this.setState({ loading: false }))
    }
    selectBeneficiary = item => {
        this.state.bouquet.config.options = [{val:'',text:'loading....'}]
        console.log(item)
        let { cardNumber,packageType ,tvType} = this.state
        cardNumber.value = item.number
        packageType.config.options[0].text = item.name
        this.state.tvType=item.name
       
       if(this.state.tvType=='DSTV'||this.state.tvType=='GOTV'){
        packageType.config.options[0].text = item.name
        this.state.tvType=item.name
        const serv_id =  this.state.packageType.config.options.filter(element=>element.text==this.state.tvType)
        console.log(serv_id)
  if(serv_id.length==1){
    this.state.packageType.value = serv_id[0].val
    this.updateForm('cardNumber',item.number)
  }
  else{
    this.state.packageType.value = serv_id[1].val
    this.updateForm('cardNumber',item.number)
  
}
           
       }
       
       else{
         this.updateForm('packageType',16)
       }
        this.setState({
            
         cardNumber,
           packageType,
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
        const { packageType, cardNumber, bouquet, phone ,popupStatus,show, popupMessage} = this.state;
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
                <Input formData={packageType} change={this.updateForm} />
                <Input formData={cardNumber} change={this.updateForm} />
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
                <Input formData={phone} change={this.updateForm} />
                <Input formData={bouquet} change={this.updateForm} />
                <div>
                        <input
                            type="checkbox"
                            value={this.state.save}
                            onChange={(e) => this.setState({ save: !this.state.save })}
                        />
                        &nbsp;&nbsp;Save as beneficiary
                    </div>
                <p style={{ color: 'red' }}>{this.props.error.message}</p>
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
                                          {item.name} -  {item.number} 
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
    tv:state.dashboard.tv,
    bundle:state.dashboard.bundle
})

export default connect(mapStateToProps, { payTV,getTv,getDataBundle,ConfirmSmartCard })(Cable);
