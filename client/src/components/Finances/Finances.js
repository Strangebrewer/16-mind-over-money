import React, { Fragment } from "react";
import { API, Helpers } from "../../utils";
import Modal from "../../components/Elements/Modal";
import LoadingModal from "../../components/Elements/LoadingModal";
import dateFns from "date-fns";
import DateSelect from "./DateSelect";
import Credit from "./Credit";
import Expenses from "./Expenses";
import Savings from "./Savings";
import Transactions from "./Transactions";
import ThisMonth from "./ThisMonth";
import { Balances } from "./Balances";
import { FastFade } from "../Fade";
import "./Finances.css";

export class Finances extends React.Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    loadingModalOpen: false,
    mounted: false,
    accountNames: {},
    balances: {},
    ccSpend: {},
    checking: [],
    income: [],
    expenses: {},
    details: [],
    notes: {},
    month: "",
    year: ""
  }

  componentDidMount() {
    this.getFinances();
  }

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

  getFinances = () => {
    const month = dateFns.format(new Date(), 'MMM');
    const year = dateFns.format(new Date(), 'YYYY');

    API.getFinances(month, year)
      .then(res => {

        const income = res.data.transactions[1]
          .filter(chk => chk.income === true);
        const debits = res.data.transactions[1]
          .filter(chk => chk.income === false);

        this.setState({
          accountNames: res.data.current,
          balances: res.data.current.Balance,
          ccSpend: res.data.transactions[2][0],
          debits: debits,
          income: income,
          expenses: res.data.transactions[0][0],
          details: res.data.details,
          notes: res.data.current.Note,
          month: month,
          year: year,
          mounted: true
        });
      })
  }

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDateChange = (month, year) => {
    API.getFinances(month, year)
      .then(res => {

        const income = res.data.transactions[1]
          .filter(chk => chk.income === true);
        const debits = res.data.transactions[1]
          .filter(chk => chk.income === false);

        this.setState({
          accountNames: res.data.current,
          balances: res.data.current.Balance,
          ccSpend: res.data.transactions[2][0],
          debits: debits,
          income: income,
          expenses: res.data.transactions[0][0],
          details: res.data.details,
          notes: res.data.current.Note,
          month: month,
          year: year,
          mounted: true
        });
      })
      .catch(err => console.log(err));
  }

  updateExpenses = expenses => {
    const { month, year } = this.state;
    const expenseObject = Helpers.processExpenses(expenses);
    API.updateExpenses(month, year, expenseObject)
      .then(res => {
        this.setState({
          expenses: res.data[1],
          balances: res.data[0]
        });
        this.setModal({
          body: <h4>Database has been updated.</h4>,
          buttons: <button onClick={this.closeModal}>OK</button>
        })
      })
      .catch(err => console.log(err));
  }

  updateSavings = savings => {
    const { month, year } = this.state;
    const savingsObject = Helpers.processSavings(savings);

    API.updateSavings(month, year, savingsObject)
      .then(res => {
        this.setState({
          balances: res.data[0],
          expenses: res.data[1]
        })
        this.setModal({
          body: <h4>Database has been updated.</h4>,
          buttons: <button onClick={this.closeModal}>OK</button>
        })
      })
      .catch(err => console.log(err));
  }

  savingsToChecking = transactions => {
    const transactionObject = Helpers.processSavingsToChecking(transactions);
    API.savingsToChecking(transactionObject)
      .then(res => {
        this.setState({ balances: res.data });
        this.setModal({
          body: <h4>Database has been updated.</h4>,
          buttons: <button onClick={this.closeModal}>OK</button>
        })
      })
      .catch(err => console.log(err));

  }

  creditCardPayment = payment => {
    const { month, year } = this.state;
    const paymentObject = Helpers.processCcPayment(payment);

    API.creditCardPayment(month, year, paymentObject)
      .then(res => {
        this.setState({
          balances: res.data[0],
          expenses: res.data[1]
        })
        this.setModal({
          body: <h4>Database has been updated.</h4>,
          buttons: <button onClick={this.closeModal}>OK</button>
        })
      })
      .catch(err => console.log(err));
  }

  handleTransaction = charge => {
    const { month, year } = this.state;
    if (charge.category === 'income') {
      charge.income = true;
      charge.category = "";
    }
    if (charge.category === '(optional)') charge.category = "";
    if (charge.source === 'checking') {
      const checkingObject = Helpers.processChecking(charge);
      API.updateChecking(month, year, checkingObject)
        .then(res => {
          const income = res.data[1].filter(chk => chk.income === true);
          const debits = res.data[1].filter(chk => chk.income === false);
          this.setState({
            balances: res.data[0],
            income: income,
            debits: debits,
            details: [res.data[2], res.data[3], res.data[4], res.data[5], res.data[6]]
          });
          this.setModal({
            body: <h4>Database has been updated.</h4>,
            buttons: <button onClick={this.closeModal}>OK</button>
          })
        })
        .catch(err => console.log(err));
    }
    else {
      API.creditCardCharge(month, year, charge)
        .then(res => {
          this.setState({
            balances: res.data[0],
            ccSpend: res.data[1],
            details: [res.data[2], res.data[3], res.data[4], res.data[5], res.data[6]]
          })
          this.setModal({
            body: <h4>Database has been updated.</h4>,
            buttons: <button onClick={this.closeModal}>OK</button>
          })
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const { month, year } = this.state;
    const financesArray = [
      <Modal
        show={this.state.modal.isOpen}
        closeModal={this.closeModal}
        body={this.state.modal.body}
        buttons={this.state.modal.buttons}
      />,
      <LoadingModal show={this.state.loadingModalOpen} />,
      <div className="logged-in">
        <p className="current-date">Currently looking at <span>{month} {year}</span></p>
        <DateSelect
          month={this.state.month}
          year={this.state.year}
          handleDateChange={this.handleDateChange}
        />
        <Transactions
          month={this.state.month}
          year={this.state.year}
          accountNames={this.state.accountNames}
          expenses={this.state.expenses}
          updateChecking={this.updateChecking}
          savingsToChecking={this.savingsToChecking}
          handleTransaction={this.handleTransaction}
        />
        <div className="left-column">
          <Balances
            accountNames={this.state.accountNames}
            balances={this.state.balances}
          />
          <ThisMonth
            accountNames={this.state.accountNames}
            balances={this.state.balances}
            expenses={this.state.expenses}
            ccSpend={this.state.ccSpend}
            income={this.state.income}
            debits={this.state.debits}
            details={this.state.details}
          />
        </div>
        <Expenses
          month={this.state.month}
          year={this.state.year}
          accountNames={this.state.accountNames}
          expenses={this.state.expenses}
          ccSpend={this.state.ccSpend}
          updateExpenses={this.updateExpenses}
        />
        <Credit
          month={this.state.month}
          year={this.state.year}
          accountNames={this.state.accountNames}
          expenses={this.state.expenses}
          ccSpend={this.state.ccSpend}
          creditCardPayment={this.creditCardPayment}
        />
        <Savings
          month={this.state.month}
          year={this.state.year}
          accountNames={this.state.accountNames}
          expenses={this.state.expenses}
          updateSavings={this.updateSavings}
        />
      </div>
    ]

    return (
      <Fragment>
        {this.state.mounted
          ? <FastFade array={financesArray} />
          : null}
      </Fragment>
    )
  }

}