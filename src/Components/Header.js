import React from 'react';
import logo from '../images/header__logo.svg';

function Header () {
  return (
    <header className="header page__header">
      <img src={logo} alt="Место" className="header__logo" />
    </header>
  )
}

export default Header;