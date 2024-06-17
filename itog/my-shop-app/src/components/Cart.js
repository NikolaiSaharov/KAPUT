import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from './Header';
import './App.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/cart/${productId}`);
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: '-100vh',
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: '100vh',
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
      <div className="cart-page">
        <h1>Корзина</h1>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <h2>{item.name}</h2>
                <p>Цена: ${item.price}</p>
                <p>Кол-во: {item.quantity}</p>
                <p>Размер: {item.size}</p>
                <button onClick={() => removeFromCart(item.id)}>
                  Удалить из корзины
                </button>
              </div>
            ))}
            <h2 className="total">Всего: ${calculateTotal()}</h2>
          </div>
        ) : (
          <p>Ваша корзина пуста.</p>
        )}
        <div className="checkout-button">
          <Link to="/order" className="checkout-link">
            Оформить заказ
          </Link>
        </div>
        <div className="go-home">
          <Link to="/">Главная</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;