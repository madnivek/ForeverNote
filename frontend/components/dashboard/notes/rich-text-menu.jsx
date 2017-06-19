import React from 'react';
import { RichUtils } from 'draft-js';
class RichTextMenu extends React.Component {
  constructor(props){
    super(props);
    this._toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this._toggleBlockType = this._toggleBlockType.bind(this);
  }

  _toggleInlineStyle(inlineStyle) {
    return (e) => {
      e.preventDefault();
      this.props.onChange(
        RichUtils.toggleInlineStyle(
          this.props.editorState,
          inlineStyle
        )
      );
    };
  }

  _toggleBlockType(blockType) {
    return (e) => {
      e.preventDefault();
      this.onChange(
        RichUtils.toggleBlockType(
          this.props.editorState,
          blockType
        )
      );
    };
  }

  render(){
    return(
      <li><nav className="rich-text-nav">

        <span onClick={ this.props.toggleModal } className="button">
          <i className="fa fa-book" aria-hidden="true"></i>
          { this.props.notebookTitle }
        </span>

        <span onMouseDown={ this._toggleInlineStyle("BOLD") }
          className="button"><i className="fa fa-bold" aria-hidden="true"></i></span>

        <span onMouseDown={ this._toggleInlineStyle("ITALIC") }
          className="button"><i className="fa fa-italic"
          aria-hidden="true"></i></span>

        <span onMouseDown={ this._toggleInlineStyle("UNDERLINE") }
          className="button"><i className="fa fa-underline"
          aria-hidden="true"></i></span>

        <span onMouseDown={ this._toggleInlineStyle("STRIKETHROUGH") }
          className="button"><i className="fa fa-strikethrough"
          aria-hidden="true"></i></span>

        <span onMouseDown={ this._toggleBlockType("unordered-list-item") }
          className="button"><i className="fa fa-list"
          aria-hidden="true"></i></span>

        <span onMouseDown={ this._toggleBlockType("ordered-list-item") }
          className="button"><i className="fa fa-list-ol"
          aria-hidden="true"></i></span>

        <span onMouseDown={ this._toggleBlockType("blockquote") }
          className="button"><i className="fa fa-square-o"
          aria-hidden="true"></i></span>

      </nav></li>
    );
  }
}

export default RichTextMenu;
