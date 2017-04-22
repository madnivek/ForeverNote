import React from 'react';
import { convertFromRaw } from 'draft-js';


const NoteIndexItem = props => {

  const convertedBody = convertFromRaw(JSON.parse(props.note.body)).getPlainText();

  const getNote = id => {
    props.fetchNote(id);
  }

  return(
    <li className="note-index-item" onClick={ () => getNote(props.note.id) }>
      <div onClick={ () => getNote(props.note.id) }>
        <h3 className="note-item-header">{ props.note.title }</h3>
        <p className="note-item-body">{ convertedBody }</p>
      </div>
      <nav className="note-item-nav">
        <button className="inverse-button" onClick={ () => props.deleteNote(props.note.id) }><i className="fa fa-trash" aria-hidden="true"></i></button>
      </nav>
    </li>
  );
};

export default NoteIndexItem;
