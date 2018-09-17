import React, { Component } from "react";
import "./Modal.css";
import onClickOutside from "react-onclickoutside";

class ModalContent extends Component {

  handleClickOutside = () => {
    this.props.closeModal();
  }

  render() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-close" onClick={this.props.closeModal}>&times;</span>
        </div>
        <div className="modal-body">
          {this.props.body}
          <div className="modal-btn-div">
            {this.props.buttons}
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    )
  }

}

export default onClickOutside(ModalContent);