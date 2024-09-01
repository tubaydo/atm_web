import React, { useState, useEffect } from 'react';
import calculateTotalDonations from '../utils/calculateTotalDonations';

const TotalDonationDisplay = () => {
  const [totalDonation, setTotalDonation] = useState(0);

  useEffect(() => {
    const fetchTotalDonations = async () => {
      const total = await calculateTotalDonations();
      setTotalDonation(total);
    };

    fetchTotalDonations();
  }, []);

  return (
    <div>
      <h1>Toplam Bağış: {totalDonation} TL</h1>
    </div>
  );
};

export default TotalDonationDisplay;
