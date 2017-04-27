import React from 'react';
import NoteIndexItem from "./note_index_item";
import NavBarContainer from '../nav/nav_bar_container';
import * as SelectorUtil from '../../../util/selector_util';


class NoteIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {notes: this.props.notes, parsedNotes: []};
  }
  
  filterNotes(type){

    const notes = this.props.notes;
    const { taggings, notebookId, tagId } = this.props

    switch(type){
      case "notebook":{
        this.setState({notes, parsedNotes: SelectorUtil.getNotesByNotebook(notes, notebookId)});
        break;
      }
      case "tag":{
        this.setState({notes, parsedNotes: SelectorUtil.getNotesByTag(notes, taggings, tagId )});
        break;
      }
      default: {
        this.setState({notes, parsedNotes: Object.values(notes).reverse()});
        break;
      }
    }
  }

  componentDidMount(){
    this.filterNotes(this.props.indexType);
  }

  componentWillReceiveProps(newProps){
    const currentLoc = this.props.location.pathname;
    const nextLoc = newProps.location.pathname;
    // const nextLocIndex = nextLoc === '/notes';
    // const nextLocNew = currentLoc === nextLoc;
    const hasCurrentNotebook = this.props.notebookId
    const hasCurrentTag = this.props.tagId

    //
    // if(nextLocIndex || (nextLocNew && hasCurrentNotebook)){
    //   this.filterNotes(newProps);
    //   if(nextLocIndex){
    //     this.props.clearCurrentNotebook();
    //   }
    // }

    if(nextLoc === '/notes' && nextLoc !== currentLoc){
      this.props.setCurrentNotebook({});
      this.props.setCurrentTag({});
      this.filterNotes();
    } else if (hasCurrentNotebook) {
      this.filterNotes("notebook");
    } else if(hasCurrentTag) {
      this.filterNotes("tag")
    } else {
      this.filterNotes();
    }
  }

  render(){

    const notes = this.state.parsedNotes.map ( note => {
      if(note) {
        return(
          <NoteIndexItem
            key={note.id}
            fetchTaggings={this.props.fetchTaggings}
            note={note}
            deleteNote={ this.props.deleteNote }
            fetchNote={ this.props.fetchNote } />
        );
      }
    });


    return(
      <div className="main-container">
        <NavBarContainer />
        <section className="note-index-section">
          <h2 className="note-index-header">{this.props.header}</h2>
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
