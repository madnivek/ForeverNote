import React from 'react';
import { connect } from 'react-redux';
import { updateNote, createNote } from '../../../actions/note_actions.js';
import NewNote from './new_note';

const mapStateToProps = ({ session, notes_slice }, ownProps) => {
  let currentNote;
  if(ownProps.params){
  }
  return {
    currentUserId: session.currentUser.id,
    currentNote: notes_slice.currentNote
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNote: (note) => dispatch(createNote(note)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
