export const fetchNotebooks = () => {
  return $.ajax({
    type: 'GET',
    url: 'api/notebooks'
  });
};

export const fetchNotebook = (id) => {
  return $.ajax({
    type: 'GET',
    url: `api/notebooks/${id}`
  });
};

export const createNotebook = (notebook) => {
  return $.ajax({
    type: 'POST',
    url: 'api/notebooks',
    data: { notebook }
  });
};

export const updateNotebook = (notebook) => {
  return $.ajax({
    type: 'PATCH',
    url: `api/notebooks/${notebook.id}`,
    data: { notebook }
  });
};

export const deleteNotebook = (id) => {
  return $.ajax({
    type: 'DELETE',
    url: `api/notebooks/${id}`
  });
};
