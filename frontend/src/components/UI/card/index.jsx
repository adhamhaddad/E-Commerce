import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '@config';
import { useAuth } from '@hooks';
import Button from '@UI/button';
import styles from '@styles/card.module.css';

const Card = ({
  id,
  name,
  image_url,
  price,
  quantity,
  handleDeleteProduct
}) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const history = useHistory();
  const { user } = useAuth();

  const handleCounter = (type) => {
    if (type === 'decrement') {
      setProductQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      setProductQuantity((prev) => prev + 1);
    }
  };
  const handleChange = (event) => {
    setProductQuantity(Number(event.target.value));
  };

  const handleClick = (id) => {
    history.push(`/products/${id}`);
  };

  const handleAddToCart = () => {
    const existingCartItems =
      JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingCartItem = existingCartItems.find((item) => item.id === id);

    if (existingCartItem) {
      // If the product already exists in the cart, update its quantity
      existingCartItem.productQuantity += Number(productQuantity);
    } else {
      // If the product doesn't exist in the cart, add a new cart item
      const newCartItem = { id, name, image_url, price, productQuantity };
      existingCartItems.push(newCartItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
  };
  return (
    <div
      className={`${styles['card']} ${
        quantity === 0 ? styles['disabled'] : null
      }`}
    >
      <div className={styles['product-img']}>
        <img
          src={`${API_URL}/${image_url}`}
          crossOrigin='anonymous'
          alt={name}
          onClick={() => quantity > 0 && handleClick(id)}
        />
      </div>
      <span className={styles['product-name']}>{name}</span>
      <span className={styles['price']}>EGP {price}</span>
      <span className={styles['quantity']}>{quantity} items left</span>
      {(user.role === 'SUPER_ADMIN' || user.role === 'STORE_OWNER') && (
        <Button text='DELETE' onClick={() => handleDeleteProduct(id)} />
      )}
      {user.role === 'CUSTOMER' && (
        <>
          {quantity > 0 && (
            <div className={styles['controller']}>
              <button onClick={() => handleCounter('increment')}>+</button>
              <input
                type='text'
                value={productQuantity}
                onChange={handleChange}
              />
              <button onClick={() => handleCounter('decrement')}>-</button>
            </div>
          )}
          {quantity === 0 ? (
            <Button
              text='SOLD OUT'
              style={{
                cursor: 'auto',
                backgroundColor: '#A3A3A6'
              }}
            />
          ) : (
            <Button text='ADD TO CART' onClick={handleAddToCart} />
          )}
        </>
      )}
    </div>
  );
};
export default Card;
