import React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../../../actions/note_actions.js';
import NewNote from './new_note';

const mapStateToProps = ({ session }) => {
  return {
    currentUserId: session.currentUser.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNote: (note) => dispatch(createNote(note))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
