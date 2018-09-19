import React, { Fragment } from "react";
import "./ButtonArray.css";

export const ButtonArray = props => (
  <Fragment>
    <div className='buttons'>
      <button onClick={props.toggleExpenses}>Bills</button>
      <button onClick={props.toggleOtherExpenses}>CCs &amp; Savings</button>
      <button onClick={props.toggleCheckingTable}>{props.accounts.checking}</button>
      <button onClick={props.toggleCcSpendTable}>CC Totals</button>
      <button onClick={props.hideAllTables}>Clear Tables</button>
    </div>
    
    <div className='buttons'>
      {Object.keys(props.accounts).map((key, index) => (
        props.accounts[key] !== null && `${key}`.includes("cc")
          ? <button key={index} onClick={() => props.toggleCCTable(`${key}`)}>{props.accounts[key]}</button>
          : null
      ))}
    </div>

    <div className='buttons'>
      {Object.keys(props.accounts).map((key, index) => (
        props.accounts[key] !== null && `${key}`.includes("det")
          ? <button key={index} onClick={() => props.toggleDetailTable(`${key}`)}>{props.accounts[key]}</button>
          : null
      ))}
    </div>
  </Fragment >
);