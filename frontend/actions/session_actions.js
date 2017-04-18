// login(user) (thunk action creator)
// logout() (thunk action creator)
// signup(user) (thunk action creator)
// receiveCurrentUser(currentUser) (regular action creator)
// receiveErrors(errors) (regular action creator)

import React from 'react';
import * as SessionAPIUtil from '../util/session_api_util';

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
    .then( user => dispatch(receiveCurrentUser(user)));
};

export const signup = user => dispatch => {
  return SessionAPIUtil.signup(user)
    .then( user => dispatch(receiveCurrentUser(user)));
};

export const logout = () => dispatch => {
  return SessionAPIUtil.logout()
    .then( user => dispatch(receiveCurrentUser(null)));
};
