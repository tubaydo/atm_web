const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

// Kök rota için basit bir yanıt
app.get('/', (req, res) => {
  res.send('Sunucu çalışıyor!');
});

// Diğer API endpoint'leri
app.post('/generateCustomToken', async (req, res) => {
  const { tcno } = req.body;

  try {
    const customToken = await admin.auth().createCustomToken(tcno);
    res.json({ token: customToken });
  } catch (error) {
    console.error('Token oluşturulamadı:', error);
    res.status(500).send('Token oluşturulamadı');
  }
});

app.listen(5001, () => {
  console.log('Sunucu 5001 portunda çalışıyor');
});
