import React from 'react';
import NoteIndexItem from "./note_index_item";
import NavBarContainer from '../nav/nav_bar_container';

class NoteIndex extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const notes = this.props.notes.map ( note => {
      return(
        <NoteIndexItem
          key={note.id}
          note={note}
          deleteNote={ this.props.deleteNote }
          fetchNote={ this.props.fetchNote } />
      );
    });

    return(
      <div className="main-container">
        <NavBarContainer />
        <section className="note-index-section">
          <h2 className="note-index-header">NOTES</h2>
          <ul className="note-index-list">
            { notes }
          </ul>
        </section>
        { this.props.children }
      </div>
    );
  }
}

export default NoteIndex;
