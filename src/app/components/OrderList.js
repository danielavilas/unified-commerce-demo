import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/OrderList.module.css';

export default function OrderList({ connectionId }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    if (connectionId) {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/orders?connectionId=${connectionId}`);
        if (response.data.orders) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setIsLoading(false);
        setOrders([]);
      }
    }
  };

  return (
    <div className={styles.contactList}>
      <h2 className={styles.title}>Orders</h2>
      {!connectionId && (
        <p>An Alloy Unified API connectionId is required. Please complete Step 1 to connect an app and view orders.</p>
      )}
      {isLoading ? (
        <p className={styles.loading}>Loading orders...</p>
      ) : (
        <div>
          {orders.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Remote ID</th>
                  <th>Total Price</th>
                  <th>Currency</th>
                  <th>Updated Timestamp</th>
                  <th>Order Status</th>
                  <th>Order Number</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className={styles.row}>
                    <td>{order.remoteId}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.currency}</td>
                    <td>{order.updatedTimestamp}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.orderNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.noContacts}>No Orders Found</p>
          )}
          <button className={styles.refreshButton} onClick={fetchOrders} disabled={!connectionId || isLoading}>
            Refresh Orders
          </button>
        </div>
      )}
    </div>
  );
}