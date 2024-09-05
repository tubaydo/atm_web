import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/donation.css'; // CSS dosyasını import edin
import { db } from '../firebase'; // Firebase yapılandırmasını doğru şekilde import edin
import { collection, addDoc } from 'firebase/firestore';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'amount':
        setAmount(value);
        break;
      case 'cardNumber':
        setCardNumber(value);
        break;
      case 'expiryDate':
        setExpiryDate(value);
        break;
      case 'cvv':
        setCvv(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (amount && cardNumber && expiryDate && cvv) {
      try {
        // Yeni bir bağış ekle
        await addDoc(collection(db, 'donations'), {
          amount: parseFloat(amount), // Tutarı sayıya çevirip kaydedin
          timestamp: new Date(), // Bağışın yapıldığı zamanı kaydedin
        });

        // Bağış miktarını localStorage'a kaydet
        localStorage.setItem('currentDonation', amount);

        // Loading sayfasına yönlendir
        navigate('/loading');
      } catch (error) {
        console.error("Bağış kaydedilirken hata oluştu: ", error);
      }
    } else {
      alert("Lütfen tüm alanları doldurunuz."); // Alanlar eksikse uyarı göster
    }
  };

  return (
    <div className="donation-container">
      <div className="background"></div>
      <div className="form-container">
        <h2>Bağış Yap</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Bağış Tutarı:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Kart Numarası:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Son Kullanma Tarihi:</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Bağış Yap</button>
        </form>
      </div>
    </div>
  );
};

export default Donation;
