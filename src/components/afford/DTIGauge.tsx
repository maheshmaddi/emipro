"use client";

import React from "react";

interface DTIGaugeProps {
  dti: number;
}

export function DTIGauge({ dti }: DTIGaugeProps) {
  const getDTIStatus = (value: number) => {
    if (value < 40) return { status: "healthy", color: "bg-emerald-500", text: "Excellent" };
    if (value < 50) return { status: "caution", color: "bg-yellow-500", text: "Good" };
    return { status: "high", color: "bg-red-500", text: "High Risk" };
  };

  const { status, color, text } = getDTIStatus(dti);
  const percentage = Math.min(100, Math.max(0, dti));

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground/50">DTI Ratio</span>
        <span className={`text-sm font-medium ${status === "high" ? "text-red-400" : status === "caution" ? "text-yellow-400" : "text-emerald-400"}`}>
          {text}
        </span>
      </div>

      <div className="h-4 rounded-full bg-secondary/50 overflow-hidden relative">
        {/* Color zones */}
        <div className="absolute inset-0 flex">
          <div className="w-[40%] bg-emerald-500/30" />
          <div className="w-[10%] bg-yellow-500/30" />
          <div className="flex-1 bg-red-500/30" />
        </div>

        {/* Progress bar */}
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-foreground/30">
        <span>0%</span>
        <span>Target: 50%</span>
        <span>100%</span>
      </div>

      <div className="text-center mt-4">
        <span className="text-3xl font-bold font-mono">{dti.toFixed(1)}%</span>
        <p className="text-xs text-foreground/40 mt-1">
          {dti < 40
            ? "✅ You're in excellent shape"
            : dti < 50
            ? "⚠️ Approaching limit, be careful"
            : "❌ High DTI - consider reducing loan amount"}
        </p>
      </div>
    </div>
  );
}
