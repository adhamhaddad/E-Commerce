import React from 'react';
import { API_URL } from '@config';
import styles from '@styles/item.module.css';

const Item = ({
  id,
  image_url,
  name,
  productQuantity,
  price,
  handleQuantity,
  handleRemoveItem
}) => {
  return (
    <li className={styles['cart-item']}>
      <div className={styles['item-details']}>
        <div className={styles['item-image']}>
          <img
            src={`${API_URL}/${image_url}`}
            crossOrigin='anonymous'
            alt={name}
          />
        </div>
        <div className={styles['item-info']}>
          <h2>{name}</h2>
          <span>Price: {price} EGP</span>
        </div>
      </div>
      <div className={styles['item-control']}>
        <div className={styles['quantity-control']}>
          <button
            className={styles['quantity-button']}
            onClick={() => handleQuantity('decrement', id)}
            disabled={productQuantity === 1}
          >
            -
          </button>
          <span className={styles['quantity']}>{productQuantity}</span>
          <button
            className={styles['quantity-button']}
            onClick={() => handleQuantity('increment', id)}
          >
            +
          </button>
        </div>
        <div className={styles['cart-actions']}>
          <button
            className={styles['remove-button']}
            onClick={() => handleRemoveItem(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};
export default Item;
