import React, { useEffect, useState } from "react";
import colors from "./colors";  // default renklerin olduğu dosya
import useThemeManager from "../hooks/useThemeManager";

export const RenkUygulama = ({getColorSettings}) => {
    const [userId, setUserId] = useState(null); // USERID EKLE
    const [loading, setLoading] = useState(true); // loading durumu
    const { setColorsDirectly } = useThemeManager();


    useEffect(() => {
        if (!userId) return;

        setLoading(true); // yükleme başlıyor

        getColorSettings(userId)
            .then((data) => {
                const filtered = {};
                Object.keys(colors).forEach((key) => {
                    if (data[key]) filtered[key] = data[key];
                });
                setColorsDirectly(filtered);
            })
            .catch(() => {
                console.warn("Varsayılan renkler yüklendi.");
                setColorsDirectly(colors);
            })
            .finally(() => setTimeout(() => {
                setLoading(false)
            }, 800)); // yükleme tamamlandı
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-neutral-light fixed inset-0 z-50">
                <div className="text-2xl text-neutral-darkest animate-pulse">
                    Renk ayarları yükleniyor...
                </div>
            </div>
        );
    }

    return null; // bu bileşen sadece temayı uygular, DOM'da başka bir şey göstermesine gerek yok
};
