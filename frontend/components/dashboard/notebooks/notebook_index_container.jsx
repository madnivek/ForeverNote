import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-modal';
import { fetchNotebooks, fetchNotebook } from '../../../actions/notebook_actions';
import { fetchNotes } from '../../../actions/note_actions';
import NotebookIndex from './notebook_index';

const mapStateToProps = (state, ownProps) => {

  return {
    notebooks: Object.values(state.notebooks_slice.notebooks)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchNotebook: id => dispatch(fetchNotebook(id)),
    fetchNotes: (filter, value) => dispatch(fetchNotes(filter, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookIndex);
