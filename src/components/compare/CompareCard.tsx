"use client";

import React from "react";
import { X } from "lucide-react";
import { SliderInput } from "@/components/calculator/SliderInput";
import { formatCurrencyCompact } from "@/lib/format";
import { LoanOption } from "@/lib/comparison";

interface CompareCardProps {
  loan: LoanOption;
  isWinner: boolean;
  onUpdate: (updates: Partial<Omit<LoanOption, "id">>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function CompareCard({ loan, isWinner, onUpdate, onRemove, canRemove }: CompareCardProps) {
  return (
    <div
      className={`relative bg-card rounded-2xl p-5 border transition-all ${
        isWinner
          ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10"
          : "border-white/5"
      }`}
    >
      {/* Winner Badge */}
      {isWinner && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          🏆 Best Value
        </div>
      )}

      {/* Header with name and remove button */}
      <div className="flex items-center justify-between mt-2 mb-4">
        <input
          type="text"
          value={loan.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="bg-transparent font-semibold text-lg outline-none border-b border-transparent focus:border-primary/50 transition-colors"
        />
        {canRemove && (
          <button
            onClick={onRemove}
            aria-label="Remove this loan"
            className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        <SliderInput
          label="Loan Amount"
          value={loan.amount}
          onChange={(v) => onUpdate({ amount: v })}
          min={100000}
          max={10000000}
          step={100000}
          chips={[500000, 1000000, 2500000, 5000000, 7500000, 10000000]}
          compact
        />

        <SliderInput
          label="Interest Rate"
          value={loan.rate}
          onChange={(v) => onUpdate({ rate: v })}
          min={5}
          max={18}
          step={0.1}
          chips={[6, 7, 8, 9, 10, 12]}
          suffix="%"
          formatAsCurrency={false}
          compact
        />

        <SliderInput
          label="Tenure"
          value={loan.tenure}
          onChange={(v) => onUpdate({ tenure: v })}
          min={1}
          max={30}
          step={1}
          chips={[5, 10, 15, 20, 25, 30]}
          suffix=" yr"
          formatAsCurrency={false}
          compact
        />
      </div>
    </div>
  );
}
