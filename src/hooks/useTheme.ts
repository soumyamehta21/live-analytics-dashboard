import { useCallback, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "live-dashboard-theme";

function resolveInitialMode(defaultMode: ThemeMode) {
  if (typeof window === "undefined") return defaultMode;

  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return defaultMode;
}

export function useTheme(defaultMode: ThemeMode = "light") {
  const [mode, setMode] = useState<ThemeMode>(() => resolveInitialMode(defaultMode));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.dataset.theme = mode;
    root.style.colorScheme = mode;
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const isDark = useMemo(() => mode === "dark", [mode]);

  return { mode, isDark, toggle };
}
