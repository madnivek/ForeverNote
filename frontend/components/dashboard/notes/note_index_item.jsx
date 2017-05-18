import React from 'react';
import { convertFromRaw } from 'draft-js';
import { hashHistory, withRouter } from 'react-router';
import dateToString from '../../../util/date_handler';
class NoteIndexItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {modalIsOpen: false};
    this.getNote = this.getNote.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(e){
    e.stopPropagation();
    this.setState({modalIsOpen: true});
  }

  closeModal(e){
    e.stopPropagation();
    this.setState({modalIsOpen: false});
  }

  getNote(id) {
    hashHistory.push(`/notes/${id}`);
  }

  handleDelete(id) {
    return e => {
      e.preventDefault();
      this.closeModal(e);
      this.props.deleteNote(id)
      .then( () => this.props.fetchTaggings());
    };
  }

  render() {
    let deleteModal = <div className="delete-modal-empty"></div>
    if(this.state.modalIsOpen){
      deleteModal =
      <div className="confirm-delete-modal">
        <h1>This note will be deleted. Are you sure?</h1>
        <div>
          <i
            className="fa fa-times-circle"
            onClick={ this.closeModal }
            aria-hidden="true"></i>
          <i
            className="fa fa-check-circle"
            onClick={ this.handleDelete(this.props.note.id) }
            aria-hidden="true"></i>
        </div>
      </div>
    }

    const date = new Date(this.props.note.updated_at);
    const dateStr = dateToString(date);

    return(

      <li
        className="note-index-item"
        onClick={ () => this.getNote(this.props.note.id) }>
        <div>
          <h3 className="note-item-header">{ this.props.note.title }</h3>
          <p>{dateStr}</p>
          <p
            className="note-item-body between-borders">
            { this.props.note.plain_content }

          </p>
        </div>
        <nav className="note-item-nav">
          <button
            className="inverse-button"
            onClick={ this.openModal }><i
            className="fa fa-trash"
            aria-hidden="true"></i></button>
        </nav>
        { deleteModal }
      </li>
    );
  }
}

export default withRouter(NoteIndexItem);
