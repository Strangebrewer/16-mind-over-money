import React from "react";
import { FormBtn } from "../../Elements/Form";
import { Inner, Outer } from "../../Elements/Containers";
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
    this.setState({ [name]: value });
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
    const accountNames = this.props.accountNames;
    const expenses = this.props.expenses;

    return (
      <Outer addedClass="savings-container">
        <h2>SAVINGS</h2>
        <Inner addedClass="savings-inner">
          {Object.keys(accountNames)
            .filter(key => (
              this.props.accountNames[key] !== null
              && `${key}`.includes('saving')))
            .map((key, index) => (
              <SavingsDeposit
                key={`${key}-${index}`}
                value={this.state[key]}
                handleInputChange={this.handleInputChange}
                month={this.props.month}
                year={this.props.year}
                accountName={accountNames[key]}
                name={`${key}`}
                expenses={expenses}
                expenseSavings={expenses[key]}
              />
            ))}

          <div>
            <FormBtn
              disabled={
                !this.state.savings1
                && !this.state.savings2
                && !this.state.savings3
              }
              onClick={this.updateSavings}
              value="submit"
            />
          </div>
        </Inner>
      </Outer>
    )
  }
};

export default Savings;