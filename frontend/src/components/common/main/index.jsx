import React from 'react';
import Routes from '../../../config/routes';
import Footer from '../footer';
import styles from '../../../styles/main.module.css';
const Main = () => {
  return (
    <main className={styles['main']}>
      <Routes />
      <Footer />
    </main>
  );
};
export default Main;
