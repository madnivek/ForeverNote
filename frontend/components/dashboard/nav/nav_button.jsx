import React from 'react';
import { hashHistory } from 'react-router';

const NavButton = props => {

  const handleLogout = e => {
    e.preventDefault();
    props.logout().
      then( () => hashHistory.push('/login'));
  };

  const handleRedirect = e => {
    e.preventDefault();
    hashHistory.push('/notes/new')
  }

  let button = "";

  const buttonAction = props.buttonName === "LOGOUT" ? handleLogout : handleRedirect;

  return (
    <li>
      <div onClick={ buttonAction }>

        <img src={ window.images[props.buttonName] } />
        <p className="pop-up-text">{props.buttonName}</p>

      </div>
    </li>
  );
};

export default NavButton;
