import React from "react";
import Currency from "react-currency-formatter";
import { Outer, Inner } from "../../Elements/Containers";
import "./Balances.css";

export const Balances = props => (
  <Outer addedClass="balances-container">
    <h2>BALANCES</h2>
    <Inner addedClass="balances-inner">
      {Object.keys(props.accountNames).filter(key => (
        props.accountNames[key] != undefined
        && (
          `${key}`.includes('cc')
          || `${key}`.includes('sav')
          || `${key}`.includes('check')
        )
      )).map((key, index) => (
        <h4 key={`${key}-${index}`}>{props.accountNames[key]}: <span><Currency quantity={parseFloat(props.balances[key])} /></span></h4>
      ))}
    </Inner>
  </Outer>
);