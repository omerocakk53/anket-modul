import axios from "../utils/axiosInstance";

export const getColorSettings = async (userId) => {
    const res = await axios.get(`/color-settings/${userId}`);
    return res.data;
};

export const saveColorSettings = async (colorData) => {
    const res = await axios.post("/color-settings", colorData);
    return res.data;
};
