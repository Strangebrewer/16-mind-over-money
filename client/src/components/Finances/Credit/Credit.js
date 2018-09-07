import React from "react";
import { CCPayment } from "../../Cards";
import "./Credit.css";

class Credit extends React.Component {
  state = {
    cc1: "",
    cc2: "",
    cc3: "",
    cc4: "",
    cc5: "",
    cc6: ""
  }

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleInputClick = event => {
    this.setState({
      income: event.target.checked
    })
  }

  creditCardPayment = () => {
    this.props.creditCardPayment(this.state);
    this.setState({
      cc1: "",
      cc2: "",
      cc3: "",
      cc4: "",
      cc5: "",
      cc6: ""
    })
  }

  render() {
    const { cc1, cc2, cc3, cc4, cc5, cc6 } = this.props.accountNames;
    const expenses = this.props.expenses;
    const ccSpend = this.props.ccSpend;

    return (
      <React.Fragment>

        <div className="cc-payments-container" style={this.props.creditTopStyle}>
          {cc1 || cc2 || cc3 || cc4 || cc5 || cc6
            ? (
              <React.Fragment>
                <div onClick={this.props.toggleCcPayments}>
                  <h2>CC PAYMENTS</h2>
                </div>
                <div className="cc-payments-inner" style={this.props.creditStyle}>
                  {cc1
                    ? <CCPayment
                      value={this.state.cc1}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      card={cc1}
                      name="cc1"
                      expenses={expenses}
                      ccSpend={ccSpend}
                      expenseCard={expenses.cc1}
                      spendCard={ccSpend.cc1}
                    />
                    : null}

                  {cc2
                    ? <CCPayment
                      value={this.state.cc2}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      card={cc2}
                      name="cc2"
                      expenses={expenses}
                      ccSpend={ccSpend}
                      expenseCard={expenses.cc2}
                      spendCard={ccSpend.cc2}
                    /> : null}

                  {cc3
                    ? <CCPayment
                      value={this.state.cc3}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      card={cc3}
                      name="cc3"
                      expenses={expenses}
                      ccSpend={ccSpend}
                      expenseCard={expenses.cc3}
                      spendCard={ccSpend.cc3}
                    /> : null}

                  {cc4
                    ? <CCPayment
                      value={this.state.cc4}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      card={cc4}
                      name="cc4"
                      expenses={expenses}
                      ccSpend={ccSpend}
                      expenseCard={expenses.cc4}
                      spendCard={ccSpend.cc4}
                    /> : null}

                  {cc5
                    ? <CCPayment
                      value={this.state.cc5}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      card={cc5}
                      name="cc5"
                      expenses={expenses}
                      ccSpend={ccSpend}
                      expenseCard={expenses.cc5}
                      spendCard={ccSpend.cc5}
                    /> : null}

                  {cc6
                    ? <CCPayment
                      value={this.state.cc6}
                      handleInputChange={this.handleInputChange}
                      month={this.props.month}
                      year={this.props.year}
                      card={cc6}
                      name="cc6"
                      expenses={expenses}
                      ccSpend={ccSpend}
                      expenseCard={expenses.cc6}
                      spendCard={ccSpend.cc6}
                    /> : null}
                  {cc1 || cc2 || cc3 || cc4 || cc5 || cc6
                    ? <button
                      disabled={
                        !this.state.cc1
                        && !this.state.cc2
                        && !this.state.cc3
                        && !this.state.cc4
                        && !this.state.cc5
                        && !this.state.cc6
                      }
                      onClick={this.creditCardPayment}
                    >
                      submit
                    </button>
                    : null}
                </div>
              </React.Fragment>
            ) : null}
        </div>
      </React.Fragment >
    )
  }
};

export default Credit;