import React, { Fragment } from "react";
import "./Navbar.css"

export const Navbar = props => (
  < div className="navbar" >
    {props.loggedIn
      ? (
        <Fragment>
          <h4>Hello, <span>{props.username}</span></h4>
          {props.admin
            ? (
              <Fragment>
                <button onClick={props.fadeToHome}>Go to Main Page</button>&nbsp;|&nbsp;
                <button onClick={props.fadeToManage}>Manage Accounts</button>&nbsp;|&nbsp;
              </Fragment>
            ) : null}
          {props.manage
            ? (
              <Fragment>
                <button onClick={props.fadeToHome}>Go to Main Page</button>&nbsp;|&nbsp;
                <button onClick={props.fadeToAdmin}>Go To Admin Page</button>&nbsp;|&nbsp;
              </Fragment>
            ) : null}
          {props.home
            ? (
              <Fragment>
                <button onClick={props.fadeToAdmin}>Go To Admin Page</button>&nbsp;|&nbsp;
                <button onClick={props.fadeToManage}>Manage Accounts</button>&nbsp;|&nbsp;
              </Fragment>
            ) : null}
          <button onClick={props.logout}>Logout</button>
        </Fragment>
      ) : null}
  </div >
);