"use client";

import React from "react";
import { AffordabilityResult } from "@/lib/affordability";
import { formatCurrency } from "@/lib/format";
import { CheckCircle2, TrendingUp, Wallet } from "lucide-react";

interface AffordabilityResultProps {
  result: AffordabilityResult;
}

export function AffordabilityResultCard({ result }: AffordabilityResultProps) {
  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
        <p className="text-sm text-foreground/50 mb-1">You can comfortably afford</p>
        <p className="text-4xl font-bold font-mono text-primary mb-2">
          {formatCurrency(result.maxLoanAmount)}
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
          <div className="flex items-center gap-1">
            <Wallet className="w-3 h-3" />
            <span>EMI: {formatCurrency(result.resultingEMI)}/mo</span>
          </div>
          {result.dtiStatus !== "high" && (
            <div className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>DTI: {result.dtiRatio.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* DTI Status Card */}
      <div className="bg-card rounded-2xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Debt-to-Income Analysis
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground/50">Available for EMI</span>
              <span className="font-mono font-medium">{formatCurrency(result.maxEMI)}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${Math.min(100, (result.resultingEMI / result.maxEMI) * 100)}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground/50">Recommended Max EMI</span>
              <span className="font-mono font-medium">{formatCurrency(result.maxEMI)}</span>
            </div>
            <p className="text-xs text-foreground/30">
              Based on 50% DTI ratio (industry standard)
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      {result.dtiStatus === "high" && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-sm font-medium text-red-400 mb-2">💡 Tips to improve affordability:</p>
          <ul className="text-xs text-red-400/80 space-y-1">
            <li>• Increase your down payment</li>
            <li>• Consider a longer tenure</li>
            <li>• Pay off existing EMIs first</li>
            <li>• Wait for income to increase</li>
          </ul>
        </div>
      )}

      {result.dtiStatus === "healthy" && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-sm font-medium text-emerald-400 mb-2">
            🎉 Great! You&apos;re in a strong position
          </p>
          <p className="text-xs text-emerald-400/80">
            Your DTI is well within healthy limits. You could even consider a slightly higher loan
            if needed.
          </p>
        </div>
      )}
    </div>
  );
}
