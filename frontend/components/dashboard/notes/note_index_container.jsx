import React from 'react';
import { connect } from 'react-redux';
import NoteIndex from './note_index';
import { deleteNote, fetchNotes, fetchNote } from '../../../actions/note_actions';
import { clearCurrentNotebook } from '../../../actions/notebook_actions';


const mapStateToProps = ({ notes_slice, notebooks_slice }, ownProps) => {
  let indexType = "main";

  if (ownProps.params.notebookId){
    indexType = "notebook";
  }

  const header = notebooks_slice.currentNotebook.title || "NOTES"

  const notebookId = ownProps.params.notebookId;

  return {
    notes: Object.values(notes_slice.notes).reverse(),
    indexType,
    notebookId,
    header
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: (filter, value) => dispatch(fetchNotes(filter, value)),
    deleteNote: id => dispatch(deleteNote(id)),
    fetchNote: id => dispatch(fetchNote(id)),
    clearCurrentNotebook: () => dispatch(clearCurrentNotebook())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);
