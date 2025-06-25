// services/cevaplariGetir.js
import axios from "../utils/axiosInstance";

export async function cevaplariGetir(surveyId) {
  try {
    const response = await axios.get(`/answers/${surveyId}`);
    return response.data;
  } catch (error) {
    console.error("Cevaplar alınamadı:", error);
    throw new Error("Cevaplar getirilemedi.");
  }
}
