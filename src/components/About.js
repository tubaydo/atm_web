import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import edildi
import '../styles/donation.css'; // Arka plan ve diğer stil ayarlarını içeren CSS dosyası

const DonationForm = () => {
  const [formData, setFormData] = useState({
    tc: '',
    fatherName: '',
    birthDate: '',
    iban: '',
  });

  const navigate = useNavigate(); // useNavigate fonksiyonunu çağırdık

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/thanks2');
  };

  return (
    <div className="donation-page">
      <div className="background"></div>
      <div className="form-container">
        <h2>Bağış Al</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tc">TC Kimlik Numarası</label>
            <input
              type="text"
              id="tc"
              name="tc"
              value={formData.tc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fatherName">Baba Adı</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">Doğum Tarihi</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="iban">IBAN</label>
            <input
              type="text"
              id="iban"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Bağış Al</button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
