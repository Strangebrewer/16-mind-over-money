import React from "react";
import { Label } from "./Label";
import "./Form.css"

export const Select = props => (
  <div>
    <select>
      {props.children}
    </select>
    <Label htmlFor={props.name}>{props.label}</Label>
  </div>
)

//  Enter a className here if you want all Selects to look the same.