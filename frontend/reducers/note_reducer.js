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
      const rNotesNewState = merge({}, oldState);
      rNotesNewState.notes = action.notes;
      rNotesNewState.errors = [];
      return rNotesNewState;
    }

    case RECEIVE_NOTE: {
      const rNoteNewState = Object.assign({}, oldState);
      rNoteNewState.notes[action.note.id] = action.note;
      rNoteNewState.currentNote = action.note;
      return rNoteNewState;
    }

    case REMOVE_NOTE: {
      const rmNoteNewState = merge({}, oldState);
      delete rmNoteNewState.notes[action.note.id];
      return rmNoteNewState;
    }

    case RECEIVE_ERRORS: {
      const rErrNewState = merge({}, oldState);
      rErrNewState.errors = action.errors;
      return rErrNewState;
    }

    default: {
      return oldState;
    }
  }
};

export default NoteReducer;
