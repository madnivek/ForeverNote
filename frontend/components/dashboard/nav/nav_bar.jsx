import React from 'react';
import NavButton from './nav_button';

class NavBar extends React.Component {

  render(){
    const buttonNames = ["NEW", "NOTES", "NOTEBOOKS", "TAGS", "LOGOUT"];
    const buttonNamesHov = ["NEW_HOV", "NOTES_HOV", "NOTEBOOKS_HOV", "TAGS_HOV", "LOGOUT_HOV"];

    const redirectLinks = ["/notes/new", "/notes", "/notebooks", "/tags", ""];
    let logout = "";

    const buttons = buttonNames.map( (name, index) => {

      if( name === "LOGOUT") { logout = this.props.logout; }

      let nameHov = buttonNamesHov[index];
      return(
        <NavButton
          key={name}
          buttonName={name}
          buttonNameHov ={nameHov}
          redirectLink={redirectLinks[index]}
          logout={logout}/>
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
