import React from 'react';
import TagIndexItem from './tag_index_item';
import { withRouter, Link } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class TagIndex extends React.Component {

  constructor(props){
    super(props);
    this.state = { tags: this.props.tags, searchString: ""}
    this.allTags = this.props.tags.slice();
    this.updateSearchBar = this.updateSearchBar.bind(this);
    this.filterTagsBySearch = this.filterTagsBySearch.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({tags: newProps.tags});
  }

  updateSearchBar(e){
    e.preventDefault();
    this.setState( {searchString: e.target.value} );
    this.filterTagsBySearch(e.target.value);
  }

  filterTagsBySearch(searchString){
    const filter = tag => {
      return tag.tag_name.includes(searchString)
    };
    const tags = this.allTags.filter(filter);
    this.setState({tags});
  }

  render(){
    const tags = this.state.tags.map( tag =>{
      return(
        <TagIndexItem
          key={tag.id}
          tag={tag}
          deleteTag={ this.props.deleteTag }
          fetchTaggings={ this.props.fetchTaggings }
          setCurrentNotebook={this.props.setCurrentNotebook}
          setCurrentTag={this.props.setCurrentTag} />
      );
    });

    return(
      <CSSTransitionGroup
        transitionName="notebook-index-transition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <div className="main-container">
          <section className="notebook-index-section">
            <h2 className="notebook-index-header">TAGS</h2>
            <div className="search-container">
              <i className="fa fa-search" aria-hidden="true"></i>
              <input
                className = "search-input"
                type="text"
                placeholder="search by tag..."
                value={this.state.searchTerm}
                onChange={ this.updateSearchBar } />
            </div>

            <ul className="note-index-list">
              <CSSTransitionGroup
                transitionName="tag-search-transition"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}>

                  { tags }

              </CSSTransitionGroup>
            </ul>

          </section>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default withRouter(TagIndex);
