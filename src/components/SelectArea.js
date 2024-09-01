import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, set } from 'firebase/database';
import '../styles/selectarea.css';

const areas = [
  { id: 1, name: 'Yardıma Muhtaç Aileler', image: 's.png' },
  { id: 2, name: 'Eğitim Desteği', image: 's.png' },
  { id: 3, name: 'Üniversite Öğrencileri', image: 's.png' },
  { id: 4, name: 'Kızılay ve Yeşilay', image: 's.png' },
  { id: 5, name: 'Darüşşakafa', image: 's.png' },
  { id: 6, name: 'Darülaceze', image: 's.png' },
  { id: 7, name: 'LÖSEV', image: 's.png' },
  { id: 8, name: 'Camii ve İbadethaneler', image: 's.png' },
];

function SelectArea() {
  const navigate = useNavigate();
  const realtimeDb = getDatabase();
  const [webValue, setWebValue] = useState(null); // Web değeri için state ekledik

  useEffect(() => {
    // Firebase'den web değişkenini oku
    const fetchWebValue = async () => {
      try {
        const snapshot = await get(ref(realtimeDb, 'web'));
        if (snapshot.exists()) {
          setWebValue(snapshot.val());
        } else {
          console.log('No data available for "web"');
        }
      } catch (error) {
        console.error('Error fetching web value:', error);
      }
    };

    fetchWebValue();
  }, [realtimeDb]);

  const handleSelect = async (id) => {
    // `x` değişkenini 1 yap
    await set(ref(realtimeDb, 'parabekleniyor'), 1);

    // Web değeri kontrolü yap ve uygun sayfaya yönlendir
    if (webValue === 1) {
      navigate(`/donation?area=${id}`);
    } else if (webValue === 0) {
      navigate(`/data-display?area=${id}`);
    } else {
      alert('Web değeri okunamadı veya tanımsız.');
    }
  };

  return (
    <div className="page-container">
      <div className="background-container" />
      <div className="area-container">
        {areas.map(area => (
          <div key={area.id} className="area-box" onClick={() => handleSelect(area.id)}>
            <img src={`/images/${area.image}`} alt={area.name} className="area-image" />
            <p className="area-name">{area.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectArea;
