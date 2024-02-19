import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/OrderList.module.css';

export default function GetRandomProduct({ connectionId }) {
  const [product, setProduct] = useState({
    id: '',
    productName: '',
    remoteId: '',
    variant: {
        id: '',
        title: '',
        sku: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    if (connectionId) {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/products?connectionId=${connectionId}`);
        if (response.data.products?.[0]) {
          const product = response.data.products[0];
          const variant = product.variants[0];
          setProduct({
            id: product.id,
            productName: product.productName,
            remoteId: product.remoteId,
            variant: {
              id: variant.id,
              title: variant.title,
              sku: variant.sku,
            }
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{
      paddingLeft: '30px',
    }}>
      {!connectionId && (
        <p>An Alloy Unified API connectionId is required. Please complete Step 1 to connect an app and view orders.</p>
      )}
      {isLoading ? (
        <p className={styles.loading}>Fetching product...</p>
      ) : (
        <div>
          <div>
            <b>Current Selected Product: </b>
            <input
              type="text"
              value={product.id}
              disabled
              style={{
                padding: '5px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                width: '25%'
              }}
            />
          </div>
          <div>
            <b>Current Selected Product Variant: </b>
            <input
              type="text"
              value={product.variant.id}
              disabled
              style={{
                padding: '5px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                width: '25%'
              }}
            />
          </div>
          <button className={styles.refreshButton} onClick={fetchProducts} disabled={!connectionId || isLoading}>
            Get random product and variant
          </button>
        </div>
      )}
    </div>
  );
}