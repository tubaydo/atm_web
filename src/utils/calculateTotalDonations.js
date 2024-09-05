import { getDatabase, ref, get } from 'firebase/database';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const calculateTotalDonations = async () => {
  const realtimeDb = getDatabase();
  const firestoreDb = getFirestore();

  // Realtime Database'den totalAccumulated'ı al
  const totalAccumulatedRef = ref(realtimeDb, 'totalAccumulated');
  const totalAccumulatedSnapshot = await get(totalAccumulatedRef);
  const totalAccumulated = totalAccumulatedSnapshot.val() || 0;

  // Firestore'dan tüm donations koleksiyonunu al
  const donationCollection = collection(firestoreDb, 'donations');
  const donationSnapshot = await getDocs(donationCollection);
  let firestoreTotal = 0;

  donationSnapshot.forEach(doc => {
    firestoreTotal += doc.data().amount || 0;
  });

  // Hem Realtime Database hem de Firestore'daki toplamları topla
  return totalAccumulated + firestoreTotal;
};

export default calculateTotalDonations;
