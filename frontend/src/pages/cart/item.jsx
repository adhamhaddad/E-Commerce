import React from 'react';
import Button from '@UI/button';
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
    <li key={id} className={styles['cart-item']}>
      <img
        src={`${API_URL}/${image_url}`}
        crossOrigin='anonymous'
        alt='product-image'
        className={styles['cart-item_image']}
      />
      <span className={styles['cart-item_name']}>{name}</span>
      <span className={styles['cart-item_count']}>{quantity}</span>
      <span className={styles['cart-item_price']}>{price} EGP</span>
      <div className={styles['cart-item_controller']}>
        <Button text='-' onClick={() => handleQuantity('decrement', id)} />
        <Button text='+' onClick={() => handleQuantity('increment', id)} />
        <Button
          text={<i className='fa-regular fa-trash-can'></i>}
          onClick={() => handleRemoveItem(id)}
        />
      </div>
    </li>
  );
};
export default Item;
