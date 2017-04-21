import React from 'react';
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';
import { hashHistory } from 'react-router';

class NewNote extends React.Component{
  constructor(props){
    super(props);
    this.state = {  title: "", editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.submitNote = this.submitNote.bind(this);
    this.update = this.update.bind(this);
  }

  redirectToIndex(e){
    e.preventDefault();
    hashHistory.push('/');
  }

  submitNote(e){
    e.preventDefault();
    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    const rawContentString = JSON.stringify(rawContent);
    const newNote = {  title: this.state.title,
                          author_id: this.props.currentUserId,
                          notebook_id: 1,
                          body: rawContentString };
    this.props.createNote(newNote).then(() => hashHistory.push('/'))
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
            <button className="button">B</button>
            <button className="button">I</button>
            <button className="button">U</button>
          </nav>


          <input
            className="new-form-title"
            placeholder="Title your note"
            onChange={ this.update }
            type="text"></input>


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
