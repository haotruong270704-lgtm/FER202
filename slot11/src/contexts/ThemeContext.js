import React, { createContext, useState, useContext } from "react";

// 1. Khởi tạo context với giá trị mặc định [cite: 27-30]
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
});

// 2. Tạo provider để bao bọc ứng dụng [cite: 31-50]
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const contextValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Custom hook để sử dụng context [cite: 51-58]
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};