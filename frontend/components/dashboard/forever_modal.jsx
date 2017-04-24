import React from 'react';
import Modal from 'react-modal';
import NotebookIndexContainer from './notebooks/notebook_index_container';
import { hashHistory } from 'react-router';
//
// const appElement = document.getElementById('root');
//
// Modal.setAppElement(appElement);


class ForeverModal extends React.Component {
  constructor(props){
    super(props);
    Modal.setAppElement('#root');
    this.state = { modalIsOpen: true};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(){
    this.setState( {modalIsOpen: true} );
  }

  closeModal(){
    this.setState( {modalIsOpen: false} );
  }
  render(){
    return(
      <Modal
          isOpen={ this.state.modalIsOpen }
          contentLabel="Example Modal"
          onRequestClose={this.closeModal}
        >
        <NotebookIndexContainer/ >
      </Modal>
    );
  }
}

export default ForeverModal;
