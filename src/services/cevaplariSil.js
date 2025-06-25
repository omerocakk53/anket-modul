import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";

export async function cevaplariSil(surveyId, answerId) {
    try {
        const response = await axios.delete(`/answer/delete`, {
            data: { // DELETE request body'si
                surveyId: surveyId,
                answerId: answerId
            }
        });

        toast.success("Cevap başarıyla silindi");
        return response.data;
    } catch (error) {
        console.error("Cevap silinirken hata oluştu:", error);
        toast.error(error.response?.data?.message || "Cevap silinirken bir hata oluştu");
        window.location.reload();
        throw error;
    }
}

export async function AllAnswerDelete(surveyId) {
    try {
        const response = await axios.delete(`/answer/alldelete`, {
            data: { // DELETE request body'si
                surveyId: surveyId,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}