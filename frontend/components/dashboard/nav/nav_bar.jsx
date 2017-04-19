import React from 'react';
import NavButton from './nav_button';

class NavBar extends React.Component {

  render(){
    return(
      <NavButton logout={this.props.logout} />
    );
  }
}

export default NavBar;
