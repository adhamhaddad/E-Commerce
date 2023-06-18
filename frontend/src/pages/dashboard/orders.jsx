import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks';
import { useApi } from '@config';
import styles from '@styles/dashboard/orders.module.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { get } = useApi();

  const getAllOrders = async () => {
    try {
      const response = await get(`/orders/all`);
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ordersList =
    orders.length > 0 &&
    orders.map((order) => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.tracking_number}</td>
        <td>{order.delivery_fee}</td>
        <td>{order.total}</td>
        <td>
          {new Date(order.created_at).toLocaleString('en-US', {
            dateStyle: 'short',
            timeStyle: 'short'
          })}
        </td>
        <td>{order.status}</td>
        <td className={styles['actions']}>
          <button>
            <Link exact='true' to={`/dashboard/orders/view/${order.id}`}>
              <i className='fa-solid fa-eye'></i>
            </Link>
          </button>
        </td>
      </tr>
    ));
  useEffect(() => {
    // getAllOrders();
    return () => setOrders([]);
  }, []);
  return (
    <div className={styles['dash-orders-page']}>
      <div className={styles['top-bar']}>
        <h3>Orders</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tracking Number</th>
            <th>Delivery Fee</th>
            <th>Total</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Shipping Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ordersList && ordersList}</tbody>
      </table>
    </div>
  );
};
export default OrdersPage;
