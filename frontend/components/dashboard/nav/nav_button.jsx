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
  //
  // if(props.buttonName === "LOGOUT"){
  //   button =
  //     <li className="nav-bar">
  //       <div onClick={ handleRedirect }
  //         className ={props.buttonName}>
  //
  //         <img src={ window.images[props.buttonName] } />
  //         <p>{props.buttonName}</p>
  //
  //       </div>
  //     </li>
  // } else {
  //   button =
  //   <li className="nav-bar">
  //     <div onClick={ handleLogout }
  //       className = "logout-button" >
  //
  //       <img src={ window.images[props.buttonName] } />
  //       <p>LOGOUT</p>
  //
  //     </div>
  //   </li>
  // }
  //
  // debugger

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
