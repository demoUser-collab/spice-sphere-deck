import { useEffect } from "react";
import { useAppStore } from "@/store";

export function useThemeSync() {
  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const apply = () => {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const isDark = theme === "dark" || (theme === "system" && mql.matches);
      root.classList.toggle("dark", isDark);
    };
    apply();
    if (theme === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      mql.addEventListener("change", apply);
      return () => mql.removeEventListener("change", apply);
    }
  }, [theme]);
}
