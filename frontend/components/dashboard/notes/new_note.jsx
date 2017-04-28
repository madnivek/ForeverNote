import React from 'react';
import { convertFromRaw, convertToRaw, RichUtils, Draft} from 'draft-js';
import { hashHistory } from 'react-router';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import NotebookSelectModal from './notebook_select_modal';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import 'draft-js-emoji-plugin/lib/plugin.css';
import editorStyles from './editorStyles.css';
// import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
// import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
// import 'draft-js-buttons-plugin/lib/plugin.css';
// import {AlignBlockCenterButton} from 'draft-js-buttons';
// import 'draft-js/dist/Draft.css';
//
// import createButtonsPlugin from 'draft-js-buttons';
// const buttonsPlugin = createButtonsPlugin();
//
// import {
//   ItalicButton,
//   BoldButton,
//   UnderlineButton,
//   UnorderedListButton,
//   OrderedListButton,
//   BlockquoteButton,
//   AlignBlockLeftButton,
//   AlignBlockRightButton,
//   AlignBlockCenterButton
// } from 'draft-js-buttons';
//
// const inlineToolbarPlugin = createInlineToolbarPlugin({
//   structure: [
//     BoldButton,
//     ItalicButton,
//     UnderlineButton,
//     UnorderedListButton,
//     OrderedListButton,
//     BlockquoteButton
//   ]
// });

// const { InlineToolbar } = inlineToolbarPlugin;
//
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;


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

    if(Object.values(this.state.tags).length !== 0){
      existingTags =  this.state.tags.map( (tag, index) => {
        return(
          <li key={tag.tag_name}>
            <span  className="tag-show-item old-tag">
              { tag.tag_name }
              <i className="fa fa-minus-circle" aria-hidden="true" onClick={ this.deleteOldTag(tag.id, index)}/>
            </span>
          </li>
        );
      });
    }

    const newTags = Object.values(this.state.new_tags).map( tag => {
      return(
        <li>
          <span key={tag.tag_name} className="tag-show-item new-tag">
            { tag.tag_name }
            <i className="fa fa-minus-circle" aria-hidden="true" onClick={ this.deleteNewTag(tag.tag_name)} />
          </span>
        </li>
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
    const plainContent = this.state.editorState.getCurrentContent().getPlainText()

    const rawContentString = JSON.stringify(rawContent);
    const note = {
      id,
      title,
      plain_content: plainContent,
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

    const formTypeContainer = this.props.formType === "new" ? "form-parent-container new-form-container" : "form-parent-container";

    const selectedNotebook = this.props.notebooks[this.state.notebook_id];
    const notebookTitle = selectedNotebook ? selectedNotebook.title : this.props.currentNotebook.title;
    const currentNotebookId = this.state.notebook_id ? this.state.notebook_id : this.props.currentNotebook.id;

    let selectorClassName = this.props.formType === 'new' ?
      "new-note-selector" : "edit-note-selector";

    return(
      <div className={formTypeContainer} >


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
            <input
              className="new-title"
              placeholder="Title your note"
              onChange={ this.update }
              type="text" value={this.state.title}/>


            <div className="draftEditor" onClick={ this.focus }>
              <Editor
                ref={(element) => { this.draftEditor = element; }}
                placeholder="Just start typing..."
                editorState={this.state.editorState}
                plugins={[emojiPlugin]}
                onChange={this.onChange} />
              <EmojiSuggestions />
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
