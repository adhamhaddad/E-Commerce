import React from 'react';
import { API_URL } from '@config';
import styles from '@styles/item.module.css';

const Item = ({
  id,
  image_url,
  name,
  quantity,
  price,
  handleQuantity,
  handleRemoveItem
}) => {
  return (
    <li className={styles['cart-item']}>
      <img src={`${API_URL}/${image_url}`} crossOrigin='anonymous' alt={name} />
      <div className={styles['item-details']}>
        <h2>{name}</h2>
        <p>Price: {price} EGP</p>
        <div className={styles['quantity-container']}>
          <button
            className={styles['quantity-button']}
            onClick={() => handleQuantity('decrement', id)}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className={styles['quantity']}>{quantity}</span>
          <button
            className={styles['quantity-button']}
            onClick={() => handleQuantity('increment', id)}
          >
            +
          </button>
        </div>
        <button
          className={styles['remove-button']}
          onClick={() => handleRemoveItem(id)}
        >
          Remove
        </button>
      </div>
    </li>
  );
};
export default Item;
