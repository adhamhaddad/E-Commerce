import React from 'react';
import Logo from './logo';
import SearchBar from './searchbar';
import Navbar from './navbar';
import styles from '@styles/header.module.css';

const Header = () => {
  return (
    <header className={styles['header']}>
      <Logo />
      <SearchBar />
      <Navbar />
    </header>
  );
};
export default Header;
