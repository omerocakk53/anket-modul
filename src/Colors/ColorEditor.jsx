import React, { useEffect, useState } from "react";
import useThemeManager from "../hooks/useThemeManager";
import { getColorSettings, saveColorSettings } from "../Services/colorService";
import { useLocation } from 'react-router-dom';

export default function ColorEditor() {
    const { dynamicColors, setColorsDirectly, updateColor } = useThemeManager();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const userId = location.state?.userId;

    useEffect(() => {
        if (!userId) return;

        setLoading(true);
        getColorSettings(userId)
            .then((data) => {
                const filtered = {};
                Object.keys(dynamicColors).forEach((key) => {
                    if (data[key]) filtered[key] = data[key];
                });
                setColorsDirectly(filtered);
            })
            .catch(() => {
                console.warn("Varsayılan renkler yüklendi.");
            })
            .finally(() => setLoading(false));
    }, [userId]);

    const handleSave = async () => {
        try {
            await saveColorSettings({ userId, ...dynamicColors });
            alert("Renk ayarları kaydedildi.");
        } catch (err) {
            console.error(err);
            alert("Kaydetme sırasında bir hata oluştu.");
        }
    };

    if (loading) return <div className="text-center p-4">Yükleniyor...</div>;

    return (
        <div className="min-h-screen bg-neutral-light p-8">
            <div className="max-w-4xl mx-auto mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-primary mb-2">Renk Düzenleyici</h1>
                <p className="text-neutral-darkest text-lg">Kendi renk temanı kolayca özelleştir, anında önizleme!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {Object.entries(dynamicColors).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="relative">
                            <div
                                className="w-12 h-12 rounded-lg border border-neutral-dark"
                                style={{ backgroundColor: value }}
                            />
                            <span className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 text-xs text-neutral-darkest">
                                {value.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor={`color-${key}`}
                                className="block text-neutral-darkest font-semibold mb-1 capitalize"
                            >
                                {key.replace(/-/g, " ")}
                            </label>
                            <input
                                type="color"
                                id={`color-${key}`}
                                value={value}
                                onChange={(e) => updateColor(key, e.target.value)}
                                className="w-full h-10 cursor-pointer border border-neutral-dark rounded-lg transition"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-primary text-white text-lg font-medium rounded-full shadow-md hover:bg-primary-dark transition-all"
                >
                    Renkleri Kaydet
                </button>
            </div>
        </div>
    );
}
