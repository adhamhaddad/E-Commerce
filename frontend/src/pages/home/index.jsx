import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../../components/common/sidebar';
import ProductsPage from '../products';
import ProductPage from '../product';
import styles from '../../styles/home.module.css';

const HomePage = () => {
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  return (
    <div className={styles['home-page']}>
      <Sidebar />
      <div className={styles['home-view']}>
        <div className={styles['bread-crumb']}>
          Home {category && `> ${category}`}
        </div>
        <Route exact path='/products' component={ProductsPage} />
        <Route exact path='/products/:id' component={ProductPage} />
      </div>
    </div>
  );
};
export default HomePage;
