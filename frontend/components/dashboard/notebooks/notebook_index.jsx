import React from 'react';
import NotebookIndexItem from './notebook_index_item';


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
          fetchNotebook={ this.props.fetchNotebook }
          fetchNotes={ this.props.fetchNotes} />
      );
    });


    return(
      <div className="main-container">
        <section className="notebook-index-section">
          <h2 className="notebook-index-header">NOTEBOOKS</h2>
          <ul className="note-index-list">
            { notebooks }
          </ul>
        </section>
      </div>
    );
  }
}

export default NotebookIndex;
