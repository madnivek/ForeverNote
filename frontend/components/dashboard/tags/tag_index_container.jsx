import React from 'react';
import { connect } from 'react-redux';
import { deleteTag, fetchTags, fetchTag } from '../../../actions/tag_actions';
import TagIndex from './tag_index';

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    tags: Object.values(state.tags_slice.tags)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    fetchTag: id => dispatch(fetchTag(id)),
    deleteTag: id => dispatch(deleteTag(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex);
