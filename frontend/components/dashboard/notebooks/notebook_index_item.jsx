import React from 'react';
import { hashHistory, Link } from 'react-router';


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

  const deleteNotebook = id => e => {
    e.preventDefault();
    e.stopPropagation();
    props.deleteNotebook(id)
      .then( () => hashHistory.push('/notebooks'));
  };

  return(
    <li onClick={ fetchAndRedirect(props.notebook.id) } className="notebook-index-item">
      <h3 className="notebook-item-header">{props.notebook.title}</h3>
      <i className="fa fa-trash inverse-button" aria-hidden="true" onClick={ deleteNotebook( props.notebook.id ) } />
    </li>
  );
};

export default NotebookIndexItem;
