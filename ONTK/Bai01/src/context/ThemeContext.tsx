import React, { createContext, useContext, useState, ReactNode } from "react";

const LIGHT = { bg: "#F5F6F8", text: "#1A1D21" };
const DARK = { bg: "#14171A", text: "#F2F4F6" };

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const value = {
    isDarkMode,
    toggleTheme: () => setIsDarkMode((prev) => !prev),
    colors: isDarkMode ? DARK : LIGHT,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("Cần bọc Provider");
  return ctx;
}
