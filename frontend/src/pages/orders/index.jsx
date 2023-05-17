import React, { useState, useEffect } from 'react';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/orders.module.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const { get, loading } = useApi();

  const orderList =
    orders.length > 0 &&
    orders.map((order) => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.order_status}</td>
        <td>{new Date(order.created_at).toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short'})}</td>
      </tr>
    ));

  const getOrders = async () => {
    await get(`/orders/all/${user.id}`)
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
            <th>ID</th>
            <th>status</th>
            <th>created at</th>
          </tr>
        </thead>
        <tbody>{orderList && orderList}</tbody>
      </table>
    </div>
  );
};
export default Order;
