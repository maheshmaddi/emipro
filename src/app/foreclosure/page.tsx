"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useForeclosureStore } from "@/store/foreclosure-store";
import { calculateForeclosure } from "@/lib/foreclosure";
import { SliderInput } from "@/components/calculator/SliderInput";
import { formatCurrency, formatNumber } from "@/lib/format";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";

export default function ForeclosurePage() {
  const {
    amount,
    rate,
    tenure,
    foreclosureAtMonth,
    prepaymentPenaltyPercent,
    setAmount,
    setRate,
    setTenure,
    setForeclosureAtMonth,
    setPrepaymentPenalty,
  } = useForeclosureStore();

  const result = calculateForeclosure({
    amount,
    rate,
    tenure,
    foreclosureAtMonth,
    prepaymentPenaltyPercent,
  });

  // Prepare chart data - show balance over time with foreclosure point marked
  const chartData = result.balanceHistory.map((balance, index) => ({
    month: index,
    balance: Math.round(balance),
  }));

  // Only show up to foreclosure month + a bit of context
  const displayData = chartData.slice(0, Math.min(foreclosureAtMonth + 12, chartData.length));

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
          <h1 className="text-2xl font-bold">🏦 Foreclosure Calculator</h1>
          <p className="text-sm text-foreground/50">See the impact of closing your loan early</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-6">
        {/* Left: Input Form */}
        <div className="bg-card rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-semibold mb-4">Loan Details</h2>
          <div className="space-y-5">
            <SliderInput
              label="Loan Amount"
              value={amount}
              onChange={setAmount}
              min={100000}
              max={10000000}
              step={100000}
              chips={[1000000, 3000000, 5000000, 7500000, 10000000]}
            />
            <SliderInput
              label="Interest Rate"
              value={rate}
              onChange={setRate}
              min={5}
              max={15}
              step={0.1}
              chips={[6, 7, 8, 9, 10, 12]}
              suffix="%"
              formatAsCurrency={false}
            />
            <SliderInput
              label="Loan Tenure"
              value={tenure}
              onChange={setTenure}
              min={1}
              max={30}
              step={1}
              chips={[5, 10, 15, 20, 25, 30]}
              suffix=" years"
              formatAsCurrency={false}
            />
            <SliderInput
              label="Foreclosure At Month"
              value={foreclosureAtMonth}
              onChange={setForeclosureAtMonth}
              min={1}
              max={tenure * 12}
              step={1}
              chips={[12, 36, 60, 84, 120]}
              suffix=" mo"
              formatAsCurrency={false}
            />
            <SliderInput
              label="Prepayment Penalty"
              value={prepaymentPenaltyPercent}
              onChange={setPrepaymentPenalty}
              min={0}
              max={5}
              step={0.25}
              chips={[0, 1, 2, 3, 4]}
              suffix="%"
              formatAsCurrency={false}
            />
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-4">
          {/* Net Savings */}
          <div className={`rounded-2xl p-6 border ${
            result.isWorthIt
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-red-500/10 border-red-500/20"
          }`}>
            <p className="text-sm text-foreground/50 mb-1">Net Savings</p>
            <p className={`text-3xl font-bold font-mono ${
              result.isWorthIt ? "text-emerald-400" : "text-red-400"
            }`}>
              {result.netSavings >= 0 ? "+" : ""}
              {formatCurrency(result.netSavings)}
            </p>
            {!result.isWorthIt && (
              <p className="text-xs text-foreground/40 mt-2">
                Penalty exceeds interest saved
              </p>
            )}
          </div>

          {/* Outstanding Balance */}
          <div className="bg-card rounded-2xl p-5 border border-white/5">
            <p className="text-sm text-foreground/50 mb-1">Outstanding Balance</p>
            <p className="text-xl font-semibold font-mono">
              {formatCurrency(result.outstandingBalance)}
            </p>
            <p className="text-xs text-foreground/40 mt-1">
              At month {foreclosureAtMonth}
            </p>
          </div>

          {/* Interest Saved */}
          <div className="bg-card rounded-2xl p-5 border border-white/5">
            <p className="text-sm text-foreground/50 mb-1">Interest Saved</p>
            <p className="text-xl font-semibold font-mono text-emerald-400">
              {formatCurrency(result.interestSaved)}
            </p>
            <p className="text-xs text-foreground/40 mt-1">
              By foreclosing at month {foreclosureAtMonth}
            </p>
          </div>

          {/* Prepayment Penalty */}
          {result.prepaymentPenalty > 0 && (
            <div className="bg-card rounded-2xl p-5 border border-white/5">
              <p className="text-sm text-foreground/50 mb-1">Prepayment Penalty</p>
              <p className="text-xl font-semibold font-mono text-red-400">
                {formatCurrency(result.prepaymentPenalty)}
              </p>
              <p className="text-xs text-foreground/40 mt-1">
                {prepaymentPenaltyPercent}% of outstanding balance
              </p>
            </div>
          )}

          {/* Total Paid So Far */}
          <div className="bg-card rounded-2xl p-5 border border-white/5">
            <p className="text-sm text-foreground/50 mb-1">Total Paid So Far</p>
            <p className="text-xl font-semibold font-mono">
              {formatCurrency(result.totalPaidSoFar)}
            </p>
            <div className="text-xs text-foreground/40 mt-2 space-y-1">
              <div className="flex justify-between">
                <span>Principal</span>
                <span className="font-mono">{formatCurrency(result.principalPaidSoFar)}</span>
              </div>
              <div className="flex justify-between">
                <span>Interest</span>
                <span className="font-mono">{formatCurrency(result.interestPaidSoFar)}</span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-card rounded-2xl p-5 border border-white/5 space-y-2 text-sm">
            <h3 className="font-semibold text-foreground/50 uppercase tracking-wider text-xs">
              Breakdown
            </h3>
            <div className="flex justify-between">
              <span className="text-foreground/50">Original Total Interest</span>
              <span className="font-mono">{formatCurrency(result.originalLoan.interest)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/50">Interest Paid So Far</span>
              <span className="font-mono">{formatCurrency(result.interestPaidSoFar)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/50">Remaining Interest</span>
              <span className="font-mono">{formatCurrency(
                result.originalLoan.interest - result.interestPaidSoFar
              )}</span>
            </div>
            <div className="h-px bg-border/50 my-2" />
            <div className="flex justify-between">
              <span className="text-foreground/50">You Save</span>
              <span className="font-mono text-emerald-400">{formatCurrency(result.interestSaved)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/50">Less Penalty</span>
              <span className="font-mono text-red-400">-{formatCurrency(result.prepaymentPenalty)}</span>
            </div>
            <div className="h-px bg-border/50 my-2" />
            <div className="flex justify-between font-semibold">
              <span className="text-foreground/70">Net</span>
              <span className={`font-mono ${
                result.netSavings >= 0 ? "text-emerald-400" : "text-red-400"
              }`}>
                {result.netSavings >= 0 ? "+" : ""}{formatCurrency(result.netSavings)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Chart */}
      <div className="mt-6 bg-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Loan Balance Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis
              dataKey="month"
              stroke="#a0a0b8"
              tick={{ fill: "#a0a0b8" }}
              label={{ value: "Month", position: "insideBottom", offset: -5, fill: "#a0a0b8" }}
            />
            <YAxis
              stroke="#a0a0b8"
              tick={{ fill: "#a0a0b8" }}
              tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#16213e",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
              }}
              labelStyle={{ color: "#a0a0b8" }}
              formatter={(value: number) => [formatCurrency(value), "Balance"]}
            />
            <ReferenceLine
              x={foreclosureAtMonth}
              stroke="#E17055"
              strokeDasharray="5 5"
              label={{ value: "Foreclosure", fill: "#E17055", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6C5CE7"
              fill="#6C5CE7"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-foreground/40 mt-3 text-center">
          Foreclosure at month {foreclosureAtMonth} marked with red line
        </p>
      </div>
    </div>
  );
}
