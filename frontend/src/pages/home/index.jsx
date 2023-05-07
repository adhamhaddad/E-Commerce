import React, { useState, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import Sidebar from '../../components/common/sidebar';
import Products from '../products';
import styles from '../../styles/home.module.css';

const Home = () => {
  const [categoryId, setCategoryId] = useState(null);
  const { pathname } = useLocation();

  const handleChange = (id) => {
    setCategoryId(id);
  };

  useEffect(() => {
    pathname === '/products' && setCategoryId(null);
  }, [pathname]);

  return (
    <div className={styles['home-page']}>
      <Sidebar handleChange={handleChange} />
      <Route
        path={categoryId !== null ? '/products/categories/:id' : '/products'}
      >
        <Products category_id={categoryId} />
      </Route>
    </div>
  );
};
export default Home;
