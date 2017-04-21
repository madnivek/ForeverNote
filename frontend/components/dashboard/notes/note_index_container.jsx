import React from 'react';
import { connect } from 'react-redux';
import NoteIndex from './note_index';
import { deleteNote, fetchNotes, fetchNote } from '../../../actions/note_actions.js';


const mapStateToProps = ({ notes_slice }) => {
  return {
    notes: Object.values(notes_slice.notes).reverse()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    deleteNote: id => dispatch(deleteNote(id)),
    fetchNote: id => dispatch(fetchNote(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);
