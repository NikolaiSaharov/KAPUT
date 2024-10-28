import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Header from './Header';
import './App.css';

const Home = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке рекомендуемых товаров:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const onSubmit = async (data) => {
    try {
      const templateParams = {
        from_name: data.name,
        reply_to: data.email,
        message: data.message,
      };

      await emailjs.send(
        'service_9q4f1al', 
        'template_ivlkjd8', 
        templateParams,
        'oX7sdSftIruWCOKrH' 
      );

      console.log('Email успешно отправлен');
      setFeedbackMessage('СПАСИБО ЗА ОБРАТНУЮ СВЯЗЬ, МЫ ОТВЕТИМ В БЛИЖАЙШЕЕ ВРЕМЯ');
      reset();
    } catch (error) {
      console.error('Ошибка при отправке email:', error);
      setFeedbackMessage('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: -100,
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
      y: 100,
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
<meta name="yandex-verification" content="f28c30ce5fedde70" />
      <div className='about-section'>
        <h1>Добро пожаловать в магазин "Holocoste"</h1>
        <p>Это домашняя страница нашего магазина.</p>

        <h2>О нашем магазине</h2>
        <p>
          Добро пожаловать в наш интернет-магазин, где вы можете найти широкий ассортимент качественной одежды для мужчин и женщин.
          Мы верим в силу моды в выражении индивидуальности и стиля, и наша миссия - предоставить вам самые последние тенденции и модные вещи.
        </p>
        <p>
          Наша команда опытных дизайнеров и стилистов тщательно отбирает нашу коллекцию, чтобы гарантировать, что каждый товар не только стильный, но и функциональный и удобный.
          Мы понимаем важность качества и стараемся предложить лучшие продукты по самым конкурентоспособным ценам.
        </p>
        <p>
          Независимо от того, вы ищете весеннее плетение, формальную одежду или что-то среднее, у нас есть для вас что-то.
          Наш клиентский сервис на высоте, и мы стремимся сделать вашу покупку максимально приятной и удобной.
        </p>
      </div>

      <h2>Рекомендуемые товары</h2>
      {
        products.length > 0 ? (
          <div className="product-container">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} className="product-image" />
                <p>{product.description}</p>
                <p>Цена: ${product.price}</p>
                <Link to={`/product/${product.id}`}>Подробнее</Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Загрузка рекомендуемых товаров...</p>
        )
      }

      <div className="contact-form-section">
        <h2>Свяжитесь с нами</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name", { required: true })} placeholder="Имя" />
          {errors.name && <span>Это поле обязательно</span>}
          <input {...register("email", { required: true })} placeholder="Электронная почта" />
          {errors.email && <span>Это поле обязательно</span>}
          <textarea {...register("message", { required: true })} placeholder="Сообщение" />
          {errors.message && <span>Это поле обязательно</span>}
          <input type="submit" value="Отправить" />
        </form>
        { feedbackMessage && <p>{feedbackMessage}</p> }
      </div>
    </motion.div>
  );
};

export default Home;
