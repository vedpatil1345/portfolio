import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="h-10 w-10 bg-transparent rounded-full border-none hover:bg-transparent focus:outline-none text-black"
    >
      <Sun 
        className="absolute min-h-[1.8rem] min-w-[1.8rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 stroke-indigo-500"  
        absoluteStrokeWidth 
        strokeWidth={2.5} 
      />
      <Moon 
        className="absolute min-h-[1.8rem] min-w-[1.8rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 stroke-indigo-400" 
        strokeWidth={2} 
        absoluteStrokeWidth 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}