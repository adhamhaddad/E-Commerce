import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth, useCart } from '@hooks';
import styles from '@styles/navbar.module.css';

const Navbar = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className={styles['navbar']}>
      <ul className={styles['menu-bar']}>
        <li>
          <NavLink exact to='/account' activeClassName={styles['active']}>
            <i className='fa-solid fa-user'></i>
            <span>Account</span>
          </NavLink>
        </li>
        {user !== null &&
          (user.role === 'SUPER_ADMIN' || user.role === 'STORE_OWNER') && (
            <li>
              <NavLink
                exact
                to='/dashboard/categories'
                activeClassName={styles['active']}
              >
                <i className='fa-solid fa-gauge-high'></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
          )}
        {user !== null && user.role === 'CUSTOMER' && (
          <>
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
