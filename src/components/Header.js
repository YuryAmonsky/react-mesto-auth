import React from 'react';
import logo from '../images/logo/logo.svg';

function Header(props){
  return(
    <header className="header">
      <img className="logo" src={logo} alt="Место" />
      <nav className="nav-bar">
        {props.children}
      </nav>      
    </header>
  );

}

export default Header;