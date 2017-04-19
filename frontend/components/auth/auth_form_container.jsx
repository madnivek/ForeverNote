import { connect } from 'react-redux';
import React from 'react';
import { login, signup, receiveErrors } from '../../actions/session_actions';
import AuthForm from './auth_form';

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: Boolean(session.currentUser),
    errors: session.errors
  };
};

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = formType === "login" ? login : signup;
  return {
    processForm: user => dispatch(processForm(user)),
    clearErrors: () => dispatch(receiveErrors([])),
    formType
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
