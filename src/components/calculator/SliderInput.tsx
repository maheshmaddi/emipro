"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { formatCurrency, formatCurrencyCompact, formatNumber } from "@/lib/format";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  chips: number[];
  prefix?: string;
  suffix?: string;
  formatAsCurrency?: boolean;
  compact?: boolean;
  chipFormatter?: (v: number) => string;
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  chips,
  suffix = "",
  formatAsCurrency = true,
  compact = false,
  chipFormatter,
}: SliderInputProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [invalid, setInvalid] = useState(false);

  const fmt = (v: number) => {
    if (formatAsCurrency) return compact ? formatCurrencyCompact(v) : formatCurrency(v);
    return formatNumber(v);
  };

  const commitEdit = () => {
    const n = parseFloat(draft);
    if (!isNaN(n) && n >= min && n <= max) {
      onChange(n);
    } else if (!isNaN(n)) {
      setInvalid(true);
      setTimeout(() => setInvalid(false), 600);
    }
    setEditing(false);
  };

  return (
    <div>
      {/* Label + Value */}
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] font-medium text-foreground/50">{label}</span>
        {editing ? (
          <input
            type="number"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") setEditing(false);
            }}
            autoFocus
            aria-label={label}
            className={`w-28 bg-transparent border-b text-right font-mono text-lg font-semibold outline-none transition-colors ${
              invalid ? "border-red-500 animate-[shake_0.3s_ease]" : "border-primary"
            }`}
          />
        ) : (
          <button
            onClick={() => { setDraft(value.toString()); setEditing(true); }}
            aria-label={`Edit ${label}: currently ${fmt(value)}${suffix}`}
            className="font-mono text-lg font-semibold text-foreground hover:text-primary transition-colors"
          >
            {fmt(value)}{suffix}
          </button>
        )}
      </div>

      {/* Slider */}
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        aria-label={label}
        aria-valuetext={`${fmt(value)}${suffix}`}
      />

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5 mt-2.5" role="group" aria-label={`${label} presets`}>
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            aria-pressed={value === c}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              value === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-foreground/40 hover:text-foreground/70 hover:bg-secondary"
            }`}
          >
            {chipFormatter ? chipFormatter(c) : `${fmt(c)}${suffix}`}
          </button>
        ))}
      </div>
    </div>
  );
}
