import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTag, deleteTag, fetchTags, fetchTag, fetchTaggings } from '../../../actions/tag_actions';
import { setCurrentNotebook } from '../../../actions/notebook_actions';
import TagIndex from './tag_index';

const mapStateToProps = (state, ownProps) => {
  return {
    tags: Object.values(state.tags_slice.tags)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    fetchTag: id => dispatch(fetchTag(id)),
    deleteTag: id => dispatch(deleteTag(id)),
    fetchTaggings: () => dispatch(fetchTaggings()),
    setCurrentTag: tag => dispatch(setCurrentTag(tag)),
    setCurrentNotebook: tag => dispatch(setCurrentNotebook(tag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex);
