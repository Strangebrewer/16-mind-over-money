import React from "react";
import "./Form.css";

export const Option = props => (
  <option {...props}>{props.children}</option>
)