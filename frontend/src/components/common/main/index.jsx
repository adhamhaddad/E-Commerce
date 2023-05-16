import React from 'react';
import Routes from '@config/routes';
import Footer from '@common/footer';
import styles from '@styles/main.module.css';

const Main = ({ socket }) => {
  return (
    <main className={styles['main']}>
      <Routes socket={socket} />
      <Footer />
    </main>
  );
};
export default Main;
