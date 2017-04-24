import React from 'react';
import { hashHistory } from 'react-router';

const NotebookIndexItem = props => {
  const fetchAndRedirect = id => {
    return e => {
      e.preventDefault();
      props.fetchNotes("notebook",id)
        .then( () => {
          props.fetchNotebook(id);
        })
        .then( () => hashHistory.push(`/notebooks/${id}`));
    };
  };

  return(
    <li onClick={ fetchAndRedirect(props.notebook.id) } className="notebook-index-item">
      <h3 className="notebook-item-header">{props.notebook.title}</h3>
    </li>
  );
};

export default NotebookIndexItem;
