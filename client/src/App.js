import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Manage from "./pages/Manage";
import NoMatch from "./pages/NoMatch";
import { API, AddPropsToRoute } from "./utils";
import "./App.css";

let isAuthenticated = false;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: "/",
            state: { from: props.location, notFirst: true }
          }} />
    }
  />
);

class App extends React.Component {
  state = {
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

  updateUser = userObject => {
    isAuthenticated = userObject.auth;
    this.setState(userObject.state);
  };

  logout = () => {
    API.logout()
      .then(() => {
        isAuthenticated = false;
        this.setState({ loggedIn: false });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
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
    );
  }
}

export default App;