import React from 'react';
import { hashHistory, Link } from 'react-router';

class AuthForm extends React.Component{
  constructor(props){
    super(props);
    this.default = { username: "", password: "", email: ""};
    this.state = this.default;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  update(field){
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  renderErrors() {
    if(this.props.errors){
      return(
        <ul className="error-list">
          {
            this.props.errors.map( (error, i) => {
              return <li key={error}> { error }</li>;
              })
            }
          </ul>
        );
    }
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

  handleDemoLogin(e) {
    e.preventDefault();
    this.props.processForm({username: "harry", password: "potter"})
      .then(
        () => hashHistory.push('/'),
        this.setState(this.default)
      );
  }

  render(){
    let formTitle = "Sign Up";

    let altLink =
    <p>Have an account?
      <br/><br/>
      <Link to='/login' className='alt-path-link'>Click here to login.</Link>
    </p>

    let demoUserButton = ""
    let emailInput = <input
      onChange={ this.update('email') }
      type="input"
      placeholder="Email"
      value={ this.state.email } />;


    if(this.props.formType === "login"){
      formTitle = "Login";
      emailInput = "";

      altLink = <p><Link to='/signup' className='alt-path-link'>Create Account</Link></p>

      demoUserButton = <button className="button demo-login-button" onClick={ this.handleDemoLogin }>Demo User Login!</button>

    }

    // <video className="splash-video" loop="loop" autoPlay="autoplay">
    //   <source className="webm" type="video/webm" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.webm"/>
    //   <source className="mp4" type="video/mp4" src="https://cdn1.evernote.com/evernote.com/video/homepage/homepage-hero-video.mp4"/>
    // </video>

    return(
      <div className="auth-form-parent">
        <header className="top-line"></header>
        <div className="video-bg">

          <video className="splash-video" loop="loop" autoPlay="autoplay">
            <source type="video/mp4" src="//ak4.picdn.net/shutterstock/videos/2739824/preview/stock-footage-old-yellow-colored-turtle-slowly-moving-through-the-scene-on-green-grass-shot-during-hot-sunny-day.mp4"/>
            <source type="video/webm" src="//ak4.picdn.net/shutterstock/videos/2739824/preview/stock-footage-old-yellow-colored-turtle-slowly-moving-through-the-scene-on-green-grass-shot-during-hot-sunny-day.webm"/>
          </video>

          <img className="auth-logo" src={ window.images.LOGO_LARGE }></img>

          <h1 className="form-title">{ formTitle }</h1>


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


            <input type="submit" value={formTitle} className='button submit-button' />

            { demoUserButton }

            { altLink }


          </form>
        </div>


      </div>
    );
  }
}

export default AuthForm;
