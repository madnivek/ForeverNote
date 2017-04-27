import React from 'react';
import { hashHistory, Link } from 'react-router';
import { withRouter } from 'react-router';

const TagIndexItem = props => {

  const goToFilteredNotes = tagId => e => {
    props.setCurrentNotebook({});
    props.setCurrentTag(props.tag);
    hashHistory.push(`/tags/${tagId}`);
  };

  return(
    <li className="notebook-index-item" onClick={ goToFilteredNotes(props.tag.id) }>
      <h3 className="notebook-item-header between-borders">{props.tag.tag_name}</h3>
      <div>
        <i className="fa fa-pencil-square-o inverse-button" aria-hidden="true"/>
        <i className="fa fa-trash inverse-button" aria-hidden="true" />
      </div>
    </li>
  );
};

export default withRouter(TagIndexItem);
