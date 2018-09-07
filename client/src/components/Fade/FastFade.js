import React from "react";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import "./Fade.css";

export const FastFade = props => (
  <CSSTransitionGroup
    transitionName="fast-fade"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeaveTimeout={500}
  >
    {props.array.map((item, i) => (
      <React.Fragment key={i}>
        {item}
      </React.Fragment>
    ))}
  </CSSTransitionGroup>
);