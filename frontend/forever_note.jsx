import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { fetchNote, deleteNote, updateNote } from './util/notes_api_util';
import { fetchNotebook, fetchNotebooks, deleteNotebook, updateNotebook } from './util/notebooks_api_util';
import { fetchNotes } from './actions/note_actions';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // window.fetchNotebooks = fetchNotebooks;
  // window.fetchNotebook = fetchNotebook;
  // window.deleteNotebook = deleteNotebook;
  // window.updateNotebook = updateNotebook;

  if (window.currentUser){
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);

  } else {
    store = configureStore();
  }
  window.store = store;
  fetchNotes()(store.dispatch).then(
    () => ReactDOM.render(<Root store={store} />, document.getElementById('root'))
  );

});
