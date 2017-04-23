import React from 'react';
import * as NotebooksAPIUtil from '../util/notebooks_api_util';
import { hashHistory } from 'react-router';


export const RECEIVE_NOTEBOOK = 'RECEIVE_NOTEBOOK';
export const RECEIVE_NOTEBOOKS = 'RECEIVE_NOTEBOOKS';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveNotebooks = notes => {
  return {
    type: RECEIVE_NOTEBOOKS,
    notes
  };
};

export const receiveNotebook = note => {
  return {
    type: RECEIVE_NOTEBOOK,
    note
  };
};

export const removeNotebook = note => {
  return {
    type: REMOVE_NOTEBOOK,
    note
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const fetchNotebooks = () => dispatch => {
  return NotebooksAPIUtil.fetchNotebooks()
    .then( notes => dispatch(receiveNotebooks(notes)),
      err => dispatch(receiveErrors(err))
  );
};


export const fetchNotebook = (id) => dispatch => {
  return NotebooksAPIUtil.fetchNotebook(id)
    .then( note => dispatch(receiveNotebook(note)),
      err => dispatch(receiveErrors(err)))
        .then()
        .then( () => hashHistory.push(`/notes/${id}`));
};

export const createNotebook = (note) => dispatch => {
  return NotebooksAPIUtil.createNotebook(note)
    .then( note => dispatch(receiveNotebook(note)),
      err => dispatch(receiveErrors(err))
  );
};

export const updateNotebook = (note) => dispatch => {
  return NotebooksAPIUtil.updateNotebook(note)
    .then( note => dispatch(receiveNotebook(note)),
      err => dispatch(receiveErrors(err))
  );
};

export const deleteNotebook = (id) => dispatch => {
  return NotebooksAPIUtil.deleteNotebook(id)
    .then( note => dispatch(removeNotebook(note)),
      err => dispatch(receiveErrors(err))
  );
};
