import React, { Fragment } from "react";
import Currency from "react-currency-formatter";
import { Inner, Outer, Textbox } from "../../Elements/Containers";
import { Helpers } from "../../../utils";
import "./ThisMonth.css";

class ThisMonth extends React.Component {
  state = {
    accountNames: {},
    balances: {},
    ccSpend: {},
    expenses: {},
    checking: [],
    notes: {},
    month: "",
    year: ""
  }

  render() {
    const { checking, cc1, cc2, cc3, cc4, cc5, cc6, detail1, detail2, detail3, detail4, detail5 } = this.props.accountNames;

    const details = this.props.details;
    const debits = this.props.debits;
    const income = this.props.income;
    const expenses = this.props.expenses;
    const ccSpend = this.props.ccSpend;

    const outFlowObject = Helpers.processMonthOutgo(debits, expenses);
    const totalCcSpend = Helpers.processMonthCcSpend(ccSpend);
    const allDetails = Helpers.processMonthDetails(details);
    const totalIncome = Helpers.processMonthIncome(income);
    const ccDifference = Helpers.processMonthCcPayments(expenses, totalCcSpend);
    const chkDifference = Helpers.processChkDiff(outFlowObject.totalExpenses, totalIncome);
    const totalDifference = Helpers.processTotalSpending(chkDifference, ccDifference);

    return (
      <Fragment>
        <Outer addedClass="this-month-container">
          <h2>THIS MONTH</h2>
          <Inner addedClass="this-month-inner">
            <div>
              <h3>{checking}</h3>
              <Textbox addedClass="this-month-expenses">
                <h4>Total Income: <span><Currency quantity={parseFloat(totalIncome)} /></span></h4>
                <h4>Monthly Bills: <span><Currency quantity={parseFloat(outFlowObject.totalBills)} /></span></h4>
                <h4>Other Checking: <span><Currency quantity={parseFloat(outFlowObject.totalDebits)} /></span></h4>
                <h4>Total Outflow: <span><Currency quantity={parseFloat(outFlowObject.totalExpenses)} /></span></h4>
                {chkDifference.surplus ? <h4>Difference: <span className="green-text">+<Currency quantity={parseFloat(chkDifference.surplus)} /></span></h4> : null}
                {chkDifference.deficit ? <h4>Difference: <span className="red-text">-<Currency quantity={parseFloat(chkDifference.deficit)} /></span></h4> : null}
                {chkDifference.even ? <h4>Difference: <span>$0.00</span></h4> : null}
              </Textbox>
            </div>
            <div>
              <h3>Credit</h3>
              <Textbox addedClass="this-month-credit">
                {cc1 ? <h4>{cc1}: <span><Currency quantity={parseFloat(ccSpend.cc1)} /></span></h4> : null}
                {cc2 ? <h4>{cc2}: <span><Currency quantity={parseFloat(ccSpend.cc2)} /></span></h4> : null}
                {cc3 ? <h4>{cc3}: <span><Currency quantity={parseFloat(ccSpend.cc3)} /></span></h4> : null}
                {cc4 ? <h4>{cc4}: <span><Currency quantity={parseFloat(ccSpend.cc4)} /></span></h4> : null}
                {cc5 ? <h4>{cc5}: <span><Currency quantity={parseFloat(ccSpend.cc5)} /></span></h4> : null}
                {cc6 ? <h4>{cc6}: <span><Currency quantity={parseFloat(ccSpend.cc6)} /></span></h4> : null}
                <h4>Total Spend: <span><Currency quantity={parseFloat(totalCcSpend)} /></span></h4>
                <h4>Total Payments: <span><Currency quantity={parseFloat(ccDifference.totalCcPayments)} /></span></h4>
                {ccDifference.surplus ? <h4>Difference: <span className="green-text">+<Currency quantity={parseFloat(ccDifference.surplus)} /></span></h4> : null}
                {ccDifference.deficit ? <h4>Difference: <span className="red-text">-<Currency quantity={parseFloat(ccDifference.deficit)} /></span></h4> : null}
                {ccDifference.even ? <h4>Difference: <span>$0.00</span></h4> : null}
              </Textbox>
            </div>
            <div>
              <h3>Details</h3>
              <Textbox addedClass="this-month-details">
                {detail1 ? <h4>{detail1}: <span><Currency quantity={parseFloat(allDetails.detail1)} /></span></h4> : null}
                {detail2 ? <h4>{detail2}: <span><Currency quantity={parseFloat(allDetails.detail2)} /></span></h4> : null}
                {detail3 ? <h4>{detail3}: <span><Currency quantity={parseFloat(allDetails.detail3)} /></span></h4> : null}
                {detail4 ? <h4>{detail4}: <span><Currency quantity={parseFloat(allDetails.detail4)} /></span></h4> : null}
                {detail5 ? <h4>{detail5}: <span><Currency quantity={parseFloat(allDetails.detail5)} /></span></h4> : null}
              </Textbox>
            </div>
            <div>
              <h3>Summary</h3>
              <div className="this-month-net">
                <p>"{totalDifference.message}"</p>
              </div>
            </div>
          </Inner>
        </Outer>
      </Fragment>
    )
  }
}

export default ThisMonth;