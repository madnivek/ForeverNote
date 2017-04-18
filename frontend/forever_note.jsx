import React from 'react';
import ReactDOM from 'react-dom';
// import Root from './reducers/root_reducer';
import { signup, login, logout } from './util/session_api_util';

window.signup = signup;
window.login = login;
window.logout = logout;

document.addEventListener('DOMContentLoaded', () => {
  // const store = configureStore();
  debugger
  ReactDOM.render(<h1>myApp</h1>, document.getElementById('root'));
});
