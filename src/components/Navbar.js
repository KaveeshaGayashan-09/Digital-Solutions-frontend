import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">🛒</span>
            <span>Digital Marketplace</span>
          </Link>

          <div className="navbar-links">
            <Link to="/products" className="nav-link">
              Products
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/orders" className="nav-link">
                  My Orders
                </Link>
                <Link to="/cart" className="nav-link cart-link">
                  Cart
                  {getCartCount() > 0 && (
                    <span className="badge">{getCartCount()}</span>
                  )}
                </Link>
                <div className="user-menu">
                  <span className="user-name">{user?.name}</span>
                  <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
