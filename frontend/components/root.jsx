import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect} from 'react-router';
import App from './app';
import AuthFormContainer from './auth/auth_form_container';
import NoteIndexContainer from './dashboard/notes/note_index_container';
import NewNoteContainer from './dashboard/notes/new_note_container';
import ForeverModal from './dashboard/forever_modal';

const Root = ({ store }) => {



  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if(!currentUser){
      replace('/login');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if(currentUser) {
      replace("/");
    }
  };

  return(
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/login" component={ AuthFormContainer} onEnter={ _redirectIfLoggedIn } />
        <Route path="/signup" component={ AuthFormContainer } onEnter={ _redirectIfLoggedIn } />
        <Route path="/notes/new" component={ NewNoteContainer } onEnter={ _ensureLoggedIn } />
        <Route path="/" component={ App } onEnter={ _ensureLoggedIn }>
          <IndexRedirect to="/notes" />
          <Route path="/notebooks/:notebookId" component={ NoteIndexContainer } onEnter={ _ensureLoggedIn } />
          <Route path="/notes" component={ NoteIndexContainer } onEnter={ _ensureLoggedIn }>
            <Route path="/notes/:noteId" component={ NewNoteContainer } onEnter={ _ensureLoggedIn } />
            <Route path="/notebooks" component={ ForeverModal } onEnter={ _ensureLoggedIn } />
          </Route>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
