import React from "react";
import Currency from "react-currency-formatter";

export const CCPayment = props => (
  <div className="cc-form-div">
    <h6>{props.card}</h6>
    <p>Payment for {
      props.expenses
        ? props.expenses.month
        : props.month
    }, {
        props.expenses
          ? props.expenses.year
          : props.year
      }: <span>{
        props.expenses ?
          <Currency quantity={parseFloat(props.expenseCard)} />
          : '$0.00'
      }</span></p>
    <p>Spend for {
      props.expenses
        ? props.expenses.month
        : props.month
    }, {
        props.expenses
          ? props.expenses.year
          : props.year
      }: <span>{
        props.ccSpend
          ? <Currency quantity={parseFloat(props.spendCard)} />
          : '$0.00'
      }</span></p>
    <input
      value={props.value}
      onChange={props.handleInputChange}
      name={props.name}
      type="text"
    />
  </div>
);