import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Manage from "./pages/Manage";
import AddPropsToRoute from "./components/AddPropsToRoute";
import NoMatch from "./pages/NoMatch";
import Modal from "./components/Elements/Modal";
import { API } from "./utils";
import "./App.css";

//  These are like normal locks on houses - they only keep honest people out.
//  These variables are visible (and therefore modifiable) from the frontend if you know what to look for.
//  Not a problem, though, if your API routes - and therefore your data - are protected on the backend.
let isAuthenticated = false;
// let isAdmin = false;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: "/",
            //  send a state object with the redirect to inform the login page of the intended destination
            //  'loginShow' is to make sure the login form shows instead of the signup form
            state: { from: props.location, notFirst: true }
          }} />
    }
  />
);

// const AdminRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAdmin
//         ? <Component {...props} />
//         : <Redirect
//           to={{
//             pathname: "/",
//             //  send a state object with the redirect to inform the login page of the intended destination
//             //  'loginShow' is to make sure the login form shows instead of the signup form
//             state: { from: props.location, loginShow: true }
//           }} />
//     }
//   />
// );

class App extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    loggedIn: false,
    username: null,
    changeNames: false,
    year: null,
    month: null,
    setupNames: false,
    setupBalances: false,
    accounts: {},
    financeExitStyle: {},
    adminExitStyle: {},
    redirectAdmin: false,
    redirectHome: false
  };

  closeModal = () => {
    this.setState({ modal: { isOpen: false } });
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

  toggleLoadingModal = () => {
    this.setState({
      loadingModalOpen: !this.state.loadingModalOpen
    });
  }

  updateUser = userObject => {
    isAuthenticated = userObject.auth;
    // isAdmin = userObject.admin;
    this.setState(userObject.state);
  };

  logout = () => {
    API.logout()
      .then(() => {
        isAuthenticated = false;
        // isAdmin = false;
        this.setState({
          loggedIn: false
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Fragment>
        <div className="inner-root">
          <div className="inner-container">
            <Modal
              show={this.state.modal.isOpen}
              closeModal={this.closeModal}
              body={this.state.modal.body}
              buttons={this.state.modal.buttons}
            />
            <Router>
              <Switch>
                <Route exact path="/"
                  render={routeProps => (
                    <Home
                      {...routeProps}
                      accounts={this.state.accounts}
                      loggedIn={this.state.loggedIn}
                      setupNames={this.state.setupNames}
                      setupBalances={this.state.setupBalances}
                      logout={this.logout}
                      updateUser={this.updateUser}
                    />
                  )}
                />
                <PrivateRoute path="/admin" component={AddPropsToRoute(Admin, {
                  accounts: this.state.accounts,
                  changeNames: this.state.changeNames,
                  loggedIn: this.state.loggedIn,
                  logout: this.logout,
                  updateUser: this.updateUser
                })}
                />
                <PrivateRoute path="/manage" component={AddPropsToRoute(Manage, {
                  accounts: this.state.accounts,
                  loggedIn: this.state.loggedIn,
                  logout: this.logout,
                  updateUser: this.updateUser
                })}
                />
                <Route
                  render={routeProps => (
                    <NoMatch
                      {...routeProps}
                      updateUser={this.updateUser}
                      loggedIn={this.state.loggedIn}
                      logout={this.logout}
                    />
                  )}
                />
              </Switch>
            </Router>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;