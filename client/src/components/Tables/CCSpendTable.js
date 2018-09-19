import React from "react";
import { API, Tables } from "../../utils";
import ReactTable from "react-table";
import dateFns from "date-fns";
import "react-table/react-table.css";
import "./Tables.css";

export class CCSpendTable extends React.Component {
  state = {
    names: [],
    ccSpend: []
  };

  componentDidMount() {
    this.getCCSpend();
  }

  getCCSpend = () => {
    API.getCCSpend()
      .then(res => {
        const names = Tables.processColumns(this.props.accounts, this.props.expenseType);
        const spendPlusAvg = Tables.processAverages(this.props.accounts, res.data);
        res.data.forEach(element => {
          element.addDate = dateFns.format(`${element.month} ${element.year}`, 'YYYY-MM-DD');
        });
        this.setState({
          names: names,
          ccSpend: spendPlusAvg
        })
      })
  }

  render() {
    return (
      <div className="main-table-container">
        <ReactTable
          data={this.state.ccSpend}
          filterable
          columns={this.state.names}
          defaultSorted={[{ id: "addDate", asc: true }]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
      </div>
    )
  }
}