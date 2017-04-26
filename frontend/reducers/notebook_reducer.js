import {
  RECEIVE_NOTEBOOK,
  RECEIVE_NOTEBOOKS,
  RECEIVE_ERRORS,
  REMOVE_NOTEBOOK,
  CLEAR_CURRENT_NOTEBOOK,
  SET_CURRENT_NOTEBOOK
} from '../actions/notebook_actions';

import merge from 'lodash/merge';

const _defaultState = {
  notebooks: {},
  currentNotebook: {},
  notes: {},
  errors: []
};

const NotebookReducer = (oldState = _defaultState, action) => {
  Object.freeze(oldState);
  switch(action.type){
    case RECEIVE_NOTEBOOKS: {
      const newState1 = merge({}, oldState);
      newState1.notebooks = action.notebooks;
      newState1.errors = [];
      return newState1;
    }

    case RECEIVE_NOTEBOOK: {
      const newState2 = Object.assign({}, oldState);
      newState2.notebooks[action.notebook.id] = action.notebook;
      newState2.currentNotebook = action.notebook;
      return newState2;
    }

    case REMOVE_NOTEBOOK: {
      const newState3 = merge({}, oldState);
      delete newState3.notebooks[action.notebook.id];
      return newState3;
    }

    case RECEIVE_ERRORS: {
      const newState4 = merge({}, oldState);
      newState4.errors = action.errors;
      return newState4;
    }

    case CLEAR_CURRENT_NOTEBOOK: {
      const newState5 = merge({}, oldState);
      newState5.currentNotebook = {};
      return newState5;
    }

    case SET_CURRENT_NOTEBOOK: {
      const newState6 = merge({}, oldState);
      newState6.currentNotebook = action.notebook;
      return newState6;
    }

    default: {
      return oldState;
    }
  }
};

export default NotebookReducer;
