// tokenHelper.js
import { jwtDecode } from "jwt-decode";

export const checkTokenValidity = (token) => {
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            // Token süresi dolmuşsa
            return false;
        }
        return true;
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
};

// tokenHelper.js
export function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        const decoded = atob(payload);
        return JSON.parse(decoded);
    } catch (err) {
        console.error("Token çözümlenemedi:", err);
        return null;
    }
}
