import React from 'react';

class AuthForm extends React.Component{
  constructor(props){
    super(props);
    this.state = { username: "", password: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field){
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  

  handleSubmit(e){
    debugger
    e.preventDefault();
    this.props.processForm(this.state);
  }

  render(){
    return(
      <div>
        <form onSubmit={ this.handleSubmit }>
          <h1>Login/SignUp</h1>

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

          <input type="submit" value="Submit" />

        </form>
      </div>
    );
  }
}

export default AuthForm;
