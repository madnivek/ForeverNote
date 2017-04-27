export const getNotesByTag = (notes, taggings, tagId) => {

  const noteIdArray = taggings.tagsToNotes[tagId];
  let noteArray = [];
  if(noteIdArray !== undefined){
    noteArray = noteIdArray.map( noteId => {
      return notes[noteId];
    });
  }
  return noteArray.reverse();
};

export const getTagsByNote = (tags, taggings, noteId) => {

  const tagIdArray = taggings.notesToTags[noteId];
  let tagArray = [];
  if(tagIdArray !== undefined){
    tagArray = tagIdArray.map( tagId => {
      return tags[tagId];
    });
  }
  return tagArray.reverse();
};

export const getNotesByNotebook = (notes, notebookId) => {
  const allNotesArray = Object.values(notes);
  const notebookNotesArray = allNotesArray.filter( note => {
    return note.notebook_id === parseInt(notebookId);
  });
  return notebookNotesArray.reverse();
};