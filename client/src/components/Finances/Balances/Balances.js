import React from "react";
import Currency from "react-currency-formatter";
import "./Balances.css";

export const Balances = props => (
  <div className="balances-container">
    <div onClick={props.toggleBalances}>
      <h2>BALANCES</h2>
    </div>
    <div className="balances-inner">
      {props.accountNames.checking
        ? <h4>{props.accountNames.checking}: <span><Currency quantity={parseFloat(props.balances.checking)} /></span></h4>
        : null}
      {props.accountNames.cc1
        ? <h4>{props.accountNames.cc1}: <span><Currency quantity={parseFloat(props.balances.cc1)} /></span></h4>
        : null}
      {props.accountNames.cc2
        ? <h4>{props.accountNames.cc2}: <span><Currency quantity={parseFloat(props.balances.cc2)} /></span></h4>
        : null}
      {props.accountNames.cc3
        ? <h4>{props.accountNames.cc3}: <span><Currency quantity={parseFloat(props.balances.cc3)} /></span></h4>
        : null}
      {props.accountNames.cc4
        ? <h4>{props.accountNames.cc4}: <span><Currency quantity={parseFloat(props.balances.cc4)} /></span></h4>
        : null}
      {props.accountNames.cc5
        ? <h4>{props.accountNames.cc5}: <span><Currency quantity={parseFloat(props.balances.cc5)} /></span></h4>
        : null}
      {props.accountNames.cc6
        ? <h4>{props.accountNames.cc6}: <span><Currency quantity={parseFloat(props.balances.cc6)} /></span></h4>
        : null}
      {props.accountNames.savings1
        ? <h4>{props.accountNames.savings1}: <span><Currency quantity={parseFloat(props.balances.savings1)} /></span></h4>
        : null}
      {props.accountNames.savings2
        ? <h4>{props.accountNames.savings2}: <span><Currency quantity={parseFloat(props.balances.savings2)} /></span></h4>
        : null}
      {props.accountNames.savings3
        ? <h4>{props.accountNames.savings3}: <span><Currency quantity={parseFloat(props.balances.savings3)} /></span></h4>
        : null}
    </div>
  </div>
);