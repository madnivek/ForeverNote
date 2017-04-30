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
      bodySearchString: "",
      titleSearchString: "",
      currentNotes: Object.values(this.props.notes)
    };
    this.updateSearchTitleBar = this.updateSearchTitleBar.bind(this);
    this.updateSearchBodyBar = this.updateSearchBodyBar.bind(this);
    this.currentNotes = Object.values(this.props.notes);
    this.filterNotesBySearch = this.filterNotesBySearch.bind(this);

  }

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

  updateSearchTitleBar(e){
    e.preventDefault();
    this.setState( {titleSearchString: e.target.value} );
  }

  updateSearchBodyBar(e){
    e.preventDefault();
    this.setState( {bodySearchString: e.target.value} );
  }

  componentDidUpdate(prevProps, prevState) {
    const prevTitleStr = prevState.titleSearchString;
    const prevBodyStr = prevState.bodySearchString;
    const titleStr = this.state.titleSearchString;
    const bodyStr = this.state.bodySearchString;
    if(prevTitleStr !== titleStr || prevBodyStr !== bodyStr){
      this.filterNotesBySearch();
    }
  }

  filterNotesBySearch(){
    const titleStr = this.state.titleSearchString;
    const bodyStr = this.state.bodySearchString;
    const titleRegExp = new RegExp(titleStr, "i");
    const bodyRegExp = new RegExp(bodyStr, "i");
    const filter = note => {
      if(titleStr + bodyStr === ""){
        return true;
      } else if( titleStr === ""){
        return bodyRegExp.test(note.body);
      } else if( bodyStr === "") {
        return titleRegExp.test(note.title);
      } else {
        return bodyRegExp.test(note.body) && titleRegExp.test(note.title);
      }
    };

    const currentNotes = this.currentNotes.filter(filter);
    this.setState({currentNotes});
  }


  componentWillReceiveProps(newProps){
    const currentLoc = this.props.location.pathname;
    const nextLoc = newProps.location.pathname;
    const hasCurrentNotebook = this.props.notebookId;
    const hasCurrentTag = this.props.tagId;

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

    this.filterNotesBySearch();
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
                value={this.state.titleSearchString}
                onChange={ this.updateSearchTitleBar } />

              <input
                className = "search-input"
                type="text"
                placeholder="search by body..."
                value={this.state.bodySearchString}
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
