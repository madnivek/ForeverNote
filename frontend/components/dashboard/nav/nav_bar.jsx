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
      <div className="nav-bar">
        <ul>
          <li>
            <img src={window.images.LOGO}></img>
          </li>
          { buttons }
        </ul>
      </div>
    );
  }
}

export default NavBar;
