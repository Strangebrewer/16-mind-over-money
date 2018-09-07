import React from "react";
import "./Navbar.css"

export const Navbar = props => (
  < div className="navbar" >
    {
      props.loggedIn
        ? (
          <React.Fragment>
            <h4>Hello, <span>{props.username}</span></h4>
            {
              props.admin
                ? (
                  <React.Fragment>
                    <button onClick={props.fadeToHome}>Go to Main Page</button>&nbsp;|&nbsp;
                    <button onClick={props.fadeToManage}>Manage Accounts</button>&nbsp;|&nbsp;
                  </React.Fragment>
                ) : (
                  props.manage
                    ? (
                      <React.Fragment>
                        <button onClick={props.fadeToHome}>Go to Main Page</button>&nbsp;|&nbsp;
                        <button onClick={props.fadeToAdmin}>Go To Admin Page</button>&nbsp;|&nbsp;
                      </React.Fragment>
                    ) : (
                      props.home
                        ? (
                          <React.Fragment>
                            <button onClick={props.fadeToAdmin}>Go To Admin Page</button>&nbsp;|&nbsp;
                            <button onClick={props.fadeToManage}>Manage Accounts</button>&nbsp;|&nbsp;
                          </React.Fragment>
                        ) : null
                    )
                )
            }
            <button onClick={props.logout}>Logout</button>
          </React.Fragment>
        ) : null
    }
  </div >
);