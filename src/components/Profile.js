import React from 'react';
import '../styles/profile.css'; // Profil sayfası için CSS dosyasını import edin

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="background"></div>
      <div className="content">
        <h1>Profil Sayfası</h1>
        <p>Profil bilgileri burada gösterilecek.</p>
        {/* Profil bilgileri ve diğer içerikler */}
      </div>
    </div>
  );
};

export default Profile;
