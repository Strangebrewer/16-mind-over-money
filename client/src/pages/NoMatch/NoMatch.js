import React, { Component, Fragment } from "react";
import "./NoMatch.css"


class NoMatch extends Component {
  render() {
    return (
      <Fragment>
        <div className="main-container" >
          <div className='body-container page-not-found'>
            <h1>404 Error: I think we are lost.</h1>
            <h2>The page you are looking for does not exist.</h2>
          </div>
        </div>
      </Fragment>
    )
  }
};

export default NoMatch;
