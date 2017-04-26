import React from 'react';
import { connect } from 'react-redux';
import NoteIndex from './note_index';
import { deleteNote, fetchNotes, fetchNote } from '../../../actions/note_actions';
import { setCurrentNotebook } from '../../../actions/notebook_actions';
import { setCurrentTag } from '../../../actions/tag_actions';
import { fetchNotebooks } from '../../../actions/notebook_actions';
import { fetchTags, fetchTaggings } from '../../../actions/tag_actions';

const mapStateToProps = ({ notes_slice, notebooks_slice, tags_slice, session }, ownProps) => {
  let indexType = "main";
  let header = "NOTES";

  if (ownProps.params.notebookId){
    indexType = "notebook";
  } else if(ownProps.params.tagId) {
    indexType = "tag";
  }

  if(notebooks_slice.currentNotebook.id){
    header = notebooks_slice.currentNotebook.title;
  } else if (tags_slice.currentTag.id ){
    header = '#' + tags_slice.currentTag.tag_name;
  }

  const notebookId = notebooks_slice.currentNotebook.id;
  const tagId = tags_slice.currentTag.id;

  return {
    notes: notes_slice.notes,
    indexType,
    notebookId,
    tagId,
    header,
    taggings: tags_slice.taggings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: (filter, value) => dispatch(fetchNotes(filter, value)),
    deleteNote: id => dispatch(deleteNote(id)),
    fetchNote: id => dispatch(fetchNote(id)),
    fetchTags: () => dispatch(fetchTags()),
    fetchTaggings: () => dispatch(fetchTaggings()),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    setCurrentNotebook: notebook => dispatch(setCurrentNotebook(notebook)),
    setCurrentTag: tag => dispatch(setCurrentTag(tag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);
