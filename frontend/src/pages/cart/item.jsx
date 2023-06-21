import React from 'react';
import { API_URL } from '@config';
import { useCart } from '@hooks';
import styles from '@styles/item.module.css';

const Item = ({ id, image_url, name, quantity, price }) => {
  const { updateCartItemQuantity, removeCartItem } = useCart();

  const handleRemoveItem = () => {
    removeCartItem(id);
  };

  const handleQuantity = (action) => {
    const newQuantity = action === 'increment' ? quantity + 1 : quantity - 1;
    updateCartItemQuantity(id, newQuantity);
  };

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
            onClick={() => handleQuantity('decrement')}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className={styles['quantity']}>{quantity}</span>
          <button
            className={styles['quantity-button']}
            onClick={() => handleQuantity('increment')}
          >
            +
          </button>
        </div>
        <div className={styles['cart-actions']}>
          <button
            className={styles['remove-button']}
            onClick={handleRemoveItem}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};
export default Item;
