import React, { useState, useEffect } from 'react';
import { useApi, API_URL } from '@config';
import { useAuth } from '@hooks';
import Button from '@UI/button';
import Item from './item';
import styles from '@styles/cart.module.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { get, post, loading } = useApi();
  const { user } = useAuth();

  const handleQuantity = (type, id) => {
    if (type === 'decrement') {
      setCartItems((prev) =>
        prev.filter((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity-- : 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) =>
        prev.filter((item) =>
          item.id === id ? { ...item, quantity: item.quantity++ } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    // Update localStorage
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  const addOrder = async () => {
    await post('/orders', {
      user_id: user.id,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: String(item.quantity)
      }))
    })
      .then((res) => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (event) => {
    addOrder();
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const itemList =
    cartItems.length > 0 &&
    cartItems.map((item) => (
      <Item
        key={item.id}
        {...item}
        handleQuantity={handleQuantity}
        handleRemoveItem={handleRemoveItem}
      />
    ));
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles['cart-list']}>
      <h1>Your Cart</h1>
      <ul className={styles['cart-items']}>{itemList}</ul>
      <p className={styles['total-price']}>Total: {totalPrice} EGP</p>
      <button className={styles['checkout-button']} onClick={handleSubmit}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
