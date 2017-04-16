//Example state when a tag is searched, and selected

{
  session:
  {
    currentUser = {
                  id: 1,
                  email: "example@gmail.com"
                  },
    errors = []
  },

  notes:

  { "2":  {
          id: 2,
          title: "Grocery List",
          body: "milk, vegetables, fruit",
          author_id: 1,
          notebook_id: 2
          }

  notebooks:

  {
    "3":  { id: 3, title: "Housekeeping" }
  },

  tags:
  {
    "1": { id: 1, name: "things-to-buy" }
  },

  tagFilter:
  {
    tagId: 1
  }

  tagSearchFilter:
  {
    searchTerm: "things-to-buy"
  },

  noteSearchFilter:
  {
    searchTerm: ""
  }

}
