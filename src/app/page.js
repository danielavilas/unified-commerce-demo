'use client';

import React, { useState, useEffect } from 'react';
import ConnectApp from './components/ConnectApp';
import OrderList from './components/OrderList';
import CreateOrder from './components/CreateOrder';
import GetRandomProduct from './components/GetRandomProduct';

export default function Home() {
  const [connectionId, setConnectionId] = useState('');

  useEffect(() => {
    // Check if there's a connectionId in localStorage on component mount
    const storedConnectionId = localStorage.getItem('connectionId');

    if (storedConnectionId) {
      setConnectionId(storedConnectionId);
    }
  }, []);

  const handleConnectionEstablished = async (id) => {
    setConnectionId(id);
  };

  return (
    <div>
      <h1>Alloy Commerce Integration</h1>
      <section>
        <h2>Step 1: Connect App</h2>
        <ConnectApp onConnectionEstablished={handleConnectionEstablished} />
        <div style={{
          marginLeft: '30px'
        }}>
          <div>
            <b>Current Connection Id: </b>
            <input
              type="text"
              value={connectionId}
              onChange={(e) => setConnectionId(e.target.value)}
              style={{
                padding: '5px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                width: '15%'
              }}
            />
          </div>
        </div>
      </section>
      <section>
        <h2>Step 2: List Orders</h2>
        <OrderList connectionId={connectionId} />
      </section>
      <section>
        <h2>Step 3: Create a Order</h2>
        <GetRandomProduct connectionId={connectionId} />
        <CreateOrder connectionId={connectionId} />
      </section>
    </div>
  );
}
