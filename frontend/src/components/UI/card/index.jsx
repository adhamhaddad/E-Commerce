import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '@config';
import Button from '@UI/button';
import styles from '@styles/card.module.css';

const Card = ({ id, name, image_url, price }) => {
  const [quantity, setQuantity] = useState(0);
  const history = useHistory();

  const handleCounter = (type) => {
    if (type === 'decrement') {
      setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
    } else {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleClick = (id) => {
    history.push(`/product?id=${id}`);
  };

  const handleAddToCart = () => {
    const existingCartItems =
      JSON.parse(localStorage.getItem('cartItems')) || [];
    const newCartItem = { ...product, quantity };
    localStorage.setItem(
      'cartItems',
      JSON.stringify([...existingCartItems, newCartItem])
    );
  };

  return (
    <div className={styles['card']}>
      <div className={styles['product-img']}>
        <img
          src={`${API_URL}/${image_url}`}
          crossOrigin='anonymous'
          alt={name}
          onClick={() => handleClick(id)}
        />
      </div>
      <span className={styles['product-name']}>{name}</span>
      <span className={styles['price']}>{price} EGP</span>
      <div className={styles['controller']}>
        <button onClick={() => handleCounter('increment')}>+</button>
        <input type='text' value={quantity} onChange={handleChange} />
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
