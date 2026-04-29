"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePrepaymentStore } from "@/store/prepayment-store";
import { calculateWithPrepayment } from "@/lib/prepayment";
import { PrepaymentForm } from "@/components/prepayment/PrepaymentForm";
import { SavingsResult } from "@/components/prepayment/SavingsResult";
import { BeforeAfterChart } from "@/components/prepayment/BeforeAfterChart";

export default function PrepaymentPage() {
  const {
    baseLoan,
    oneTimePrepayments,
    monthlyExtra,
    reduceTenure,
    setBaseLoanAmount,
    setBaseLoanRate,
    setBaseLoanTenure,
    addOneTimePrepayment,
    removeOneTimePrepayment,
    setMonthlyExtra,
    setReduceTenure,
  } = usePrepaymentStore();

  const result = calculateWithPrepayment(
    baseLoan,
    oneTimePrepayments,
    monthlyExtra,
    reduceTenure
  );

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center hover:bg-card/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">⚡ Prepayment Simulator</h1>
          <p className="text-sm text-foreground/50">See how prepayments can save you money</p>
        </div>
      </div>

      {/* Toggle: Reduce Tenure vs Reduce EMI */}
      <div className="bg-card rounded-2xl p-4 border border-white/5 mb-6">
        <label className="text-sm text-foreground/50 block mb-2">Choose your benefit:</label>
        <div className="flex gap-2">
          <button
            onClick={() => setReduceTenure(true)}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              reduceTenure
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/30 text-foreground/50 hover:bg-secondary/50"
            }`}
          >
            Reduce Tenure
          </button>
          <button
            onClick={() => setReduceTenure(false)}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              !reduceTenure
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/30 text-foreground/50 hover:bg-secondary/50"
            }`}
          >
            Reduce EMI
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-6">
        {/* Left: Form */}
        <div>
          <PrepaymentForm
            amount={baseLoan.amount}
            rate={baseLoan.rate}
            tenure={baseLoan.tenure}
            oneTimePrepayments={oneTimePrepayments}
            monthlyExtra={monthlyExtra}
            onAmountChange={setBaseLoanAmount}
            onRateChange={setBaseLoanRate}
            onTenureChange={setBaseLoanTenure}
            onAddPrepayment={addOneTimePrepayment}
            onRemovePrepayment={removeOneTimePrepayment}
            onMonthlyExtraChange={setMonthlyExtra}
          />
        </div>

        {/* Right: Results */}
        <div>
          <SavingsResult result={result} originalTenure={baseLoan.tenure} />
        </div>
      </div>

      {/* Chart - always shown, displays placeholder when no prepayments added */}
      <div className="mt-6 bg-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Balance Over Time
        </h3>
        <BeforeAfterChart result={result} originalTenure={baseLoan.tenure} rate={baseLoan.rate} />
      </div>
    </div>
  );
}
