import { firestore } from '../firebase';
import { collection, addDoc } from "firebase/firestore"; 

const addDonation = async (amount, userId = null) => {
  try {
    const donationRef = collection(firestore, "donations");
    await addDoc(donationRef, {
      amount: amount,
      timestamp: new Date().toISOString(),
      userId: userId // null olabilir
    });
    console.log("Bağış başarıyla eklendi.");
  } catch (error) {
    console.error("Bağış eklenirken hata oluştu: ", error);
  }
};

export default addDonation;
