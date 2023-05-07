import React, { useState, useEffect } from 'react';
import { api } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/orders.module.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const orderList =
    orders.length > 0 &&
    orders.map((order) => (
      <tr key={order.id}>
        <td>product['description'] </td>
        <td>product['price'] </td>
      </tr>
    ));

  const getOrders = () => {
    api
      .get(`/orders/all/${user.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();

    return () => setOrders([]);
  }, []);
  return (
    <div className={styles['orders-page']}>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Count</th>
            <th>Price</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>{orderList ?? orderList}</tbody>
      </table>
    </div>
  );
};
export default Order;
