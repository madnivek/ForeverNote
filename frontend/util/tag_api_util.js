export const fetchTags = () => {
  return $.ajax({
    type: 'GET',
    url: 'api/tags'
  });
};

export const fetchTag = id => {
  return $.ajax({
    type: 'GET',
    url: `api/tags/${id}`
  });
};

export const createTag = tag => {
  return $.ajax({
    type: 'POST',
    url: 'api/tags',
    data: { tag }
  });
};

export const updateTag = tag => {
  return $.ajax({
    type: 'PATCH',
    url: `api/tags/${tag.id}`,
    data: { tag }
  });
};

export const deleteTag = id => {
  return $.ajax({
  type: 'DELETE',
  url: `api/tags/${id}`
  });
};

export const fetchTaggings = () => {
  return $.ajax({
    type: 'GET',
    url: 'api/taggings'
  });
};
