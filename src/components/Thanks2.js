import React from 'react';
import '../styles/thanks2.css'; // CSS dosyasını bağlamayı unutmayın

const Thanks2 = () => {
  return (
    <div className="thanks-page">
      <div className="background"></div>
      <div className="message-container">
        <h1>Teşekkürler!</h1>
        <p>Günlük bir defaya mahsus 30 TL hesabınıza aktarılmıştır.</p>
        <button onClick={() => window.location.href = '/'}>Ana Sayfaya Dön</button>
      </div>
    </div>
  );
};

export default Thanks2;
