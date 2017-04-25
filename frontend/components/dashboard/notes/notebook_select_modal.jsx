import React from 'react';
import Modal from 'react-modal';

class NotebookSelectModal extends React.Component {
  constructor(props){
    super(props);
    Modal.setAppElement('#root');
    this.state = { modalIsOpen: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelectNotebook = this.handleSelectNotebook.bind(this);
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

  handleSelectNotebook(notebook_id){
    return () => {
      this.props.changeNotebook(notebook_id);
    }
  }

  render(){

    const notebooks = this.props.notebooks.map( notebook => {
      return(
        <li
          key={notebook.id}
          className="notebook-selector-list"
          onClick={ this.handleSelectNotebook(notebook.id) }>

          {notebook.title}

        </li>
      )
    });

    return(

      <Modal
          className={this.props.selectorClassName}
          overlayClassName="notebook-selector-overlay"
          isOpen={ this.state.modalIsOpen }
          contentLabel="Example Modal"
          onRequestClose={this.closeModal}
        >

        <div>
          <ul className="notebook-modal-selector-ul">
            { notebooks }
          </ul>
        </div>
      </Modal>
    );
  }
}

export default NotebookSelectModal;
