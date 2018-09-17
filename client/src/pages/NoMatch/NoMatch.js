import React, { Component, Fragment } from "react";
import "./NoMatch.css"


class NoMatch extends Component {
  render() {
    return (
      <div className="main-container" >
        <div className='body-container page-not-found'>
          <h1>404 Error: I think you are lost.</h1>
          <h2>The page you are looking for does not exist.</h2>
          <h3>Turn back while you still can.</h3>
        </div>
      </div>
    )
  }
};

export default NoMatch;
