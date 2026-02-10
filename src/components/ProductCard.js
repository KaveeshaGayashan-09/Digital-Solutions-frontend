import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleAddToCart = async () => {
    setAdding(true);
    const result = await addToCart(product._id);
    
    if (result.success) {
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage(result.error);
      setTimeout(() => setMessage(''), 3000);
    }
    setAdding(false);
  };

  return (
    <div className="product-card fade-in">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-category">{product.category}</div>
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className="btn btn-primary btn-sm"
          >
            {adding ? 'Adding...' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
        {message && <div className="product-message">{message}</div>}
      </div>
    </div>
  );
};

export default ProductCard;
