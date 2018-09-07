import React from "react";
import { SavingsDeposit } from "../../Cards";
import "./Savings.css";

class Savings extends React.Component {
  state = {
    savings1: "",
    savings2: "",
    savings3: "",
  }

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  updateSavings = () => {
    this.props.updateSavings(this.state);
    this.setState({
      savings1: "",
      savings2: "",
      savings3: "",
    })
  }

  render() {
    const { savings1, savings2, savings3 } = this.props.accountNames;
    const expenses = this.props.expenses;

    return (
      <React.Fragment>
        <div className="savings-container" style={this.props.savingsTopStyle}>
          {savings1 || savings2 || savings3
            ? (
              <React.Fragment>
                <div onClick={this.props.toggleSavings}>
                  <h2>SAVINGS</h2>
                </div>
                <div className="savings-inner" style={this.props.savingsStyle}>
                  {savings1
                    ? <SavingsDeposit
                      value={this.state.savings1}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      savings={savings1}
                      name="savings1"
                      expenses={expenses}
                      expenseSavings={expenses.savings1}
                    /> : null}
                  {savings2
                    ? <SavingsDeposit
                      value={this.state.savings2}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      savings={savings2}
                      name="savings2"
                      expenses={expenses}
                      expenseSavings={expenses.savings2}
                    /> : null}
                  {savings3
                    ? <SavingsDeposit
                      value={this.state.savings3}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      savings={savings3}
                      name="savings3"
                      expenses={expenses}
                      expenseSavings={expenses.savings3}
                    /> : null}
                  {savings1 || savings2 || savings3
                    ? <div>
                      <button
                        disabled={
                          !this.state.savings1
                          && !this.state.savings2
                          && !this.state.savings3
                        }
                        onClick={this.updateSavings}
                      >
                        submit
                    </button>
                    </div>
                    : null}
                </div>
              </React.Fragment>
            ) : null}
        </div>
      </React.Fragment>
    )
  }
};

export default Savings;