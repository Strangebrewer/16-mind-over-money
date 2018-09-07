import React, { Component, Fragment } from "react";
import Currency from "react-currency-formatter";
import { API } from "../../../utils";
import "./ChangeBalances.css";

class ChangeBalances extends Component {
  state = {
    category: "",
    type: "",
    amount: ""
  }

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = () => {
    console.log("The button works...");
    API.changeBalances(this.state)
      .then(res => {
        this.setState({
          amount: ""
        })
        this.props.getAccountNames();
        this.props.setModal({
          body: <h4>Database has been updated.</h4>,
          buttons: <button onClick={this.props.closeModal}>OK</button>
        })
      })
  }

  render() {
    const { checking, cc1, cc2, cc3, cc4, cc5, cc6, savings1, savings2, savings3 } = this.props.accounts;
    const balances = this.props.balances;
    return (
      <Fragment>
        <div className="balance-change-container">
          <div onClick={this.props.toggleChangeBalances}>
            <h2>ADJUST BALANCES</h2>
          </div>
          <div className="balance-change-inner" style={this.props.balanceStyle}>
            <div className="balance-change-data">
              {checking
                ? <h4>{checking}:
                 <span>
                    <Currency quantity={parseFloat(balances.checking)} />
                  </span></h4>
                : null}
              {cc1
                ? <h4>{cc1}:
                <span>
                    <Currency quantity={parseFloat(balances.cc1)} />
                  </span></h4>
                : null}
              {cc2
                ? <h4>{cc2}:
                <span>
                    <Currency quantity={parseFloat(balances.cc2)} />
                  </span></h4>
                : null}
              {cc3
                ? <h4>{cc3}:
                <span>
                    <Currency quantity={parseFloat(balances.cc3)} />
                  </span></h4>
                : null}
              {cc4
                ? <h4>{cc4}:
                <span>
                    <Currency quantity={parseFloat(balances.cc4)} />
                  </span></h4>
                : null}
              {cc5
                ? <h4>{cc5}:
                <span>
                    <Currency quantity={parseFloat(balances.cc5)} />
                  </span></h4>
                : null}
              {cc6
                ? <h4>{cc6}:
                <span>
                    <Currency quantity={parseFloat(balances.cc6)} />
                  </span></h4>
                : null}
              {savings1
                ? <h4>{savings1}:
                <span>
                    <Currency quantity={parseFloat(balances.savings1)} />
                  </span></h4>
                : null}
              {savings2
                ? <h4>{savings2}:
                <span>
                    <Currency quantity={parseFloat(balances.savings2)} />
                  </span></h4>
                : null}
              {savings3
                ? <h4>{savings3}:
                <span>
                    <Currency quantity={parseFloat(balances.savings3)} />
                  </span></h4>
                : null}
            </div>
            <select name="category" onChange={this.handleInputChange}>
              <option>Select an account</option>
              {checking ? <option value="checking">{checking}</option> : null}
              {cc1 ? <option value="cc1">{cc1}</option> : null}
              {cc2 ? <option value="cc2">{cc2}</option> : null}
              {cc3 ? <option value="cc3">{cc3}</option> : null}
              {cc4 ? <option value="cc4">{cc4}</option> : null}
              {cc5 ? <option value="cc5">{cc5}</option> : null}
              {cc6 ? <option value="cc6">{cc6}</option> : null}
              {savings1 ? <option value="savings1">{savings1}</option> : null}
              {savings2 ? <option value="savings2">{savings2}</option> : null}
              {savings3 ? <option value="savings3">{savings3}</option> : null}
            </select>
            <select name="type" onChange={this.handleInputChange}>
              <option>Select operation</option>
              <option value="+">Add</option>
              <option value="-">Subtract</option>
            </select>
            <input
              value={this.state.amount}
              name="amount"
              onChange={this.handleInputChange}
              placeholder="Amount, e.g. '55.07'"
            />
            <button
              disabled={
                !this.state.category
                || !this.state.type
                || !this.state.amount
              }
              onClick={this.handleFormSubmit}
            >
              submit
             </button>
          </div>
        </div>
      </Fragment>
    )
  }
};

export default ChangeBalances;