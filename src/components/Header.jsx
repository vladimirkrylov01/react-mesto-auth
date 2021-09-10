import React from 'react';
import headerLogo from '../images/header/header__logo.svg'

const Header = () => {
  return (
    <header className='header'>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a target="_self" href={null}>
        <img className="header__logo" src={headerLogo}
             alt="Логотип Mesto"/>
      </a>
    </header>
  );
};

export default Header;