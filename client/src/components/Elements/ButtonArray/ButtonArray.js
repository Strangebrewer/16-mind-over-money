import React from "react";
import "./ButtonArray.css";

export class ButtonArray extends React.Component {
  state = {

  }

  render() {
    const accounts = this.props.accounts;
    return (
      <React.Fragment>
        <div class='buttons'>
          <button onClick={this.props.toggleExpenses}>Bills</button>
          <button onClick={this.props.toggleOtherExpenses}>CCs &amp; Savings</button>
          <button onClick={this.props.toggleCheckingTable}>{accounts.checking}</button>
          <button onClick={this.props.toggleCcSpendTable}>Totals</button>
          <button onClick={this.props.hideAllTables}>Clear Tables</button>
        </div>
        <div class='buttons'>
          {accounts.cc1
            ? <button onClick={() => this.props.toggleCCTable("cc1")}>{accounts.cc1}</button>
            : null}
          {accounts.cc2
            ? <button onClick={() => this.props.toggleCCTable("cc2")}>{accounts.cc2}</button>
            : null}
          {accounts.cc3
            ? <button onClick={() => this.props.toggleCCTable("cc3")}>{accounts.cc3}</button>
            : null}
          {accounts.cc4
            ? <button onClick={() => this.props.toggleCCTable("cc4")}>{accounts.cc4}</button>
            : null}
          {accounts.cc5
            ? <button onClick={() => this.props.toggleCCTable("cc5")}>{accounts.cc5}</button>
            : null}
          {accounts.cc6
            ? <button onClick={() => this.props.toggleCCTable("cc6")}>{accounts.cc6}</button>
            : null}
        </div>
        <div class='buttons'>
          {accounts.detail1
            ? <button onClick={() => this.props.toggleDetailTable("detail1")}>{accounts.detail1}</button>
            : null}
          {accounts.detail2
            ? <button onClick={() => this.props.toggleDetailTable("detail2")}>{accounts.detail2}</button>
            : null}
          {accounts.detail3
            ? <button onClick={() => this.props.toggleDetailTable("detail3")}>{accounts.detail3}</button>
            : null}
          {accounts.detail4
            ? <button onClick={() => this.props.toggleDetailTable("detail4")}>{accounts.detail4}</button>
            : null}
          {accounts.detail5
            ? <button onClick={() => this.props.toggleDetailTable("detail5")}>{accounts.detail5}</button>
            : null}
        </div>
      </React.Fragment >
    )
  }
}