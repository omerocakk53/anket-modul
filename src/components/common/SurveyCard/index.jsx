import React, { useEffect, useState } from 'react';
import SurveyHeader from './SurveyHeader';
import SurveyTags from './SurveyTags';
import SurveyActions from './SurveyActions';
import SurveyFooter from './SurveyFooter';
import toast from 'react-hot-toast';

export default function SurveyCard({ key, survey, handleDelete, handleCopyLink, handleShowQr, navigate, updatesurveyfeature }) {

  const [active, setActive] = useState(survey.active);

  const handleSubmit = async () => {
    try {
      const updated = await updatesurveyfeature(survey._id, {
        active: !active,
      });
      setActive(updated.updatedSurvey.active);
      toast.success(`${!active ? '" ' + updated.updatedSurvey.title + ' " Aktif' : '" ' + updated.updatedSurvey.title + ' " Pasif'}`);
    } catch (error) {
      toast.error("Güncelleme sırasında hata oluştu.");
    }
  };

  return (
    <div
      key={key}
      className="bg-white/90 backdrop-blur-xs rounded-lg shadow-md p-4 flex flex-col gap-3"
    >
      <SurveyHeader title={survey.title} description={survey.description} active={active} handleActiveSurvey={handleSubmit} />
      <SurveyTags tags={survey.tags} />
      <SurveyActions
        survey={survey}
        navigate={navigate}
        handleDelete={handleDelete}
        handleCopyLink={handleCopyLink}
        handleShowQr={handleShowQr}

      />
      <SurveyFooter
        createdAt={survey.createdAt}
        lastModified={survey.lastModified}
        surveyType={survey.surveyType}
      />
    </div>
  );
}
