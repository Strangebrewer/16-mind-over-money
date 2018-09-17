import React from "react";
import "./Container.css";

export const Outer = props => (
  <div className={`outer-container ${props.addedClass}`} {...props}>{props.children}</div>
);