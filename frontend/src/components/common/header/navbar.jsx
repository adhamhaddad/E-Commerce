import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '../../UI/button';
import classes from '../../../styles/navbar.module.css';

const Navbar = () => {
  const [options, setOptions] = useState(false);
  const { pathname } = useLocation();
  const onChangeOptions = () => {
    setOptions((prev) => !prev);
  };

  useEffect(() => {
    setOptions(false);
  }, [pathname]);
  return (
    <nav className={classes['navbar']}>
      <ul className={classes['menu-bar']}>
        <li>
          <Button
            type='button'
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              padding: '0px 10px'
            }}
            onClick={onChangeOptions}
          >
            <i className='fa-solid fa-user'></i>
            <span
              style={{
                margin: '0px 10px',
                fontWeight: 'bold'
              }}
            >
              Account
            </span>
            <i className='fa-solid fa-angle-down'></i>
          </Button>
          {options && (
            <ul className={classes['options']}>
              <li>
                <NavLink to='/account'>
                  <i className='fa-solid fa-user'></i>
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
                <NavLink to='/account'>
                  <i className='fa-regular fa-heart'></i>
                  <span>Saved Items</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li>
          <NavLink to='/help'>
            <i className='fa-solid fa-question-circle'></i>
            <span>Help</span>
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
