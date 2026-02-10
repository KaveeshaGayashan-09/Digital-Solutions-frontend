import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setProcessing(true);
    setError('');

    try {
      const { data } = await api.post('/orders/checkout');
      
      // Clear local cart
      await clearCart();
      
      // Navigate to orders page with success message
      navigate('/orders', { state: { orderSuccess: true, orderId: data.order._id } });
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
      setProcessing(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title fade-in">Checkout</h1>

        <div className="checkout-layout">
          <div className="checkout-items">
            <h2>Order Review</h2>
            {cart.items.map((item) => (
              <div key={item._id} className="checkout-item card">
                <img src={item.product.image} alt={item.product.name} />
                <div className="checkout-item-details">
                  <h3>{item.product.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary card-glass">
            <h2>Payment Summary</h2>
            
            {error && <div className="alert alert-error">{error}</div>}

            <div className="alert alert-info">
              <p><strong>📧 Email Delivery:</strong> Your account credentials will be sent to your registered email address immediately after payment.</p>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={processing}
              className="btn btn-primary btn-block"
            >
              {processing ? 'Processing...' : 'Complete Purchase'}
            </button>

            <p className="checkout-note">
              By completing this purchase, you agree to receive account credentials via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
