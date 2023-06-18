import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { useAuth } from '@hooks';
import Button from '@UI/button';
import CategoriesPage from './categories';
import ProductsPage from './products';
import CreateCategoryPage from './categories/createCategory';
import EditCategoryPage from './categories/editCategory';
import CreateProductPage from './products/createProduct';
import EditProductPage from './products/editProduct';
import AdminsPage from './admins';
import CreateAdminPage from './admins/createAdmin';
import OrdersPage from './orders';
import SettingsPage from './settings';
import styles from '@styles/dashboard/dashboard.module.css';

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div className={styles['dashboard-page']}>
      <div className={styles['side-bar']}>
        <ul>
          <li>
            <NavLink
              to='/dashboard/categories'
              activeClassName={styles['active']}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                ></path>
              </svg>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/dashboard/products'
              activeClassName={styles['active']}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 26 28.026'
                fill='currentColor'
              >
                <path
                  d='M22.236 5.187a.836.836 0 00-.529-.568l-9.5-4.062a2.026 2.026 0 00-1.456 0l-9.5 4.062a.835.835 0 00-.529.568.925.925 0 00-.318.722v12.529a1.51 1.51 0 00.814 1.3l9.522 4.578a1.011 1.011 0 00.438.1.761.761 0 01.605 0 1.011 1.011 0 00.438-.1l9.522-4.578a1.51 1.51 0 00.814-1.3V5.909a.925.925 0 00-.321-.722zM11.184 1.576a.969.969 0 01.586 0l8.889 3.8-8.922 4.29a.78.78 0 01-.52 0L2.294 5.375zM1.69 5.087h-.005 0zm0 13.654a.432.432 0 01-.187-.3V6.231l9.229 4.438a.432.432 0 01.187.3v12.21zm9.282 5.076zm1 0zm9.469-5.38a.432.432 0 01-.187.3l-9.229 4.437v-12.21a.431.431 0 01.187-.3l9.229-4.438z'
                  stroke='currentColor'
                  strokeWidth='.8'
                ></path>
              </svg>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/orders' activeClassName={styles['active']}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 18.352 21.073'
              >
                <g data-name='Group 5777'>
                  <g data-name='Group 5776'>
                    <path
                      data-name='Path 843'
                      d='M18.269 5.816l-.016-.027a1 1 0 00-.074-.129L15.247.592A1.189 1.189 0 0014.221 0H4.131a1.189 1.189 0 00-1.027.593L.125 5.762a.618.618 0 00-.06.145A1.044 1.044 0 000 6.27v13.35a1.454 1.454 0 001.452 1.452h15.447a1.454 1.454 0 001.452-1.452V6.222v-.053a.615.615 0 00-.082-.353zM9.815 1.235h4.378l2.305 3.987H9.815zm-5.654 0H8.58v3.987H1.862zm12.955 18.386a.217.217 0 01-.217.217H1.452a.217.217 0 01-.217-.217V6.458h15.881z'
                      fill='currentColor'
                    ></path>
                  </g>
                </g>
                <g data-name='Group 5779'>
                  <g data-name='Group 5778'>
                    <path
                      data-name='Path 844'
                      d='M11.979 11.114a.618.618 0 00-.873 0l-2.758 2.758-1.06-1.06a.618.618 0 10-.873.873l1.5 1.5a.617.617 0 00.873 0l3.194-3.194a.618.618 0 00-.003-.877z'
                      fill='currentColor'
                    ></path>
                  </g>
                </g>
              </svg>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/admins' activeClassName={styles['active']}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                ></path>
              </svg>
              Admins
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/dashboard/settings'
              activeClassName={styles['active']}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                ></path>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                ></path>
              </svg>
              Settings
            </NavLink>
          </li>
          <li>
            <Button
              text={
                <>
                  <i
                    className='fa-solid fa-right-from-bracket'
                    style={{
                      transform: 'rotateY(180deg)',
                      marginRight: '10px'
                    }}
                  ></i>
                  Logout
                </>
              }
              type='button'
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            />
          </li>
        </ul>
      </div>
      <div className={styles['dashboard-pages']}>
        <Switch>
          <Route
            exact
            path='/dashboard/categories'
            component={CategoriesPage}
          />
          <Route
            exact
            path='/dashboard/categories/create'
            component={CreateCategoryPage}
          />
          <Route
            exact
            path='/dashboard/categories/edit/:id'
            component={EditCategoryPage}
          />

          <Route exact path='/dashboard/products' component={ProductsPage} />
          <Route
            exact
            path='/dashboard/products/create'
            component={CreateProductPage}
          />
          <Route
            exact
            path='/dashboard/products/edit/:id'
            component={EditProductPage}
          />
          <Route exact path='/dashboard/admins' component={AdminsPage} />
          <Route
            exact
            path='/dashboard/admins/create'
            component={CreateAdminPage}
          />
          <Route exact path='/dashboard/orders' component={OrdersPage} />
          <Route exact path='/dashboard/settings' component={SettingsPage} />
        </Switch>
      </div>
    </div>
  );
};
export default Dashboard;
