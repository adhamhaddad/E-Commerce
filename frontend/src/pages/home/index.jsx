import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../../components/common/sidebar';
import Products from '../products';
import styles from '../../styles/home.module.css';

const Home = () => {
  return (
    <div className={styles['home-page']}>
      <Sidebar />
      <Route path='/products'>
        <Products />
      </Route>
    </div>
  );
};
export default Home;
