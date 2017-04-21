import React from 'react';
import * as NotesAPIUtil from '../util/notes_api_util';
import { hashHistory } from 'react-router';


export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveNotes = notes => {
  return {
    type: RECEIVE_NOTES,
    notes
  };
};

export const receiveNote = note => {
  return {
    type: RECEIVE_NOTE,
    note
  };
};

export const removeNote = note => {
  return {
    type: REMOVE_NOTE,
    note
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const fetchNotes = () => dispatch => {
  return NotesAPIUtil.fetchNotes()
    .then( notes => dispatch(receiveNotes(notes)),
      err => dispatch(receiveErrors(err))
  );
};


export const fetchNote = (id) => dispatch => {
  return NotesAPIUtil.fetchNote(id)
    .then( note => dispatch(receiveNote(note)),
      err => dispatch(receiveErrors(err)))
        .then( () => hashHistory.push(`/notes/${id}`));
};

export const createNote = (note) => dispatch => {
  return NotesAPIUtil.createNote(note)
    .then( note => dispatch(receiveNote(note)),
      err => dispatch(receiveErrors(err))
  );
};

export const updateNote = (note) => dispatch => {
  return NotesAPIUtil.updateNote(note)
    .then( note => dispatch(receiveNote(note)),
      err => dispatch(receiveErrors(err))
  );
};

export const deleteNote = (id) => dispatch => {
  return NotesAPIUtil.deleteNote(id)
    .then( note => dispatch(removeNote(note)),
      err => dispatch(receiveErrors(err))
  );
};
