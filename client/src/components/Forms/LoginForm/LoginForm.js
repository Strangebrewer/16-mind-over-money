import React, { Component, Fragment } from "react";
import Modal from "../../Elements/Modal";
import { API } from "../../../utils";
import dateFns from "date-fns";
import "./LoginForm.css";

class LoginForm extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    style: {
      loginForm: {}
    },
    loginUsername: "",
    loginPassword: "",
    signupUsername: "",
    signupPassword: "",
    confirmPassword: "",
    loadingModalOpen: false
  }

  closeModal = () => {
    this.setState({
      modal: { isOpen: false }
    });
  }

  setModal = (modalInput) => {
    this.setState({
      modal: {
        isOpen: true,
        body: modalInput.body,
        buttons: modalInput.buttons
      }
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    API.login({
      username: this.state.loginUsername,
      password: this.state.loginPassword
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            style: {
              loginForm: {
                opacity: '0',
                transition: 'opacity .5s ease-in-out'
              }
            }
          })
          // update App.js state
          setTimeout(() => {
            this.props.updateUser({
              auth: true,
              state: {
                loggedIn: true,
                accounts: res.data,
                username: res.data.username,
                setupNames: res.data.setup_names,
                setupBalances: res.data.setup_balances,
                month: res.data.month
              }
            });
          }, 1000)
        }
      }).catch(err => {
        this.setModal({
          body: <h4>Username and/or password do not match anything in our database</h4>
        })
      });
  }

  handleSignupSubmit = event => {
    event.preventDefault();
    const month = dateFns.format(new Date(), 'MMM');
    const year = dateFns.format(new Date(), 'YYYY');
    //request to server to add a new username/password
    API.signup({
      username: this.state.signupUsername,
      password: this.state.signupPassword,
      month: month,
      year: year
    })
      .then(res => {
        if (res.status === 200) {

          //  If signup was successful, log the user in and setRedirect, which will send them either back where they came from, or to where they were going (the 'to' part of this is currently irrelevant, but may again be relevant if there are any links to protected routes that show to non-logged in users - such as cart functionality that requires a login before checkout)
          API.login({
            username: this.state.signupUsername,
            password: this.state.signupPassword
          }).then(res => {
            this.setState({
              style: {
                loginForm: {
                  opacity: '0',
                  transition: 'opacity .5s ease-in-out'
                }
              }
            })
            // update App.js state
            setTimeout(() => {
              this.props.updateUser({
                auth: true,
                state: {
                  loggedIn: true,
                  accounts: res.data,
                  setupNames: res.data.setup_names,
                  setupBalances: res.data.setup_balances,
                  month: res.data.month
                }
              });
            }, 1000)

          })
        } else {
          console.log('username already taken');
        }
      }).catch(error => {
        console.log('signup error: ');
        console.log(error);
      });
  }

  render() {
    return (
      <Fragment>
        <Modal
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
        />
        <div className="login-form-wrapper" style={this.state.style.loginForm}>
          <div className="login-form-container">
            <input tabIndex="-1" id="show-login-form" name="event-controller" type="radio"/>
            <label htmlFor="show-login-form" id="login-visibility-controller">Login</label>
            <section className="login-content">
              <form>
                <input
                  value={this.state.loginUsername}
                  onChange={this.handleInputChange}
                  name="loginUsername"
                  type="text"
                  placeholder="username"
                />
                <input
                  value={this.state.loginPassword}
                  onChange={this.handleInputChange}
                  name="loginPassword"
                  type="password"
                  placeholder="password"
                />
                <button
                  disabled={(
                    !this.state.loginUsername ||
                    (
                      !this.state.loginPassword ||
                      !/^[\S]{4,}$/.test(this.state.loginPassword)
                    )
                  )}
                  onClick={this.handleLoginSubmit}
                >
                  Submit
                </button>
              </form>
            </section>
          </div>

          <div className="signup-form-container">
            <input tabIndex="-1" id="show-signup-form" name="event-controller" type="radio"/>
            <label htmlFor="show-signup-form" id="signup-visibility-controller">Signup</label>
            <section className="signup-content">
              <form>
                <input
                  value={this.state.signupUsername}
                  onChange={this.handleInputChange}
                  name="signupUsername"
                  type="text"
                  placeholder="username"
                />
                <input
                  value={this.state.signupPassword}
                  onChange={this.handleInputChange}
                  name="signupPassword"
                  type="password"
                  placeholder="password"
                />
                <input
                  value={this.state.confirmPassword}
                  onChange={this.handleInputChange}
                  name="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                />
                <button
                  disabled={(
                    !this.state.signupUsername ||
                    (
                      !this.state.signupPassword ||
                      !/^[\S]{4,}$/.test(this.state.signupPassword)
                    )
                  ) || (this.state.signupPassword !== this.state.confirmPassword)}
                  onClick={this.handleSignupSubmit}
                >
                  Submit
                </button>
              </form>
            </section>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default LoginForm;