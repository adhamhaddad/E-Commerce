import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.jpg';
import classes from '../../../styles/logo.module.css';

const Logo = () => {
  return (
    <div className={classes['logo']}>
      <Link to='/products'>
        <img src={logo} alt='Logo' />
      </Link>
    </div>
  );
};
export default Logo;
