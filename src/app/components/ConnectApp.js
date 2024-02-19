import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Alloy from 'alloy-frontend';
import styles from './css/ConnectApp.module.css';

export default function ConnectApp({ onConnectionEstablished }) {
  const [alloy, setAlloy] = useState(null);

  useEffect(() => {
    console.log('will call alloy')
    setAlloy(Alloy());
  }, []);

  const fetchTokenAndAuthenticate = async () => {
    if (!alloy) {
      console.error('Alloy SDK not initialized');
      return;
    }

    try {
      const response = await axios.get('/api/token');
      console.log('alloy', alloy)
      alloy.setToken(response.data.token);
      alloy.authenticate({
        category: 'commerce',
        callback: (data) => {
          console.log('callback.data??', data)
          if (data.success) {
            localStorage.setItem('connectionId', data.connectionId);
            onConnectionEstablished(data.connectionId);
          }
        }
      });
    } catch (error) {
      console.error('Error fetching JWT token:', error);
    }
  };

  return (
    <div className={styles.connectContainer}>
      <button className={styles.connectButton} onClick={fetchTokenAndAuthenticate}>
        Connect App
      </button>
    </div>
  );
}
