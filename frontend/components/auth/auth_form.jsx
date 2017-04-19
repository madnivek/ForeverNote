import React from 'react';
import { hashHistory } from 'react-router';

class AuthForm extends React.Component{
  constructor(props){
    super(props);
    this.state = { username: "", password: "", email: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field){
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  componentWillReceiveProps(newProps){
    if(this.props.location.pathname !== newProps.location.pathname){
      this.setState({ username: "", password: "", email: ""})
    }
  }

  handleSubmit(e){
    debugger
    e.preventDefault();
    this.props.processForm(this.state)
      .then(() => hashHistory.push('/'));
  }

  render(){
    const formTitle = this.props.formType === "login" ? "Login" : "Create User"
    let emailInput = "";
    if(formTitle === 'Create User'){
      emailInput = <input
        onChange={ this.update('email') }
        type="input"
        placeholder="Email"
        value={ this.state.email } />
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

          <input type="submit" value={formTitle} />

        </form>
      </div>
    );
  }
}

export default AuthForm;
