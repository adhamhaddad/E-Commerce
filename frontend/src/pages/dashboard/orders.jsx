import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '@config';
import LoadingSpinner from '@common/loading';
import styles from '@styles/dashboard/orders.module.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { get, loading } = useApi();

  const getAllOrders = async () => {
    try {
      const response = await get('/orders/admin/all');
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
        <td>{order.shipment_fee}</td>
        <td>EGP {+order.total_price + +order.shipment_fee}</td>
        <td>{order.order_status}</td>
        <td>
          {new Date(order.created_at).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </td>
        <td>{order.shipment_address}</td>
        <td>
          {new Date(order.shipment_date).toLocaleString('en-US', {
            dateStyle: 'medium'
          })}
        </td>
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
    getAllOrders();
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
            <th>Status</th>
            <th>Order Date</th>
            <th>Shipping Address</th>
            <th>Shipment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan='8' style={{ textAlign: 'center' }}>
                <LoadingSpinner />
              </td>
            </tr>
          )}
          {!loading && ordersList && ordersList}
        </tbody>
      </table>
    </div>
  );
};
export default OrdersPage;
