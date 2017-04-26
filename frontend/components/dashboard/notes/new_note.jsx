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
          if(this.props.currentNotebook.id){
            this.props.fetchNotes('notebook', this.props.currentNotebook.id);
          }
        }
      });
  }

  update(e){
    this.setState({ title: e.target.value, saveText: "Save Note" });
  }

  toggleModal(e){
    e.preventDefault();
    this.setState({isOpen: true});
  }

  changeNotebook(notebook_id){
    this.setState({notebook_id, isOpen: false, saveText: "Save Note"});
  }

  render() {

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
            currentNotebookId={this.props.currentNotebookId}
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
