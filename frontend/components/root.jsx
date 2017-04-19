import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect} from 'react-router';
import App from './app';
import AuthFormContainer from './auth/auth_form_container';
import NavBarContainer from './dashboard/nav/nav_bar_container';



const Root = ({ store }) => {
  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if(!currentUser){
      replace('/login');
    }
  };

  return(
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/login" component={ AuthFormContainer } />
        <Route path="/signup" component={ AuthFormContainer } />
        <Route path="/" component={ App } onEnter={ _ensureLoggedIn }>
          <NavBarContainer />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
