import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { fetchTags, fetchTag, deleteTag, updateTag } from './util/tag_api_util';
import { fetchNotebooks } from './actions/notebook_actions';
import { fetchNotes } from './actions/note_actions';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  window.fetchTags = fetchTags;
  window.fetchTag = fetchTag;
  window.deleteTag = deleteTag;
  window.updateTag = updateTag;

  if (window.currentUser){
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);

  } else {
    store = configureStore();
  }
  window.store = store;
  fetchNotebooks()(store.dispatch).then(
    fetchNotes("all")(store.dispatch).then(
      () => ReactDOM.render(<Root store={store} />, document.getElementById('root'))
    )
  );

});
