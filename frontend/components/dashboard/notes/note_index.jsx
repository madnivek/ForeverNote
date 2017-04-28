import React from 'react';
import NoteIndexItem from "./note_index_item";
import NavBarContainer from '../nav/nav_bar_container';
import * as SelectorUtil from '../../../util/selector_util';
import shallowCompare from 'react-addons-shallow-compare';

class NoteIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes: this.props.notes,
      parsedNotes: [],
      searchString: "",
      currentNotes: Object.values(this.props.notes)
    };
    this.updateSearchTitleBar = this.updateSearchTitleBar.bind(this);
    this.updateSearchBodyBar = this.updateSearchBodyBar.bind(this);
    this.currentNotes = Object.values(this.props.notes);
    this.filterNotesBySearch = this.filterNotesBySearch.bind(this);

  }

  // componentWillReceiveProps(newProps){
  //   this.currentNotes = this.state.parsedNotes;
  // }

  filterNotes(type){

    const notes = this.props.notes;
    const { taggings, notebookId, tagId } = this.props;

    switch(type){
      case "notebook":{
        const parsedNotes = SelectorUtil.getNotesByNotebook(notes, notebookId);
        this.currentNotes = parsedNotes;
        this.setState({ notes, parsedNotes, currentNotes: parsedNotes});
        break;
      }
      case "tag":{
        const parsedNotes = SelectorUtil.getNotesByTag(notes, taggings, tagId );
        this.currentNotes = parsedNotes;
        this.setState({notes, parsedNotes, currentNotes: parsedNotes});
        break;
      }
      default: {
        const parsedNotes = Object.values(notes).reverse();
        this.currentNotes = parsedNotes;
        this.setState({notes, parsedNotes, currentNotes: parsedNotes});
        break;
      }
    }
  }

  componentDidMount(){
    this.filterNotes(this.props.indexType);
  }
  //
  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.props.indexType === nextProps.indexType){
  //     return false;
  //   }
  // }

  updateSearchTitleBar(e){
    e.preventDefault();
    this.setState( {searchString: e.target.value} );
    this.filterNotesBySearch(e.target.value, "title");
  }

  updateSearchBodyBar(e){
    e.preventDefault();
    this.setState( {searchString: e.target.value} );
    this.filterNotesBySearch(e.target.value, "body");
  }

  filterNotesBySearch(searchString, field){
    const criteria = field === "title" ? "title" : "body"
    const regExp = new RegExp(searchString, "i");

    const filter = note => {
      // const titleIncludesString = note.title.includes(searchString);
      // const bodyIncludesString = note.plain_content.includes(searchString);

      if(searchString === "" || regExp.test(note[criteria])){
        return true;
      } else {
        return false;
      }
    };

    const currentNotes = this.currentNotes.filter(filter);
    this.setState({currentNotes});
  }


  componentWillReceiveProps(newProps){

    const currentLoc = this.props.location.pathname;
    const nextLoc = newProps.location.pathname;
    // const nextLocIndex = nextLoc === '/notes';
    // const nextLocNew = currentLoc === nextLoc;
    const hasCurrentNotebook = this.props.notebookId;
    const hasCurrentTag = this.props.tagId;
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
    let headerClassName;

    if(this.props.header === "NOTES"){
      headerClassName = "note-index-header";
    } else if(this.props.header === "TAGS") {
      headerClassName = "note-index-header tags-header";
    } else {
      headerClassName = "note-index-header notebooks-header";
    }

    const notes = this.state.currentNotes.map ( note => {

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

    const numNotes = `${notes.length.toString()} notes`


    return(
      <div className="main-container">
        <NavBarContainer />
        <section className="note-index-section">
          <h2 className={ headerClassName }>{this.props.header}</h2>
          <p className="notes-count">{numNotes}</p>
          <div className="parent-search-container">
            <div className="search-container note-search">
              <input
                className = "search-input"
                type="text"
                placeholder="search by title..."
                value={this.state.searchTerm}
                onChange={ this.updateSearchTitleBar } />

              <input
                className = "search-input"
                type="text"
                placeholder="search by body..."
                value={this.state.searchTerm}
                onChange={ this.updateSearchBodyBar } />
            </div>
          </div>
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
