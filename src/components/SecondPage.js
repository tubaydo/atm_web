import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, set } from 'firebase/database';
import '../styles/selectarea.css';

const areas = [
  { id: 1, name: 'Sağlık Destek', image: 'saglik.png' },
  { id: 2, name: 'Sosyal Yardım', image: 'sosyal.png' },
  { id: 3, name: 'Engelli Destek', image: 'engelli.png' },
  { id: 4, name: 'Hayvan Barınakları', image: 'hayvan.png' },
  { id: 5, name: 'Çevre Koruma', image: 'cevre.png' },
  { id: 6, name: 'Afet Yardımları', image: 'afet.png' },
  { id: 7, name: 'İhtiyaç Haritası', image: 'ihtiyac.png' },
  { id: 8, name: 'Yerel Destek', image: 'yerel.png' },
];

function SecondPage() {
  const navigate = useNavigate();
  const realtimeDb = getDatabase();
  const [webValue, setWebValue] = useState(null);

  useEffect(() => {
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
    await set(ref(realtimeDb, 'parabekleniyor'), 1);

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

export default SecondPage;
