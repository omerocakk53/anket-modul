import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";

export async function AnketiGüncelle({ surveyId, items, FinishWelcomeitems }) {
  try {
    await axios.patch(`/survey/${surveyId}`, {
      items: items,
      FinishWelcomeitems: FinishWelcomeitems,
    });
    toast.success("Anket kaydedildi")
  } catch (error) {
    console.error("Hata:", error);
    toast.error("Anket kaydedilemedi")
  }
}

export const updateSurveyFeature = async (surveyId, data) => {
  const response = await axios.put(`/survey/feature/${surveyId}`, data);
  return response.data;
};