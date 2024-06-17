import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './App.css';
import { motion } from 'framer-motion';


const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/favorites');
      setFavoriteProducts(response.data);
    } catch (error) {
      console.error('Error fetching favorite products:', error);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${productId}`);
      fetchFavoriteProducts(); 
    } catch (error) {
      console.error('Error removing product from favorites:', error);
    }
  };
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-100vw',
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: '100vw',
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Header />
    <div className="favorites-page">
  <h1>Избранное</h1>
  {favoriteProducts.length > 0 ? (
    <div className="product-list">
      {favoriteProducts.map((product) => (
        <div key={product.id} className="product-item">
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <p>Цена: ${product.price}</p>
          <button onClick={() => removeFromFavorites(product.id)}>
            Удалить из избранных
          </button>
          <Link to={`/product/${product.id}`} className="view-details">Подробнее</Link>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-favorites">Нет избранных.</p>
  )}
  <div className="go-home">
    <Link to="/">Главная</Link>
  </div>
</div>
</motion.div>
  );
};

export default Favorites;