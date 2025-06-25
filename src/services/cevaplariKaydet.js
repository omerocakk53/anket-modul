// services/cevaplariKaydet.js
import axios from "../utils/axiosInstance";

export async function cevaplariKaydet(surveyId, answers) {
  try {
    const response = await axios.post("/answers", {
      surveyId,
      answers,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Cevaplar kaydedilemedi:", error);
    throw new Error("Cevaplar kaydedilemedi.");
  }
}
