import React from 'react';
import { connect } from 'react-redux';
import { fetchNote, updateNote, createNote, fetchNotes } from '../../../actions/note_actions.js';
import { setCurrentNotebook } from '../../../actions/notebook_actions';
import { EditorState, convertFromRaw } from 'draft-js';
import NewNote from './new_note';
import { getTagsByNote } from '../../../util/selector_util'
import { createTag, fetchTags, fetchTaggings } from '../../../actions/tag_actions'

const _convertFromRaw = (rawContentString) => {
  return convertFromRaw(JSON.parse(rawContentString));
};

const mapStateToProps = ({ session, notes_slice, notebooks_slice, tags_slice }, ownProps) => {

  let currentNoteRaw = {
      notebook_id: "",
      isOpen: false,
      title: "",
      saveText: "Saved",
      tags: {},
      new_tags:{},
      editorState: EditorState.createEmpty()};

  let formType = ownProps.location.pathname === '/notes/new' ? "new" : "edit";

  let note = notes_slice.notes[ownProps.params.noteId];

  if(!note) {
    note = notes_slice.currentNote
  }

  if(formType === "edit"){

    const tags = getTagsByNote(tags_slice.tags, tags_slice.taggings, note.id)

    const contentState = _convertFromRaw(note.body.trim());
    currentNoteRaw.id = note.id;
    currentNoteRaw.tags = tags;
    currentNoteRaw.title = note.title;
    currentNoteRaw.editorState = EditorState.createWithContent(contentState);
    currentNoteRaw.notebook_id = note.notebook_id;
  }

  const currentNotebook = notebooks_slice.currentNotebook;

  return {
    currentUser: session.currentUser,
    currentNoteRaw,
    formType,
    notebooks: notebooks_slice.notebooks,
    currentNotebook
  };
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
  const processForm = ownProps.params.noteId ? updateNote : createNote;

  return {
    fetchNotes: (type, value) => dispatch(fetchNotes(type, value)),
    fetchNote: id => dispatch(fetchNote(id)),
    fetchTags: () => dispatch(fetchTags()),
    fetchTaggings: () => dispatch(fetchTaggings()),
    processForm: note => dispatch(processForm(note)),
    setCurrentNotebook: notebook => dispatch(setCurrentNotebook(notebook))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
