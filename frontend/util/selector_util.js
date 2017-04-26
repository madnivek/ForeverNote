export const getNotesByTag = (notes, taggings, tagId) => {
  const noteIdArray = taggings[tagId];
  const noteArray = noteIdArray.map( noteId => {
    return notes[noteId];
  });
  return noteArray;
};


export const getNotesByNotebook = (notes, notebookId) => {
  const allNotesArray = Object.values(notes);
  const notebookNotesArray = allNotesArray.filter( note => {
    return note.notebook_id === parseInt(notebookId);
  });
  return notebookNotesArray;
};
