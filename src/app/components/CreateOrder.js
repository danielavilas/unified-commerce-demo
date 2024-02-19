'use client';

import React, { useState } from 'react';
import styles from './css/CreateOrder.module.css';
import axios from 'axios';

export default function CreateOrder({ connectionId }) {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState(2);
  const [currency, setCurrency] = useState('USD');
  const [billingAddress, setBillingAddress] = useState({
    address1: '6146 Honey Bluff Parkway',
    city: 'Los Angeles',
    countryCode: 'US',
    firstName: 'Random Name',
    lastName: 'Random LastName',
    phone: '+639105801660',
    region: 'Cebu',
    postalCode: '90407'
  });
  const [shippingAddress, setShippingAddress] = useState({
    address1: '6146 Honey Bluff Parkway',
    city: 'Los Angeles',
    countryCode: 'US',
    firstName: 'Random Name',
    lastName: 'Random LastName',
    phone: '+639105801660',
    region: 'Cebu',
    postalCode: '90407'
  });
  const [customer, setCustomer] = useState({
    email: 'randomemail@runalloy.com',
    firstName: 'Random Name',
    lastName: 'Random LastName',
    phone: '+639105801660'
  });

  const createOrder = async (order) => {
    if (connectionId) {
      try {
        setIsLoading(true);
        const response = await axios.post(`/api/orders?connectionId=${connectionId}`, order);

        if (response.data.order) {
          setOrder(response.data.order);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error creating product:', error);
        setOrder(null);
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const createOrderObject = () => {
      return {
        lineItems: [
          {
            variantId: variantId,
            quantity: quantity,
            price: 10,
          }
        ],
        currency: currency,
        billingAddress: {
          ...billingAddress
        },
        shippingAddress: {
          ...shippingAddress
        },
        customer: {
          email: customer.email,
          firstName: 'QA',
          lastName: 'TEST'
        }
      };
    };
  
    const orderObject = createOrderObject();
    createOrder(orderObject);
  };

  return (
    <div>
      {order && (
        <div>
          <h2>Created Order</h2>
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
              <tr key={order.id} className={styles.row}>
                <td>{order.remoteId}</td>
                <td>{order.totalPrice}</td>
                <td>{order.currency}</td>
                <td>{order.updatedTimestamp}</td>
                <td>{order.orderStatus}</td>
                <td>{order.orderNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className={styles.formContainer}>
        {!connectionId && <p>Please complete Step 1 to connect an app before adding orders.</p>}
        {isLoading ? (
          <p className={styles.loading}>Creating order...</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup} style={{
              border: 'none',
              paddingRight: '20px'
            }}>
              <label className={styles.label}>
                Variant ID:
                <input
                  className={styles.input}
                  type="text"
                  value={variantId}
                  onChange={(e) => setVariantId(e.target.value)}
                  required
                />
              </label>
              <label className={styles.label}>
                Quantity:
                <input
                  className={styles.input}
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </label>
              <label className={styles.label}>
                Currency:
                <input
                  className={styles.input}
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className={styles.subForm}>
              <h2>Billing Address</h2>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  First Name:
                  <input
                    className={styles.input}
                    type="text"
                    value={billingAddress.firstName}
                    onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Last Name:
                  <input
                    className={styles.input}
                    type="text"
                    value={billingAddress.lastName}
                    onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Phone:
                  <input
                    className={styles.input}
                    type="text"
                    value={billingAddress.phone}
                    onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Address Line 1:
                  <input
                    className={styles.input}
                    type="text"
                    value={billingAddress.address1}
                    onChange={(e) => setBillingAddress({ ...billingAddress, address1: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  City:
                  <input
                    className={styles.input}
                    type="text"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Region:
                  <input
                    className={styles.input}
                    type="text"
                    value={billingAddress.region}
                    onChange={(e) => setBillingAddress({ ...billingAddress, region: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Postal Code:
                  <input
                    className={styles.input}
                    type="text"
                    value={billingAddress.postalCode}
                    onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
                    required
                  />
                </label>
              </div>
            </div>
            <div className={styles.subForm}>
              <h2>Shipping Address</h2>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  First Name:
                  <input
                    className={styles.input}
                    type="text"
                    value={shippingAddress.firstName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Last Name:
                  <input
                    className={styles.input}
                    type="text"
                    value={shippingAddress.lastName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Phone:
                  <input
                    className={styles.input}
                    type="text"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Address Line 1:
                  <input
                    className={styles.input}
                    type="text"
                    value={shippingAddress.address1}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address1: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  City:
                  <input
                    className={styles.input}
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Region:
                  <input
                    className={styles.input}
                    type="text"
                    value={shippingAddress.region}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, region: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.label}>
                  Postal Code:
                  <input
                    className={styles.input}
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    required
                  />
                </label>
              </div>
            </div>
            <div className={styles.subForm}>
              <h2>Customer</h2>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Email:
                  <input
                    className={styles.input}
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    required
                  />
                </label>
              </div>
            </div>

            <button className={styles.button} type="submit" disabled={!connectionId}>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}
