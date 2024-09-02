import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import '../styles/datadisplay.css'; // CSS dosyasını import edin
import { useNavigate } from 'react-router-dom';

function DataDisplay() {
  const [currentDonation, setCurrentDonation] = useState(null);
  const [totalDonation, setTotalDonation] = useState(null);
  const realtimeDb = getDatabase();
  const navigate = useNavigate();

  useEffect(() => {
    // `y` ve `s` değişkenlerini almak için veritabanı referanslarını oluşturun
    const yRef = ref(realtimeDb, 'para');
    const sRef = ref(realtimeDb, 'toplampara');
    const xRef = ref(realtimeDb, 'parabekleniyor');

    // `y` değişkeninin değerini al
    onValue(yRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentDonation(data);
    });

    // `s` değişkeninin değerini al
    onValue(sRef, (snapshot) => {
      const data = snapshot.val();
      setTotalDonation(data);
    });

    // `x` değişkenini dinleyerek 0'a geçtiğinde `totalAccumulated` güncelle
    onValue(xRef, async (snapshot) => {
      const xValue = snapshot.val();
      if (xValue === 0) {
        // `s` değişkeninin değerini al
        const sSnapshot = await get(sRef);
        const sValue = sSnapshot.val() || 0;

        // `totalAccumulated` değerini güncelle
        const totalAccumulatedRef = ref(realtimeDb, 'totalAccumulated');
        const totalAccumulatedSnapshot = await get(totalAccumulatedRef);
        const totalAccumulatedValue = totalAccumulatedSnapshot.val() || 0;

        // Firebase'e doğru formatta veriyi gönder
        await set(totalAccumulatedRef, totalAccumulatedValue + sValue);

        // `x` 0 olduğunda `y` değişkenini sıfırla
        await set(yRef, 0); // Burada `y` değişkenini sıfırlıyoruz
      }
    });
  }, [realtimeDb]);

  const handleContinue = async () => {
    try {
      // `x` değişkeninin değerini sıfır olarak güncelle
      const xRef = ref(realtimeDb, 'parabekleniyor');
      await set(xRef, 0);

      // Yönlendirme işlemi
      navigate('/loading'); // Buraya yönlendirmek istediğiniz sayfa yolunu yazın
    } catch (error) {
      console.error("Güncelleme yapılamadı: ", error);
    }
  };

  return (
    <div className="data-display-container">
      <div className="background" />
      <div className="data-box-container">
        <div className="data-box">
          <h3>O an yatırılan para</h3>
          <p>{currentDonation !== null ? currentDonation : 'Veri yok'}</p>
        </div>
        <div className="data-box">
          <h3>Toplam yatırılan para</h3>
          <p>{totalDonation !== null ? totalDonation : 'Veri yok'}</p>
        </div>
      </div>
      <div className="continue-button-container">
        <button className="continue-button" onClick={handleContinue}>
          Bağışı Bitir
        </button>
      </div>
    </div>
  );
}

export default DataDisplay;
