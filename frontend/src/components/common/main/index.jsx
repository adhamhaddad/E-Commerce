import React from 'react';
import Routes from '@config/routes';
import Header from '@common/header';
import styles from '@styles/main.module.css';

const Main = ({ socket }) => {
  return (
    <main className={styles['main']}>
      <Header />
      <Routes socket={socket} />
    </main>
  );
};
export default Main;
