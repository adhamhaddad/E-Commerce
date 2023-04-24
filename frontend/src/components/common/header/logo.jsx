import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.jpg';
import classes from '../../../styles/logo.module.css';

const Logo = () => {
  return (
    <div className={classes['logo']}>
      <NavLink to='/' exact>
        <img src={logo} alt='Logo' />
      </NavLink>
    </div>
  );
};
export default Logo;
