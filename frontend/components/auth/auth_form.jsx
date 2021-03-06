import React from 'react';
import { hashHistory, Link } from 'react-router';


class AuthForm extends React.Component{
  constructor(props){
    super(props);
    this.default = { username: "", password: "", email: ""};
    this.state = this.default;
    this.loader = false;
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
    const currentPath = this.props.location.pathname;
    const newPath = newProps.location.pathname;
    if (currentPath !== newPath){
      this.props.clearErrors();
      this.setState(this.default);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.loader = true;
    this.props.processForm(this.state)
      .then(
        () => {
          this.props.fetchNotes("all")
            .then( () => this.props.fetchNotebooks())
            .then( () => this.props.fetchTags())
            .then( () => this.props.fetchTaggings())
            .then( () => {
              this.props.clearErrors();
              hashHistory.push('/');
            });
        },
        () => {
          this.loader = false;
          this.setState(this.default)
        }
      );
  }

  handleDemoLogin(e) {
    e.preventDefault();
    this.loader = true;
    this.setStat
    this.props.processForm({username: "harry", password: "potter"})
      .then(
        () => {
          this.props.fetchNotes("all")
            .then( () => this.props.fetchNotebooks())
            .then( () => this.props.fetchTags())
            .then( () => this.props.fetchTaggings())
            .then( () => {
              hashHistory.push('/');
              this.props.clearErrors();
            });
        },
        () => {
          this.loader = false;
          this.setState(this.default)
        }
      );
  }

  renderLoader() {
    return(
      <div className="loader-container">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    );
  }

  render(){

    if(this.loader){
      return this.renderLoader();
    }

    let formTitle = "Sign Up";
    let altLink =
      <p>Have an account?
        <br/><br/>
        <Link to='/login' className='alt-path-link'>Click here to login.</Link>
      </p>;

    let demoUserButton = ""
    let emailInput =
      <input
        className="form-text-input"
        onChange={ this.update('email') }
        type="input"
        placeholder="Email"
        value={ this.state.email } />;


    if(this.props.formType === "login"){
      formTitle = "Login";
      emailInput = "";
      altLink = <p><Link
        to='/signup'
        className='alt-path-link'
        >Create Account</Link></p>

      demoUserButton = <button
        className="button demo-login-button"
        onClick={ this.handleDemoLogin }
        >Login as Harry Potter</button>
    }

    return(
      <div className="auth-form-parent">
        <header className="top-line"></header>
        <div className="video-bg">

          <div className="splash-video">
            <video loop="loop" autoPlay="autoplay">
              <source type="video/mp4" src="//ak4.picdn.net/shutterstock/videos/2739824/preview/stock-footage-old-yellow-colored-turtle-slowly-moving-through-the-scene-on-green-grass-shot-during-hot-sunny-day.mp4"/>
              <source type="video/webm" src="//ak4.picdn.net/shutterstock/videos/2739824/preview/stock-footage-old-yellow-colored-turtle-slowly-moving-through-the-scene-on-green-grass-shot-during-hot-sunny-day.webm"/>
            </video>
          </div>

          <div className="form-content">
            <img className="auth-logo" src={ window.images.LOGO_LARGE }></img>

            <h1 className="form-title">{ formTitle }</h1>


            <form className="auth-form" onSubmit={ this.handleSubmit }>

              { this.renderErrors() }

              { emailInput }

              <input
                className="form-text-input"
                type="text"
                value={this.state.username}
                placeholder="Username"
                onChange={ this.update('username') } />

              <input
                className="form-text-input"
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


      </div>
    );
  }
}

export default AuthForm;
