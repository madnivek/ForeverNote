import React from 'react';
import { convertToRaw, RichUtils, Draft, Editor} from 'draft-js';
import { hashHistory } from 'react-router';
import NotebookSelectModal from './notebook_select_modal';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import editorStyles from './editorStyles.css';

class NewNote extends React.Component{
  constructor(props){
    super(props);

    this.state = this.props.currentNoteRaw;
    this.focus = () => this.draftEditor.focus();
    this.onChange = (editorState) => {
      this.setState({editorState, isOpen: false, saveText: 'Save Note'});
    };

    this.submitNote = this.submitNote.bind(this);
    this.update = this.update.bind(this);
    this._toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this._toggleBlockType = this._toggleBlockType.bind(this);
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

  _toggleBlockType(blockType) {
    return (e) => {
      e.preventDefault();
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
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
    const tags = this.state.tags || [];
    if(Object.values(tags).length !== 0){
      existingTags =  this.state.tags.map( (tag, index) => {
        return(
          <li key={tag.tag_name}>
            <span  className="tag-show-item old-tag">
              { tag.tag_name }
              <i
                className="fa fa-minus-circle"
                aria-hidden="true"
                onClick={ this.deleteOldTag(tag.id, index)}/>
            </span>
          </li>
        );
      });
    }

    const newTags = Object.values(this.state.new_tags).map( tag => {
      return(
        <li key={tag.tag_name}>
          <span  className="tag-show-item new-tag">
            { tag.tag_name }
            <i className="fa fa-minus-circle" aria-hidden="true" onClick={ this.deleteNewTag(tag.tag_name)} />
          </span>
        </li>
      );
    });
    return existingTags.concat(newTags);
  }

  enterTag(e){
    if(e.which === 13){
      e.preventDefault();
      const oldTags = this.state.tags || [];
      let oldTagTitles = [];
      if(Object.values(oldTags).length !== 0){
        oldTagTitles = this.state.tags.map( tag => tag.tag_name);
      }

      let updatedNewTags = this.state.new_tags;
      const tagIsInOldTags = updatedNewTags[e.target.value];
      const tagIsInNewTags = oldTagTitles.includes(e.target.value);

      if(!tagIsInOldTags && !tagIsInNewTags){
        updatedNewTags[e.target.value] = {
          tag_name: e.target.value,
          user_id: this.props.currentUser.id
        };
        this.setState({new_tags: updatedNewTags, saveText:"Save Note"});
      }
      e.target.value = "";
    }
  }

  submitNote(e){
    e.preventDefault();
    let {
      id,
      title,
      author_id,
      notebook_id,
      deleted_tags,
      new_tags,
      editorState } = this.state;

    const {
      currentNotebook,
      currentUser,
      formType,
      setCurrentNotebook,
      setCurrentTag,
      fetchTags,
      fetchTaggings,
      fetchNotes,
      processForm } = this.props;

    notebook_id = notebook_id || currentNotebook.id;

    if(formType === 'new') {
      author_id = currentUser.id;
    }

    const rawContent = convertToRaw(editorState.getCurrentContent());
    const plainContent = editorState.getCurrentContent().getPlainText()

    const rawContentString = JSON.stringify(rawContent);
    const note = {
      id,
      title,
      plain_content: plainContent,
      deleted_tags,
      newTags: new_tags,
      author_id: currentUser.id ,
      notebook_id,
      body: rawContentString
    };

    processForm(note)
      .then( () => fetchTags())
      .then( () => fetchTaggings())
      .then( () => {
        if(formType === 'new'){
          setCurrentNotebook({});
          setCurrentTag({});
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
        saveText: "Save Note"});
    };
  }


  render(){

    if(this.props.formType === "none"){
      return <div></div>;
    }

    const {
      formType,
      notebooks,
      currentNotebook,
      notebook_id } = this.props;

    const {
      isOpen,
      saveText,
      title,
      editorState
    } = this.state

    const formTypeContainer = formType === "new" ? "form-parent-container new-form-container" : "form-parent-container";

    const selectedNotebook = notebooks[this.state.notebook_id];
    const notebookTitle = selectedNotebook ? selectedNotebook.title : currentNotebook.title;
    const currentNotebookId = this.state.notebook_id ? this.state.notebook_id : currentNotebook.id;

    let selectorClassName = formType === 'new' ?
      "new-note-selector" : "edit-note-selector";

    return(
      <div className={formTypeContainer} >


        <form className='form' onSubmit={ this.submitNote }>

          <NotebookSelectModal
            selectorClassName={selectorClassName}
            notebooks={ Object.values(notebooks) }
            currentNotebookId={currentNotebookId}
            isOpen={isOpen}
            changeNotebook={ this.changeNotebook } />

          <div className="fixed-main-controls">

            <div className="cancel-back">
              <button className="button"
                onClick={ (this.handleRedirect) }>Close Note</button>
              <input className="button" type="submit" value={saveText} />
            </div>

            <ul className="tags-div">

              <li><nav className="rich-text-nav">

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

                <span onMouseDown={ this._toggleBlockType("unordered-list-item") }
                  className="button"><i className="fa fa-list"
                  aria-hidden="true"></i></span>

                <span onMouseDown={ this._toggleBlockType("ordered-list-item") }
                  className="button"><i className="fa fa-list-ol"
                  aria-hidden="true"></i></span>

                <span onMouseDown={ this._toggleBlockType("blockquote") }
                  className="button"><i className="fa fa-square-o"
                  aria-hidden="true"></i></span>

              </nav></li>

              <li><span><i className="fa fa-tags" aria-hidden="true"></i></span></li>

                  { this.generateTagList() }

              <li><input onKeyPress={ this.enterTag } type="text" placeholder="+" /></li>
            </ul>
          </div>



          <div className="title-and-content">
            <textarea
              rows="1"
              className="new-title"
              placeholder="Title your note"
              onChange={ this.update }
              type="text" value={title}/>


            <div className="draftEditor" onClick={ this.focus }>
              <Editor
                spellCheck={true}
                ref={(element) => { this.draftEditor = element; }}
                placeholder="Just start typing..."
                editorState={editorState}
                onChange={this.onChange} />
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default NewNote;
