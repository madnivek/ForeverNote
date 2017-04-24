import React from 'react';
import { hashHistory } from 'react-router';

class NewNotebook extends React.Component {

  constructor(props){
    super(props);
    this.state = { title: "", author_id: this.props.authorId };
    this.handleNewNotebook = this.handleNewNotebook.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle(e) {
    e.preventDefault();
    this.setState({title: e.target.value});
  }

  handleNewNotebook(e) {
    e.preventDefault();
    this.props.createNotebook(this.state)
      .then( () => hashHistory.push('/notebooks'))
  }

  // .then( () => hashHistory.push('/notebooks'));
  render(){
    return(
        <div className="new-notebook-parent">
          <form className="new-notebook-form" onSubmit={ this.handleNewNotebook }>
            <h3>Create Notebook</h3>
            <input className="new-title notebook-input" type="text" placeholder="Title your notebook" onChange={ this.updateTitle } />
            <input className="button new-notebook-button" type="submit" value="Create Notebook" />
          </form>
        </div>
      );
  }

}

export default NewNotebook;
