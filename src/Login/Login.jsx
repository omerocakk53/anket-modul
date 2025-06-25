import React, { useState, useEffect, useRef } from 'react';

import authService from '../services/authService';
import { getUser } from '../services/user';
import { FaUserAlt, FaLock, FaPoll } from 'react-icons/fa';
import { toast } from 'react-toastify';
const RECAPTCHA_SITE_KEY = '6LedKVMrAAAAADjF6wWHRZyuu_n59TsXo-UaCvpU'; // Kendi key’in ile değiştir

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabledSeconds, setDisabledSeconds] = useState(0);
    const [userData, setUserData] = useState();
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);


    useEffect(() => {
        const checkUserAndNavigate = async () => {
            const currentUser = authService.getCurrentUser?.();

            if (!currentUser) return;

            const now = Math.floor(Date.now() / 1000);
            if (currentUser.exp && currentUser.exp > now) {
                try {
                    const user = await getUser(currentUser.id); // API'den kontrol
                    if (user) {
                        navigate('/anketolustur', { state: { userId: currentUser.id }, replace: true });
                    } else {
                        // Kullanıcı yoksa token'ı temizle
                        authService.logout?.();
                        toast.warning("Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.");
                    }
                } catch (err) {
                    authService.logout?.();
                    console.error("Kullanıcı kontrolü başarısız:", err);
                    toast.warning("Giriş için tekrar oturum açmalısınız.");
                }
            } else {
                authService.logout?.();
            }
        };

        checkUserAndNavigate();
    }, []);



    const startCountdown = (seconds) => {
        setDisabledSeconds(seconds);

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisabledSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (disabledSeconds > 0) return;

        // Loading toast'ı başlat ve ID'sini al
        const loadingToastId = toast.loading("Giriş yapılıyor...");

        try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'login' });
            const result = await authService.login(email, password, token);

            // Loading toast'ı kapat
            toast.dismiss(loadingToastId);

            if (result.success) {
                toast.success("Giriş Başarılı");
                const currentUser = authService.getCurrentUser?.();
                navigate('/anketolustur', { state: { userId: currentUser?.id }, replace: true });
            } else {
                toast.warning(result.message);
                if (result.waitTime) {
                    startCountdown(result.waitTime);
                }
            }
        } catch (error) {
            // Loading toast'ı kapat
            toast.dismiss(loadingToastId);

            console.error('Login error:', error);
            toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="p-6 text-primary-darktext flex justify-center mb-11">
                    <FaPoll className="h-8 w-8 mr-3" />
                    <h1 className="text-2xl font-extrabold tracking-tight">OdaAnket</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">Kullanıcı Adı</label>
                        <div className="flex items-center border-b-2 border-natural hover:border-b-primary p-2">
                            <FaUserAlt className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Kullanıcı Adı Giriniz"
                                className="flex-1 focus:outline-none bg-transparent"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium">Şifre</label>
                        <div className="flex items-center border-b-2 border-natural hover:border-b-primary p-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Şifrenizi Giriniz"
                                className="flex-1 focus:outline-none bg-transparent"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={disabledSeconds > 0}
                        className={`w-full py-2 rounded-lg transition duration-300 
                        ${disabledSeconds > 0 ? 'bg-danger text-neutral cursor-not-allowed' : 'bg-secondary hover:bg-primary text-neutral'}`}
                    >
                        {disabledSeconds > 0 ? `Bekle ${disabledSeconds}s` : 'Giriş'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
