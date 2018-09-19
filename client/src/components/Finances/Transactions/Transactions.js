import React from "react";
import { FormBtn, Input, Label, Option, Select } from "../../Elements/Form";
import { Inner, Outer } from "../../Elements/Containers";
import "./Transactions.css";

class Transactions extends React.Component {
  state = {
    amount: "",
    category: "",
    day: "",
    description: "",
    source: "",
    savingsSource: "",
    savingsAmount: ""
  }

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //  Will need to update server functionality to accept 'income' as a category.
  handleTransaction = () => {
    this.props.handleTransaction({
      day: this.state.day,
      amount: this.state.amount,
      category: this.state.category,
      description: this.state.description,
      source: this.state.source
    });
    this.setState({
      day: "",
      amount: "",
      description: ""
    })
  };

  savingsToChecking = () => {
    this.props.savingsToChecking({
      source: this.state.savingsSource,
      amount: this.state.savingsAmount
    });
    this.setState({ savingsAmount: "" })
  };

  render() {
    const accountNames = this.props.accountNames;
    const { month, year } = this.props;

    return (
      <Outer addedClass="transactions-container">
        <h2>TRANSACTIONS</h2>
        <Inner addedClass="transactions-inner">
          <div className="charge-form">
            <h6>Record Spending for {month} {year}</h6>
            <div className="charge-inner">

              <div>
                <Label name="select-source">Account:</Label>
                <Select id="select-source" name="source" onChange={this.handleInputChange}>
                  <Option></Option>
                  {Object.keys(accountNames)
                    .filter(key => (
                      this.props.accountNames[key] !== null
                      && (
                        `${key}`.includes('check')
                        || `${key}`.includes('cc')
                      )
                    ))
                    .map((key, index) => <Option key={`${key}-${index}`} value={`${key}`}>{accountNames[key]}</Option>)}
                </Select>
              </div>

              <div>
                <Label name="select-category">Category:</Label>
                <Select id="select-category" name="category" onChange={this.handleInputChange}>
                  <Option>(optional)</Option>
                  <Option value="income">Income</Option>
                  {Object.keys(accountNames)
                    .filter(key => (
                      this.props.accountNames[key] !== null
                      && `${key}`.includes('detail')
                    ))
                    .map((key, index) => <Option key={`${key}-${index}`} value={`${key}`}>{accountNames[key]}</Option>)}
                </Select>
              </div>

              <div>
                <Input
                  value={this.state.day}
                  onChange={this.handleInputChange}
                  maxLength="2"
                  name="day"
                  type="text"
                  label="Day:"
                />
              </div>

              <div>
                <Input
                  value={this.state.amount}
                  onChange={this.handleInputChange}
                  name="amount"
                  type="text"
                  label="Amount:"
                />
              </div>

              <div>
                <Input
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  name="description"
                  type="text"
                  label="Description:"
                />
              </div>

              <div>
                <FormBtn
                  disabled={
                    !this.state.source
                    || !this.state.day
                    || !this.state.amount
                  }
                  onClick={this.handleTransaction}
                  value="submit"
                />
              </div>

            </div>
          </div>

          <div className="savings-trans-container">
            <h6>Savings Transfer for {month} {year}</h6>
            <div className="savings-trans-inner">

              <div>
                <Label name="savings-source">Select an account:</Label>
                <Select id="savings-source" name="savingsSource" onChange={this.handleInputChange}>
                  <Option></Option>
                  {Object.keys(accountNames)
                    .filter(key => (
                      this.props.accountNames[key] !== null
                      && `${key}`.includes('saving')
                    ))
                    .map((key, index) => <Option key={`${key}-${index}`} value={`${key}`}>{accountNames[key]}</Option>)}
                </Select>
              </div>

              <div>
                <Input
                  value={this.state.savingsAmount}
                  onChange={this.handleInputChange}
                  name="savingsAmount"
                  type="text"
                  label="Enter amount:"
                />
              </div>

              <div>
                <FormBtn
                  disabled={!this.state.savingsSource}
                  onClick={this.savingsToChecking}
                  value="submit"
                />
              </div>

            </div>
          </div>
        </Inner>
      </Outer>
    )
  }
}

export default Transactions;