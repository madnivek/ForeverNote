import React from 'react';
import NotebookIndexItem from './notebook_index_item';
import { withRouter, Link } from 'react-router';


class NotebookIndex extends React.Component {

  componentDidMount(){
    this.props.fetchNotebooks();
  }

  render(){
    const notebooks = this.props.notebooks.map( notebook =>{
      return(
        <NotebookIndexItem
          key={notebook.id}
          notebook={notebook}
          deleteNotebook={ this.props.deleteNotebook }
          fetchNotebook={ this.props.fetchNotebook }
          fetchNotes={ this.props.fetchNotes} />
      );
    });

    let addNotebookButton;
    const location = this.props.router.getCurrentLocation().pathname;
    if(location === "/notebooks"){
      addNotebookButton = <Link to='/notebooks/new'><i className="fa fa-plus-circle add-notebook" aria-hidden="true" /></Link>;
    }


    return(
      <div className="main-container">
        <section className="notebook-index-section">
          <div className="notebook-index-header"><h2>NOTEBOOKS</h2>{ addNotebookButton }</div>
          <ul className="note-index-list">
            { notebooks }
          </ul>
        </section>
      </div>
    );
  }
}

export default withRouter(NotebookIndex);
