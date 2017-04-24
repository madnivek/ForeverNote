import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-modal';
import { fetchNotebooks } from '../../../actions/notebook_actions';
import NotebookIndex from './notebook_index';

const mapStateToProps = state => {
  return {
    notebooks: Object.values(state.notebooks_slice.notebooks)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookIndex);
