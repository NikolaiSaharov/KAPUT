import React, { useState, useEffect, useRef } from 'react';

function Captcha({ onCaptchaChange }) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    initializeCaptcha(ctx);
  }, []);

  const generateRandomDigit = () => 
    String.fromCharCode(Math.floor(Math.random() * (57 - 48 + 1) + 48));

  const generateCaptchaText = () => {
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += generateRandomDigit();
    }
    return captcha;
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
      ctx.beginPath();
      ctx.moveTo(Math.floor(Math.random() * ctx.canvas.width), Math.floor(Math.random() * ctx.canvas.height));
      ctx.lineTo(Math.floor(Math.random() * ctx.canvas.width), Math.floor(Math.random() * ctx.canvas.height));
      ctx.stroke();
    }

    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
      ctx.beginPath();
      ctx.arc(Math.floor(Math.random() * ctx.canvas.width), Math.floor(Math.random() * ctx.canvas.height), Math.floor(Math.random() * 5), 0, Math.PI * 2);
      ctx.fill();
    }

    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      ctx.font = '24px Roboto Mono';
      ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
      ctx.fillText(
        captcha[i],
        xInitialSpace + i * letterSpace,
        Math.floor(Math.random() * 16 + 35),
        100
      );
    }
  };

  const initializeCaptcha = (ctx) => {
    setUserInput('');
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleCaptchaSubmit = () => {
    if (userInput === captchaText) {
      onCaptchaChange(true);
    } else {
      alert('Неправильный ввод');
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      initializeCaptcha(ctx);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <canvas ref={canvasRef} width="200" height="70"></canvas>
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Введите текст с изображения"
          value={userInput}
          onChange={handleUserInputChange}
        />
        <div className="button-group">
          <button type="button" onClick={() => initializeCaptcha(canvasRef.current.getContext('2d'))}>
            Обновить
          </button>
          <button type="button" onClick={handleCaptchaSubmit}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Captcha;
