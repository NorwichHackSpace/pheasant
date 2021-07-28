import { useEffect, useState, useContext } from "react";
import { getFromLS, saveToLS } from "../components/LocalStorage/LocalStorage.js"
import { themePalette } from "../theme/palette";

import ThemeContext from "../theme/ThemeContext";


const breakPointLocalStorageKey = "breakPoints"
const colsLocalStorageKey = "cols"
const localOverrideThemeLocalStorageKey = "localOverrideTheme"

const useThemeManager = () => {
    const themes = Object.keys(themePalette);
    const { theme, setTheme } = useContext(ThemeContext);

    const [breakPoints, setBreakPoints] = useState(getFromLS(breakPointLocalStorageKey));
    const [cols, setCols] = useState(getFromLS(colsLocalStorageKey));

    const overrideTheme = (key, value) => {
        var currentOverride = getFromLS(localOverrideThemeLocalStorageKey) || {};
        currentOverride[key] = value;
        saveToLS(localOverrideThemeLocalStorageKey, currentOverride);
    }

    const clearOverrideTheme = () => {
        saveToLS(localOverrideThemeLocalStorageKey, {});
    }

    return { themes, theme, setTheme, overrideTheme, clearOverrideTheme, breakPoints, cols, setBreakPoints, setCols }
}


export default useThemeManager;