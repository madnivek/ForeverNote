import React from 'react';
import NotebookIndexItem from './notebook_index_item';
import { withRouter, Link } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

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
          setCurrentTag={this.props.setCurrentTag}
          setCurrentNotebook={ this.props.setCurrentNotebook }
          fetchNotes={ this.props.fetchNotes} />
      );
    });

    let addNotebookButton;
    const location = this.props.router.getCurrentLocation().pathname;
    if(location === "/notebooks"){
      addNotebookButton = <Link to='/notebooks/new'><i className="fa fa-plus-circle add-notebook" aria-hidden="true" /></Link>;
    }


    return(
      <CSSTransitionGroup
        transitionName="notebook-index-transition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <div className="main-container">
          <section className="notebook-index-section">
            <div className="notebook-index-header"><h2>NOTEBOOKS</h2>{ addNotebookButton }</div>
            <ul className="note-index-list">
              { notebooks }
            </ul>
          </section>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default withRouter(NotebookIndex);
