import React from 'react';
import NotebookIndexItem from './notebook_index_item';
import { withRouter, Link } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class NotebookIndex extends React.Component {

  constructor(props){
    super(props);
    this.state = { notebooks: this.props.notebooks, searchString: ""};
    this.allNotebooks = this.props.notebooks.slice();
    this.updateSearchBar = this.updateSearchBar.bind(this);
    this.filterNotebooksBySearch = this.filterNotebooksBySearch.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({notebooks: newProps.notebooks});
  }

  updateSearchBar(e){
    e.preventDefault();
    this.setState( {searchString: e.target.value} );
    this.filterNotebooksBySearch(e.target.value);
  }

  filterNotebooksBySearch(searchString){
    const regExp = new RegExp(searchString, "i");

    const filter = notebook => {
      if(searchString === "" || regExp.test(notebook.title)){
        return true;
      } else {
        return false;
      }
    };

    const notebooks = this.allNotebooks.filter(filter);
    this.setState({notebooks});
  }

  render(){
    const notebooks = this.state.notebooks.map( notebook =>{
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

        <div className="loader"></div>
        <div className="main-container">
          <section className="index-section">
            <div className="index-header"><h2>NOTEBOOKS</h2>{ addNotebookButton }</div>
            <div className="search-container tags-search-container">
              <i className="fa fa-search" aria-hidden="true"></i>
              <input
                className = "search-input"
                type="text"
                placeholder="search by title..."
                value={this.state.searchTerm}
                onChange={ this.updateSearchBar } />
            </div>

            <ul className="note-index-list">
              <CSSTransitionGroup
                transitionName="search-transition"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}>

                  { notebooks }

              </CSSTransitionGroup>
            </ul>
          </section>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default withRouter(NotebookIndex);
