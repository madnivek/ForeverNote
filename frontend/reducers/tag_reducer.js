import { SET_CURRENT_TAG, RECEIVE_TAGGINGS, RECEIVE_TAG, RECEIVE_TAGS, RECEIVE_ERRORS, REMOVE_TAG} from
  '../actions/tag_actions';

import merge from 'lodash/merge';

const _defaultState = {
  tags: {},
  taggings: {},
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

    case RECEIVE_TAGGINGS:{
        const newState5 = merge({}, oldState);
        newState5.taggings = action.taggings;
        return newState5;
    }

    case SET_CURRENT_TAG: {
      const newState6 = merge({}, oldState);
      newState6.currentTag = action.tag;
      return newState6;
    }

    default: {
      return oldState;
    }

  }
};

export default TagReducer;
