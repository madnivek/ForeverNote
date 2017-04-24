import React from 'react';

const NotebookIndexItem = props => {
  return(
    <li>
      <div>
        <h3 className="notebook-item-header">{props.notebook.title}</h3>
      </div>
    </li>
  );
};

export default NotebookIndexItem;
