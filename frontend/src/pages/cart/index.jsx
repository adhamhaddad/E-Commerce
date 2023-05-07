import React, { useState, useEffect } from 'react';
import { api, API_URL } from '../../config';
import Button from '../../components/UI/button';
import styles from '../../styles/cart.module.css';

const Cart = ({}) => {
  const [items, setItems] = useState([]);

  const addOrder = () => {
    api.post('/orders', )
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addOrder();
  };

  const itemList =
    items.length > 0 &&
    items.map((item) => (
      <li key={item.id} className={styles['cart-item']}>
        <img
          src={`${API_URL}/${item.image_url}`}
          alt='product-image'
          className={styles['cart-item_image']}
        />
        <span className={styles['cart-item_name']}>{item.name}</span>
        <span className={styles['cart-item_count']}>{item.count}</span>
        <span className={styles['cart-item_price']}>{item.price} EGP</span>
        <Button text='remove' onClick={() => handleRemoveItem(item.id)} />
      </li>
    ));
  return (
    <div className={styles['cart-page']}>
      <h1>Cart List</h1>
      <ul>{itemList ?? itemList}</ul>
      <Button text='Add order' onClick={handleSubmit} />
    </div>
  );
};
export default Cart;
