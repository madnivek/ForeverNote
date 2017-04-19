import React from 'react';
import { hashHistory, Link } from 'react-router';

class AuthForm extends React.Component{
  constructor(props){
    super(props);
    this.default = { username: "", password: "", email: ""};
    this.state = this.default
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  update(field){
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  renderErrors() {
    return(
      <ul>
        {
          this.props.errors.map( (error, i) => {
            return <li key={error}> { error }</li>
          })
        }
      </ul>
    );
  }

  componentWillReceiveProps(newProps){
    if (this.props.location.pathname !== newProps.location.pathname){
      this.props.clearErrors();
      this.setState(this.default);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.processForm(this.state)
      .then(
        () => hashHistory.push('/'),
        this.setState(this.default)
      );
  }

  render(){
    let formTitle = "Create User";
    let altPath = '/login';
    let altPathText = 'Have an account? Click here to login.';
    let emailInput = <input
      onChange={ this.update('email') }
      type="input"
      placeholder="Email"
      value={ this.state.email } />;


    if(this.props.formType === "login"){
      formTitle = "Login";
      altPath = '/signup';
      altPathText = 'Create Account';
      emailInput = "";
    }

    return(
      <div className="auth-form-parent">
        <div className="video-bg">
          <video className="splash-video" loop="loop" autoPlay="autoplay">
            <source className="webm" type="video/webm" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.webm"/>
            <source className="mp4" type="video/mp4" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.mp4"/>
          </video>
        </div>

        <header className="top-line"></header>

        <h1>{ formTitle }</h1>

        <form className="auth-form" onSubmit={ this.handleSubmit }>

          { this.renderErrors() }

          { emailInput }

          <input
            type="text"
            value={this.state.username}
            placeholder="Username"
            onChange={ this.update('username') } />

          <input
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={ this.update('password') } />

          <input type="submit" value={formTitle} className='submit-button' />

          <Link to={ altPath } className='alt-path-link'>{ altPathText }</Link>

        </form>
      </div>
    );
  }
}

export default AuthForm;
