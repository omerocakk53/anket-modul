// src/services/surveyService.js
import axios from "../utils/axiosInstance";

export async function fetchAllSurveys() {
    const response = await axios.get("/survey");
    return response.data;
}

export async function fetchSurveyById(surveyId) {
    const response = await axios.get(`/survey/${surveyId}`);
    return response.data;
}

// Belirli bir anketi getir
export async function getSurveyById(userId) {
    try {
        const response = await axios.get(`/survey/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Anketi çekerken bir hata oluştu:", error);
        throw error;
    }
}