import * as TagsAPIUtil from '../util/tag_api_util';
import { hashHistory } from 'react-router';


export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveTags = tags => {
  return {
    type: RECEIVE_TAGS,
    tags
  };
};

export const receiveTag = tag => {
  return {
    type: RECEIVE_TAG,
    tag
  };
};

export const removeTag = tag => {
  return {
    type: REMOVE_TAG,
    tag
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const fetchTags = () => dispatch => {
  return TagsAPIUtil.fetchTags()
    .then( tags => dispatch(receiveTags(tags)),
      err => dispatch(receiveErrors(err))
  );
};

export const fetchTag = id => dispatch => {
  return TagsAPIUtil.fetchTag(id)
    .then( tag => dispatch(receiveTags(tag)),
      err => dispatch(receiveErrors(err))
  );
};

export const createTag = tag => dispatch => {
  return TagsAPIUtil.createTag(tag)
    .then( tag => dispatch(receiveTag(tag)),
      err => dispatch(receiveErrors(err))
  );
};

export const updateTag = tag => dispatch => {
  return TagsAPIUtil.updateTag(tag)
    .then( tag => dispatch(receiveTag(tag)),
      err => dispatch(receiveErrors(err))
  );
};

export const deleteTag = id => dispatch => {
  return TagsAPIUtil.deleteTag(id)
    .then( tag => dispatch(receiveTags(tag)),
      err => dispatch(receiveErrors(err))
  );
};
