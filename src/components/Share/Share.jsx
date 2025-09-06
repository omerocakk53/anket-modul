import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import useShareData from "./hooks/useShareData";
import ShareSettings from "./components/ShareSettings";
import OpenGraphPreview from "./components/OpenGraphPreview";
import SocialShareButtons from "./components/SocialShareButtons";

function Share({ fetchsurveyById, savesurveyshare, getsurveyshare }) {
  const { surveyId } = useParams();
  const navigate = useNavigate();

  const {
    survey,
    shareData,
    handleChange,
    handleImageChange,
    fileInputRef,
    BASE_URL,
  } = useShareData({
    surveyId,
    fetchsurveyById,
    getsurveyshare,
    savesurveyshare,
  });

  const surveyLink = `${BASE_URL}/p/${survey.link}`;
   
  const goBack = () => navigate("/anket", { replace: true });
  
  return (
    <>
      <Header isShareMode={true} surveyData={survey} onBackToMain={goBack} Sidebar={() => { }} />
      <div className="max-w-6xl mx-auto px-4 py-8 overflow-x-hidden">
        <div className="grid gap-8 lg:grid-cols-2">
          <ShareSettings
            shareData={shareData}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            fileInputRef={fileInputRef}
          />
          <div className="bg-gray-50 rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Open Graph Önizleme</h2>
            <OpenGraphPreview shareData={shareData} BASE_URL={BASE_URL} surveyLink={surveyLink} />
            <SocialShareButtons shareData={shareData} surveyLink={surveyLink} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Share;
