import React from 'react';
import { convertFromRaw } from 'draft-js';
import { hashHistory } from 'react-router';


const NoteIndexItem = props => {

  const convertedBody = convertFromRaw(JSON.parse(props.note.body)).getPlainText();

  const getNote = id => {
    props.fetchNote(id);
  };

  const handleDelete = id => e => {
    e.preventDefault();
    props.deleteNote(id).then(() => hashHistory.push('/'));
  };

  return(
    <li className="note-index-item" onClick={ () => getNote(props.note.id) }>
      <div>
        <h3 className="note-item-header">{ props.note.title }</h3>
        <p className="note-item-body">{ convertedBody }</p>
      </div>
      <nav className="note-item-nav">
        <button className="inverse-button" onClick={ handleDelete(props.note.id) }><i className="fa fa-trash" aria-hidden="true"></i></button>
      </nav>
    </li>
  );
};

export default NoteIndexItem;
