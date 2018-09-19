import React from "react";
import { API, Tables } from "../../utils";
import ReactTable from "react-table";
import dateFns from "date-fns";
import "react-table/react-table.css";
import "./Tables.css";

export class ExpensesTable extends React.Component {
  state = {
    names: [],
    expenses: []
  };

  componentDidMount() {
    this.getAllExpenses();
  }

  getAllExpenses = () => {
    API.getAllExpenses()
      .then(res => {
        const names = Tables.processColumns(res.data, this.props.expenseType);
        const expPlusAvg = Tables.processAverages(res.data, res.data.Expenses);
        res.data.Expenses.forEach(element => {
          element.addDate = dateFns.format(`${element.month} 01, ${element.year}`, 'YYYY-MM-DD')
        })
        this.setState({
          names: names,
          expenses: expPlusAvg
        })
      })
  }

  render() {
    return (
      <div className="main-table-container">
        {this.state.expenses.length > 0
          ? <ReactTable
            data={this.state.expenses}
            filterable
            columns={this.state.names}
            defaultSorted={[{ id: "addDate", asc: true }]}
            defaultPageSize={5}
            className="-striped -highlight"
          />
          : null}
      </div>
    )
  }
};