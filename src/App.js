import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Giris from './components/Giris';
import TCLogin from './components/TCLogin';
import SelectArea from './components/SelectArea';
import DataDisplay from './components/DataDisplay'; // Yeni bileşen
import Thanks from './components/Thanks'; 
import Donation from './components/Donation';
import Profile from './components/Profile';
import Loading from './components/Loading'; 
import About from './components/About';
import Thanks2 from './components/Thanks2'; // Thanks2 bileşenini import ettik
import './styles/giris.css'; // Gerekli stil dosyasını import ettik

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Giris />} />
        <Route path="/tc-login" element={<TCLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/select-area" element={<SelectArea />} />
        <Route path="/data-display" element={<DataDisplay />} /> {/* Yeni sayfa */}
        <Route path="/donation" element={<Donation />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/thanks2" element={<Thanks2 />} /> {/* Thanks2 sayfasını ekledik */}
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </Router>
  );
}

export default App;
