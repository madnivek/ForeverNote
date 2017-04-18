# ForeverNote

## Minimum Viable Product

ForeverNote is a web application inspired by Evernote. It will be built using Ruby on Rails and React/Redux. By the end of week 9, the app will exhibit several features, all of which will function smoothly and with bug-free navigation, sufficient css styling, and adequate seed data for a working demo.

- [ ] Hosting on Heroku
- [ ] Frontend/Backend Authentication
- [ ] Notes - create/edit
- [ ] Notebooks for note management
- [ ] Searchable Tagging System
- [ ] Rich Text Editing, allowing for text styling
- [ ] Production README

## Design Docs

* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: wireframes/png
[components]: component-hierarchy.md
[api-endpoints]: api-endpoints.md
[schema]: schema.md
[sample-state]: sample_state.js

## Implementation Timeline

### Phase 1: Backend and Frontend Authentication (2 Days - April 19th)
**Objective:** Create a functioning rails app with backend and frontend auth

### Phase 2: Note CRUD (2 Days April 21th)

**Objective:** Add notes feature. Initially, they a note index will be displayed alongside a note show component.

### Phase 3: Notebook CRUD (2 Days - April 23th)

**Objective:** Add notebooks feature. Notebooks will contain notes. Notebooks can be selected from a notebook index, and the corresponding notes in that notebook will be displayed.

### Phase 4: Implement Tags with Search (2.5 Days - April 25th)

**Objective:** Add tag feature. You can add tags to notes which can be used to filter and display notes. When a tag is selected, it will display all notes with that tag. There will also be a search bar above the tags index which will allow filtering by tag name.

### Phase 5: Implement Search From Note Body (2.5 Days - April 28th)

**Objective:** Add search feature. This will add a search bar above the notes index component that will search the title and body of all notes and display all matches.

## Bonus features

- [ ] Search notes by content
- [ ] Set Reminders on Notes
- [ ] Add checklist/todo in addition to notes
- [ ] Favorite Notes
