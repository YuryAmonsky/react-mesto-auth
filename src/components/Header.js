import React from 'react';
import logo from '../images/logo/logo.svg';

function Header(){
  return(
    <header className="header">
      <img className="logo" src={logo} alt="Место" />
    </header>
  );

}

export default Header;