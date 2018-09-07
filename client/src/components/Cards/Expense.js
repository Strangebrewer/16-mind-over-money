import React from "react";
import Currency from "react-currency-formatter";

export const Expense = props => (
  <div className="expense-form-div">
    <h6>{props.item}</h6>
    <p>Paid for {
      props.expenses
        ? props.expenses.month
        : props.month
    }, {
      props.expenses
          ? props.expenses.year
          : props.year
      }: <span>{
        props.expenses
          ? <Currency quantity={parseFloat(props.expenseItem)} />
          : '$0.00'
      }</span></p>
    <input
      value={props.value}
      onChange={props.handleInputChange}
      name={props.name}
      type="text"
    />
  </div>
)