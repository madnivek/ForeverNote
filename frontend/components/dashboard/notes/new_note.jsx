import React from 'react';
import { convertFromRaw, convertToRaw, Editor, RichUtils, Draft} from 'draft-js';
import { hashHistory } from 'react-router';
import NotebookSelectModal from './notebook_select_modal';

class NewNote extends React.Component{
  constructor(props){
    super(props);

    this.state = this.props.currentNoteRaw;
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({editorState, isOpen: false, saveText: 'Save Note'});
    };

    this.submitNote = this.submitNote.bind(this);
    this.update = this.update.bind(this);
    this._toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changeNotebook = this.changeNotebook.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.generateTagList = this.generateTagList.bind(this);
    this.enterTag = this.enterTag.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState(newProps.currentNoteRaw);
  }

  handleRedirect(e){
    e.preventDefault();
    const currentNotebookId = this.props.currentNotebook.id;
    if(currentNotebookId){
      hashHistory.push(`/notebooks/${currentNotebookId}`);
    } else {
      hashHistory.push('/notes');
    }
  }

  _convertFromRaw(rawContentString){
    return JSON.parse(rawContentString)
  }



  _toggleInlineStyle(inlineStyle) {
    return (e) => {
      e.preventDefault();
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    };
  }

  generateTagList() {

    const existingTags =  this.state.tags.map( tag => {
      return(
        <span className="tag-show-item">{ tag.tag_name }</span>
      );
    });

    const newTags = Object.values(this.state.new_tags).map( tag => {
      return(
        <span className="tag-show-item">{ tag.tag_name }</span>
      );
    });
    debugger
    return existingTags.concat(newTags);

  }

  submitNote(e){

    e.preventDefault();
    let { id, title, author_id, notebook_id } = this.state;

    notebook_id = this.state.notebook_id

    if(this.props.formType === 'new') {
      author_id = this.props.currentUser.id;
    }

    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    const rawContentString = JSON.stringify(rawContent);
    const note = {
      id,
      title,
      author_id: this.props.currentUser.id ,
      notebook_id , body:
      rawContentString };

    this.props.processForm(note)
      .then( () => {
        if(this.props.formType === 'new'){
          hashHistory.push(`/notes`);
        } else {
          hashHistory.push(`/notes/${note.id}`);
        }
      });
  }

  update(e){
    this.setState({ title: e.target.value, isOpen: false, saveText: "Save Note" });
  }

  toggleModal(e){
    e.preventDefault();
    this.setState({isOpen: true});
  }

  changeNotebook(notebook_id){
    this.setState({notebook_id, isOpen: false, saveText: "Save Note"});
  }

  enterTag(e){
    if(e.which === 13){
      e.preventDefault()
      const newTagTitle = e.target.value
      const newTag = { tag_name: e.target.value, user_id: this.props.currentUser.id };
      let updatedNewTags = this.state.new_tags;
      updatedNewTags[newTag.tag_name] = newTag;
      e.target.value = "";
      this.setState({new_tags: updatedNewTags});
    }
  }

  render() {
    console.log(this.state.new_tags);
    const selectedNotebook = this.props.notebooks[this.state.notebook_id];
    const notebookTitle = selectedNotebook ? selectedNotebook.title : this.props.currentNotebook.title;
    let selectorClassName = this.props.formType === 'new' ?
      "new-note-selector" : "edit-note-selector";

    return(
      <div className='form-parent-container' >


        <form className='form' onSubmit={ this.submitNote }>

          <NotebookSelectModal
            selectorClassName={selectorClassName}
            notebooks={ Object.values(this.props.notebooks) }
            currentNotebookId={this.props.currentNotebook.id || this.state.notebook_id}
            isOpen={this.state.isOpen}
            changeNotebook={ this.changeNotebook } />

          <div className="fixed-main-controls">

            <div className="cancel-back">
              <button className="button"
                onClick={ (this.handleRedirect) }>Close Note</button>
              <input className="button" type="submit" value={this.state.saveText} />
            </div>

            <nav className="rich-text-nav">

              <span onClick={ this.toggleModal } className="button">
                <i className="fa fa-book" aria-hidden="true"></i>
                { notebookTitle }
              </span>

              <span onMouseDown={ this._toggleInlineStyle("BOLD") }
                className="button"><i className="fa fa-bold" aria-hidden="true"></i></span>

              <span onMouseDown={ this._toggleInlineStyle("ITALIC") }
                className="button"><i className="fa fa-italic"
                aria-hidden="true"></i></span>

              <span onMouseDown={ this._toggleInlineStyle("UNDERLINE") }
                className="button"><i className="fa fa-underline"
                aria-hidden="true"></i></span>

              <span onMouseDown={ this._toggleInlineStyle("STRIKETHROUGH") }
                className="button"><i className="fa fa-strikethrough"
                aria-hidden="true"></i></span>


            </nav>

            <div className="tags-div">
              <span><i className="fa fa-tags" aria-hidden="true"></i></span>
              { this.generateTagList() }
              <input onKeyPress={ this.enterTag } type="text" placeholder="+" />
            </div>
          </div>


          <div className="title-and-content">
            <input
              className="new-title"
              placeholder="Title your note"
              onChange={ this.update }
              type="text" value={this.state.title}/>


            <div className="draft-editor" onClick={ this.focus }>
              <Editor
                spellCheck={true}
                ref="editor"
                placeholder="Just start typing..."
                editorState={this.state.editorState}
                onChange={this.onChange} />
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default NewNote;

// <span className="button"><i className="fa fa-align-center" aria-hidden="true"></i></span>
// <span className="button"><i className="fa fa-align-right" aria-hidden="true"></i></span>
// <span className="button"><i className="fa fa-align-justify" aria-hidden="true"></i></span>
