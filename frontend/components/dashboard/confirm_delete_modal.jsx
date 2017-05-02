import React from 'react';
import Modal from 'react-modal';

class ConfirmDeleteModal extends React.Component{
  constructor(props){
    super(props);
    Modal.setAppElement('#root');
  }

  render(){
    return(
      <Modal
          className="delete-modal"
          overlayClassName="delete-modal-overlay"
          isOpen={ this.props.modalIsOpen }
          shouldCloseOnOverlayClick = {true}
          contentLabel="delete-model-content"
          onRequestClose={ this.props.closeModal }
        >
        <div className="confirm-delete-modal">
          <h1>Confirm delete?</h1>
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </div>
      </Modal>
    );
  }
}

export default ConfirmDeleteModal;
