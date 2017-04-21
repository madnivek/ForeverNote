import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { fetchNotes, fetchNote, deleteNote, updateNote } from './util/notes_api_util';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser){
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  window.store = store;
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
