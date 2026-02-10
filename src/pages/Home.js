import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Premium Digital Accounts
              <br />
              <span className="gradient-text">At Your Fingertips</span>
            </h1>
            <p className="hero-subtitle">
              Access the best streaming, education, and productivity platforms
              instantly. Secure, reliable, and delivered to your inbox.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse Products
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Delivery</h3>
              <p>
                Get your account credentials delivered to your email within
                seconds of purchase
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>
                Bank-grade encryption and secure authentication protect your
                data
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Verified Accounts</h3>
              <p>
                All accounts are pre-verified and ready to use immediately
                after purchase
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content card-glass">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers today</p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
