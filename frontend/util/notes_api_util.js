export const fetchNotes = () => {
  return $.ajax({
    type: 'GET',
    url: 'api/notes'
  });
};

export const fetchNote = (id) => {
  return $.ajax({
    type: 'GET',
    url: `api/notes/${id}`
  });
};

export const createNote = (note) => {
  return $.ajax({
    type: 'POST',
    url: 'api/notes',
    data: { note }
  });
};

export const updateNote = (note) => {
  return $.ajax({
    type: 'PATCH',
    url: `api/notes/${note.id}`,
    data: { note }
  });
};

export const deleteNote = (id) => {
  return $.ajax({
    type: 'DELETE',
    url: `api/notes/${id}`
  });
};
