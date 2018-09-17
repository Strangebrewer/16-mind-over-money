import React from "react";
import "./Container.css";

export const Textbox = props => (
  <div className={`textbox-container ${props.addedClass}`} {...props}>{props.children}</div>
)