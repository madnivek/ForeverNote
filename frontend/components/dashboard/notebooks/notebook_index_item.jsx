import React from 'react';
import { hashHistory, Link } from 'react-router';
import { withRouter } from 'react-router'


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

  const goToEdit = id => e => {
    e.stopPropagation();
    hashHistory.push(`/notebooks/edit/${id}`);
  };

  return(
    <li onClick={ fetchAndRedirect(props.notebook.id) } className="notebook-index-item">
      <h3 className="notebook-item-header between-borders">{props.notebook.title}</h3>
      <div>
        <i className="fa fa-pencil-square-o inverse-button" aria-hidden="true" onClick={ goToEdit( props.notebook.id ) } />
        <i className="fa fa-trash inverse-button" aria-hidden="true" onClick={ deleteNotebook( props.notebook.id ) } />
      </div>
    </li>
  );
};

export default withRouter(NotebookIndexItem);
