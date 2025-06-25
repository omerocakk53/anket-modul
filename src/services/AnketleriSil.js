import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";

export async function deleteSurveyById(surveyId) {
    try {
        const response = await axios.delete(`/survey/${surveyId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Anket silinemedi:", error);
        toast.error("❌ Anket silinirken bir hata oluştu.")
        throw error;
    }
}
