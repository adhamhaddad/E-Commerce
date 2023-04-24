import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../../../styles/sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={classes['sidebar']}>
      <ul className={classes['list']}>
        <li>
          <NavLink to='/home'>
            <i className='fa-solid fa-home'></i>
            <span>Home & Office</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/home'>
            <i className='fa-solid fa-tablet'></i>
            <span>Phones & Tablets</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/home'>
            <i className='fa-solid fa-heart-pulse'></i>
            <span>Sporting Goods</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/home'>
            <i className='fa-solid fa-gamepad'></i>
            <span>Gaming</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/other-categories'>
            <i className='fa-solid fa-categories'></i>
            <span>Other categories</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
export default Sidebar;
