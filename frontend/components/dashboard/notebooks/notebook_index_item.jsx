import React from 'react';
import { hashHistory, Link } from 'react-router';
import { withRouter } from 'react-router';



class NotebookIndexItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {modalIsOpen: false}
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.redirectToNote = this.redirectToNote.bind(this);
    this.deleteNotebook = this.deleteNotebook.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
  }

  openModal(e){
    e.stopPropagation();
    this.setState({modalIsOpen: true})
  }

  closeModal(e){
    e.stopPropagation();
    this.setState({modalIsOpen: false})
  }

  redirectToNote(id){
    return e => {
      this.props.setCurrentNotebook(this.props.notebook);
      this.props.setCurrentTag(this.props.setCurrentTag({}));
      hashHistory.push(`/notebooks/${id}`);
    };
  }

  deleteNotebook(id){
    return e => {
      e.preventDefault();
      e.stopPropagation();
      this.closeModal();
      this.props.deleteNotebook(id)
      .then( () => hashHistory.push('/notebooks'));
    };
  }

  goToEdit(id){
    return e => {
      e.stopPropagation();
      hashHistory.push(`/notebooks/edit/${id}`);
    }
  };



  render(){
    let deleteModal;
    if(this.state.modalIsOpen){
      deleteModal =
      <div className="confirm-delete-modal notebook-del-modal">
        <h1>This notebook and its notes will be deleted. Are you sure?</h1>
        <div>
          <i
            className="fa fa-check-circle"
            onClick={ this.deleteNotebook(this.props.notebook.id) }
            aria-hidden="true"></i>
          <i
            className="fa fa-times-circle"
            onClick={ this.closeModal }
            aria-hidden="true"></i>
        </div>
      </div>
    }

    return(
      <li onClick={ this.redirectToNote(this.props.notebook.id) } className="index-item">
        <h3 className="notebook-item-header between-borders">{this.props.notebook.title}</h3>
        <div>
          <i className="fa fa-pencil-square-o inverse-button" aria-hidden="true" onClick={ this.goToEdit( this.props.notebook.id ) } />
          <i className="fa fa-trash inverse-button" aria-hidden="true" onClick={ this.openModal } />
        </div>
        { deleteModal }
      </li>
    );
  }
};

export default withRouter(NotebookIndexItem);
