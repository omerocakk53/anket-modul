import React, { useEffect, useState } from "react";
import useThemeManager from "../hooks/useThemeManager";
import { useLocation } from 'react-router-dom';

export default function ColorEditor({getColorSettings, saveColorSettings}) {
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

    if (loading) return <div className="tw-text-center tw-p-4">Yükleniyor...</div>;

    return (
        <div className="tw-min-h-screen tw-bg-neutral-light tw-p-8">
            <div className="tw-max-w-4xl tw-mx-auto tw-mb-10 tw-text-center">
                <h1 className="tw-text-4xl tw-font-extrabold tw-text-primary tw-mb-2">Renk Düzenleyici</h1>
                <p className="tw-text-neutral-darkest tw-text-lg">Kendi renk temanı kolayca özelleştir, anında önizleme!</p>
            </div>

            <div className="tw-grid tw-grid-cols-1 tw-sm:grid-cols-2 tw-md:grid-cols-3 tw-gap-6 tw-max-w-5xl tw-mx-auto">
                {Object.entries(dynamicColors).map(([key, value]) => (
                    <div
                        key={key}
                        className="tw-flex tw-items-center tw-gap-4 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow-sm tw-hover:shadow-lg tw-transition-shadow tw-duration-200"
                    >
                        <div className="tw-relative">
                            <div
                                className="tw-w-12 tw-h-12 tw-rounded-lg tw-border tw-border-neutral-dark"
                                style={{ backgroundColor: value }}
                            />
                            <span className="tw-absolute tw-bottom-[-1.5rem] tw-left-1/2 tw-transform tw--translate-x-1/2 tw-text-xs tw-text-neutral-darkest">
                                {value.toUpperCase()}
                            </span>
                        </div>
                        <div className="tw-flex-1">
                            <label
                                htmlFor={`color-${key}`}
                                className="tw-block tw-text-neutral-darkest tw-font-semibold tw-mb-1 tw-capitalize"
                            >
                                {key.replace(/-/g, " ")}
                            </label>
                            <input
                                type="color"
                                id={`color-${key}`}
                                value={value}
                                onChange={(e) => updateColor(key, e.target.value)}
                                className="tw-w-full tw-h-10 tw-cursor-pointer tw-border tw-border-neutral-dark tw-rounded-lg tw-transition"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="tw-text-center tw-mt-12">
                <button
                    onClick={handleSave}
                    className="tw-px-8 tw-py-3 tw-bg-primary tw-text-white tw-text-lg tw-font-medium tw-rounded-full tw-shadow-md tw-hover:bg-primary-dark tw-transition-all"
                >
                    Renkleri Kaydet
                </button>
            </div>
        </div>
    );
}
