import React from 'react';
import { hashHistory } from 'react-router';

const NavButton = props => {

  const handleLogout = e => {
    e.preventDefault();
    props.logout().
      then(() => hashHistory.push('/login'));
  };
  
  return(
    <li className="nav-bar">
      <div onClick={ handleLogout }
        className = "logout-button" >

        <img src={ window.images["LOGOUT"] } />
        <p>LOGOUT</p>

      </div>
    </li>
  );
};

export default NavButton;
