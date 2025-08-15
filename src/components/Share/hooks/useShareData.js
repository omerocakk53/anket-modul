import { useEffect, useState, useRef } from "react";

export default function useShareData({ surveyId, fetchsurveyById, getsurveyshare, savesurveyshare }) {
  const [survey, setSurvey] = useState({});
  const [shareData, setShareData] = useState({});
  const fileInputRef = useRef(null);
  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surveyRes = await fetchsurveyById(surveyId);
        setSurvey(surveyRes);

        let shareRes;
        try {
          shareRes = await getsurveyshare(surveyId);
        } catch (error) {
          shareRes = null;
        }

        setShareData({
          title: shareRes?.title || surveyRes.title || "",
          description: shareRes?.description || surveyRes.description || "",
          image: shareRes?.image || "",
        });
      } catch (err) {
        console.error("Veri getirilemedi:", err);
      }
    };
    fetchData();
  }, [surveyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShareData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setShareData((prev) => ({ ...prev, image: file }));
  };

  const handleAutoSave = async () => {
    const formData = new FormData();
    formData.append("surveyId", surveyId);
    formData.append("title", shareData.title ? shareData.title : survey.title);
    formData.append("description", shareData.description ? shareData.description : survey.description);
    if (shareData?.image) formData.append("image", shareData.image);

    try {
      await savesurveyshare(formData);
    } catch (err) {
      console.error("Paylaşım kaydedilemedi", err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleAutoSave();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [shareData]);

  return {
    survey,
    shareData,
    setShareData,
    handleChange,
    handleImageChange,
    fileInputRef,
    BASE_URL,
  };
}
