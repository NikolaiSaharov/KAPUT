import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from './Header';
import './App.css';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSizes, setSelectedSizes] = useState({}); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSizeChange = (event, productId) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: event.target.value,
    }));
  };

  const addToFavorites = async (productId) => {
    try {
      const product = products.find((product) => product.id === productId);
      if (product) {
        await axios.post('http://localhost:3001/favorites', product);
      }
    } catch (error) {
      console.error('Error adding product to favorites:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    const selectedSize = selectedSizes[productId];
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер товара.');
      return;
    }
    try {
      const product = products.find((product) => product.id === productId);
      if (product) {
        const cartItem = { ...product, quantity, size: selectedSize };
        await axios.post('http://localhost:3001/cart', cartItem);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

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
      <div className="catalog-page">
        <h1>Каталог</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Все категории</option>
            <option value="category1">Куртка</option>
            <option value="category2">Футболка</option>
            <option value="category3">Ботинки</option>
            <option value="category4">Джинсы</option>
            <option value="category5">Майка</option>
          </select>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="product-list">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} />
                <p>{product.description}</p>
                <p>Цена: ${product.price}</p>
                <p>Кол-во: {product.quantity}</p>
                <select
                  value={selectedSizes[product.id] || ''}
                  onChange={(event) => handleSizeChange(event, product.id)}
                >
                  <option value="">Выберите размер</option>
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <button onClick={() => addToFavorites(product.id)}>
                  Добавить в Избранное
                </button>
                <button onClick={() => addToCart(product.id, 1)}>
                  Добавить в корзину
                </button>
                <Link to={`/product/${product.id}`} className="view-details">
                  Подробнее
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">Нет товаров.</p>
        )}
        <div className="go-home">
          <Link to="/">Главная</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Catalog;