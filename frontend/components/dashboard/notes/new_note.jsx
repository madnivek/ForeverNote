import React from 'react';
import { convertFromRaw, convertToRaw, Editor, RichUtils, Draft} from 'draft-js';
import { hashHistory } from 'react-router';
import NotebookSelectModal from './notebook_select_modal';

class NewNote extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.currentNoteRaw;
    this.saveText = "Save Note";
    this.onChange = (editorState) => {
      this.saveText = "Save Note";
      this.setState({editorState, isOpen: false});
    };
    this.submitNote = this.submitNote.bind(this);
    this.update = this.update.bind(this);
    this._toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.focus = () => this.refs.editor.focus();
    this.toggleModal = this.toggleModal.bind(this);
    this.changeNotebook = this.changeNotebook.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState(newProps.currentNoteRaw);
  }

  redirectToIndex(e){
    e.preventDefault();
    hashHistory.push('/');
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

  submitNote(e){

    e.preventDefault();
    this.saveText = "Saved!";
    let { id, title, author_id, notebook_id } = this.state;

    notebook_id = this.props.currentNotebook.id

    if(this.props.formType === 'new') {
      author_id = this.props.currentUser.id;
    }

    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    const rawContentString = JSON.stringify(rawContent);
    const note = { id, title, author_id: this.props.currentUser.id , notebook_id , body: rawContentString };
    this.props.processForm(note)
      .then( () => {
        if(this.props.formType === 'new'){
          hashHistory.push(`/notes`);
        }
      });
  }

  update(e){
    this.saveText = "Save Note";
    this.setState({ title: e.target.value });
  }

  toggleModal(e){
    e.preventDefault();
    this.setState({isOpen: true});
  }

  changeNotebook(notebook_id){
    this.setState({notebook_id, isOpen: false});
  }

  render() {

    const selectedNotebook = this.props.notebooks[this.state.notebook_id];
    const notebookTitle = selectedNotebook ? selectedNotebook.title : "";
    let selectorClassName = this.props.formType === 'new' ?
      "new-note-selector" : "edit-note-selector";

    return(
      <div className='form-parent-container' >


        <form className='form' onSubmit={ this.submitNote }>

          <NotebookSelectModal
            selectorClassName={selectorClassName}
            notebooks={ Object.values(this.props.notebooks) }
            isOpen={this.state.isOpen}
            changeNotebook={ this.changeNotebook } />

          <div className="fixed-main-controls">

            <div className="cancel-back">
              <button className="button"
                onClick={ this.redirectToIndex }>Cancel</button>
              <input className="button" type="submit" value={this.saveText} />
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

          </div>


          <div className="title-and-content">
            <input
              className="new-title"
              placeholder="Title your note"
              onChange={ this.update }
              type="text" value={this.state.title}/>


            <div className="draft-editor" onClick={ this.focus }>
              <Editor
                height="500"
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
