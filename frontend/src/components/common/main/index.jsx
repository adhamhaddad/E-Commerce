import React from 'react';
import Routes from '@config/routes';
import Header from '@common/header';
import { CartItemsProvider } from '@context/CartContext';
import styles from '@styles/main.module.css';

const Main = ({ socket }) => {
  return (
    <main className={styles['main']}>
      <CartItemsProvider>
        <Header />
        <Routes socket={socket} />
      </CartItemsProvider>
    </main>
  );
};
export default Main;
