import React from 'react';
import NoteIndexItem from "./note_index_item";

class NoteIndex extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchNotes();
  }


  render(){
    const notes = this.props.notes.map ( note => {
      return(
        <NoteIndexItem
          key={note.id}
          note={note}
          deleteNote={ this.props.deleteNote } />
      );
    });

    return(
      <section className="note-index-section">
        <h2 className="note-index-header">Notes</h2>
        <ul className="note-index-list">
          { notes }
        </ul>
      </section>
    );
  }
}

export default NoteIndex;
