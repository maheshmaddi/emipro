"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRefinanceStore } from "@/store/refinance-store";
import { calculateRefinance } from "@/lib/refinance";
import { SliderInput } from "@/components/calculator/SliderInput";
import { formatCurrency } from "@/lib/format";
import { useChartTheme } from "@/lib/chart-theme";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function RefinancePage() {
  const {
    currentLoan,
    newLoan,
    setCurrentLoanAmount,
    setCurrentLoanRate,
    setCurrentLoanTenure,
    setCurrentLoanMonthsCompleted,
    setNewLoanRate,
    setNewLoanTenure,
    setNewLoanProcessingFee,
  } = useRefinanceStore();

  const chartTheme = useChartTheme();
  const result = calculateRefinance({ currentLoan, newLoan });

  const chartData = result.cumulativeSavings.map((savings, index) => ({
    month: index + 1,
    savings: Math.round(savings),
  }));

  // Chips filtered to not exceed max months for current loan
  const monthChips = [12, 36, 60, 84, 120].filter(
    (c) => c <= currentLoan.tenure * 12
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
          <h1 className="text-2xl font-bold">🔄 Refinance Calculator</h1>
          <p className="text-sm text-foreground/50">Should you switch to a new loan?</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-6">
        {/* Left: Input Forms */}
        <div className="space-y-6">
          {/* Current Loan */}
          <div className="bg-card rounded-2xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold mb-4">Current Loan</h2>
            <div className="space-y-5">
              <SliderInput
                label="Original Amount"
                value={currentLoan.amount}
                onChange={setCurrentLoanAmount}
                min={100000}
                max={10000000}
                step={100000}
                chips={[1000000, 3000000, 5000000, 7500000, 10000000]}
              />
              <SliderInput
                label="Interest Rate"
                value={currentLoan.rate}
                onChange={setCurrentLoanRate}
                min={5}
                max={15}
                step={0.1}
                chips={[6, 7, 8, 9, 10, 12]}
                suffix="%"
                formatAsCurrency={false}
              />
              <SliderInput
                label="Original Tenure"
                value={currentLoan.tenure}
                onChange={setCurrentLoanTenure}
                min={1}
                max={30}
                step={1}
                chips={[5, 10, 15, 20, 25, 30]}
                suffix=" years"
                formatAsCurrency={false}
              />
              <SliderInput
                label="Months Completed"
                value={currentLoan.monthsCompleted}
                onChange={setCurrentLoanMonthsCompleted}
                min={0}
                max={currentLoan.tenure * 12}
                step={1}
                chips={monthChips}
                suffix=" mo"
                formatAsCurrency={false}
              />
            </div>
          </div>

          {/* New Loan */}
          <div className="bg-card rounded-2xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold mb-4">New Loan</h2>
            <div className="space-y-5">
              <SliderInput
                label="New Interest Rate"
                value={newLoan.rate}
                onChange={setNewLoanRate}
                min={5}
                max={15}
                step={0.1}
                chips={[6, 7, 8, 9, 10, 12]}
                suffix="%"
                formatAsCurrency={false}
              />
              <SliderInput
                label="New Tenure"
                value={newLoan.tenure}
                onChange={setNewLoanTenure}
                min={1}
                max={30}
                step={1}
                chips={[5, 10, 15, 20, 25, 30]}
                suffix=" years"
                formatAsCurrency={false}
              />
              <SliderInput
                label="Processing Fee"
                value={newLoan.processingFeePercent}
                onChange={setNewLoanProcessingFee}
                min={0}
                max={3}
                step={0.1}
                chips={[0, 0.5, 1, 1.5, 2]}
                suffix="%"
                formatAsCurrency={false}
              />
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-4">
          {/* Main Result Card */}
          <div className={`rounded-2xl p-6 border ${
            result.isWorthIt
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-red-500/10 border-red-500/20"
          }`}>
            <p className="text-sm text-foreground/50 mb-1">
              {result.isWorthIt ? "Switching saves" : "Switching costs"}
            </p>
            <p className={`text-3xl font-bold font-mono ${
              result.isWorthIt ? "text-emerald-400" : "text-red-400"
            }`}>
              {result.isWorthIt ? "+" : ""}
              {formatCurrency(Math.abs(result.savings.total))}
            </p>
            {!result.isWorthIt && (
              <p className="text-xs text-foreground/40 mt-2">Not worth switching</p>
            )}
          </div>

          {/* Break-even */}
          {result.savings.breakEvenMonth > 0 && (
            <div className="bg-card rounded-2xl p-5 border border-white/5">
              <p className="text-sm text-foreground/50 mb-1">Break-even</p>
              <p className="text-xl font-semibold">
                {result.savings.breakEvenMonth} months
              </p>
              <p className="text-xs text-foreground/40 mt-1">
                When cumulative savings cover processing fee
              </p>
            </div>
          )}

          {/* Current vs New */}
          <div className="bg-card rounded-2xl p-5 border border-white/5 space-y-3">
            <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">
              Current vs New Loan
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/50">Outstanding Balance</span>
                <span className="font-mono font-medium">
                  {formatCurrency(result.currentLoan.outstandingBalance)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50">Current EMI</span>
                <span className="font-mono font-medium">
                  {formatCurrency(result.currentLoan.emi)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50">New EMI</span>
                <span className="font-mono font-medium text-primary">
                  {formatCurrency(result.newLoan.emi)}
                </span>
              </div>
              <div className="h-px bg-border/50 my-2" />
              <div className="flex justify-between">
                <span className="text-foreground/50">Remaining Interest (Current)</span>
                <span className="font-mono font-medium">
                  {formatCurrency(result.currentLoan.remainingInterest)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50">Total Interest (New)</span>
                <span className="font-mono font-medium text-primary">
                  {formatCurrency(result.newLoan.totalInterest + result.newLoan.processingFee)}
                </span>
              </div>
            </div>
          </div>

          {/* EMI Difference */}
          {result.savings.monthlyEmiDifference !== 0 && (
            <div className="bg-card rounded-2xl p-5 border border-white/5">
              <p className="text-sm text-foreground/50 mb-1">Monthly EMI Change</p>
              <p className={`text-xl font-semibold font-mono ${
                result.savings.monthlyEmiDifference > 0 ? "text-emerald-400" : "text-red-400"
              }`}>
                {result.savings.monthlyEmiDifference > 0 ? "-" : "+"}
                {formatCurrency(Math.abs(result.savings.monthlyEmiDifference))}/mo
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cumulative Savings Chart */}
      <div className="mt-6 bg-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Cumulative Savings Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
            <XAxis
              dataKey="month"
              stroke={chartTheme.axisColor}
              tick={{ fill: chartTheme.axisColor }}
              label={{ value: "Month", position: "insideBottom", offset: -5, fill: chartTheme.axisColor }}
            />
            <YAxis
              stroke={chartTheme.axisColor}
              tick={{ fill: chartTheme.axisColor }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartTheme.tooltipBackground,
                border: `1px solid ${chartTheme.tooltipBorder}`,
                borderRadius: "12px",
              }}
              labelStyle={{ color: chartTheme.axisColor }}
              formatter={(value: number) => [formatCurrency(value), "Savings"]}
            />
            {result.savings.breakEvenMonth > 0 && (
              <ReferenceLine
                x={result.savings.breakEvenMonth}
                stroke="#FDCB6E"
                strokeDasharray="4 4"
                label={{ value: "Break-even", fill: "#FDCB6E", fontSize: 11 }}
              />
            )}
            <Area
              type="monotone"
              dataKey="savings"
              stroke={result.isWorthIt ? "#00B894" : "#E17055"}
              fill={result.isWorthIt ? "#00B894" : "#E17055"}
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-foreground/40 mt-3 text-center">
          Positive values show cumulative savings from switching
        </p>
      </div>
    </div>
  );
}
