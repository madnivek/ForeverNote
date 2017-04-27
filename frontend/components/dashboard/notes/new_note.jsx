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
    this.deleteNewTag = this.deleteNewTag.bind(this);
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



  generateTagList() {
    let existingTags = [];

    if(Object.values(this.state.tags).length !== 0){
      existingTags =  this.state.tags.map( (tag, index) => {
        return(
          <span key={tag.tag_name} className="tag-show-item old-tag">
            { tag.tag_name }
            <i className="fa fa-minus-circle" aria-hidden="true" onClick={ this.deleteOldTag(tag.id, index)}/>
          </span>
        );
      });
    }

    const newTags = Object.values(this.state.new_tags).map( tag => {
      return(
        <span key={tag.tag_name} className="tag-show-item new-tag">
          { tag.tag_name }
          <i className="fa fa-minus-circle" aria-hidden="true" onClick={ this.deleteNewTag(tag.tag_name)} />
        </span>
      );
    });

    return existingTags.concat(newTags)
  }

  enterTag(e){
    if(e.which === 13){
      e.preventDefault()
      const oldTags = this.state.tags
      let oldTagTitles = []
      if(Object.values(oldTags).length !== 0){
        oldTagTitles = this.state.tags.map( tag => tag.tag_name);
      }

      let updatedNewTags = this.state.new_tags;
      const tagIsInOldTags = updatedNewTags[e.target.value];
      const tagIsInNewTags = oldTagTitles.includes(e.target.value)

      if(!tagIsInOldTags && !tagIsInNewTags){
        updatedNewTags[e.target.value] = { tag_name: e.target.value, user_id: this.props.currentUser.id };
        this.setState({new_tags: updatedNewTags, saveText:"Save Note"});
      }
      e.target.value = "";
    }
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
      deleted_tags: this.state.deleted_tags,
      newTags: this.state.new_tags,
      author_id: this.props.currentUser.id ,
      notebook_id , body:
      rawContentString };

    this.props.processForm(note)
      .then( () => this.props.fetchTags())
      .then( () => this.props.fetchTaggings())
      .then( () => {
        if(this.props.formType === 'new'){
          this.props.setCurrentNotebook({});
          this.props.setCurrentTag({});
          hashHistory.push(`/notes`);
        } else {
          hashHistory.push(`/notes/${note.id}`);
        }
      });
  }

  deleteOldTag(tagId, index) {
    return (e) => {
      const newState = this.state.tags.slice();

      newState.splice(index,1);

      this.setState({
        deleted_tags: this.state.deleted_tags.concat([tagId]),
        tags: newState,
        saveText: "Save Note"
      });
    };
  }

  deleteNewTag(tag_name) {
    return e => {
      const newState = Object.assign({}, this.state.new_tags);
      delete newState[tag_name];
      this.setState({
        new_tags: newState,
        saveText: "Save Note"})
    }
  }


  render(){

    if(this.props.formType === "none"){
      return <div></div>;
    }

    const selectedNotebook = this.props.notebooks[this.state.notebook_id];
    const notebookTitle = selectedNotebook ? selectedNotebook.title : this.props.currentNotebook.title;
    const currentNotebookId = this.state.notebook_id ? this.state.notebook_id : this.props.currentNotebook.id;

    let selectorClassName = this.props.formType === 'new' ?
      "new-note-selector" : "edit-note-selector";

    return(
      <div className='form-parent-container' >


        <form className='form' onSubmit={ this.submitNote }>

          <NotebookSelectModal
            selectorClassName={selectorClassName}
            notebooks={ Object.values(this.props.notebooks) }
            currentNotebookId={currentNotebookId}
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
