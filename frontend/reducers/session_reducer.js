import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions';
import merge from 'lodash/merge';


const _defaultState = {
  currentUser: null,
  errors: []
};

const SessionReducer = (oldState = _defaultState, action) => {
  switch(action.type){
    case RECEIVE_CURRENT_USER: {
      return merge({}, oldState, { currentUser: action.user});
    }
    case RECEIVE_ERRORS: {
      let newState = Object.assign({}, oldState);
      newState.errors = action.errors;
      return newState;
    }
    default: {
      return oldState;
    }
  }
};

export default SessionReducer;
