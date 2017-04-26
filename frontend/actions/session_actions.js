import * as SessionAPIUtil from '../util/session_api_util';
import { fetchNotes } from './note_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = (user) => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const login = user => dispatch => {
  return SessionAPIUtil.login(user)
    .then( user => dispatch(receiveCurrentUser(user)),
      err => dispatch(receiveErrors(err.responseJSON))
    );
};

export const signup = user => dispatch => {
  return SessionAPIUtil.signup(user)
    .then( user => dispatch(receiveCurrentUser(user)),
      err => dispatch(receiveErrors(err.responseJSON))
    );
};

export const logout = () => dispatch => {
  return SessionAPIUtil.logout()
    .then( user => dispatch(receiveCurrentUser(null)),
      err => dispatch(receiveErrors(err.responseJSON))
    );
};
