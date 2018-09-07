import React from "react";
import { Label } from "./Label";
import "./Form.css"

export const Input = props => (
  <div className="group group-input">
    <div className={`${props.name}-names-div names-div`}>
      {props.tooltip
        ? <span className={`${props.name}-input-tooltip input-tooltip`}>{props.tooltip}</span>
        : null}
      <Label htmlFor={props.name}>{props.label}</Label>
    </div>
    <input {...props} />
  </div>
);