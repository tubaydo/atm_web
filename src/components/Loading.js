import React, { useEffect } from 'react';
import '../styles/loading.css'; // CSS dosyasının yolu

const Loading = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/thanks'; // Yönlendirmek istediğiniz sayfanın yolu
    }, 3000); // 3000 milisaniye = 3 saniye

    return () => clearTimeout(timer); // Temizleme işlevi
  }, []);

  return (
    <div className="loading-body">
      <div className="loading-background"></div>
      <div className="loading-container">
        <p className="loading-text">Bekleyiniz, işleminiz gerçekleştiriliyor...</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
