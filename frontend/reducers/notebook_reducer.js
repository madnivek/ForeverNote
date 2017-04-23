import { RECEIVE_NOTEBOOK, RECEIVE_NOTEBOOKS, RECEIVE_ERRORS, REMOVE_NOTEBOOK} from
  '../actions/note_actions';

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
      newState1.notes = action.notebooks;
      newState1.errors = [];
      return newState1;
    }

    case RECEIVE_NOTEBOOK: {
      const newState2 = Object.assign({}, oldState);
      newState2.notes[action.note.id] = action.notebook;
      newState2.currentNote = action.notebook;
      return newState2;
    }

    case REMOVE_NOTEBOOK: {
      const newState3 = merge({}, oldState);
      delete newState3.notes[action.notebook.id];
      return newState3;
    }

    case RECEIVE_ERRORS: {
      const newState4 = merge({}, oldState);
      newState4.errors = action.errors;
      return newState4;
    }

    default: {
      return oldState;
    }
  }
};

export default NotebookReducer;
