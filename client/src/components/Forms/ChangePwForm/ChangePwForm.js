import React from "react";
import { Inner, Outer, Textbox } from "../../Elements/Containers";
import { FormBtn, Input } from "../../Elements/Form";
import { API } from "../../../utils";
import "./ChangePwForm.css";

class ChangePwForm extends React.Component {
  state = {
    accounts: {},
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = () => {
    API.changePwOrUsername({
      username: this.state.username,
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword
    }).then(res => {
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
        this.props.updateUserName(res.data.user)
      } else if (res.data.user) {
        this.props.setModal({
          body: <h4>Username successfully changed.</h4>,
          buttons: <button onClick={this.props.closeModal}>OK</button>,
          accounts: res.data.user
        });
        this.props.updateUserName(res.data.user)
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
      <Outer addedClass="name-and-pw-container">
        <h2>NAME &amp; PASSWORD</h2>
        <Inner addedClass="name-and-pw-inner">
          <Textbox addedClass="name-and-pw-instructions">
            <ul>
              <li>You can change your password and your username here</li>
              <li>If you only want to change your username, leave the password fields blank</li>
              <li>If you only want to change your password, leave the username field blank</li>
              <li>Or, you can change them both at the same time</li>
            </ul>
          </Textbox>
          <Input
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            type="text"
            placeholder="New Username"
          />
          <Input
            value={this.state.currentPassword}
            onChange={this.handleInputChange}
            name="currentPassword"
            type="password"
            placeholder="Current Password"
          />
          <Input
            value={this.state.newPassword}
            onChange={this.handleInputChange}
            name="newPassword"
            pattern="^[\S]{4,}$"
            type="password"
            placeholder="New Password"
          />
          <Input
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
            name="confirmPassword"
            pattern={this.state.newPassword}
            type="password"
            placeholder="Confirm New Password"
          />
          <FormBtn
            disabled={
              this.state.newPassword !== this.state.confirmPassword
              || (this.state.currentPassword && (!this.state.newPassword || !this.state.confirmPassword))
              || (!this.state.currentPassword && (this.state.newPassword || this.state.confirmPassword))
              || (!this.state.username && !this.state.currentPassword && !this.state.newPassword && !this.state.confirmPassword)
            }
            onClick={this.handleFormSubmit}
            value="submit"
          />
        </Inner>
      </Outer>
    )
  }
};

export default ChangePwForm;