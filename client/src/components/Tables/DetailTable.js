import React, { Component, Fragment } from "react";
import { API } from "../../utils";
import { Textarea } from "../Elements/Form";
import Modal from "../../components/Elements/Modal";
import LoadingModal from "../../components/Elements/LoadingModal";
import ReactTable from "react-table";
import dateFns from "date-fns";
import "react-table/react-table.css";
import "./Tables.css";

export class DetailTable extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    detailRecords: []
  };

  componentDidMount() {
    this.getDetailRecords(this.props.whichDetail);
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

  getDetailRecords = category => {
    API.getDetailRecords(category)
      .then(res => {
        res.data.forEach(rec => {
          rec.date = dateFns.format(`${rec.month} ${rec.day}, ${rec.year}`, 'YYYY-MM-DD');
        });
        this.setState({ detailRecords: res.data })
      })
  }

  deleteRow = row => {
    row.detail = this.props.whichDetail;
    API.deleteDetailRecord(row)
      .then(res => {
        res.data.forEach(rec => {
          rec.date = dateFns.format(`${rec.month} ${rec.day}, ${rec.year}`, 'YYYY-MM-DD');
        });
        this.setState({ detailRecords: res.data });
      }).catch(err => console.log(err));

  }

  noteModal = row => {
    this.setModal({
      body: <Textarea name="note" onChange={this.handleInputChange} rows="10" cols="80" defaultValue={row.note}></Textarea>,
      buttons:
        <Fragment>
          <button onClick={() => this.submitNote(row, this.state.note)}>Submit</button>
          <button onClick={this.closeModal}>Nevermind</button>
        </Fragment>
    })
  }

  submitNote = (row, note) => {
    row.newNote = note;
    row.detail = this.props.whichDetail;
    this.closeModal();
    this.toggleLoadingModal();
    API.updateDetailNote(row)
      .then(res => {
        //  keep the loading modal up for at least .5 seconds, otherwise it's just a screen flash and looks like a glitch.
        setTimeout(this.toggleLoadingModal, 500);
        // success modal after the loading modal is gone.
        setTimeout(this.setModal, 500, {
          body: <h3>Database successfully updated</h3>,
          buttons: <button onClick={this.closeModal}>OK</button>
        });
        //  query the db and reload the table
        this.getDetailRecords(this.props.whichDetail);
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
            data={this.state.detailRecords}
            filterable
            columns={[
              {
                Header: `${this.props.detailName} Spending`,
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
                    Header: "Amount",
                    accessor: "amount",
                    Cell: row => {
                      if (row.original.payment) return "";
                      else return `$${parseFloat(row.value).toFixed(2)}`;
                    }
                  },
                  {
                    Header: "Method",
                    accessor: "source",
                    Cell: row => {
                      switch (row.value) {
                        case 'cc1': row.value = this.props.accounts.cc1; break;
                        case 'cc2': row.value = this.props.accounts.cc2; break;
                        case 'cc3': row.value = this.props.accounts.cc3; break;
                        case 'cc4': row.value = this.props.accounts.cc4; break;
                        case 'cc5': row.value = this.props.accounts.cc5; break;
                        case 'cc6': row.value = this.props.accounts.cc6; break;
                        case 'checking': row.value = this.props.accounts.checking; break;
                        default: return row.value;
                      }
                      return row.value;
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