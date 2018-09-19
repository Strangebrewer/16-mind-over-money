import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Page } from "../../components/Elements/Containers";
import ChangeBalances from "../../components/Forms/ChangeBalances";
import ChangeNames from "../../components/Forms/ChangeNames";
import ChangePwForm from "../../components/Forms/ChangePwForm";
import { FastFade } from "../../components/Fade";
import Modal from "../../components/Elements/Modal";
import LoadingModal from "../../components/Elements/LoadingModal";
import { API, Helpers } from "../../utils";
import "./Manage.css";

class Manage extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    loadingModalOpen: false,
    username: "",
    usernameChanged: false,
    redirectHome: false,
    redirectAdmin: false,
    manageStyle: {},
    accounts: {},
    balances: {},
  };

  // componentWillUnmount() {
  //   if (this.state.usernameChanged) {
  //     this.props.updateUser({
  //       auth: true,
  //       state: {
  //         accounts: this.state.username
  //       }
  //     })
  //   }
  // }

  componentDidMount() {
    this.getAccountNames();
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

  toggleLoadingModal = () => {
    this.setState({
      loadingModalOpen: !this.state.loadingModalOpen
    });
  }

  getAccountNames = () => {
    API.getUserAndBalances()
      .then(res => {
        const accounts = Helpers.processAccountNames(res.data);
        this.setState({
          accounts: accounts,
          balances: res.data.Balance,
          username: res.data.username
        })
      })
  };

  fadeToHome = () => {
    this.setState({
      manageStyle: {
        opacity: "0",
        transition: 'opacity .5s ease-in-out'
      }
    });
    setTimeout(() => {
      this.setState({ redirectHome: true })
    }, 510);
  };

  fadeToAdmin = () => {
    this.setState({
      manageStyle: {
        opacity: "0",
        transition: 'opacity .5s ease-in-out'
      }
    });
    setTimeout(() => {
      this.setState({ redirectAdmin: true });
    }, 510);
  };

  updateUserName = username => {
    console.log(username);
    this.setState({
      username: username,
      usernameChanged: true
    })
  }

  render() {
    const accounts = this.state.accounts;
    const balances = this.state.balances;

    if (this.state.redirectAdmin)
      return <Redirect to={{ pathname: "/admin", state: { notFirst: true } }} />
    else if (this.state.redirectHome)
      return <Redirect to={{ pathname: "/", state: { notFirst: true } }} />

    const manageArray = [
      <div className="form-container">
        <Modal
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
        />
        <LoadingModal show={this.state.loadingModalOpen} />
        <div className="manage-form-container">
          <ChangeBalances
            accounts={accounts}
            balances={balances}
            getAccountNames={this.getAccountNames}
            closeModal={this.closeModal}
            setModal={this.setModal}
            toggleLoadingModal={this.toggleLoadingModal}
          />
          <ChangePwForm
            updateUser={this.props.updateUser}
            updateUserName={this.updateUserName}
            usernameChanged={this.state.usernameChanged}
            closeModal={this.closeModal}
            setModal={this.setModal}
            toggleLoadingModal={this.toggleLoadingModal}
          />
        </div>
        <ChangeNames
          accounts={accounts}
          getAccountNames={this.getAccountNames}
          updateUser={this.props.updateUser}
          closeModal={this.closeModal}
          setModal={this.setModal}
          toggleLoadingModal={this.toggleLoadingModal}
        />
      </div>
    ]

    return (
      <Page
        loggedIn={this.props.loggedIn}
        username={this.state.username
          ? this.state.username
          : this.props.accounts.username}
        location={this.props.location}
        pageStyle={this.state.manageStyle}
        manage={true}
        fadeToAdmin={this.fadeToAdmin}
        fadeToHome={this.fadeToHome}
        logout={this.props.logout}
      >
        <FastFade array={manageArray} />
      </Page>
    )
  }
};

export default Manage;