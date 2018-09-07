import React, { Component } from "react";
import { Input } from "../../Elements/Form";
import { FastFade } from "../../Fade";
import { API } from "../../../utils";
import "./InitialBalances.css";

class InitialBalances extends Component {
  state = {
    style: {
      balancesForm: {}
    },
    checking: "",
    cc1: "",
    cc2: "",
    cc3: "",
    cc4: "",
    cc5: "",
    cc6: "",
    savings1: "",
    savings2: "",
    savings3: "",
  };

  componentDidMount() {
    this.props.getUserAccounts();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = () => {
    const { checking, cc1, cc2, cc3, cc4, cc5, cc6, cash, savings1, savings2, savings3 } = this.state;

    const balanceObject = {}
    balanceObject.setup_balances = true;
    if (checking) balanceObject.checking = parseFloat(checking).toFixed(2);
    else balanceObject.checking = 0.00;
    if (cc1) balanceObject.cc1 = parseFloat(cc1).toFixed(2);
    else balanceObject.cc1 = 0.00;
    if (cc2) balanceObject.cc2 = parseFloat(cc2).toFixed(2);
    else balanceObject.cc2 = 0.00;
    if (cc3) balanceObject.cc3 = parseFloat(cc3).toFixed(2);
    else balanceObject.cc3 = 0.00;
    if (cc4) balanceObject.cc4 = parseFloat(cc4).toFixed(2);
    else balanceObject.cc4 = 0.00;
    if (cc5) balanceObject.cc5 = parseFloat(cc5).toFixed(2);
    else balanceObject.cc5 = 0.00;
    if (cc6) balanceObject.cc6 = parseFloat(cc6).toFixed(2);
    else balanceObject.cc6 = 0.00;
    if (cash) balanceObject.cash = parseFloat(cash).toFixed(2);
    else balanceObject.cash = 0.00;
    if (savings1) balanceObject.savings1 = parseFloat(savings1).toFixed(2);
    else balanceObject.savings1 = 0.00;
    if (savings2) balanceObject.savings2 = parseFloat(savings2).toFixed(2);
    else balanceObject.savings2 = 0.00;
    if (savings3) balanceObject.savings3 = parseFloat(savings3).toFixed(2);
    else balanceObject.savings3 = 0.00;

    API.setInitialBalances(balanceObject)
      .then(response => {
        this.setState({
          style: {
            balancesForm: {
              opacity: '0',
              transition: 'opacity .5s ease-in-out'
            }
          }
        })
        setTimeout(() => {
          this.props.updateUser({
            auth: true,
            state: { setupBalances: true, }
          })
        }, 510)
      })
      .catch(err => console.log(err));
  }

  render() {
    const { checking, cc1, cc2, cc3, cc4, cc5, cc6, savings1, savings2, savings3 } = this.props.accounts;

    const balanceArray = [
      <div className="initial-balances-container" style={this.state.style.balancesForm}>
        <div>
          <h2>SET INITIAL BALANCES</h2>
        </div>
        <div className="initial-balances-instructions">
          <ul>
            <li>Set the current balance for each account below.</li>
            <li>If you leave one blank, it will default to $0.00.</li>
            <li>You can come back and adjust the balances later.</li>
          </ul>
        </div>
        <div className="initial-balance-inner">
          {checking
            ? (
              <Input
                value={this.state.checking}
                onChange={this.handleInputChange}
                name="checking"
                type="text"
                label={`${checking}:`}
              />
            ) : null}
          {cc1
            ? (
              <Input
                value={this.state.cc1}
                onChange={this.handleInputChange}
                name="cc1"
                type="text"
                label={`${cc1}:`}
              />
            ) : null}
          {cc2
            ? (
              <Input
                value={this.state.cc2}
                onChange={this.handleInputChange}
                name="cc2"
                type="text"
                label={`${cc2}:`}
              />
            ) : null}
          {cc3
            ? (
              <Input
                value={this.state.cc3}
                onChange={this.handleInputChange}
                name="cc3"
                type="text"
                label={`${cc3}:`}
              />
            ) : null}
          {cc4
            ? (
              <Input
                value={this.state.cc4}
                onChange={this.handleInputChange}
                name="cc4"
                type="text"
                label={`${cc4}:`}
              />
            ) : null}
          {cc5
            ? (
              <Input
                value={this.state.cc5}
                onChange={this.handleInputChange}
                name="cc5"
                type="text"
                label={`${cc5}:`}
              />
            ) : null}
          {cc6
            ? (
              <Input
                value={this.state.cc6}
                onChange={this.handleInputChange}
                name="cc6"
                type="text"
                label={`${cc6}:`}
              />
            ) : null}
          {savings1
            ? (
              <Input
                value={this.state.savings1}
                onChange={this.handleInputChange}
                name="savings1"
                type="text"
                label={`${savings1}:`}
              />
            ) : null}
          {savings2
            ? (
              <Input
                value={this.state.savings2}
                onChange={this.handleInputChange}
                name="savings2"
                type="text"
                label={`${savings2}:`}
              />
            ) : null}
          {savings3
            ? (
              <Input
                value={this.state.savings3}
                onChange={this.handleInputChange}
                name="savings3"
                type="text"
                label={`${savings3}:`}
              />
            ) : null}
          <div>
            <button onClick={this.handleFormSubmit}>Submit</button>
          </div>
        </div>
      </div>
    ];

    return (
      <FastFade array={balanceArray} />
    );
  }
}

export default InitialBalances;