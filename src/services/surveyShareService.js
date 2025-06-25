import axios from '../utils/axiosInstance';

// 🎯 Paylaşım verisini kaydet/güncelle (görselli)
export const saveSurveyShare = async (formData) => {
    return await axios.post('/s', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// 🎯 Belirli bir surveyId için paylaşım verisini getir
export const getSurveyShare = async (surveyId) => {
    try {
        const res = await axios.get(`/s/${surveyId}`);
        return res.data;
    } catch (err) {
        console.warn("Paylaşım verisi bulunamadı:", err?.response?.data || err.message);
        return null;
    }
};


export async function deleteSurveyShareById(surveyId) {
    try {
        const response = await axios.delete(`/s/${surveyId}`);
        return response.data;
    } catch (error) {
        console.error("❌ paylaşım silinemedi:", error);
        toast.error("❌ paylaşım silinirken bir hata oluştu.")
        throw error;
    }
}
