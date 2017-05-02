# ForeverNote

[ForeverNote live][heroku]

[heroku]: https://forever-note.herokuapp.com/

ForeverNote is a full-stack web application that takes inspiration from Evernote. It relies on Ruby On Rails and a PostgresQL database for the backend. On the frontend, most features were implemented using a React.js and Redux framework.

## Features & Implementation

### Creating, Editing, and Deleting Notes

  Notes are stored in the database as a single table which tracks a note's `id`, `title`, `user_id`, `body`, `plain_content`, `created_at`, and `updated_at` columns. When a user logs in, an API request is made to fetch all a user's notes. This filtering is performed on the backend using an ActiveRecord query for all notes having the current user's ID. These notes are then stored on the frontend in a "notes" slice of state.

  Notes are rendered to the page using a NoteContainer which handles viewing, editing, and creating notes depending on the user's page location. This implemenation ensured that the code remained DRY and gives flexibility for restructuring of the website.

  Note editing was implemented using Facebook's Draft.js library which allows for rich text editing and the use of various useful plugins.

### Notebooks

  The `notebook` table in the database includes a `title` and `id` column which is referenced as a foreign key by the 'Note' table.

  The NotebookIndex (and later the TagIndex) are rendered using a modal called "ForeverModal". This modal slides in from the side of the page and displays all of the user's notebooks. This kind of structure allows for easy addition of new modals.

  Modals were implemented using React's 'react-modal' package.

  `ForeverModal` render method:

  ```javascript
  render(){
    let modal;
    switch(this.props.route.modalType){
      case "notebooks": {
        modal = <NotebookIndexContainer />;
        break;
      }
      case "tags": {
        modal = <TagIndexContainer />;
        break;
      }
      default: {
        modal = "";
        break;
      }
    }

    return(
      <Modal
          className="forever-modal"
          overlayClassName="forever-modal-overlay"
          isOpen={ this.state.modalIsOpen }
          shouldCloseOnOverlayClick = {true}
          contentLabel="Example Modal"
          onRequestClose={this.closeModal}
        >
        { modal }
      </Modal>
    );
  }
  ```

  Demo:
  
  ![notebook-demo](https://github.com/madnivek/ForeverNote/blob/master/docs/gif/notebook-demo.gif)


### Tags

Tags were implementing using a `tag` and `taggings` table. The tags table includes a `tag_name` and timestamps columns.

The taggings table serves as a join table, linking a note and a tag and their many-to-many associations. As such, the taggings table includes a `tag_id` and `note_id` column, as well as a `user_id` column so that taggings can be linked to a particular user.

Tags are stored in the frontend using a `tags` slice of state in the store, which includes a `taggings` key which stores all of the taggings.

### Search

A search feature is core to a note-taking app which allows for maximum usability. As a user's notes are all stored in the frontend at the time of login, the search functionality was implemented in the frontend to reduce the number of API requests necessary. As such, the search is relatively efficient.

The Search feature has been implemented for searching notes by title or body, and also searching all tags for a specific tag name.

The search was baked right into the tag and note index, which allowed for a quick and useful auto-complete feature.

Search function in note index component:

```javascript
  filterNotesBySearch(){
    const titleStr = this.state.titleSearchString;
    const bodyStr = this.state.bodySearchString;
    const titleRegExp = new RegExp(titleStr, "i");
    const bodyRegExp = new RegExp(bodyStr, "i");
    const filter = note => {
      if(titleStr + bodyStr === ""){
        return true;
      } else if( titleStr === ""){
        return bodyRegExp.test(note.body);
      } else if( bodyStr === "") {
        return titleRegExp.test(note.title);
      } else {
        return bodyRegExp.test(note.body) && titleRegExp.test(note.title);
      }
    };

    const currentNotes = this.currentNotes.filter(filter);
    this.setState({currentNotes});
  }

  ```

## Future Directions for the Project

Although I am happy with the current features of ForeverNote, there is always more to be done. I plan on working on the following features in the future:

### Favorites
  This feature will allow users to favorite or bookmark notes for easy access. Since users can already store notes in notebooks, this feature isn't the most pressing.

### Note Sort
  This will allow notes to be sorted by specific criteria. For example: alphabetically, by date, or by most views.

### Overall Usability
  I would like to add small features throughout the website that increase user usability. For example, I'd like my note index to be a bit more descriptive - perhaps adding in a time stamp or time since last updated info-tag.
