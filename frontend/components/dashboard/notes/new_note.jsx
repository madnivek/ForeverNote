import React from 'react';
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';
import { hashHistory } from 'react-router';;

class NewNote extends React.Component{
  constructor(props){
    super(props);
    this.state = {  title: "", editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.submitNote = this.submitNote.bind(this);
    this.update = this.update.bind(this);
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
      <form onSubmit={ this.submitNote }>

        <label>Title:
          <input onChange={ this.update } type="text"></input>
        </label>

        <div className="draft-editor">
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
        </div>

        <input type="submit" value="Submit" />

      </form>
    );
  }
}

export default NewNote;
