import React from 'react';
import Logo from './logo';
import Searchbar from './searchbar';
import Navbar from './navbar';
import classes from '../../../styles/header.module.css';

const Header = () => {
  return (
    <header className={classes['header']}>
      <Logo />
      <Searchbar />
      <Navbar />
    </header>
  );
};
export default Header;
