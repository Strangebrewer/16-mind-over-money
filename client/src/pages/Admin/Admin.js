import React from "react";
import { Redirect } from "react-router-dom";
import { Page } from "../../components/Elements/Containers";
import { ButtonArray } from "../../components/Elements/ButtonArray";
import { FastFade } from "../../components/Fade";
import { API, Helpers } from "../../utils";
import { ExpensesTable, CCTable, CheckingTable, DetailTable, CCSpendTable } from "../../components/Tables/";

class Admin extends React.Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    username: "",
    loadingModalOpen: false,
    redirectHome: false,
    redirectManage: false,
    adminStyle: {},
    expenses: false,
    otherExpenses: false,
    checking: false,
    cc1: false,
    cc2: false,
    cc3: false,
    cc4: false,
    cc5: false,
    cc6: false,
    ccSpend: false,
    detail1: false,
    detail2: false,
    detail3: false,
    detail4: false,
    detail5: false
  };

  componentDidMount() {
    API.getUserAccounts()
      .then(res => {
        const accounts = Helpers.processAccountNames(res.data);
        this.setState({ accounts: accounts })
      })
  }

  toggleTables = () => {
    this.setState({ expenses: true });
  }

  toggleExpenses = () => {
    this.setState({ expenses: !this.state.expenses });
  };

  toggleOtherExpenses = () => {
    this.setState({ otherExpenses: !this.state.otherExpenses });
  }

  toggleCCTable = (cc) => {
    switch (cc) {
      case 'cc1': this.setState({ cc1: !this.state.cc1 }); break;
      case 'cc2': this.setState({ cc2: !this.state.cc2 }); break;
      case 'cc3': this.setState({ cc3: !this.state.cc3 }); break;
      case 'cc4': this.setState({ cc4: !this.state.cc4 }); break;
      case 'cc5': this.setState({ cc5: !this.state.cc5 }); break;
      case 'cc6': this.setState({ cc6: !this.state.cc6 }); break;
      default: console.log("No CC match found.");
    }
  }

  toggleCcSpendTable = () => {
    this.setState({ ccSpend: !this.state.ccSpend })
  }

  toggleCheckingTable = () => {
    this.setState({ checking: !this.state.checking })
  }

  toggleDetailTable = detail => {
    switch (detail) {
      case 'detail1': this.setState({ detail1: !this.state.detail1 }); break;
      case 'detail2': this.setState({ detail2: !this.state.detail2 }); break;
      case 'detail3': this.setState({ detail3: !this.state.detail3 }); break;
      case 'detail4': this.setState({ detail4: !this.state.detail4 }); break;
      case 'detail5': this.setState({ detail5: !this.state.detail5 }); break;
      default: console.log("No Detail match found.");
    }
  }

  hideAllTables = () => {
    this.setState({
      expenses: false,
      otherExpenses: false,
      checking: false,
      cc1: false,
      cc2: false,
      cc3: false,
      cc4: false,
      cc5: false,
      cc6: false,
      ccSpend: false,
      detail1: false,
      detail2: false,
      detail3: false,
      detail4: false,
      detail5: false
    });
  };

  fadeToHome = () => {
    this.setState({
      adminStyle: {
        opacity: "0",
        transition: 'opacity .5s ease-in-out'
      }
    });
    setTimeout(() => {
      this.setState({ redirectHome: true })
    }, 510)
  }

  fadeToManage = () => {
    this.setState({
      adminStyle: {
        opacity: "0",
        transition: 'opacity .5s ease-in-out'
      }
    });
    setTimeout(() => {
      this.setState({ redirectManage: true })
    }, 510)
  }

  render() {
    if (this.state.redirectHome)
      return <Redirect to={{ pathname: "/", state: { notFirst: true } }} />
    else if (this.state.redirectManage)
      return <Redirect to={{ pathname: "/manage", state: { notFirst: true } }} />

    const accounts = this.state.accounts;

    return (
      <Page
        loggedIn={this.props.loggedIn}
        location={this.props.location}
        pageStyle={this.state.adminStyle}
        username={this.props.accounts.username}
        admin={true}
        fadeToHome={this.fadeToHome}
        fadeToManage={this.fadeToManage}
        logout={this.props.logout}
      >
        {accounts
          ? (
            <FastFade
              array={[
                <div className="admin-btn-array">
                  <h2>Admin Options</h2>
                  <ButtonArray
                    accounts={accounts}
                    toggleExpenses={this.toggleExpenses}
                    toggleOtherExpenses={this.toggleOtherExpenses}
                    toggleCcSpendTable={this.toggleCcSpendTable}
                    toggleCCTable={this.toggleCCTable}
                    toggleCheckingTable={this.toggleCheckingTable}
                    toggleDetailTable={this.toggleDetailTable}
                    hideAllTables={this.hideAllTables}
                  />
                </div>,

                <div className="table-container">
                  {this.state.expenses
                    ? <ExpensesTable expenseType="bills" />
                    : null}

                  {this.state.otherExpenses
                    ? <ExpensesTable expenseType="otherExpenses" />
                    : null}

                  {this.state.cc1
                    ? <CCTable accounts={accounts} cardName={accounts.cc1} whichCC='cc1' />
                    : null}

                  {this.state.cc2
                    ? <CCTable accounts={accounts} cardName={accounts.cc2} whichCC='cc2' />
                    : null}

                  {this.state.cc3
                    ? <CCTable accounts={accounts} cardName={accounts.cc3} whichCC='cc3' />
                    : null}

                  {this.state.cc4
                    ? <CCTable accounts={accounts} cardName={accounts.cc4} whichCC='cc4' />
                    : null}

                  {this.state.cc5
                    ? <CCTable accounts={accounts} cardName={accounts.cc5} whichCC='cc5' />
                    : null}

                  {this.state.cc6
                    ? <CCTable accounts={accounts} cardName={accounts.cc6} whichCC='cc6' />
                    : null}

                  {this.state.ccSpend
                    ? <CCSpendTable accounts={accounts} expenseType='ccSpend' />
                    : null}

                  {this.state.checking
                    ? <CheckingTable accounts={accounts} checkingName={accounts.checking} />
                    : null}

                  {this.state.detail1
                    ? <DetailTable accounts={accounts} detailName={accounts.detail1} whichDetail='detail1' />
                    : null}

                  {this.state.detail2
                    ? <DetailTable accounts={accounts} detailName={accounts.detail2} whichDetail='detail2' />
                    : null}

                  {this.state.detail3
                    ? <DetailTable accounts={accounts} detailName={accounts.detail3} whichDetail='detail3' />
                    : null}

                  {this.state.detail4
                    ? <DetailTable accounts={accounts} detailName={accounts.detail4} whichDetail='detail4' />
                    : null}

                  {this.state.detail5
                    ? <DetailTable accounts={accounts} detailName={accounts.detail5} whichDetail='detail5' />
                    : null}
                </div>
              ]}
            />
          ) : null}
      </Page>
    );
  }
}

export default Admin;