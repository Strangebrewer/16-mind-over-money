import React from "react";
import { Inner, Outer } from "../../Elements/Containers";
import { Expense } from "../../Cards";
import { FormBtn } from "../../Elements/Form";
import "./Expenses.css";

class Expenses extends React.Component {
  state = {
    shelter: "",
    util1: "",
    util2: "",
    util3: "",
    util4: "",
    util5: "",
    car: "",
    insurance: "",
    other1: "",
    other2: "",
    other3: ""
  }

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  updateExpenses = () => {
    this.props.updateExpenses(this.state);
    this.setState({
      shelter: "",
      util1: "",
      util2: "",
      util3: "",
      util4: "",
      util5: "",
      car: "",
      insurance: "",
      other1: "",
      other2: "",
      other3: ""
    })
  }

  render() {
    const accountNames = this.props.accountNames;
    const expenses = this.props.expenses;

    return (
      <Outer addedClass="expenses-container">
        <h2>EXPENSES</h2>
        <Inner addedClass="expenses-inner">

          {Object.keys(accountNames).filter(key => (
            this.props.accountNames[key] != undefined
            && expenses[key] != undefined
            && (
              `${key}`.includes('shelter')
              || `${key}`.includes('util')
              || `${key}`.includes('car')
              || `${key}`.includes('insurance')
              || `${key}`.includes('other')
            )
          )).map((key, index) => (
            <Expense
              key={`${key}-${index}`}
              value={this.state[key]}
              name={`${key}`}
              handleInputChange={this.handleInputChange}
              month={this.props.month}
              year={this.props.year}
              item={accountNames[key]}
              expenses={expenses}
              expenseItem={expenses[key]}
            />
          ))}

          <FormBtn
            disabled={
              !this.state.shelter
              && !this.state.util1
              && !this.state.util2
              && !this.state.util3
              && !this.state.util4
              && !this.state.util5
              && !this.state.car
              && !this.state.insurance
              && !this.state.other1
              && !this.state.other2
              && !this.state.other3
            }
            onClick={this.updateExpenses}
            value="submit"
          />

        </Inner>
      </Outer>
    )
  }
}

export default Expenses;