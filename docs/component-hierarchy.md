# Component Hierarchy

## Authentication

**AuthFormContainer**
  - AuthForm (for both create account and login)

## Main Page Components

**MainContainer**
  - Main
    - NoteForm
  - SideBar
    - NoteIndex
    - TagIndex
    - NotebookIndex

## Note Form (Show/Edit View)

**NoteFormContainer**
- NoteForm

## Note Index

**NoteIndexContainer**
  - NoteSearch
  - NoteIndex
    - NoteIndexItem
      - NoteInfo (notebook, tag)

## Tag Form (Show/Edit View)

**TagFormContainer**
  - TagForm

## Tag Index

**TagIndexContainer**
  - TagSearch
  - TagIndexContainer
    - TagIndexItem

## Notebook Form (Show/Edit View)

**NotebookFormContainer**
  - NotebookForm

## Notebook Index

**NotebookContainer**
  - NotebookSearch
  - NotebookIndexContainer
    - NotebookIndexItem

## Search

**NoteSearch**
  - NoteSearchBar
  - NoteSearchResults

**TagSearch**
  - TagSearchBar
  - TagSearchResults

**NotebookSearch**
  - NotebookSearchBar
  - NotebookSearchResults

# Routes

|Path                                       |Component                   |
|-------------------------------------------|----------------------------|
| "/sign-up"                                | AuthContainer              |
| "/sign-in"                                | AuthContainer              |
| "/main"                                   | MainContainer              |
| "/main/:noteId"                           | NoteFormContainer          |
| "/main/notebook/"                         | NotebookIndexContainer     |
| "/main/notebook/:notebookId/note/:noteId" | NoteFormContainer          |
| "/main/notebook/search"                   | NotebookSearch             |
| "/main/tag/                               | TagIndexContainer          |
| "/main/tag/:tagId/note/:noteId"           | NoteFormContainer          |
| "/main/tag/search                         | TagSearch                  |
| "/new-note                                | NoteFormContainer          |
| "/new-notebook                            | NotebookFormContainer      |
| "/new-tag                                 | TagFormContainer           |
