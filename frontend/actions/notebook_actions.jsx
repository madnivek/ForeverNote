import React from 'react';
import * as NotebooksAPIUtil from '../util/notebooks_api_util';
import { hashHistory } from 'react-router';


export const RECEIVE_NOTEBOOK = 'RECEIVE_NOTEBOOK';
export const RECEIVE_NOTEBOOKS = 'RECEIVE_NOTEBOOKS';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveNotebooks = notebooks => {
  return {
    type: RECEIVE_NOTEBOOKS,
    notebooks
  };
};

export const receiveNotebook = notebook => {
  return {
    type: RECEIVE_NOTEBOOK,
    notebook
  };
};

export const removeNotebook = notebook => {
  return {
    type: REMOVE_NOTEBOOK,
    notebook
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const fetchNotebooks = () => dispatch => {
  debugger
  return NotebooksAPIUtil.fetchNotebooks()
    .then( notebooks => dispatch(receiveNotebooks(notebooks)),
      err => dispatch(receiveErrors(err))
  );
};


export const fetchNotebook = (id) => dispatch => {
  return NotebooksAPIUtil.fetchNotebook(id)
    .then( notebook => dispatch(receiveNotebook(notebook)),
      err => dispatch(receiveErrors(err)))
        .then()
        .then( () => hashHistory.push(`/notes/${id}`));
};

export const createNotebook = (notebook) => dispatch => {
  return NotebooksAPIUtil.createNotebook(notebook)
    .then( notebook => dispatch(receiveNotebook(notebook)),
      err => dispatch(receiveErrors(err))
  );
};

export const updateNotebook = (notebook) => dispatch => {
  return NotebooksAPIUtil.updateNotebook(notebook)
    .then( notebook => dispatch(receiveNotebook(notebook)),
      err => dispatch(receiveErrors(err))
  );
};

export const deleteNotebook = (id) => dispatch => {
  return NotebooksAPIUtil.deleteNotebook(id)
    .then( notebook => dispatch(removeNotebook(notebook)),
      err => dispatch(receiveErrors(err))
  );
};
