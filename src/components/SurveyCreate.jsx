// src/components/SurveyCreate.jsx
import React from 'react';
import SurveyList from './SurveyList';

const SurveyCreate = () => {
  return (
    <div style={{ padding: "20px", border: "2px dashed #888" }}>
      <h2>Yeni Anket Oluştur</h2>
      <p>Bu bileşen, anket oluşturmak için kullanılabilir.</p>
      <div style={{ padding: "20px", border: "2px dashed #888" }}>
        <SurveyList survey={"Bizim Başlığımız"} />
      </div>
    </div>
  );
};

export default SurveyCreate;
