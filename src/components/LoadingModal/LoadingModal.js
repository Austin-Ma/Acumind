import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './LoadingModal.css';

import loadIcon from "../../assets/loadicon.svg";

class LoadingModal extends Component {
  getMessage() {
    return "Please be patient as we analyze your data.";
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={null} className="loading-modal" contentClassName="loading-modal-content" external={null}>
          <ModalHeader>Loading...</ModalHeader>
          <ModalBody className="loading-body">
            <img src={loadIcon} alt="loading" width="100em" height="100em" />
            <br />
            <p>{this.getMessage()}</p>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default LoadingModal;