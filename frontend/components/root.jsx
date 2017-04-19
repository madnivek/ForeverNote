import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect} from 'react-router';
import App from './app';
import AuthFormContainer from './auth/auth_form_container';



const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/login" component={ AuthFormContainer } />
      <Route path="/signup" component={ AuthFormContainer } />
      <Route path="/" component={ App }>
        <IndexRedirect to="/login" />
      </Route>
    </Router>
  </Provider>
);

export default Root;
