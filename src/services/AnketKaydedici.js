import axios from "../utils/axiosInstance";
// Yeni anket oluşturma servisi
export async function createSurvey({ title, description, userId, group }) {
  try {
    const payload = {
      title,
      description,
      userId,
      chamberId: "685421b016eb00354043dfde" // dinamik olacak
    };

    if (group) {
      payload.group = group; // Grup varsa payload'a ekle
    }

    const response = await axios.post("/survey", payload);
    return response.data; // { _id, title, description, group, ... }
  } catch (error) {
    console.error("Anket oluşturulurken hata:", error);
    throw error;
  }
}
