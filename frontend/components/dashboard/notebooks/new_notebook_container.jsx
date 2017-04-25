import React from 'react';
import { connect } from 'react-redux';
import { createNotebook, updateNotebook } from '../../../actions/notebook_actions';
import NewNotebook from './new_notebook';

const mapStateToProps = ({notebooks_slice, session}, ownProps) => {

  let notebook = { title: "", author_id: session.currentUser.id };
  let formType = "new";
  const notebookId = ownProps.params.notebookId;
  if(notebookId){
    notebook = notebooks_slice.notebooks[notebookId];
    formType = "edit";
  }
  
  return {
    notebook,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.params.notebookId ? updateNotebook : createNotebook
  return {
    processForm: notebook => dispatch(processForm(notebook))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNotebook);
