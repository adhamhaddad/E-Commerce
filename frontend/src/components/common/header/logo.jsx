import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.jpg';
import styles from '@styles/logo.module.css';

const Logo = () => {
  return (
    <div className={styles['logo']}>
      <Link exact='true' to='/products'>
        <img src={logo} alt='Logo' />
      </Link>
    </div>
  );
};
export default Logo;
