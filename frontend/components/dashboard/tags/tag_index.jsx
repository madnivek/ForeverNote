import React from 'react';
import TagIndexItem from './tag_index_item';
import { withRouter, Link } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class TagIndex extends React.Component {

  componentDidMount(){
    this.props.fetchTags();
  }

  render(){
    const tags = this.props.tags.map( tag =>{
      return(
        <TagIndexItem
          key={tag.id}
          tag={tag}
          deleteTag={ this.props.deleteTag }
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
            <ul className="note-index-list">
              { tags }
            </ul>
          </section>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default withRouter(TagIndex);
