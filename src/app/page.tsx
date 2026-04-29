"use client";

import React from "react";
import { useCalculatorStore } from "@/store/calculator-store";
import { LoanTypeSelector } from "@/components/calculator/LoanTypeSelector";
import { EmiHero } from "@/components/calculator/EmiHero";
import { LoanConfig } from "@/components/calculator/LoanConfig";
import { LoanSummary } from "@/components/calculator/LoanSummary";
import { PrincipalInterestDonut } from "@/components/charts/PrincipalInterestDonut";
import { BalanceOverTimeChart } from "@/components/charts/BalanceOverTimeChart";
import { AmortizationTable } from "@/components/schedule/AmortizationTable";
import { FeatureLinks } from "@/components/layout/FeatureLinks";
import { calculateEMI } from "@/lib/emi";
import { formatCurrency } from "@/lib/format";

export default function Home() {
  const { loanConfig } = useCalculatorStore();
  const result = calculateEMI(loanConfig.amount, loanConfig.rate, loanConfig.tenure);

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Loan Type Selector */}
      <LoanTypeSelector />

      {/* ===== TOP SECTION: Sliders + EMI Result ===== */}
      <section className="mt-6 grid md:grid-cols-[1fr_280px] gap-6 items-start">
        {/* Left: Sliders */}
        <div className="space-y-7 bg-card rounded-2xl p-6 border border-white/5">
          <LoanConfig />
        </div>

        {/* Right: EMI Result Card */}
        <div className="bg-gradient-to-b from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20 text-center sticky top-24">
          <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/50 font-semibold">
            Monthly EMI
          </p>
          <div className="mt-2">
            <EmiHero emi={result.emi} />
            <span className="text-xs text-foreground/30 ml-1">/mo</span>
          </div>

          {/* Mini summary */}
          <div className="mt-4 space-y-2 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/50">Principal</span>
              <span className="font-mono font-medium">{formatCurrency(result.principal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/50">Interest</span>
              <span className="font-mono font-medium text-emerald-400">{formatCurrency(result.interest)}</span>
            </div>
            <div className="h-px bg-border/50 my-1" />
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-foreground/70">Total Payment</span>
              <span className="font-mono">{formatCurrency(result.totalAmount)}</span>
            </div>
          </div>

          {/* Interest ratio bar */}
          <div className="mt-4">
            <div className="h-2 rounded-full bg-secondary/50 overflow-hidden flex">
              <div
                className="bg-[#6C5CE7] rounded-l-full transition-all duration-300"
                style={{ width: `${(result.principal / result.totalAmount) * 100}%` }}
              />
              <div
                className="bg-[#00B894] rounded-r-full transition-all duration-300"
                style={{ width: `${(result.interest / result.totalAmount) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-foreground/40">
              <span>Principal {((result.principal / result.totalAmount) * 100).toFixed(0)}%</span>
              <span>Interest {((result.interest / result.totalAmount) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOAN SUMMARY CARDS ===== */}
      <section className="mt-6">
        <LoanSummary
          principal={result.principal}
          interest={result.interest}
          totalAmount={result.totalAmount}
        />
      </section>

      {/* ===== CHARTS ===== */}
      <section className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-5 border border-white/5">
          <h3 className="text-xs uppercase tracking-wider text-foreground/40 font-semibold mb-3">
            Payment Split
          </h3>
          <PrincipalInterestDonut principal={result.principal} interest={result.interest} />
        </div>
        <div className="bg-card rounded-2xl p-5 border border-white/5">
          <h3 className="text-xs uppercase tracking-wider text-foreground/40 font-semibold mb-3">
            Balance Over Time
          </h3>
          <BalanceOverTimeChart
            principal={loanConfig.amount}
            rate={loanConfig.rate}
            tenure={loanConfig.tenure}
          />
        </div>
      </section>

      {/* ===== AMORTIZATION ===== */}
      <section className="mt-8">
        <AmortizationTable
          principal={loanConfig.amount}
          rate={loanConfig.rate}
          tenure={loanConfig.tenure}
        />
      </section>

      {/* ===== FEATURE LINKS ===== */}
      <FeatureLinks />
    </div>
  );
}
