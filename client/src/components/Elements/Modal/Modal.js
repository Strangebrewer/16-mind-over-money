import React from "react";
import ModalContent from "./ModalContent";
import "./Modal.css";

class Modal extends React.Component {

  render() {
    if(!this.props.show) {
      return null;
    }
    return (
      <div className="modal">
        <ModalContent
          body={this.props.body}
          buttons={this.props.buttons}
          closeModal={this.props.closeModal}
        />
      </div>
    )
  }

}

export default Modal;