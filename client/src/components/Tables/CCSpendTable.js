import React, { Fragment } from "react";
import { API, Tables } from "../../utils";
import Modal from "../../components/Elements/Modal";
import LoadingModal from "../../components/Elements/LoadingModal";
import ReactTable from "react-table";
import dateFns from "date-fns";
import "react-table/react-table.css";
import "./Tables.css";

export class CCSpendTable extends React.Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    names: [],
    ccSpend: []
  };

  componentDidMount() {
    this.getCCSpend();
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
            data={this.state.ccSpend}
            filterable
            columns={this.state.names}
            defaultSorted={[{ id: "addDate", asc: true }]}
            defaultPageSize={5}
            className="-striped -highlight"
          />
        </div>
      </Fragment>
    )
  }
}