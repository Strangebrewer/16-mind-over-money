import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { PageContainer } from "../../components/Elements/PageContainer";
// import Modal from "../../components/Elements/Modal";
// import LoadingModal from "../../components/Elements/LoadingModal";
import { FastFade } from "../../components/Fade";
import { API, Helpers } from "../../utils";
import "./Admin.css";
import { ExpensesTable, CCTable, CheckingTable, DetailTable, CCSpendTable } from "../../components/AdminTables/";

class Admin extends Component {
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
        this.setState({
          accounts: accounts
        })
      })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  toggleTables = () => {
    this.setState({
      expenses: true
    });
  }

  toggleExpenses = () => {
    this.setState({
      expenses: !this.state.expenses
    });
  };

  toggleOtherExpenses = () => {
    this.setState({
      otherExpenses: !this.state.otherExpenses
    });
  }

  toggleCCTable = (cc) => {
    if (cc === 'cc1') this.setState({ cc1: !this.state.cc1 });
    if (cc === 'cc2') this.setState({ cc2: !this.state.cc2 });
    if (cc === 'cc3') this.setState({ cc3: !this.state.cc3 });
    if (cc === 'cc4') this.setState({ cc4: !this.state.cc4 });
    if (cc === 'cc5') this.setState({ cc5: !this.state.cc5 });
    if (cc === 'cc6') this.setState({ cc6: !this.state.cc6 });
  }

  toggleCcSpendTable = () => {
    this.setState({
      ccSpend: !this.state.ccSpend
    })
  }

  toggleCheckingTable = () => {
    this.setState({
      checking: !this.state.checking
    })
  }

  toggleDetailTable = detail => {
    if (detail === 'detail1') this.setState({ detail1: !this.state.detail1 });
    if (detail === 'detail2') this.setState({ detail2: !this.state.detail2 });
    if (detail === 'detail3') this.setState({ detail3: !this.state.detail3 });
    if (detail === 'detail4') this.setState({ detail4: !this.state.detail4 });
    if (detail === 'detail5') this.setState({ detail5: !this.state.detail5 });
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
      <PageContainer
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
                  {/* checking, cc1, detail1, detail2, and savings1 are defaults */}
                  <div className="expenses-btns">
                    <h3>Monthly Expenses</h3>
                    <button onClick={this.toggleExpenses}>Bills</button>
                    <button onClick={this.toggleOtherExpenses}>CCs &amp; Savings</button>
                  </div>
                  <div className="credit-btns">
                    <h3>CC Spending</h3>
                    <button onClick={this.toggleCcSpendTable}>Totals</button>
                    {accounts.cc1 ? <button onClick={() => this.toggleCCTable("cc1")}>{accounts.cc1}</button> : null}
                    {accounts.cc2 ? <button onClick={() => this.toggleCCTable("cc2")}>{accounts.cc2}</button> : null}
                    {accounts.cc3 ? <button onClick={() => this.toggleCCTable("cc3")}>{accounts.cc3}</button> : null}
                    {accounts.cc4 ? <button onClick={() => this.toggleCCTable("cc4")}>{accounts.cc4}</button> : null}
                    {accounts.cc5 ? <button onClick={() => this.toggleCCTable("cc5")}>{accounts.cc5}</button> : null}
                    {accounts.cc6 ? <button onClick={() => this.toggleCCTable("cc6")}>{accounts.cc6}</button> : null}
                  </div>
                  <div className="checking-btns">
                    <h3>{accounts.checking} Details</h3>
                    <button onClick={this.toggleCheckingTable}>{accounts.checking}</button>
                  </div>
                  <div className="detail-btns">
                    <h1>Category Tracking</h1>
                    {accounts.detail1 ? <button onClick={() => this.toggleDetailTable("detail1")}>{accounts.detail1}</button> : null}
                    {accounts.detail2 ? <button onClick={() => this.toggleDetailTable("detail2")}>{accounts.detail2}</button> : null}
                    {accounts.detail3 ? <button onClick={() => this.toggleDetailTable("detail3")}>{accounts.detail3}</button> : null}
                    {accounts.detail4 ? <button onClick={() => this.toggleDetailTable("detail4")}>{accounts.detail4}</button> : null}
                    {accounts.detail5 ? <button onClick={() => this.toggleDetailTable("detail5")}>{accounts.detail5}</button> : null}
                  </div>
                  <div className="tables-forms-btns">
                    <button onClick={this.hideAllTables}>Clear Tables</button>
                  </div>
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
      </PageContainer>
    );
  }
}

export default Admin;