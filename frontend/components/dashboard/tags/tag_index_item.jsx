import React from 'react';
import { hashHistory, Link } from 'react-router';
import { withRouter } from 'react-router';

const TagIndexItem = props => {

  const goToFilteredNotes = tagId => e => {
    props.setCurrentNotebook({});
    props.setCurrentTag(props.tag);
    hashHistory.push(`/tags/${tagId}`);
  };

  const deleteTag = tagId => e => {
    e.preventDefault();
    e.stopPropagation();
    props.deleteTag(tagId)
      .then( () => props.fetchTaggings() );
  };

  return(
    <div>
      <li className="tag-item" onClick={ goToFilteredNotes(props.tag.id) }>
        <div>
          <h3 className="notebook-item-header between-borders">{props.tag.tag_name}</h3>
          <i className="fa fa-trash inverse-button" aria-hidden="true" onClick={ deleteTag(props.tag.id) } />
        </div>
      </li>
    </div>
  );
};

export default withRouter(TagIndexItem);
