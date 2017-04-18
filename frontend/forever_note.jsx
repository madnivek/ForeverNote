import React from 'react';
import ReactDOM from 'react-dom';
import Root from './reducers/root_reducer';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  ReactDOM.render(<Root store={store} />, document.getElementById('root'))
});
