import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("system");

  // Initialize the current theme
  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  // Function to cycle through themes: system -> light -> dark -> system
  const cycleTheme = () => {
    const themeOrder = ["light", "dark"];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const nextTheme = themeOrder[nextIndex];

    setTheme(nextTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleTheme}
      className="h-10 w-10 bg-transparent rounded-full border-none hover:bg-transparent focus:outline-none text-black"
    >
      <Sun
        className="absolute min-h-[1.5rem] min-w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 stroke-orange-500"
        absoluteStrokeWidth
        strokeWidth={2.5}
      />
      <Moon
        className="absolute min-h-[1.5rem] min-w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 stroke-blue-400"
        strokeWidth={2}
        absoluteStrokeWidth
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
