import React from 'react';
import Modal from 'react-modal';

class NotebookSelectModal extends React.Component {
  constructor(props){
    super(props);
    Modal.setAppElement('#root');
    this.state = { modalIsOpen: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState( {modalIsOpen: newProps.isOpen} );
  }

  openModal(){
    this.setState( {modalIsOpen: true} );
  }

  closeModal(){
    this.setState( {modalIsOpen: false} );
  }

  render(){

    const notebooks = this.props.notebooks.map( notebook => {
      return(
        <li key={notebook.id}>{notebook.title}</li>
      )
    });

    return(

      <Modal
          className="notebook-selector"
          overlayClassName="forever-modal-overlay"
          isOpen={ this.state.modalIsOpen }
          shouldCloseOnOverlayClick = {true}
          contentLabel="Example Modal"
          onRequestClose={this.closeModal}
        >

        <div>
          <ul>
            { notebooks }
          </ul>
        </div>
      </Modal>
    );
  }
}

export default NotebookSelectModal;
