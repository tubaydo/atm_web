import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from 'firebase/database';
import '../styles/thanks.css';

const Thanks = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [webValue, setWebValue] = useState(null);

  useEffect(() => {
    const fetchWebValue = async () => {
      const db = getDatabase();
      const webRef = ref(db, 'web');
      try {
        const snapshot = await get(webRef);
        if (snapshot.exists()) {
          setWebValue(snapshot.val());
        } else {
          console.log('No data available for "web"');
        }
      } catch (error) {
        console.error('Error fetching web value:', error);
      }
    };

    const fetchDonationAmount = async () => {
      const db = getDatabase();
      const donationRef = ref(db, 'toplampara');

      try {
        if (webValue === 1) {
          // `web` değeri 1 ise, localStorage'dan bağış miktarını oku
          const currentDonation = localStorage.getItem('currentDonation');
          console.log('Current Donation from localStorage:', currentDonation); // Konsolda kontrol edin
          if (currentDonation) {
            setDonationAmount(parseFloat(currentDonation)); // Stringi sayıya çevirerek state'e ata
          } else {
            console.log('No donation data found in localStorage.');
            setDonationAmount(0); // LocalStorage'da değer yoksa 0 olarak ayarla
          }
        } else if (webValue === 0) {
          // `web` değeri 0 ise, Firebase'den toplamparayı oku
          const snapshot = await get(donationRef);
          if (snapshot.exists()) {
            setDonationAmount(snapshot.val());
            await set(donationRef, 0);
          } else {
            console.log('No data available for "toplampara"');
          }
        }
      } catch (error) {
        console.error('Error fetching donation amount:', error);
      }

      // 3 saniye sonra ana sayfaya yönlendir
      const timer = setTimeout(() => {
        window.location.href = '/'; // Yönlendirmek istediğiniz sayfanın yolu
      }, 3000);

      // Cleanup fonksiyonu: Zamanlayıcıyı temizler
      return () => clearTimeout(timer);
    };

    fetchWebValue();

    if (webValue !== null) {
      fetchDonationAmount();
    }

    return () => {
      localStorage.removeItem('currentDonation');
    };

  }, [webValue]);

  return (
    <div className="thanks-body">
      <div className="thanks-background"></div>
      <div className="thanks-container">
        <p className="thanks-text">{donationAmount.toLocaleString()} TL bağış yaptınız.</p>
        <p className="thanks-text">Allah (c.c) yaptığınız hayrı kabul etsin. TEŞEKKÜRLER.</p>
      </div>
    </div>
  );
};

export default Thanks;
