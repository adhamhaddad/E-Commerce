import React from 'react';
import { NavLink } from 'react-router-dom';
import {useAuth} from '../../../hooks/useAuth';
import styles from '../../../styles/navbar.module.css';

const Navbar = () => {
  const {user} = useAuth();

  return (
    <nav className={styles['navbar']}>
      <ul className={styles['menu-bar']}>
        {user.role === 'TENANT' && 
        <li>
          <NavLink to='/dashboard'>
            <i className='fa-solid '></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        }
        <li>
          <NavLink to='/account'>
            <i className='fa-solid fa-user-circle'></i>
            <span>My Account</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/orders'>
            <i className='fa-solid fa-bag-shopping'></i>
            <span>Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/cart'>
            <i className='fa-solid fa-shopping-cart'></i>
            <span>Cart</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
