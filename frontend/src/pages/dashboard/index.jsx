import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import { useApi, API_URL } from '@config';
import { useAuth } from '@hooks';
import Button from '@UI/button';
import AddProduct from './addProduct';
import AddCategory from './addCategory';
import styles from '@styles/dashboard.module.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const { get, post, deleteFunc, loading } = useApi();
  const { logout } = useAuth();

  const getCategories = async () => {
    await get('/categories/all')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };
  const handleDeleteCategory = async (category_id) => {
    await deleteFunc(`/categories/${category_id}`)
      .then((res) =>
        setCategories((prev) =>
          prev.filter((category) => category.id !== res.data.id)
        )
      )
      .catch((err) => console.log(err));
  };

  const list =
    categories.length > 0 &&
    categories.map((category) => (
      <li key={category.id}>
        <Link to={`/${category.slug}`}>
          <img
            src={`${API_URL}/${category.icon_url}`}
            crossOrigin='anonymous'
            alt='category_icon'
            className={styles['category_icon']}
          />
          <span>{category.name}</span>
        </Link>
        <Button
          text='Delete'
          onClick={() => handleDeleteCategory(category.id)}
        />
      </li>
    ));

  useEffect(() => {
    getCategories();

    return () => {
      setCategories([]);
    };
  }, []);
  return (
    <div className={styles['dashboard-page']}>
      <h1>Same Page</h1>
      <div className={styles['dashboard-switch']}>
        <NavLink to='/dashboard' activeClassName={styles['active']} exact>
          Add Categories
        </NavLink>
        <NavLink
          to='/dashboard/add-products'
          activeClassName={styles['active']}
          exact
        >
          Add Products
        </NavLink>
      </div>
      <Switch>
        <Route
          exact
          path='/dashboard'
          render={() => (
            <AddCategory list={list} setCategories={setCategories} />
          )}
        />
        <Route
          exact
          path='/dashboard/add-products'
          render={() => <AddProduct categories={categories} />}
        />
      </Switch>
      <Button text='Logout' type='button' onClick={logout} />
    </div>
  );
};
export default Dashboard;
