import { useEffect, useState } from "react";
import colors from "../Colors/colors";
import { applyTheme } from "../Services/themeService";

const useThemeManager = () => {
    const [dynamicColors, setDynamicColors] = useState(colors);

    useEffect(() => {
        applyTheme(dynamicColors);
    }, [dynamicColors]);

    const updateColor = (key, value) => {
        if (!dynamicColors.hasOwnProperty(key)) return;
        setDynamicColors((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const setColorsDirectly = (newColors) => {
        setDynamicColors((prev) => ({
            ...prev,
            ...newColors,
        }));
    };

    return { dynamicColors, updateColor, setColorsDirectly };
};

export default useThemeManager;
