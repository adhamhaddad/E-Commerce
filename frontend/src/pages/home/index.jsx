import React from 'react';
import Sidebar from '../../components/common/sidebar';
import Banner from '../../components/common/banner';
import Card from '../../components/UI/card';
import styles from '../../styles/home.module.css';

const Home = () => {
  return (
    <div className={styles['home-page']}>
      <Sidebar />
      <div className={styles['container']}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Banner title='Top sales' image='#' />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
export default Home;
