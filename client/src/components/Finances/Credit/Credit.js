import React, { Fragment } from "react";
import { FormBtn } from "../../Elements/Form";
import { Inner, Outer } from "../../Elements/Containers";
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
    this.setState({ [name]: value });
  };

  handleInputClick = event => {
    this.setState({ income: event.target.checked })
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
    const accountNames = this.props.accountNames;
    const expenses = this.props.expenses;
    const ccSpend = this.props.ccSpend;

    return (
      <Fragment>
        <Outer addedClass="cc-payments-container">
          <h2>CC PAYMENTS</h2>
          <Inner addedClass="cc-payments-inner">
            {Object.keys(this.props.accountNames)
              .filter(key => (
                this.props.accountNames[key] !== null
                && `${key}`.includes('cc'))
              )
              .map((key, index) => (
                <CCPayment
                  key={`${key}-${index}`}
                  value={this.state[key]}
                  name={`${key}`}
                  handleInputChange={this.handleInputChange}
                  month={this.props.month}
                  year={this.props.year}
                  cardName={accountNames[key]}
                  cardExpense={expenses[key]}
                  cardSpend={ccSpend[key]}
                  expenses={expenses}
                  ccSpend={ccSpend}
                />
              ))}

            <div>
              <FormBtn
                disabled={
                  !this.state.cc1
                  && !this.state.cc2
                  && !this.state.cc3
                  && !this.state.cc4
                  && !this.state.cc5
                  && !this.state.cc6
                }
                onClick={this.creditCardPayment}
                value="submit"
              />
            </div>

          </Inner>
        </Outer>
      </Fragment >
    )
  }
};

export default Credit;