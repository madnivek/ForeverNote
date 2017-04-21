import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import NoteReducer from './note_reducer';

export default combineReducers({
  session: SessionReducer,
  notes_slice: NoteReducer
});
