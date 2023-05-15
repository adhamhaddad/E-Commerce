import React, { useState, useEffect } from 'react';
import { useApi, API_URL } from '@config';
import { useAuth } from '@hooks';
import Button from '@UI/button';
import Item from './item';
import styles from '@styles/cart.module.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  const { get, post, loading } = useApi();
  const { user } = useAuth();

  const handleQuantity = (type, id) => {
    if (type === 'decrement') {
      setItems((prev) =>
        prev.filter((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity-- : 1 }
            : item
        )
      );
    } else {
      setItems((prev) =>
        prev.filter((item) =>
          item.id === id ? { ...item, quantity: item.quantity++ } : item
        )
      );
    }
  };
  // const handleAddToCart = (product) => {
  //   const itemExists = items.find((item) => item.product_id === product.id);
  //   if (itemExists) {
  //     setItems((prev) =>
  //       prev.map((item) => {
  //         if (item.product_id === product.id) {
  //           return { ...item, quantity: item.quantity + 1 };
  //         }
  //         return item;
  //       })
  //     );
  //   } else {
  //     setItems((prev) => [
  //       ...prev,
  //       { product_id: product.id, quantity: 1, price: product.price }
  //     ]);
  //   }
  // };
  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const addOrder = async () => {
    await post('/orders', {
      user_id: user.id,
      items: items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity
      }))
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addOrder();
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setItems(storedCartItems);
  }, []);

  const itemList =
    items.length > 0 &&
    items.map((item) => (
      <Item
        key={item.id}
        {...item}
        handleQuantity={handleQuantity}
        handleRemoveItem={handleRemoveItem}
      />
    ));

  const total =
    items.length > 0
      ? items.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0;
  return (
    <div className={styles['cart-page']}>
      <h1>Cart List</h1>
      <ul className={styles['cart-list']}>{itemList ?? itemList}</ul>
      <p>Total: {total} EGP</p>
      <Button text='Add order' onClick={handleSubmit} />
    </div>
  );
};
export default Cart;
