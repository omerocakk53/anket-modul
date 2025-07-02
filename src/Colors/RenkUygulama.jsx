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
            <div className="tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-neutral-light tw-fixed tw-inset-0 tw-z-50">
                <div className="tw-text-2xl tw-text-neutral-darkest tw-animate-pulse">
                    Renk ayarları yükleniyor...
                </div>
            </div>
        );
    }

    return null; // bu bileşen sadece temayı uygular, DOM'da başka bir şey göstermesine gerek yok
};
