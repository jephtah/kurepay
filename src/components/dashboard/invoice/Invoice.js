import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addInvoice } from '../../../actions/dashActions'

import Button from '../../common/Button';
import Input from '../../common/Input';

class Invoice extends Component {
  state = {
    receiverName: {
      element: 'input',
      value: '',
      label: {
        left: {
          icon: false,
          text: 'Receiver Name'
        }
      },
      config: {
        name: 'receiverName',
        type: 'text',
        placeholder: 'Enter Receiver Name'
      }
    },
    receiverEmail: {
      element: 'input',
      value: '',
      label: {
        left: {
          icon: false,
          text: 'Receiver Email'
        }
      },
      config: {
        name: 'receiverEmail',
        type: 'email',
        placeholder: 'Enter Receiver Email'
      }
    },
    dueDate: {
      element: 'input',
      value: '',
      label: {
        left: {
          icon: false,
          text: 'Due Date of Payment'
        }
      },
      config: {
        name: 'dueDate',
        type: 'date',
        placeholder: 'Choose a day'
      }
    },
    items: [
      {
        title: {
          element: 'input',
          value: '',
          label: {
            left: {
              icon: false,
              text: 'Item Title'
            }
          },
          config: {
            name: 'title',
            type: 'text',
            placeholder: 'Enter Title'
          }
        },
        description: {
          element: 'input',
          value: '',
          label: {
            left: {
              icon: false,
              text: 'Item Description'
            }
          },
          config: {
            name: 'description',
            type: 'text',
            placeholder: 'Enter item\'s short description'
          }
        },
        amount: {
          element: 'input',
          value: '',
          label: {
            left: {
              icon: false,
              text: `Item Cost (${'NGN'})`
            }
          },
          config: {
            name: 'amount',
            type: 'number',
            placeholder: 'Enter Item Cost'
          }
        },
        quantity: {
          element: 'input',
          value: '',
          label: {
            left: {
              icon: false,
              text: 'Item Quantity'
            }
          },
          config: {
            name: 'quantity',
            type: 'number',
            placeholder: 'Enter Quantity'
          }
        },
      }
    ]
  }

  submitForm = (event) => {
    event.preventDefault();
    const { receiverName, receiverEmail, dueDate, items } = this.state;

    const data = {
      receiver_name: receiverName.value,
      receiver_mail: receiverEmail.value,
      due_date: dueDate.value,
      items: items.map(item => ({
        title: item.title.value,
        description: item.description.value,
        amount: item.amount.value,
        quantity: item.quantity.value,
      }))
    }

    if (receiverName.value !== ''
      && receiverEmail.value !== ''
      && dueDate.value !== ''
      && items.length > 0) this.props.addInvoice(data)
  }

  updateForm = (key, value, index = null) => {
    if (index !== null){
      let { items } = this.state
      let data = items[index][key]

      data.value = value
      items[key] = data
      this.setState({ items })
    } else {
      let data = this.state[key]
      data.value = value
      this.setState({
        [key]: data
      })
    }
  }

  addItem = e => {
    e.preventDefault()

    let { items } = this.state
    items.push({
      title: {
        element: 'input',
        value: '',
        label: {
          left: {
            icon: false,
            text: 'Item Title'
          }
        },
        config: {
          name: 'title',
          type: 'text',
          placeholder: 'Enter Title'
        }
      },
      description: {
        element: 'input',
        value: '',
        label: {
          left: {
            icon: false,
            text: 'Item Description'
          }
        },
        config: {
          name: 'description',
          type: 'text',
          placeholder: 'Enter item\'s short description'
        }
      },
      amount: {
        element: 'input',
        value: '',
        label: {
          left: {
            icon: false,
            text: `Item Cost (${'NGN'})`
          }
        },
        config: {
          name: 'amount',
          type: 'number',
          placeholder: 'Enter Item Cost'
        }
      },
      quantity: {
        element: 'input',
        value: '',
        label: {
          left: {
            icon: false,
            text: 'Item Quantity'
          }
        },
        config: {
          name: 'quantity',
          type: 'number',
          placeholder: 'Enter Quantity'
        }
      },
    })
    this.setState({ items })
  }

  deleteItem = index => {
    let { items } = this.state

    items.splice(index, 1)
    this.setState({ items })
  }

  render() {
    const { receiverName, receiverEmail, dueDate, items } = this.state;
    const { tab } = this.props;
    return (
      <form onSubmit={this.submitForm} style={{ paddingRight: 50 }}>
        {
          tab.headline ?
            <div className="tab-headline">
              <p className="title">{tab.headline}</p>
              <p className="sub-title">{tab.tagline}</p>
            </div> : null
        }
        <Input formData={receiverName} change={this.updateForm} />
        <Input formData={receiverEmail} change={this.updateForm} />
        <Input formData={dueDate} change={this.updateForm} />
        {items.map((item, i) => (
          <div key={i} style={{ padding: '10px 0' }}>
            <h5 style={{
              color: '#418298'
          }}>
              <span style={{ float: 'left' }}>ITEM {i + 1}</span>
              <span onClick={() => this.deleteItem(i)} style={{ float: 'right', cursor: 'pointer', color: 'red' }}>&times;</span>
              <div className="clearfix"/>
            </h5>
            <Input formData={item.title} sub index={i} change={this.updateForm} />
            <Input formData={item.description} index={i} sub change={this.updateForm} />
            <Input formData={item.amount} index={i} change={this.updateForm} />
            <Input formData={item.quantity} index={i}change={this.updateForm} />
          </div>
        ))}
        {this.props.error.message && <p style={{ color: 'red' }}>{this.props.error.message}</p>}
        <Button type="button" text="Add Item" style={{ backgroundColor: 'green' }} onClick={e => this.addItem(e)}/>&nbsp;
        <Button type="submit" text={tab.button} />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  user: state.auth.user
})

export default connect(mapStateToProps, { addInvoice })(Invoice);
