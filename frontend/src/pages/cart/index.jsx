import React, { useState, useEffect } from 'react';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import Item from './item';
import styles from '@styles/cart.module.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { post, loading } = useApi();
  const { user } = useAuth();
  const handleQuantity = (type, id) => {
    if (type === 'decrement') {
      setCartItems((prev) =>
        prev.filter((item) =>
          item.id === id
            ? { ...item, productQuantity: item.productQuantity > 1 ? item.productQuantity-- : 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) =>
        prev.filter((item) =>
          item.id === id ? { ...item, productQuantity: item.productQuantity++ } : item
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
        quantity: String(item.productQuantity)
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
    (acc, item) => acc + item.price * item.productQuantity,
    0
  );

  return (
    <div className={styles['cart-list']}>
      <div className={styles['top-bar']}>
        <h3>Your Cart</h3>
      </div>
      <ul className={styles['cart-items']}>{itemList}</ul>
      <p className={styles['total-price']}>Total: {totalPrice} EGP</p>
      <button className={styles['checkout-button']} onClick={handleSubmit}>
        Checkout
      </button>
    </div>
  );
};

export default CartPage;
