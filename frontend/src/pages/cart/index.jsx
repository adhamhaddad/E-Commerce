import React, { useState } from 'react';
import { useApi } from '@config';
import { useAuth, useCart } from '@hooks';
import Item from './item';
import Modal from '@common/modal';
import styles from '@styles/cart.module.css';

const CartPage = () => {
  const [values, setValues] = useState({
    shipment_address: '',
    shipment_date: ''
  });
  const [modalStatus, setModalStatus] = useState(false);
  const { post, loading } = useApi();
  const { user } = useAuth();
  const { cartItems, deleteCartItems } = useCart();

  const handleModalStatus = () => {
    setModalStatus((prev) => !prev);
  };

  const addOrder = async () => {
    try {
      const response = await post('/orders', {
        user_id: user.id,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        shipment_address: values.shipment_address,
        shipment_date: values.shipment_date
      });
      setValues({ shipment_address: '', shipment_date: '' });
      deleteCartItems();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleSubmit = () => {
    addOrder();
    setModalStatus((prev) => !prev);
  };

  const itemList =
    cartItems.length > 0 &&
    cartItems.map((item) => <Item key={item.id} {...item} />);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles['cart-list-page']}>
      <div className={styles['top-bar']}>
        <h3>Your Cart</h3>
      </div>
      <ul className={styles['cart-items']}>
        {!itemList && <li>Your cart list is empty.</li>}
        {itemList && itemList}
      </ul>
      <div className={styles['total-price']}>
        <span>Delivery Fee: 60</span>
        <span>Total: {totalPrice > 0 ? totalPrice + 60 : 0} EGP</span>
      </div>
      <button className={styles['checkout-button']} onClick={handleModalStatus}>
        Checkout
      </button>
      {modalStatus && (
        <Modal onClick={handleModalStatus}>
          <div className={styles['order-dialog']}>
            <div className={styles['top-bar']}>
              <h3>Order Information</h3>
            </div>
            <div className={styles['payment-method']}>
              <label>Payment Method</label>
              <span>Cash</span>
            </div>
            <div className={styles['order-address']}>
              <label htmlFor='address'>Shipping Address</label>
              <input
                type='text'
                id='address'
                placeholder='street, address'
                value={values.shipment_address}
                onChange={handleChange('shipment_address')}
              />
            </div>
            <div className={styles['order-address']}>
              <label htmlFor='address'>Shipping Date</label>
              <input
                type='date'
                id='address'
                placeholder='date'
                value={values.shipment_date}
                onChange={handleChange('shipment_date')}
              />
            </div>
            <div className={styles['modal-actions']}>
              <button
                className={styles['cancel-button']}
                onClick={handleModalStatus}
              >
                Cancel
              </button>
              <button className={styles['order-button']} onClick={handleSubmit}>
                Order
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CartPage;
