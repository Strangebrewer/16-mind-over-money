import React from "react";
import Currency from "react-currency-formatter";

export const SavingsDeposit = props => (
  <div className="savings-form-div">
    <h6>{props.savings}</h6>
    <p>Deposit for {
      props.expenses
        ? props.expenses.month
        : props.month}, {
          props.expenses
          ? props.expenses.year
          : props.year}: <span>{
            props.expenses
              ? <Currency quantity={parseFloat(props.expenseSavings)} />
              : '$0.00'}</span></p>
    <input
      value={props.value}
      onChange={props.handleInputChange}
      name={props.name}
      type="text"
    />
  </div>
)