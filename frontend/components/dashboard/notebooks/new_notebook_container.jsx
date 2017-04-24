import React from 'react';
import { connect } from 'react-redux';
import { createNotebook } from '../../../actions/notebook_actions';
import NewNotebook from './new_notebook';

const mapStateToProps = state => {
  return {
    authorId: state.session.currentUser.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNotebook: notebook => dispatch(createNotebook(notebook))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNotebook);
