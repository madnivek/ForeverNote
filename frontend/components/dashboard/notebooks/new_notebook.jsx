import React from 'react';
import { hashHistory } from 'react-router';

class NewNotebook extends React.Component {

  constructor(props){
    super(props);
    this.state = this.props.notebook;
    this.handleNewNotebook = this.handleNewNotebook.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle(e) {
    e.preventDefault();
    this.setState({title: e.target.value});
  }

  handleNewNotebook(e) {
    e.preventDefault();
    this.props.processForm(this.state)
      .then( () => hashHistory.push('/notebooks'))
  }

  // .then( () => hashHistory.push('/notebooks'));
  render(){
    let formTitle = "Create Notebook"
    let buttonText = "Create"
    if(this.props.formType === "edit"){
      formTitle = "Edit Notebook";
      buttonText = "Edit";
    }

    return(
        <div className="new-notebook-parent">
          <form className="new-notebook-form" onSubmit={ this.handleNewNotebook }>
            <h3>{ formTitle }</h3>
            <input
              className="new-title notebook-input"
              type="text"
              value={ this.state.title }
              placeholder="Title your notebook"
              onChange={ this.updateTitle } />
            <input className="button new-notebook-button" type="submit" value={ buttonText } />
          </form>
        </div>
      );
  }

}

export default NewNotebook;
