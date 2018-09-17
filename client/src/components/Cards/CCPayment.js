import React, { Fragment } from "react";
import { Input } from "../Elements/Form";
import Currency from "react-currency-formatter";

export const CCPayment = props => (
  <div className="cc-form-div">
    <h6>{props.cardName}</h6>
    {props.expenses
      ? (
        <Fragment>
          <p>Payment for {props.expenses.month}, {props.expenses.year}:
            <span><Currency quantity={parseFloat(props.cardExpense)} /></span>
          </p>
          <p>Spend for {props.expenses.month}, {props.expenses.year}:
            {props.ccSpend
              ? <span><Currency quantity={parseFloat(props.cardSpend)} /></span>
              : <span>$0.00</span>
            }
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <p>Payment for {props.month}, {props.year}:
            <span>$0.00</span>
          </p>
          <p>Spend for {props.month}, {props.year}:
            {props.ccSpend
              ? <span><Currency quantity={parseFloat(props.cardSpend)} /></span>
              : <span>$0.00</span>
            }
          </p>
        </Fragment>
      )
    }
    <Input
      value={props.value}
      onChange={props.handleInputChange}
      name={props.name}
      type="text"
    />
  </div>
);