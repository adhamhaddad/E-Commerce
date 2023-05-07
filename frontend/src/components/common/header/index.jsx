import React from 'react';
import Logo from './logo';
import SearchBar from './searchbar';
import Navbar from './navbar';
import classes from '../../../styles/header.module.css';

const Header = () => {
  return (
    <header className={classes['header']}>
      <Logo />
      <SearchBar />
      <Navbar />
    </header>
  );
};
export default Header;
