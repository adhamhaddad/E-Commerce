import React, { useState, useEffect } from 'react';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import LoadingSpinner from '@common/loading';
import styles from '@styles/orders.module.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const { get, loading } = useApi();

  const getOrders = async () => {
    await get(`/orders/all/${user.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const orderList =
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
      </tr>
    ));
  useEffect(() => {
    getOrders();
    return () => setOrders([]);
  }, []);
  return (
    <div className={styles['orders-page']}>
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
          {!loading && orderList && orderList}
        </tbody>
      </table>
      {!loading && !orderList && 'Orders is empty.'}
    </div>
  );
};
export default OrdersPage;
