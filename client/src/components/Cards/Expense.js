import React, { Fragment } from "react";
import { Input } from "../Elements/Form";
import Currency from "react-currency-formatter";

export const Expense = props => (
  <div className="expense-form-div">
    <h6>{props.item}</h6>
    <p>Paid for {
      props.expenses
        ? (
          <Fragment>
            {props.expenses.month}, {props.expenses.year}:
            <span><Currency quantity={parseFloat(props.expenseItem)} /></span>
          </Fragment>
        ) : (
          <Fragment>
            {props.month}, {props.year}:
            <span>$0.00</span>
          </Fragment>
        )
    }</p>
    <Input
      value={props.value}
      onChange={props.handleInputChange}
      name={props.name}
      type="text"
    />
  </div>
)