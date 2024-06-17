import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_9q4f1al', 'template_ivlkjd8', form.current, {
        publicKey: 'oX7sdSftIruWCOKrH',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Имя</label>
      <input type="text" name="user_name" />
      <label>Почта</label>
      <input type="email" name="user_email" />
      <label>Сообщение</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};