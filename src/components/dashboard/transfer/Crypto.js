import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../common/Button";
import Input from "../../common/Input";

import {
  transferToCrypto,
  getOTP,
  removeOTP,
} from "../../../actions/dashActions";

class Crypto extends Component {
  state = {
    crypto: {
      element: "select",
      value: "",
      label: {
        left: {
          icon: false,
          text: "Cryptourrency",
        },
      },
      config: {
        name: "crypto",
        options: [
          { val: 0, text: "Choose Cryptocurrency" },
          { val: 3, text: "Bitcoin (BTC)" },
          { val: 2, text: "Ethereum (ETH)" },
          { val: 2, text: "Dash (DSH)" },
        ],
      },
    },
    wallet: {
      element: "input",
      value: "",
      label: {
        left: {
          icon: false,
          text: "Cryptocurrency Wallet Address",
        },
      },
      config: {
        name: "wallet",
        type: "text",
        placeholder: "Enter Wallet Address",
      },
    },
    amount: {
      element: "input",
      value: "",
      label: {
        left: {
          icon: false,
          text: `Amount to Transfer (${this.props.user.localCurrency})`,
        },
      },
      config: {
        name: "amount",
        type: "number",
        placeholder: "Enter Transfer Amount",
      },
    },
    otp: {
      element: "otp",
      value: "",
      config: {
        name: "otp",
      },
    },
  };

  componentDidMount() {
    this.props.removeOTP();
  }

  submitForm = event => {
    event.preventDefault();

    if (this.props.otp) {
      const { wallet, amount, crypto, otp } = this.state;
      this.props.transferToCrypto({
        coin_type: crypto.value,
        address: wallet.value,
        amount: amount.value,
        token: otp.value,
      });
    } else {
      this.props.getOTP();
    }
  };

  updateForm = (key, value) => {
    let data = this.state[key];
    data.value = value;
    this.setState({
      [key]: data,
    });
  };

  render() {
    const { crypto, wallet, amount, otp } = this.state;
    const { tab } = this.props;
    return (
      <form onSubmit={this.submitForm}>
        {tab.headline ? (
          <div className="tab-headline">
            <p className="title">{tab.headline}</p>
            <p className="sub-title">{tab.tagline}</p>
          </div>
        ) : null}
        <Input formData={crypto} change={this.updateForm} />
        <Input formData={wallet} change={this.updateForm} />
        <Input formData={amount} change={this.updateForm} />
        {this.props.otp && <Input formData={otp} change={this.updateForm} />}
        <p style={{ color: "red" }}>{this.props.error.message}</p>
        {tab.button ? (
          this.props.otp ? (
            <Button
              disabled={this.props.loading}
              type={"submit"}
              text={"Transfer"}
            />
          ) : (
            <Button
              disabled={this.props.loading}
              type={"submit"}
              text={"Generate OTP"}
            />
          )
        ) : null}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.errors,
  otp: state.dashboard.otp,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {
    transferToCrypto,
    getOTP,
    removeOTP,
  }
)(Crypto);
