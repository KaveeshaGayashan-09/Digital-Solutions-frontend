import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (error) {
      console.error('Fetch orders error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1 className="page-title fade-in">My Orders</h1>

        {location.state?.orderSuccess && (
          <div className="alert alert-success fade-in">
            <strong>🎉 Order Completed!</strong> Check your email for account credentials.
          </div>
        )}

        {orders.length === 0 ? (
          <div className="empty-state fade-in">
            <div className="empty-icon">📦</div>
            <h3>No orders yet</h3>
            <p>Your order history will appear here</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card card fade-in">
                <div className="order-header" onClick={() => toggleOrder(order._id)}>
                  <div className="order-info">
                    <h3>Order #{order._id.slice(-8)}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="order-meta">
                    <span className={`order-status ${order.status}`}>
                      {order.status}
                    </span>
                    <p className="order-total">${order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                {expandedOrder === order._id && (
                  <div className="order-details">
                    <h4>Order Items</h4>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <div className="order-item-info">
                          <h5>{item.productName}</h5>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="order-item-credentials">
                          <h5>Account Credentials</h5>
                          {item.credentials.map((cred, credIdx) => (
                            <div key={credIdx} className="credential-box">
                              <p><strong>Account {credIdx + 1}:</strong></p>
                              <p>Email: <code>{cred.email}</code></p>
                              <p>Password: <code>{cred.password}</code></p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
