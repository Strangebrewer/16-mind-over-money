import React from "react";
import { Expense } from "../../Cards";
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
    this.setState({
      [name]: value
    });
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
    const { shelter, util1, util2, util3, util4, util5, car, insurance, other1, other2, other3 } = this.props.accountNames;
    const expenses = this.props.expenses;

    return (
      <React.Fragment>
        <div className="expenses-container" style={this.props.expensesTopStyle}>
          {shelter || util1 || util2 || util3 || util4 || util5 || car || insurance || other1 || other2 || other3
            ? (
              <React.Fragment>
                <div onClick={this.props.toggleExpenses}>
                  <h2>EXPENSES</h2>
                </div>
                <div className="expenses-inner" style={this.props.expensesStyle}>
                  {shelter
                    ? <Expense
                      value={this.state.shelter}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={shelter}
                      name="shelter"
                      expenses={expenses}
                      expenseItem={expenses.shelter}
                    /> : null}

                  {util1
                    ? <Expense
                      value={this.state.util1}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={util1}
                      name="util1"
                      expenses={expenses}
                      expenseItem={expenses.util1}
                    /> : null}

                  {util2
                    ? <Expense
                      value={this.state.util2}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={util2}
                      name="util2"
                      expenses={expenses}
                      expenseItem={expenses.util2}
                    /> : null}

                  {util3
                    ? <Expense
                      value={this.state.util3}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={util3}
                      name="util3"
                      expenses={expenses}
                      expenseItem={expenses.util3}
                    /> : null}

                  {util4
                    ? <Expense
                      value={this.state.util4}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={util4}
                      name="util4"
                      expenses={expenses}
                      expenseItem={expenses.util4}
                    /> : null}

                  {util5
                    ? <Expense
                      value={this.state.util5}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={util5}
                      name="util5"
                      expenses={expenses}
                      expenseItem={expenses.util5}
                    /> : null}

                  {car
                    ? <Expense
                      value={this.state.car}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={car}
                      name="car"
                      expenses={expenses}
                      expenseItem={expenses.car}
                    /> : null}

                  {insurance
                    ? <Expense
                      value={this.state.insurance}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={insurance}
                      name="insurance"
                      expenses={expenses}
                      expenseItem={expenses.insurance}
                    /> : null}

                  {other1
                    ? <Expense
                      value={this.state.other1}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={other1}
                      name="other1"
                      expenses={expenses}
                      expenseItem={expenses.other1}
                    /> : null}

                  {other2
                    ? <Expense
                      value={this.state.other2}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={other2}
                      name="other2"
                      expenses={expenses}
                      expenseItem={expenses.other2}
                    /> : null}

                  {other3
                    ? <Expense
                      value={this.state.other3}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      item={other3}
                      name="other3"
                      expenses={expenses}
                      expenseItem={expenses.other3}
                    /> : null}

                  {shelter || util1 || util2 || util3 || util4 || util5 || car || insurance || other1 || other2 || other3
                    ? <div>
                      <button
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
}

export default Expenses;