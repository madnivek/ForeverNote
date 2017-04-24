import React from 'react';
import { hashHistory, withRouter } from 'react-router';

class NavButton extends React.Component {

  constructor(props){
    super(props);
    this.state = { imgSrc: window.images[this.props.buttonName] }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    this.setState({
      imgSrc: window.images[this.props.buttonNameHov]
    });
  }

  handleMouseOut() {
    this.setState({
      imgSrc: window.images[this.props.buttonName]
    });
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout().
      then( () => hashHistory.push('/login'));
  };

  handleRedirect(e) {
    e.preventDefault();
    if(this.props.location.pathname === this.props.redirectLink){
      hashHistory.goBack();
    } else {
      hashHistory.push(this.props.redirectLink)
    }
  }

  render(){

    const buttonAction = this.props.buttonName === "LOGOUT" ? this.handleLogout : this.handleRedirect;

    return (
      <li>
        <div className="nav-bar-button" onClick={ buttonAction } onMouseOver={ this.handleMouseOver } onMouseOut={ this.handleMouseOut } >

          <img  src={ this.state.imgSrc }  />
          <p className="pop-up-text">{this.props.buttonName}</p>

        </div>
      </li>
    );
  }
}

export default withRouter(NavButton);
