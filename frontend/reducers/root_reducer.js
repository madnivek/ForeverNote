import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import NoteReducer from './note_reducer';
import NotebookReducer from './notebook_reducer';
import TagReducer from './tag_reducer';

export default combineReducers({
  session: SessionReducer,
  notes_slice: NoteReducer,
  notebooks_slice: NotebookReducer,
  tags_slice: TagReducer
});
