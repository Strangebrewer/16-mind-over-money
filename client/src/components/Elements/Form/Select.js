import React from "react";
import "./Form.css";

export const Select = props => (
  <select {...props}>
    {props.children}
  </select>
);