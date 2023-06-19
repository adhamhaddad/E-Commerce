import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '@config';
import { useAuth, useCart } from '@hooks';
import Button from '@UI/button';
import Modal from '@common/modal';
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
  const [modalStatus, setModalStatus] = useState(false);
  const history = useHistory();
  const { user } = useAuth();
  const { cartItems, updateCartItems } = useCart();

  const handleModalState = () => {
    setModalStatus((prev) => !prev);
  };
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
    const existingCartItem = cartItems.find((item) => item.id === id);

    if (existingCartItem) {
      // If the product already exists in the cart, update its quantity
      existingCartItem.productQuantity += Number(productQuantity);
    } else {
      // If the product doesn't exist in the cart, add a new cart item
      const newCartItem = {
        id,
        name: name,
        image_url: image_url,
        price: price,
        productQuantity: 1
      };
      cartItems.push(newCartItem);
    }
    updateCartItems([...cartItems]);
    setProductQuantity(1);
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
        <Button text='DELETE' onClick={handleModalState} />
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
      {(user.role === 'SUPER_ADMIN' || user.role === 'STORE_OWNER') &&
        modalStatus && (
          <Modal
            onClick={handleModalState}
            children={
              <div className={styles['delete-product-modal']}>
                <h3 className={styles['modal-title']}>Delete</h3>
                <p className={styles['modal-message']}>
                  Are you sure, you want to delete?
                </p>
                <div className={styles['modal-actions']}>
                  <button
                    className={styles['cancel-button']}
                    onClick={handleModalState}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles['delete-button']}
                    onClick={() => handleDeleteProduct(id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            }
          />
        )}
    </div>
  );
};
export default Card;
