import React from 'react';
import Routes from '@config/routes';
import styles from '@styles/main.module.css';
const Main = ({ socket }) => {
  return (
    <main className={styles['main']}>
      <Routes socket={socket} />
    </main>
  );
};
export default Main;
