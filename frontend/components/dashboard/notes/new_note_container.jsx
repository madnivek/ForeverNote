import React from 'react';
import { connect } from 'react-redux';
import { fetchNote, updateNote, createNote } from '../../../actions/note_actions.js';
import { EditorState, convertFromRaw } from 'draft-js';
import NewNote from './new_note';

const _convertFromRaw = (rawContentString) => {
  return convertFromRaw(JSON.parse(rawContentString));
};

const mapStateToProps = ({ session, notes_slice, notebooks_slice }, ownProps) => {

  let currentNoteRaw = {  notebook_id: "", isOpen: false, title: "", editorState: EditorState.createEmpty()};

  let formType = ownProps.location.pathname === '/notes/new' ? "new" : "edit";

  let note = notes_slice.notes[ownProps.params.noteId];

  if(!note) {
    note = notes_slice.currentNote
  }

  if(formType === "edit"){
    const contentState = _convertFromRaw(note.body.trim());
    currentNoteRaw.id = note.id;
    currentNoteRaw.title = note.title;
    currentNoteRaw.editorState = EditorState.createWithContent(contentState);
  }

  return {
    currentUser: session.currentUser,
    currentNoteRaw,
    formType,
    notebooks: Object.values(notebooks_slice.notebooks)
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
