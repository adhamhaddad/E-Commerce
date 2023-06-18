import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@hooks';
import styles from '@styles/navbar.module.css';

const Navbar = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <nav className={styles['navbar']}>
      <ul className={styles['menu-bar']}>
        {user !== null &&
          (user.role === 'SUPER_ADMIN' || user.role === 'STORE_OWNER') && (
            <li>
              <NavLink to='/dashboard' activeClassName={styles['active']}>
                <i className='fa-solid fa-gauge-high'></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
          )}
        {user !== null && user.role === 'CUSTOMER' && (
          <>
            <li>
              <NavLink exact to='/account' activeClassName={styles['active']}>
                <i className='fa-solid fa-user'></i>
                <span>Account</span>
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/orders' activeClassName={styles['active']}>
                <i className='fa-solid fa-bag-shopping'></i>
                <span>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/cart' activeClassName={styles['active']}>
                <i className='fa-solid fa-shopping-cart'></i>
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className={styles['cart-list']}>
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
