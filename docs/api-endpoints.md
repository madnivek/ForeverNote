# API endpoints

## HTML API
### Root
  - `GET /`

## JSON API

### Users
  - `POST /api/users` ( create user)
  - `PATCH /api/users` ( update user)
  - `DELETE /api/users` ( destroy user )

### Session
  - `GET /api/session` ( get session)
  - `POST /api/session` ( create session )
  - `DELETE /api/session` ( destroy session )

### Notes
  - `GET /api/notes` ( index )
  - `POST /api/notes/` ( create note )
  - `GET /api/notes/:noteId` ( show note )
  - `PATCH /api/notes/:noteId` ( update note )
  - `DELETE /api/notes/:noteId` ( destroy note )

### Notebooks
  - `GET /api/notebooks` (index)
  - `POST /api/notebooks/` ( create notebook )
  - `GET /api/notebooks/:notebookId` ( show notebook )
  - `PATCH /api/notebooks/:notebookId` ( update notebook )
  - `DELETE /api/notebooks/:notebookId` ( destroy notebook )

### Tags
  - `GET /api/tags ` ( index )
  - `POST /api/tags ` ( create tag )
  - `GET /api/tags/:tagId` ( get notes with tag_id)
  - `PATCH /api/tags/:tagId` ( upate tag name)
  - `DELETE /api/tags/:tagId` ( destroy tag)
