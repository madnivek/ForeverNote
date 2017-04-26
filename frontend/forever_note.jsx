import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { fetchNotebooks } from './actions/notebook_actions';
import { fetchNotes } from './actions/note_actions';
import { fetchTags, fetchTaggings } from './actions/tag_actions';
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

  fetchNotes("all")(store.dispatch).then(
    () => fetchNotebooks()(store.dispatch).then(
      () => fetchTags()(store.dispatch).then(
        () => fetchTaggings()(store.dispatch).then(
          () => ReactDOM.render(<Root store={store} />, document.getElementById('root'))
        )
      )
    )
  );

});
