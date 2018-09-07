import React from "react";
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
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name
    this.setState({
      [name]: value
    });
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
    this.setState({
      savingsAmount: ""
    })
  };

  render() {
    const { checking, savings1, savings2, savings3, cc1, cc2, cc3, cc4, cc5, cc6, detail1, detail2, detail3, detail4, detail5 } = this.props.accountNames;
    const month = this.props.month;
    const year = this.props.year;

    return (
      <React.Fragment>
        <div className="transactions-container" style={this.props.transTopStyle}>
          <h2>TRANSACTIONS</h2>
          <div className="transactions-inner" style={this.props.transStyle}>
            <div className="charge-form">
              <h6>Record Spending for {month} {year}</h6>
              <div className="charge-inner">
                <div>
                  <label htmlFor="source">Account:</label>
                  <select id="source-select" name="source" onChange={this.handleInputChange}>
                    <option></option>
                    {checking ? <option value="checking">{checking}</option> : null}
                    {cc1 ? <option value="cc1">{cc1}</option> : null}
                    {cc2 ? <option value="cc2">{cc2}</option> : null}
                    {cc3 ? <option value="cc3">{cc3}</option> : null}
                    {cc4 ? <option value="cc4">{cc4}</option> : null}
                    {cc5 ? <option value="cc5">{cc5}</option> : null}
                    {cc6 ? <option value="cc6">{cc6}</option> : null}
                  </select>
                </div>
                <div>
                  <label htmlFor="category">Category:</label>
                  <select id="category-select" name="category" onChange={this.handleInputChange}>
                    <option>(optional)</option>
                    <option value="income">Income</option>
                    {detail1 ? <option value="detail1">{detail1}</option> : null}
                    {detail2 ? <option value="detail2">{detail2}</option> : null}
                    {detail3 ? <option value="detail3">{detail3}</option> : null}
                    {detail4 ? <option value="detail4">{detail4}</option> : null}
                    {detail5 ? <option value="detail5">{detail5}</option> : null}
                  </select>
                </div>
                <div>
                  <label htmlFor="day">Day:</label>
                  <input
                    value={this.state.day}
                    onChange={this.handleInputChange}
                    maxLength="2"
                    name="day"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="amount">Amount:</label>
                  <input
                    value={this.state.amount}
                    onChange={this.handleInputChange}
                    name="amount"
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <input
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    name="description"
                    type="text"
                  />
                </div>
                <div>
                  <button
                    disabled={
                      !this.state.source
                      || !this.state.day
                      || !this.state.amount
                    }
                    onClick={this.handleTransaction}
                  >
                    submit
                </button>
                </div>
              </div>
            </div>

            <div className="savings-trans-container">
              <h6>Savings Transfer for {month} {year}</h6>
              <div className="savings-trans-inner">
                <div>
                  <label htmlFor="source">Select an account:</label>
                  <select id="source-select" name="savingsSource" onChange={this.handleInputChange}>
                    <option></option>
                    {savings1 ? <option value="savings1">{savings1}</option> : null}
                    {savings2 ? <option value="savings2">{savings2}</option> : null}
                    {savings3 ? <option value="savings3">{savings3}</option> : null}
                  </select>
                </div>
                <div>
                  <label>Enter amount:</label>
                  <input
                    value={this.state.savingsAmount}
                    onChange={this.handleInputChange}
                    name="savingsAmount"
                    type="text"
                  />
                </div>
                <div>
                  <button
                    disabled={!this.state.savingsSource}
                    onClick={this.savingsToChecking}
                  >
                    submit
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Transactions;