import React, { Component, Fragment } from "react";
import { API } from "../../utils";
import Modal from "../../components/Elements/Modal";
import LoadingModal from "../../components/Elements/LoadingModal";
import ReactTable from "react-table";
import dateFns from "date-fns";
import "react-table/react-table.css";
import "./AdminTables.css";

export class CheckingTable extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    checking: []
  };

  componentDidMount() {
    this.getAllChecking();
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

  getAllChecking = () => {
    API.getAllChecking()
      .then(res => {
        res.data.forEach(rec => {
          rec.date = parseInt(dateFns.format(`${rec.month} ${rec.day}, ${rec.year}`, 'X'));
        });
        this.setState({
          checking: res.data
        })
      })
  }

  deleteRow = row => {
    API.deleteCheckingRecord(row)
      .then(res => {
        res.data.forEach(rec => {
          rec.date = parseInt(dateFns.format(`${rec.month} ${rec.day}, ${rec.year}`, 'X'));
        });
        this.setState({
          checking: res.data
        });
      }).catch(err => console.log(err));
  }

  noteModal = row => {
    this.setModal({
      body:
        <Fragment>
          <textarea name="note" onChange={this.handleInputChange} rows="10" cols="80" defaultValue={row.note}></textarea>
        </Fragment>,
      buttons:
        <Fragment>
          <button onClick={() => this.submitNote(row, this.state.note)}>Submit</button>
          <button onClick={this.closeModal}>Nevermind</button>
        </Fragment>
    })
  }

  submitNote = (row, note) => {
    row.newNote = note;
    row.source = "checking";
    this.closeModal();
    this.toggleLoadingModal();
    API.updateNote(row)
      .then(() => {
        //  keep the loading modal up for at least .5 seconds, otherwise it's just a screen flash and looks like a glitch.
        setTimeout(this.toggleLoadingModal, 500);
        // success modal after the loading modal is gone.
        setTimeout(this.setModal, 500, {
          body: <h3>Database successfully updated</h3>,
          buttons: <button onClick={this.closeModal}>OK</button>
        });
        //  query the db and reload the table
        this.getAllChecking();
      })
      .catch(err => console.log(err));
  }

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
          <ReactTable
            data={this.state.checking}
            filterable
            columns={[
              {
                Header: `${this.props.checkingName} Details`,
                columns: [
                  {
                    Header: "",
                    id: "",
                    width: 80,
                    Cell: row => {
                      return (
                        <div className="table-icon-div">
                          <div className="fa-trash-alt-div table-icon-inner-div">
                            <i onClick={() => this.deleteRow(row.original)} className="table-icon fas fa-trash-alt fa-lg"></i>
                            <span className="fa-trash-alt-tooltip table-tooltip">delete record</span>
                          </div>
                          <div className="fa-sticky-note-div table-icon-inner-div">
                            <i onClick={() => this.noteModal(row.original)} className="table-icon far fa-sticky-note fa-lg"></i>
                            <span className="fa-sticky-note-tooltip table-tooltip">see/edit notes</span>
                          </div>
                        </div>
                      )
                    }
                  },
                  {
                    Header: "Date",
                    accessor: "date",
                    Cell: row => {
                      console.log(row);
                      // row.id = row.date;
                      return dateFns.format(row.value * 1000, "MMM Do YYYY");
                    }
                  },
                  {
                    Header: "Category",
                    accessor: "category",
                    Cell: row => {
                      if (row.value === "detail1") return this.props.accounts.detail1;
                      if (row.value === "detail2") return this.props.accounts.detail2;
                      if (row.value === "detail3") return this.props.accounts.detail3;
                      if (row.value === "detail4") return this.props.accounts.detail4;
                      if (row.value === "detail5") return this.props.accounts.detail5;
                      if (row.value === "deleted") return "deleted";
                    }
                  },
                  {
                    Header: "Debit",
                    accessor: "amount",
                    Cell: row => {
                      if (row.original.income) return "";
                      else return `$${parseFloat(row.value).toFixed(2)}`;
                    }
                  },
                  {
                    Header: "Income",
                    accessor: "amount",
                    Cell: row => {
                      if (row.original.income) return `$${parseFloat(row.value).toFixed(2)}`;
                    }
                  },
                  {
                    Header: "Description",
                    accessor: "description"
                  }
                ]
              }
            ]}
            defaultPageSize={5}
            className="-striped -highlight"
          />
        </div>
      </Fragment>
    )
  }
}