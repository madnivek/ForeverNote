import React from 'react';
import NavButton from './nav_button';

class NavBar extends React.Component {



  render(){

    const buttonNames = ["NEW", "SEARCH", "NOTES", "NOTEBOOKS", "TAGS", "LOGOUT"];
    const redirectLinks = ["/notes/new", "/notes/search", "/notes", "/notebooks", "/tags", ""];
    let logout = "";

    const buttons = buttonNames.map( (name, index) => {

      if( name === "LOGOUT") { logout = this.props.logout }

      return(
        <NavButton
          key={name}
          buttonName={name}
          redirectLink={redirectLinks[index]}
          logout={logout}
        />
      );
    });

    return(
      <ul className="nav-bar-ul">
        { buttons }
      </ul>
    );
  }
}

export default NavBar;
