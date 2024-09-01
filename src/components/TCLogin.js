import React from 'react';
import { auth, db } from '../firebase'; // Firebase'i import edin
import { signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/tclogin.css'; // CSS dosyasını import edin

const generateCustomToken = async (tcno) => {
  try {
    const response = await fetch('http://localhost:5001/generateCustomToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tcno }),
    });

    if (!response.ok) {
      throw new Error('Token oluşturulamadı');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Giriş yapılamadı:', error);
    throw error; // Hata mesajını göstermek için
  }
};

const TCLogin = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const tcno = event.target.tcno.value;

    try {
      // Custom token'ı al ve oturum aç
      const customToken = await generateCustomToken(tcno);
      console.log('Custom Token:', customToken); // Token'ı logla
      const userCredential = await signInWithCustomToken(auth, customToken);
      const user = userCredential.user;
      console.log('User:', user); // Kullanıcıyı logla

      // Firestore'a kullanıcıyı kaydet
      await setDoc(doc(db, "users", user.uid), {
        tcno: tcno,
        createdAt: new Date().toISOString(),
      });

      // Yönlendirme
      window.location.href = '/select-area'; // Yeni URL
    } catch (error) {
      console.error("Giriş yapılamadı: ", error);
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
