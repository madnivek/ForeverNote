import { RECEIVE_TAG, RECEIVE_TAGS, RECEIVE_ERRORS, REMOVE_TAG} from
  '../actions/tag_actions';

import merge from 'lodash/merge';

const _defaultState = {
  tags: {},
  currentTag: {},
  errors: []
};

const TagReducer = (oldState = _defaultState, action) => {
  switch(action.type){
    case RECEIVE_TAGS:{
      const newState1 = merge({}, oldState);
      newState1.tags = action.tags;
      return newState1;
    }

    case RECEIVE_TAG:{
      const newState2 = merge({}, oldState);
      newState2.tags[action.tag.id] = action.tag;
      return newState2;
    }

    case REMOVE_TAG:{
      const newState3 = merge({}, oldState);
      delete newState3.tags[action.tag.id];
      return newState3;
    }

    case RECEIVE_ERRORS:{
      const newState4 = merge({}, oldState);
      newState4.errors = action.errors;
      return newState4;
    }

  }
};

export default TagReducer;
