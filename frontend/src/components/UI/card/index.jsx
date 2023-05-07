import React, { useState } from 'react';
import { API_URL } from '../../../config';
import Button from '../button';
import styles from '../../../styles/card.module.css';

const Card = ({ id, name, image_url, price }) => {
  const [count, setCount] = useState(0);

  const handleCounter = (type) => {
    if (type === 'decrement') {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    } else {
      setCount((prev) => prev + 1);
    }
  };
  const handleChange = (event) => {
    setCount(Number(event.target.value));
  };

  const handleAddToCart = ({ id, count }) => {
    console.log(id, count);
  };

  return (
    <div className={styles['card']}>
      <div className={styles['product-img']}>
        <img
          src={`${API_URL}/${image_url}`}
          crossOrigin='anonymous'
          alt={name}
        />
      </div>
      <span className={styles['product-name']}>{name}</span>
      <span className={styles['price']}>{price} EGP</span>
      <div className={styles['controller']}>
        <button onClick={() => handleCounter('increment')}>+</button>
        {/* <span>{count}</span> */}
        <input type='text' value={count} onChange={handleChange} />
        <button onClick={() => handleCounter('decrement')}>-</button>
      </div>
      <Button
        text='Add to cart'
        onClick={() => handleAddToCart({ id, count })}
      />
    </div>
  );
};
export default Card;
