import React from "react";
import { Label } from "./Label";
import "./Form.css"

export const Textarea = props => (
  <div className="group group-textarea">
    <textarea rows="3" {...props} />
    <span className="highlight"></span>
    <span className="bar"></span>
    <Label htmlFor={props.name}>{props.label}</Label>
  </div>
);

//  Enter a className here if you want all textareas to look the same.