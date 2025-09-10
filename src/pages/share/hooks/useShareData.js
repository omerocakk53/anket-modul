import { useEffect, useState, useRef, useCallback } from "react";

export default function useShareData({
  surveyId,
  fetchsurveyById,
  getsurveyshare,
  savesurveyshare,
  uploadImage,
}) {
  const [survey, setSurvey] = useState({});
  const [shareData, setShareData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [pendingImage, setPendingImage] = useState(null);
  const fileInputRef = useRef(null);
  const BASE_URL = window.location.origin;

  // 📌 Survey ve mevcut shareData yükle
  useEffect(() => {
    const fetchData = async () => {
      if (!surveyId) return;
      try {
        const surveyRes = await fetchsurveyById(surveyId);
        setSurvey(surveyRes);

        let shareRes = null;
        try {
          shareRes = await getsurveyshare(surveyId);
        } catch {
          shareRes = null;
        }
        setShareData({
          title: shareRes?.title || surveyRes.title || "",
          description: shareRes?.description || surveyRes.description || "",
          image: shareRes?.image || {},
        });
      } catch (err) {
        return err;
      }
    };

    fetchData();
  }, [surveyId, fetchsurveyById, getsurveyshare]);

  // 📌 Form değişiklikleri
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShareData((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 Görsel seçildiğinde pendingImage’e koy
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPendingImage(file);
  };

  // 📌 Görsel yükleme → sadece state güncelle
  const saveImage = useCallback(async () => {
    if (!pendingImage) return;
    try {
      const result = await uploadImage(pendingImage);
      const filePath = result?.data;
      if (filePath) {
        setShareData((prev) => ({ ...prev, image: filePath }));
      }
    } catch (err) {
      return err;
    } finally {
      setPendingImage(null);
    }
  }, [pendingImage, uploadImage]);

  // 📌 ShareData kaydet (title, description, image)
  const handleAutoSave = useCallback(async () => {
    try {
      if (!surveyId) return;
      await savesurveyshare({ surveyId, ...shareData });
    } catch (err) {
      return err;
    }
  }, [surveyId, shareData, savesurveyshare]);

  // 📌 Title / Description değişince autosave (debounce)
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleAutoSave();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [shareData.title, shareData.description, handleAutoSave]);

  // 📌 Görsel değişince autosave
  useEffect(() => {
    if (shareData.image) {
      handleAutoSave();
    }
  }, [shareData.image, handleAutoSave]);

  // 📌 pendingImage değiştiğinde upload başlat
  useEffect(() => {
    saveImage();
  }, [pendingImage, saveImage]);

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
