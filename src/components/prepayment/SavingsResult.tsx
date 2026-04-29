"use client";

import React from "react";
import { PrepaymentResult } from "@/lib/prepayment";
import { formatCurrency } from "@/lib/format";
import { TrendingDown, Clock, IndianRupee } from "lucide-react";

interface SavingsResultProps {
  result: PrepaymentResult;
  originalTenure: number;
}

export function SavingsResult({ result, originalTenure }: SavingsResultProps) {
  const hasSavings = result.interestSaved > 0 || result.tenureSaved.years > 0 || result.tenureSaved.months > 0;

  const formatTenure = (years: number, months: number) => {
    if (years === 0 && months === 0) return "0 months";
    if (years === 0) return `${months}mo`;
    if (months === 0) return `${years}yr`;
    return `${years}yr ${months}mo`;
  };

  return (
    <div className="space-y-6">
      {/* Before vs After Comparison */}
      <div className="bg-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Before vs After
        </h3>

        <div className="space-y-4">
          {/* Tenure */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-foreground/30" />
              <span className="text-sm text-foreground/50">Tenure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-foreground/40">
                {formatTenure(originalTenure, 0)}
              </span>
              <span className="text-foreground/20">→</span>
              <span className="font-mono font-semibold">
                {formatTenure(Math.floor(result.newTenure), Math.round((result.newTenure % 1) * 12))}
              </span>
              {(result.tenureSaved.years > 0 || result.tenureSaved.months > 0) && (
                <span className="text-xs text-emerald-400 ml-1">
                  (save {formatTenure(result.tenureSaved.years, result.tenureSaved.months)})
                </span>
              )}
            </div>
          </div>

          {/* EMI */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-foreground/30" />
              <span className="text-sm text-foreground/50">EMI</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-foreground/40">
                {formatCurrency(result.before.emi)}
              </span>
              <span className="text-foreground/20">→</span>
              <span className="font-mono font-semibold">
                {formatCurrency(result.after.emi)}
              </span>
            </div>
          </div>

          {/* Interest */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-foreground/30" />
              <span className="text-sm text-foreground/50">Total Interest</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-foreground/40">
                {formatCurrency(result.before.interest)}
              </span>
              <span className="text-foreground/20">→</span>
              <span className="font-mono font-semibold">
                {formatCurrency(result.after.interest)}
              </span>
            </div>
          </div>

          {/* Total Payment */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-sm font-semibold text-foreground/70">Total Payment</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-foreground/40">
                {formatCurrency(result.before.totalAmount)}
              </span>
              <span className="text-foreground/20">→</span>
              <span className="font-mono font-semibold text-lg">
                {formatCurrency(result.after.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Highlight */}
      {hasSavings && (
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 text-center">
          <p className="text-sm text-emerald-400 font-medium mb-1">🎉 You save</p>
          <p className="text-4xl font-bold text-emerald-400 mb-2">
            {formatCurrency(result.interestSaved)}
          </p>
          <p className="text-xs text-emerald-400/60">in interest payments</p>
          {(result.tenureSaved.years > 0 || result.tenureSaved.months > 0) && (
            <p className="text-xs text-emerald-400/60 mt-1">
              + {formatTenure(result.tenureSaved.years, result.tenureSaved.months)} tenure saved
            </p>
          )}
        </div>
      )}

      {/* No Savings */}
      {!hasSavings && (
        <div className="bg-card/50 border border-white/5 rounded-2xl p-6 text-center">
          <p className="text-sm text-foreground/40">
            Add prepayments to see how much you can save 💡
          </p>
        </div>
      )}
    </div>
  );
}
