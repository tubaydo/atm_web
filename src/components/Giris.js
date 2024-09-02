import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set } from 'firebase/database'; // Firebase veritabanı işlemleri için import
import { useNavigate } from 'react-router-dom'; // useNavigate import
import calculateTotalDonations from '../utils/calculateTotalDonations'; // Doğru yolu belirtin
import '../styles/giris.css'; // CSS dosyasını import edin

const LoginPage = () => {
  const [totalDonation, setTotalDonation] = useState(0);
  const [selection, setSelection] = useState(null); // Seçimi takip etmek için state ekledik
  const navigate = useNavigate(); // useNavigate fonksiyonunu çağırdık

  useEffect(() => {
    const fetchTotalDonations = async () => {
      const total = await calculateTotalDonations();
      setTotalDonation(total);
    };

    fetchTotalDonations();
  }, []);

  const handleLoginClick = () => {
    // Giriş yap butonuna tıklandığında yönlendirme
    if (selection !== null) {
      // Seçim yapıldıysa yönlendir
      navigate('/tc-login');
    } else {
      alert('Lütfen Web veya ATM seçeneklerinden birini seçin.');
    }
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleWebClick = async () => {
    try {
      const db = getDatabase();
      const webRef = ref(db, 'web');
      await set(webRef, 1); // `web` değişkenini 1 yap
      setSelection('web'); // Seçim state'ini güncelle
    } catch (error) {
      console.error('Web seçeneği için güncelleme yapılamadı:', error);
    }
  };

  const handleAtmClick = async () => {
    try {
      const db = getDatabase();
      const webRef = ref(db, 'web');
      await set(webRef, 0); // `web` değişkenini 0 yap
      setSelection('atm'); // Seçim state'ini güncelle
    } catch (error) {
      console.error('ATM seçeneği için güncelleme yapılamadı:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="background"></div>
      <div className="content">
        <div className="donation-counter">
          <p>Toplam Bağış: {totalDonation.toLocaleString()} TL</p>
        </div>
        <div className="buttons">
          <button className="about-button" onClick={handleAboutClick}>Hakkımızda</button>
          <button className="login-button" onClick={handleLoginClick}>Giriş Yap</button>
        </div>
        <div className="selection-question">
          <p>Hangisinden devam edeceksiniz?</p>
        </div>
        <div className="selection-buttons">
          <button
            className={`web-button ${selection === 'web' ? 'selected' : ''}`} 
            onClick={handleWebClick}
          >
            Web
          </button>
          <button
            className={`atm-button ${selection === 'atm' ? 'selected' : ''}`} 
            onClick={handleAtmClick}
          >
            ATM
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
