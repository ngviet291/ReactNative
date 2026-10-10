import React, { createContext, ReactNode, useContext, useState } from "react";
const LIGHT = { bg: "#HF5F6F8", text: "black" };
const DARK = { bg: "black", text: "white" };
const ThemeContext = createContext<any>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const value = {
    isDark,
    toggleTheme: () => setIsDark((prev) => !prev),
    colors: isDark ? DARK : LIGHT,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("Bọc Provider");
  return ctx;
}
export default ThemeContext;
