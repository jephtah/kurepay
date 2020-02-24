import React, { Component } from 'react'
import { connect } from 'react-redux'
import QRCode from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// import Button from '../../common/Button';
import Input from '../../common/Input'

import { fundWithCrypto } from '../../../actions/dashActions'

class Crypto extends Component {
  state = {
    crypto: {
      element: 'select',
      value: '',
      label: {
        left: {
          icon: false,
          text: 'Cryptocurrency'
        }
      },

      config: {
        name: 'crypto',
        options: [
          { val: '', text: 'Choose Cryptocurrency' },
          { val: 'BTC', text: 'Bitcoin (BTC)' },
          { val: 'ETH', text: 'Ethereum (ETH)' },
          { val: 'DASH', text: 'Dash (DSH)' }
        ]
      }
    },
    selectedCrypto: null,
    copied: false
  }

  submitForm = event => {
    console.log('submit')
    if (event) event.preventDefault()

    const { selectedCrypto } = this.state
    if (selectedCrypto) this.props.fundWithCrypto(selectedCrypto)
  }

  updateForm = (key, value) => {
    let data = this.state.crypto
    data.value = value
    this.setState({
      crypto: data
    })

    const crypto = this.state.crypto.config.options.find(
      item => item.val === value
    )
    this.setState(
      {
        selectedCrypto: {
          coin_type: crypto.val,
          coin_name: crypto.text.split(' ')[0].toLowerCase()
        }
      },
      this.submitForm
    )
  }

  render () {
    const { crypto } = this.state
    const { tab } = this.props
    return (
      <form onSubmit={this.submitForm}>
        {tab.headline ? (
          <div className='tab-headline'>
            <p className='title'>{tab.headline}</p>
            <p className='sub-title'>{tab.tagline}</p>
          </div>
        ) : null}
        <Input formData={crypto} change={this.updateForm} />
        {this.props.cryptoAddress && (
          <p>
            Generated Crypto Address: {this.props.cryptoAddress}
            <br />
            <CopyToClipboard
              onCopy={() => this.setState({ copied: true })}
              text={this.props.cryptoAddress}
            >
              <span style={{ color: 'steelblue', cursor: 'pointer' }}>
                <i className='material-icons' style={{ fontSize: 18 }}>
                  file_copy
                </i>{' '}
                {this.state.copied ? 'Copied!' : 'Copy to Clipboard'}
              </span>
            </CopyToClipboard>
          </p>
        )}
        {this.props.cryptoAddress && (
          <div>
            <p>Scan this QR code:</p>
            <QRCode
              value={this.props.cryptoAddress}
              size={300}
              renderAs='svg'
            />
          </div>
        )}
        <p style={{ color: 'red' }}>{this.props.error.message}</p>
        {/* {
                    tab.button ?
                        <Button disabled={!this.state.selectedCrypto || this.props.loading} type={'submit'} text={'Submit'} /> : null
                } */}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  loading: state.loading,
  cryptoAddress: state.dashboard.cryptoAddress
})

export default connect(mapStateToProps, { fundWithCrypto })(Crypto)
