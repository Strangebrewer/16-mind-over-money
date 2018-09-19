import React from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../../components/Forms/LoginForm";
import InitialBalances from "../../components/Forms/InitialBalances";
import InitialNames from "../../components/Forms/InitialNames";
import { Finances } from "../../components/Finances";
import { Page } from "../../components/Elements/Containers";
import { FastFade } from "../../components/Fade";
import { API, Helpers } from "../../utils";

class Home extends React.Component {
  state = {
    accounts: {},
    HomeStyle: {},
    redirectAdmin: false,
    redirectManage: false,
    username: ""
  };

  // this function as well as this.state.accounts gets passed to any route that needs to know the user's chosen account names.
  getUserAccounts = () => {
    API.getUserAccounts()
      .then(response => {
        const accounts = Helpers.processAccountNames(response.data);
        this.setState({
          accounts: accounts,
          username: response.data.username
        });

      })
      .catch(err => console.log(err));
  }

  fadeToAdmin = () => {
    this.setState({
      HomeStyle: {
        opacity: "0",
        transition: 'opacity .5s ease-in-out'
      }
    })
    setTimeout(() => {
      this.setState({ redirectAdmin: true });
    }, 600);
  }

  fadeToManage = () => {
    this.setState({
      HomeStyle: {
        opacity: "0",
        transition: 'opacity .5s ease-in-out'
      }
    })
    setTimeout(() => {
      this.setState({ redirectManage: true });
    }, 600);
  }

  render() {
    if (this.state.redirectAdmin)
      return <Redirect to={{ pathname: "/admin", state: { notFirst: true } }} />
    else if (this.state.redirectManage)
      return <Redirect to={{ pathname: "/manage", state: { notFirst: true } }} />


    return (
      <Page
        loggedIn={this.props.loggedIn}
        location={this.props.location}
        pageStyle={this.state.HomeStyle}
        username={this.props.accounts.username
          ? this.props.accounts.username
          : this.state.username
        }
        home={this.props.loggedIn}
        fadeToAdmin={this.fadeToAdmin}
        fadeToManage={this.fadeToManage}
        logout={this.props.logout}
      >
        {this.props.loggedIn
          ? (this.props.setupNames && this.props.setupBalances
            ? (
              <Finances
                accounts={this.state.accounts}
                all={this.state.accounts}
                getUserAccounts={this.getUserAccounts}
              />
            ) : (this.props.setupNames
              ? (
                <InitialBalances
                  accounts={this.state.accounts}
                  getUserAccounts={this.getUserAccounts}
                  updateUser={this.props.updateUser}
                />
              ) : <InitialNames updateUser={this.props.updateUser} />
            )
          ) : <FastFade array={[<LoginForm updateUser={this.props.updateUser} />]} />
        }
      </Page>
    );
  }
}

export default Home;