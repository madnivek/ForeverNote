import { RECEIVE_NOTE, RECEIVE_NOTES, RECEIVE_ERRORS, REMOVE_NOTE} from
  '../actions/notes_actions';

import merge from 'lodash/merge';

const _defaultState = {
  notes: {},
  errors: []
};

const NoteReducer = (oldState = _defaultState, action) => {
  switch(action.type){
    case RECEIVE_NOTES: {
      return merge({}, { notes: action.notes} );
    }

    case RECEIVE_NOTE: {
      return merge({}, oldState, { notes: action.note } );
    }

    case REMOVE_NOTE: {
      const newState = merge({}, oldState);
      delete newState.notes[action.note.id];
      return newState;
    }

    case RECEIVE_ERRORS: {
      const newState = merge({}, oldState);
      newState.errors = action.errors;
    }
  }
}
