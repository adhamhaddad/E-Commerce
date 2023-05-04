import React, { useState } from 'react';
import styles from '../../../styles/card.module.css';

const Card = ({ img_url, name, price }) => {
  const [count, setCount] = useState(0);

  const handleCounter = (type) => {
    if (type === 'decrement') {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    } else {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <div className={styles['card']}>
      <div className={styles['product-img']}>
        <img src={img_url} crossOrigin='anonymous' alt={name} />
      </div>
      <span className={styles['product-name']}>{name}test</span>
      <span className={styles['price']}>EGP 10{price}</span>
      <div className={styles['controller']}>
        <button onClick={() => handleCounter('increment')}>+</button>
        <span>{count}</span>
        <button onClick={() => handleCounter('decrement')}>-</button>
      </div>
    </div>
  );
};
export default Card;
