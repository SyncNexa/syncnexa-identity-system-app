"use client";
import React, { useEffect, useState, useCallback } from "react";

type ThemeName = "light" | "dark";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    try {
      const saved =
        typeof window !== "undefined" ? localStorage.getItem("theme") : null;
      return (saved as ThemeName) || "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );

  return (
    <div data-theme-provider>
      {children}
      {/* Expose a minimal toggle button for manual testing */}
      <button
        aria-label="Toggle theme"
        onClick={toggleTheme}
        style={{
          position: "fixed",
          right: 12,
          bottom: 12,
          padding: 8,
          borderRadius: 8,
          border: "0.15rem solid var(--color-border)",
        }}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
