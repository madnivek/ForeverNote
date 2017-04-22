import React from 'react';
import { convertFromRaw, convertToRaw, Editor} from 'draft-js';
import { hashHistory } from 'react-router';

class NewNote extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.currentNoteRaw;
    this.onChange = (editorState) => this.setState({editorState});
    this.submitNote = this.submitNote.bind(this);
    this.update = this.update.bind(this);
  }

  redirectToIndex(e){
    e.preventDefault();
    hashHistory.push('/');
  }

  _convertFromRaw(rawContentString){
    return JSON.parse(rawContentString)
  }

  componentWillReceiveProps(newProps){
      this.setState(newProps.currentNoteRaw);
  }

  submitNote(e){
    e.preventDefault();
    let { id, title, author_id, notebook_id } = this.state;

    if(this.props.formType === 'new') {
      author_id = this.props.currentUserId,
      notebook_id = 1
    }

    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    const rawContentString = JSON.stringify(rawContent);
    const note = { id, title, author_id, notebook_id, body: rawContentString }
    this.props.processForm(note)
      .then( () => {
        if(this.props.formType === 'new'){
          hashHistory.push(`/notes/${id}`)
        }
      });
  }

  update(e){
    this.setState({ title: e.target.value });
  }

  render() {
    return(
      <div className='form-parent-container'>


        <form onSubmit={ this.submitNote }>
          <div className="cancel-back">

            <button className="button"
              onClick={ this.redirectToIndex }>Cancel</button>

            <input className="button" type="submit" value="Submit" />

          </div>

          <nav className="rich-text-nav">
            <button className="button"><i className="fa fa-bold" aria-hidden="true"></i></button>
            <button className="button"><i className="fa fa-italic" aria-hidden="true"></i></button>
            <button className="button"><i className="fa fa-underline" aria-hidden="true"></i></button>
            <button className="button"><i className="fa fa-strikethrough" aria-hidden="true"></i></button>
            <button className="button"><i className="fa fa-align-left" aria-hidden="true"></i></button>
            <button className="button"><i className="fa fa-align-center" aria-hidden="true"></i></button>
            <button className="button"><i className="fa fa-align-right" aria-hidden="true"></i></button>
            <button className="button"><i className="fa fa-align-justify" aria-hidden="true"></i></button>
          </nav>


          <input
            className="new-form-title"
            placeholder="Title your note"
            onChange={ this.update }
            type="text" value={this.state.title}/>


          <div className="draft-editor">
            <Editor
              height="500"
              editorState={this.state.editorState}
              onChange={this.onChange} />
          </div>

        </form>
      </div>
    );
  }
}

export default NewNote;
