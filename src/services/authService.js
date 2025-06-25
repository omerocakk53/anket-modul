// src/services/authService.js
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const INVALID_LOGIN_KEY = 'invalidDates';

const login = async (email, password, recaptchaToken) => {
  try {
    if (!recaptchaToken) {
      return { success: false, message: 'reCAPTCHA Doğrulaması Hatalı' };
    }

    // localStorage'dan geçmiş yanlış giriş zamanlarını al
    const invalidDates = JSON.parse(localStorage.getItem(INVALID_LOGIN_KEY)) || [];
    const now = Date.now();

    // 30 saniyeden eski girişleri temizle
    const recentInvalidDates = invalidDates.filter(t => now - t < 30000);

    if (recentInvalidDates.length >= 5) {
      // 5 veya daha fazla yanlış deneme var, bekleme süresi var
      const lastAttempt = recentInvalidDates[recentInvalidDates.length - 1];
      const waitTime = 30000 - (now - lastAttempt);
      return {
        success: false,
        message: `Çok kez yanlış girildi ${Math.ceil(waitTime / 1000)} saniye bekleyiniz`,
        waitTime: Math.ceil(waitTime / 1000),
      };
    }

    // Backend login isteği
    const response = await axiosInstance.post('/auth/login', { email, password });

    if (response.data.tokens.access.token) {
      // Başarılı girişte localStorage'daki yanlış girişleri temizle
      localStorage.removeItem(INVALID_LOGIN_KEY);
      localStorage.setItem('token', response.data.tokens.access.token);
      return { success: true, token: response.data.tokens.access.token };
    } else {
      // Başarısız giriş - tarih kaydet
      recentInvalidDates.push(now);
      localStorage.setItem(INVALID_LOGIN_KEY, JSON.stringify(recentInvalidDates));
      return { success: false, message: response.data.message || 'Hatalı giriş' };
    }
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    // Hata olursa da yanlış giriş gibi sayılabilir
    const invalidDates = JSON.parse(localStorage.getItem(INVALID_LOGIN_KEY)) || [];
    invalidDates.push(Date.now());
    localStorage.setItem(INVALID_LOGIN_KEY, JSON.stringify(invalidDates));
    return { success: false, message: 'Yanlış Mail yada Şifre' };
  }
};



const register = async (email, password) => {
  try {
    const response = await axiosInstance.post('/users/register', { email, password });
    if (response.data.tokens.access.token) {
      localStorage.setItem('token', response.data.tokens.access.token); // Token'ı localStorage'a kaydediyoruz
      return { success: true, token: response.data.tokens.access.token };
    }
    return { success: false, message: 'Registration failed' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Email already taken or invalid input' };
  }
};

const logout = () => {
  window.location.reload();
  localStorage.removeItem('token'); // Token'ı localStorage'dan kaldırıyoruz
};

function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      exp: payload.exp,
      email: payload.email
    };
  } catch (e) {
    return null;
  }
}

export default {
  login,
  register,
  logout,
  getCurrentUser
};
