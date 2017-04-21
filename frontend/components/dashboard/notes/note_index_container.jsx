import React from 'react';
import { connect } from 'react-redux';
import NoteIndex from './note_index';
import { deleteNote, fetchNotes } from '../../../actions/note_actions.js';


const mapStateToProps = ({ notes_slice }) => {
  return {
    notes: Object.values( notes_slice.notes )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    deleteNote: id => dispatch(deleteNote(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);
