import React from "react";
import "./Container.css";

export const Inner = props => (
  <div className={`inner-container ${props.addedClass}`} {...props}>{props.children}</div>
);