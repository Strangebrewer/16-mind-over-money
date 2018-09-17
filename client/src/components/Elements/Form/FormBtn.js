import React from "react";
import "./Form.css"

export const FormBtn = props => (
  <button {...props} className="form-btn">
    {props.value}
  </button>
);