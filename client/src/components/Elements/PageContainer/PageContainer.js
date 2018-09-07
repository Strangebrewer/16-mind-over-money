import React from "react";
import { FastFade } from "../../Fade";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import Title from "../Title";
import "./PageContainer.css";

export const PageContainer = props => (
  < React.Fragment >
    <div className="sticky-footer-container">
      <div className="sticky-footer-inner">
        {props.location.state
          ? props.location.state.notFirst
            ? <Title />
            : null
          : <FastFade array={[<Title />]} />}
        <Navbar
          loggedIn={props.loggedIn}
          username={props.username}
          home={props.home}
          admin={props.admin}
          manage={props.manage}
          fadeToHome={props.fadeToHome}
          fadeToAdmin={props.fadeToAdmin}
          fadeToManage={props.fadeToManage}
          logout={props.logout}
        />
        <div className="main-container" style={props.pageStyle}>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  </React.Fragment >
);