import React, { Component, Fragment } from "react";
import Modal from "../../Elements/Modal";
import { API } from "../../../utils";
import "./ChangePwForm.css";

class ChangePwForm extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    accounts: {},
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  }

  componentWillUnmount() {
    if (this.props.usernameChanged) {
      this.props.updateUser({
        auth: true,
        state: {
          accounts: this.state.accounts
        }
      })
    }
  }

  // closeModal = () => {
  //   this.setState({
  //     modal: { isOpen: false }
  //   });
  // }

  // setModal = (modalInput) => {
  //   this.setState({
  //     modal: {
  //       isOpen: true,
  //       body: modalInput.body,
  //       buttons: modalInput.buttons
  //     },
  //     accounts: modalInput.accounts
  //   });
  // }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = () => {
    API.changePwOrUsername({
      username: this.state.username,
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword
    })
      .then(res => {
        if (res.data.error === "Incorrect password.") {
          this.props.setModal({
            body: <h4>Current password does not match our records.</h4>,
            buttons: <button onClick={this.props.closeModal}>Try Again</button>
          });
        } else if (res.data.error === "Username taken.") {
          this.props.setModal({
            body: <h4>That username is already taken.</h4>,
            buttons: <button onClick={this.props.closeModal}>Try Again</button>
          })
        } else if (res.data.user && res.data.didUpdate) {
          this.props.setModal({
            body: <h4>Username and password successfully changed.</h4>,
            buttons: <button onClick={this.props.closeModal}>OK</button>,
            accounts: res.data.user
          });
          this.props.updateUserName(res.data.user.username)
        } else if (res.data.user) {
          this.props.setModal({
            body: <h4>Username successfully changed.</h4>,
            buttons: <button onClick={this.props.closeModal}>OK</button>,
            accounts: res.data.user
          });
          this.props.updateUserName(res.data.user.username)
        } else if (res.data.pwChange) {
          this.props.setModal({
            body: <h4>Password successfully changed.</h4>,
            buttons: <button onClick={this.props.closeModal}>OK</button>
          })
        }

      })
  }

  render() {
    return (
      <Fragment>
        {/* <Modal
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
        /> */}
        <div className="name-and-pw-container">
          <div onClick={this.props.toggleNameAndPw}>
            <h2>NAME &amp; PASSWORD</h2>
          </div>
          <div className="name-and-pw-inner" style={this.props.nameAndPwStyle}>
            <div className="name-and-pw-instructions">
              <ul>
                <li>You can change your password and your username here</li>
                <li>If you only want to change your username, leave the password fields blank</li>
                <li>If you only want to change your password, leave the username field blank</li>
                <li>Or, you can change them both at the same time</li>
              </ul>
            </div>
            <input
              value={this.state.username}
              onChange={this.handleInputChange}
              name="username"
              type="text"
              placeholder="New Username"
            />
            <input
              value={this.state.currentPassword}
              onChange={this.handleInputChange}
              name="currentPassword"
              type="password"
              placeholder="Current Password"
            />
            <input
              value={this.state.newPassword}
              onChange={this.handleInputChange}
              name="newPassword"
              pattern="^[\S]{4,}$"
              type="password"
              placeholder="New Password"
            />
            <input
              value={this.state.confirmPassword}
              onChange={this.handleInputChange}
              name="confirmPassword"
              pattern={this.state.newPassword}
              type="password"
              placeholder="Confirm New Password"
            />
            <button
              disabled={
                this.state.newPassword !== this.state.confirmPassword
                || (this.state.currentPassword && (!this.state.newPassword || !this.state.confirmPassword))
                || (!this.state.currentPassword && (this.state.newPassword || this.state.confirmPassword))
                || (!this.state.username && !this.state.currentPassword && !this.state.newPassword && !this.state.confirmPassword)
              }
              onClick={this.handleFormSubmit}
            >
              Submit
        </button>
          </div>
        </div>
      </Fragment>
    )
  }
};

export default ChangePwForm;