import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Theme options
 * @type {("dark" | "light" | "system")}
 */
const themes = {
  dark: "dark",
  light: "light",
};

/**
 * Theme context with default values
 */
const ThemeProviderContext = createContext({
  theme: themes.light,
  setTheme: () => null,
});

/**
 * Theme provider component
 */
export function ThemeProvider({
  children,
  defaultTheme = themes.system,
  storageKey = "vite-ui-theme",
  ...props
}) {
  // Initialize theme from localStorage or default
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  // Update document classes when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(themes.light, themes.dark);

    if (theme === themes.system) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? themes.dark
        : themes.light;
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Context value with setter that updates localStorage
  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Custom hook to use theme context
 */
export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
