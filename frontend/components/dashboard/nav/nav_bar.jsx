import React from 'react';
import NavButton from './nav_button';

class NavBar extends React.Component {



  render(){

    const buttonNames = ["NEW", "SEARCH", "NOTES", "NOTEBOOKS", "TAGS"];
    const redirectLinks = ["/note/new", "/note/search", "/notes", "/notebooks", "/tags"];

    const buttons = buttonNames.map( (name, index) => {
      return(
        <NavButton buttonName={name} redirectLink={redirectLinks[index]} />
      );
    });

    return(
      <ul>
        <NavButton buttonName="LOGOUT" logout={this.props.logout} />
      </ul>
    );
  }
}

export default NavBar;
