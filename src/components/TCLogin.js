import React from 'react';
import { auth, db } from '../firebase'; // Firebase'i import edin
import { signInAnonymously } from 'firebase/auth'; // signInWithCustomToken kaldırıldı
import { doc, setDoc } from 'firebase/firestore';
import '../styles/tclogin.css'; // CSS dosyasını import edin

const TCLogin = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const tcno = event.target.tcno.value;

    // 11 haneli bir sayı kontrolü
    if (tcno.length === 11 && /^\d+$/.test(tcno)) {
      try {
        // TC Kimlik Numarası geçerli olduğunda anonim olarak oturum aç
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        console.log('Anonim kullanıcı:', user);

        // Firestore'a kullanıcıyı kaydet
        await setDoc(doc(db, "users", user.uid), {
          tcno: tcno,
          createdAt: new Date().toISOString(),
        });

        // Yönlendirme
        window.location.href = '/select-area'; // Yeni URL
      } catch (error) {
        console.error("Anonim giriş yapılamadı: ", error);
        alert('Giriş yapılamadı: ' + error.message);
      }
    } else {
      alert('Lütfen geçerli 11 haneli bir TC Kimlik Numarası girin.');
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      console.log('Anonim kullanıcı:', user);

      // Firestore'a anonim kullanıcıyı kaydet
      await setDoc(doc(db, "users", user.uid), {
        tcno: 'anonim',
        createdAt: new Date().toISOString(),
      });

      // Yönlendirme
      window.location.href = '/select-area'; // Yeni URL
    } catch (error) {
      console.error("Anonim giriş yapılamadı: ", error);
      alert('Giriş yapılamadı: ' + error.message);
    }
  };

  return (
    <div className="body">
      <div className="background"></div>
      <div className="container">
        <form id="tc-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="tcno" className="label">TC Kimlik Numaranız:</label>
            <br />
            <input
              type="text"
              id="tcno"
              name="tcno"
              maxLength="11"
              required
              pattern="\d{11}"
              placeholder="12345678901"
              className="input"
            />
          </div>
          <button type="submit" className="button">Giriş Yap</button>
        </form>
        <div className="anonymous-option" onClick={handleAnonymousLogin}>
          TC Kimlik Numarası Olmadan Devam Et
        </div>
      </div>
    </div>
  );
};

export default TCLogin;
