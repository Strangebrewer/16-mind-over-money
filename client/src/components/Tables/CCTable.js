import React, { Fragment } from "react";
import { API } from "../../utils";
import { Textarea } from "../Elements/Form";
import Modal from "../../components/Elements/Modal";
import LoadingModal from "../../components/Elements/LoadingModal";
import ReactTable from "react-table";
import dateFns from "date-fns";
import "react-table/react-table.css";
import "./Tables.css";

export class CCTable extends React.Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    ccRecords: [],
    note: ""
  };

  componentDidMount() {
    this.getCCRecords(this.props.whichCC);
  }

  closeModal = () => {
    this.setState({ modal: { isOpen: false } });
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
    this.setState({ [name]: value });
  };

  getCCRecords = (card) => {
    API.getCcRecords(card)
      .then(res => {
        res.data.forEach(rec => {
          rec.date = dateFns.format(`${rec.month} ${rec.day}, ${rec.year}`, 'YYYY-MM-DD');
        });
        this.setState({ ccRecords: res.data })
      })
  }

  deleteRow = row => {
    row.card = this.props.whichCC;
    API.deleteCcRecord(row)
      .then(res => {
        res.data.forEach(rec => {
          rec.date = dateFns.format(`${rec.month} ${rec.day}, ${rec.year}`, 'YYYY-MM-DD');
        });
        this.setState({ ccRecords: res.data });
      }).catch(err => console.log(err));
  }

  noteModal = row => {
    const { note } = row;
    this.setModal({
      body:
        <Fragment>
          <Textarea name="note" onChange={this.handleInputChange} rows="10" cols="80" defaultValue={note}></Textarea>
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
    row.source = this.props.whichCC;
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
        this.getCCRecords(this.props.whichCC);
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
            data={this.state.ccRecords}
            filterable
            columns={[
              {
                Header: `${this.props.cardName} Spending`,
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
                    accessor: "date"
                  },
                  {
                    Header: "Category",
                    accessor: "category",
                    Cell: row => {
                      switch (row.value) {
                        case "detail1": row.value = this.props.accounts.detail1; break;
                        case "detail2": row.value = this.props.accounts.detail2; break;
                        case "detail3": row.value = this.props.accounts.detail3; break;
                        case "detail4": row.value = this.props.accounts.detail4; break;
                        case "detail5": row.value = this.props.accounts.detail5; break;
                        default: console.log("No Detail match found.");
                      }
                      return row.value;
                    }
                  },
                  {
                    Header: "Charge",
                    accessor: "amount",
                    Cell: row => {
                      if (row.original.payment) return "";
                      else return `$${parseFloat(row.value).toFixed(2)}`;
                    }
                  },
                  {
                    Header: "Payment",
                    accessor: "amount",
                    Cell: row => {
                      if (row.original.payment) return `$${parseFloat(row.value).toFixed(2)}`;
                    }
                  },
                  {
                    Header: "Description",
                    accessor: "description"
                  }
                ]
              }
            ]}
            defaultSorted={[{ id: "date", asc: true }]}
            defaultPageSize={5}
            className="-striped -highlight"
          />
        </div>
      </Fragment>
    )
  }
};