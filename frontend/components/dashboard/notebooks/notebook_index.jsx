import React from 'react';
import NotebookIndexItem from './notebook_index_item';

class NotebookIndex extends React.Component {

  componentDidMount(){
    this.props.fetchNotebooks();
  }

  render(){
    const notebooks = this.props.notebooks.map( notebook =>{
      return(
        <NotebookIndexItem key={notebook.id} notebook={notebook} />
      );
    });
    return(
      <ul>
        { notebooks }
      </ul>
    );
  }
}

export default NotebookIndex;
