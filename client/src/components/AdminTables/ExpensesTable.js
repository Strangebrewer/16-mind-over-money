import React, { Component, Fragment } from "react";
import { API, Tables } from "../../utils";
import Modal from "../../components/Elements/Modal";
import LoadingModal from "../../components/Elements/LoadingModal";
import ReactTable from "react-table";
import dateFns from "date-fns";
import "react-table/react-table.css";
import "./AdminTables.css";

export class ExpensesTable extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
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
          element.addDate = dateFns.format(`${element.month} 01, ${element.year}`, 'X')
        })
        this.setState({
          names: names,
          expenses: expPlusAvg
        })
      })
  }

  closeModal = () => {
    this.setState({
      modal: { isOpen: false }
    });
  };

  setModal = (modalInput) => {
    this.setState({
      modal: {
        isOpen: true,
        body: modalInput.body,
        buttons: modalInput.buttons
      }
    });
  };

  //  Toggles a non-dismissable loading modal to prevent clicks while database ops are ongoing
  toggleLoadingModal = () => {
    this.setState({
      loadingModalOpen: !this.state.loadingModalOpen
    });
  };

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Fragment>
        <Modal
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
        />
        <LoadingModal show={this.state.loadingModalOpen} />

        <div className="main-table-container">
          {this.state.expenses.length > 0
            ? <ReactTable
              data={this.state.expenses}
              filterable
              columns={this.state.names}
              defaultSorted={[
                {
                  id: "addDate",
                  asc: true
                }
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
            : null}

        </div>
      </Fragment>
    )
  }
}