import React, { Component } from 'react';

import Input from '../../common/Input';
import currencies from '../../../config/currencies.json'

export default class Calculator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currencies,
      selectedCurrency: "",
      amount: '',
      cryptos: [
        {
          icon: 'https://www.leetpro.co.za/wp-content/uploads/2016/12/2000px-Bitcoin.svg_-600x600.png',
          key: 'bitcoin'
        },
        {
          icon: 'https://www.leetpro.co.za/wp-content/uploads/2016/12/2000px-Bitcoin.svg_-600x600.png',
          key: 'bitcoin-1'
        },
        {
          icon: 'https://www.leetpro.co.za/wp-content/uploads/2016/12/2000px-Bitcoin.svg_-600x600.png',
          key: 'bitcoin-2'
        },
        {
          icon: 'https://www.leetpro.co.za/wp-content/uploads/2016/12/2000px-Bitcoin.svg_-600x600.png',
          key: 'bitcoin-3'
        },
        {
          icon: 'https://www.leetpro.co.za/wp-content/uploads/2016/12/2000px-Bitcoin.svg_-600x600.png',
          key: 'bitcoin-4'
        }
      ],
      selectedCrypto: {}
    }
  }

  componentDidMount() {
    this.setState({ selectedCrypto: this.state.cryptos[0] })
  }

  render() {
    const { currencies, selectedCurrency, amount, cryptos, selectedCrypto } = this.state

    return (
      <div className="calculator">
        <div className="logos">
          {cryptos.map(crypto => (
            <div
              key={crypto.key}
              className={selectedCrypto.key === crypto.key ? "logo selected-logo" : "logo"}
              onClick={() => this.setState({ selectedCrypto: crypto })}
            >
              <img alt="" src={crypto.icon} />
            </div>
          ))}
        </div>
        <div className="form">
          <Input />
          <select
            className="form-control"
            value={selectedCurrency}
            onChange={e => this.setState({ selectedCurrency: e.target.value })}
          >
            <option value="" disabled>Select a Country</option>
            {currencies.map((currency, i) => (
              <option key={i} value={currency.country}>
                {currency.country}
              </option>
            ))}
          </select>
          <input
            placeholder="Amount"
            type="number"
            className="form-control"
            value={amount}
            onChange={e => this.setState({ amount: e.target.value })}
          />
          <div className="result">
            0 BTC
          </div>
        </div>
      </div>
    )
  }
}
