// services/cevaplariGetir.js
import axios from "../utils/axiosInstance";

export async function getUser(userId) {
    try {
        const response = await axios.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) return null; // kullanıcı yok
        console.error("kullanıcı alınamadı:", error);
        throw new Error("kullanıcı getirilemedi.");
    }
}

