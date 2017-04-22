import React from 'react';
import { connect } from 'react-redux';
import { fetchNote, updateNote, createNote } from '../../../actions/note_actions.js';
import { EditorState, convertFromRaw } from 'draft-js';
import NewNote from './new_note';

const _convertFromRaw = (rawContentString) => {
  return convertFromRaw(JSON.parse(rawContentString));
}


const mapStateToProps = ({ session, notes_slice }, ownProps) => {
  let currentNoteRaw = {  title: "", editorState: EditorState.createEmpty()};

  let formType = ownProps.location.pathname === '/notes/new' ? "new" : "edit"

  if(formType === "edit"){
    const contentState = _convertFromRaw(notes_slice.currentNote.body.trim());
    currentNoteRaw.id = notes_slice.currentNote.id
    currentNoteRaw.title = notes_slice.currentNote.title
    currentNoteRaw.editorState = EditorState.createWithContent(contentState);
  }

  return {
    currentUserId: session.currentUser.id,
    currentNoteRaw,
    formType
  };
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
  const processForm = ownProps.params.noteId ? updateNote : createNote;

  return {
    fetchNote: id => dispatch(fetchNote(id)),
    processForm: note => dispatch(processForm(note))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
