import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";

export function ThemeSwitcher() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Theme: ${theme}. Switch to ${next}.`}
      onClick={() => setTheme(next)}
      className="rounded-full"
    >
      <Icon className="h-[18px] w-[18px]" />
    </Button>
  );
}
