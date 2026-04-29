"use client";

import { useTheme } from "next-themes";

export function useChartTheme() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return {
    tooltipBackground: isDark ? "#16213e" : "#ffffff",
    tooltipBorder: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)",
    axisColor: isDark ? "#a0a0b8" : "#64748b",
    gridColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
    labelColor: isDark ? "#a0a0b8" : "#64748b",
  };
}
