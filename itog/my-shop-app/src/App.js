import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Favorites from './components/Favorites';
import Cart from './components/Cart';
import Product from './components/Product';
import Order from './components/Order';
import './components/App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
};

export default App;