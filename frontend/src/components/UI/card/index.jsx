import React from 'react';
import styles from '../../../styles/card.module.css';

const Card = () => {
  return (
    <div className={styles['card']}>
      <div className={styles['product-img']}>
        <img
          src='https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=5.0.301'
          alt='picture'
        />
      </div>
      <span className={styles['product-title']}>A Good Book</span>
      <div className={styles['price']}>
        <span className={styles['salary-price']}>EGP 190</span>
        <del className={styles['discount-price']}>EGP 200</del>
      </div>
    </div>
  );
};
export default Card;
