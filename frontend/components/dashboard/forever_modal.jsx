import React from 'react';
import Modal from 'react-modal';
import NotebookIndexContainer from './notebooks/notebook_index_container';
import TagIndexContainer from './tags/tag_index_container';
import { hashHistory } from 'react-router';


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
    hashHistory.goBack();
  }
  render(){
    let modal;
    switch(this.props.route.modalType){
      case "notebooks": {
        modal = <NotebookIndexContainer />;
        break;
      }
      case "tags": {
        modal = <TagIndexContainer />;
        break;
      }
      default: {
        modal = "";
        break;
      }
    }

    return(
      <Modal
          className="forever-modal"
          overlayClassName="forever-modal-overlay"
          isOpen={ this.state.modalIsOpen }
          shouldCloseOnOverlayClick = {true}
          contentLabel="Example Modal"
          onRequestClose={this.closeModal}
        >
        { modal }
      </Modal>
    );
  }
}

export default ForeverModal;
