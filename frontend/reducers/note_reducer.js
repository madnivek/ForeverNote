import { RECEIVE_NOTE, RECEIVE_NOTES, RECEIVE_ERRORS, REMOVE_NOTE} from
  '../actions/note_actions';

import merge from 'lodash/merge';

const _defaultState = {
  notes: {},
  currentNote: {},
  errors: []
};

const NoteReducer = (oldState = _defaultState, action) => {
  Object.freeze(oldState);
  switch(action.type){
    case RECEIVE_NOTES: {
      return { notes: action.notes, errors: []};
    }

    case RECEIVE_NOTE: {
      const newState = merge({}, oldState);
      newState.notes[action.note.id] = action.note;
      newState.currentNote = action.note;
      debugger
      return newState;
    }

    case REMOVE_NOTE: {
      const newState = merge({}, oldState);
      delete newState.notes[action.note.id];
      return newState;
    }

    case RECEIVE_ERRORS: {
      const newState = merge({}, oldState);
      newState.errors = action.errors;
      return newState;
    }

    default: {
      return oldState;
    }
  }
};

export default NoteReducer;
