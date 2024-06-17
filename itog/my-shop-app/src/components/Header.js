import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './App.css';

const Header = () => {
  return (
    <header className="header">
      
        <Link to="/" className="header-link">Главная</Link>
        <Link to="/catalog" className="header-link">Каталог</Link>
        <Link to="/favorites" className="header-link">Избранное</Link>
        <Link to="/cart" className="header-link">Корзина</Link>
      
    </header>
  );
};

export default Header;