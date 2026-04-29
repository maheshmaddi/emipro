"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRateChangeStore } from "@/store/rate-change-store";
import { calculateRateChangeImpact, getDefaultScenarios } from "@/lib/rate-change";
import { SliderInput } from "@/components/calculator/SliderInput";
import { formatCurrency } from "@/lib/format";
import { useChartTheme } from "@/lib/chart-theme";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

export default function RateChangePage() {
  const {
    amount,
    currentRate,
    tenure,
    monthsCompleted,
    keepEmiSame,
    setAmount,
    setCurrentRate,
    setTenure,
    setMonthsCompleted,
    setKeepEmiSame,
  } = useRateChangeStore();

  const chartTheme = useChartTheme();

  const scenarios = getDefaultScenarios().map((s) => ({
    ...s,
    newRate: currentRate + s.rateChange,
  }));

  const impacts = calculateRateChangeImpact(
    { amount, currentRate, tenure, monthsCompleted },
    scenarios
  );

  const chartData = impacts.map((impact) => {
    const value = keepEmiSame
      ? impact.keepEmiSame.newTotalInterest
      : impact.keepTenureSame.newTotalInterest;

    return {
      scenario: impact.scenario.rateChange > 0
        ? `+${impact.scenario.rateChange}%`
        : `${impact.scenario.rateChange}%`,
      rateChange: impact.scenario.rateChange,
      newRate: impact.scenario.newRate,
      totalInterest: Math.round(value),
      barColor: impact.scenario.rateChange > 0 ? "#E17055" : "#00B894",
    };
  });

  // Chips filtered to not exceed max months
  const monthChips = [12, 36, 60, 84, 120].filter((c) => c <= tenure * 12);

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
          <h1 className="text-2xl font-bold">📈 Rate Change Impact</h1>
          <p className="text-sm text-foreground/50">See how interest rate changes affect your loan</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-6">
        {/* Left: Input Form */}
        <div className="bg-card rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-semibold mb-4">Current Loan Details</h2>
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
              label="Current Interest Rate"
              value={currentRate}
              onChange={setCurrentRate}
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
              label="Months Completed"
              value={monthsCompleted}
              onChange={setMonthsCompleted}
              min={0}
              max={tenure * 12}
              step={1}
              chips={monthChips}
              suffix=" mo"
              formatAsCurrency={false}
            />
          </div>

          {/* Toggle */}
          <div className="mt-6 bg-secondary/30 rounded-xl p-4">
            <label className="text-sm text-foreground/50 block mb-2">
              When rate changes, what stays the same?
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setKeepEmiSame(false)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  !keepEmiSame
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/50 hover:bg-card/80"
                }`}
              >
                Keep Tenure Same
              </button>
              <button
                onClick={() => setKeepEmiSame(true)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  keepEmiSame
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/50 hover:bg-card/80"
                }`}
              >
                Keep EMI Same
              </button>
            </div>
          </div>
        </div>

        {/* Right: Current Status */}
        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-5 border border-white/5">
            <p className="text-sm text-foreground/50 mb-1">Current Interest Rate</p>
            <p className="text-3xl font-bold font-mono">{currentRate}%</p>
            <p className="text-xs text-foreground/40 mt-2">
              on {formatCurrency(amount)} for {tenure} years
            </p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-white/5">
            <p className="text-sm text-foreground/50 mb-1">Time Elapsed</p>
            <p className="text-xl font-semibold font-mono">
              {monthsCompleted} months
            </p>
            <p className="text-xs text-foreground/40 mt-2">
              {((monthsCompleted / (tenure * 12)) * 100).toFixed(0)}% of loan completed
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-2xl p-5 border border-amber-500/20">
            <p className="text-xs text-foreground/50 uppercase tracking-wider mb-2">
              {keepEmiSame ? "If EMI stays the same" : "If tenure stays the same"}
            </p>
            <p className="text-sm text-foreground/70">
              {keepEmiSame
                ? "Your loan tenure will change with rate fluctuations. Higher rates mean longer repayment period."
                : "Your EMI amount will change with rate fluctuations. Higher rates mean larger monthly payments."}
            </p>
          </div>
        </div>
      </div>

      {/* Sensitivity Analysis Chart */}
      <div className="mt-6 bg-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Sensitivity Analysis: Total Interest by Rate Change
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
            <XAxis
              dataKey="scenario"
              stroke={chartTheme.axisColor}
              tick={{ fill: chartTheme.axisColor }}
            />
            <YAxis
              stroke={chartTheme.axisColor}
              tick={{ fill: chartTheme.axisColor }}
              tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartTheme.tooltipBackground,
                border: `1px solid ${chartTheme.tooltipBorder}`,
                borderRadius: "12px",
              }}
              labelStyle={{ color: chartTheme.axisColor }}
              formatter={(value: number, name: string) => {
                if (name === "totalInterest") {
                  return [formatCurrency(value), "Total Interest"];
                }
                return [value, name];
              }}
            />
            <ReferenceLine
              x="0%"
              stroke="#6C5CE7"
              strokeDasharray="4 4"
              label={{ value: "Current", fill: "#6C5CE7", fontSize: 11 }}
            />
            <Bar dataKey="totalInterest" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.barColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-foreground/40 mt-3 text-center">
          {keepEmiSame
            ? "Total interest if EMI stays the same (tenure changes)"
            : "Total interest if tenure stays the same (EMI changes)"}
        </p>
      </div>

      {/* Detailed Impact Table */}
      <div className="mt-6 bg-card rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Impact Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-2 text-foreground/50 font-medium">Rate Change</th>
                <th className="text-left py-3 px-2 text-foreground/50 font-medium">New Rate</th>
                {keepEmiSame ? (
                  <>
                    <th className="text-right py-3 px-2 text-foreground/50 font-medium">New Tenure</th>
                    <th className="text-right py-3 px-2 text-foreground/50 font-medium">Total Interest</th>
                    <th className="text-right py-3 px-2 text-foreground/50 font-medium">Tenure Change</th>
                  </>
                ) : (
                  <>
                    <th className="text-right py-3 px-2 text-foreground/50 font-medium">New EMI</th>
                    <th className="text-right py-3 px-2 text-foreground/50 font-medium">Total Interest</th>
                    <th className="text-right py-3 px-2 text-foreground/50 font-medium">EMI Change</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {impacts.map((impact, index) => (
                <tr key={index} className="border-b border-white/5 last:border-0">
                  <td className={`py-3 px-2 font-medium ${
                    impact.scenario.rateChange > 0 ? "text-red-400" : impact.scenario.rateChange < 0 ? "text-emerald-400" : "text-foreground/70"
                  }`}>
                    {impact.scenario.rateChange > 0 ? "+" : ""}
                    {impact.scenario.rateChange}%
                  </td>
                  <td className="py-3 px-2 font-mono">{impact.scenario.newRate.toFixed(2)}%</td>
                  {keepEmiSame ? (
                    <>
                      <td className="py-3 px-2 text-right font-mono">
                        {impact.keepEmiSame.newTenure.toFixed(1)} years
                      </td>
                      <td className="py-3 px-2 text-right font-mono">
                        {formatCurrency(impact.keepEmiSame.newTotalInterest)}
                      </td>
                      <td className={`py-3 px-2 text-right font-mono ${
                        impact.keepEmiSame.tenureChange.years >= 0 ? "text-red-400" : "text-emerald-400"
                      }`}>
                        {impact.keepEmiSame.tenureChange.years >= 0 ? "+" : ""}
                        {impact.keepEmiSame.tenureChange.years}y {impact.keepEmiSame.tenureChange.months}m
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-2 text-right font-mono">
                        {formatCurrency(impact.keepTenureSame.newEmi)}/mo
                      </td>
                      <td className="py-3 px-2 text-right font-mono">
                        {formatCurrency(impact.keepTenureSame.newTotalInterest)}
                      </td>
                      <td className={`py-3 px-2 text-right font-mono ${
                        impact.keepTenureSame.emiChange >= 0 ? "text-red-400" : "text-emerald-400"
                      }`}>
                        {impact.keepTenureSame.emiChange >= 0 ? "+" : ""}
                        {formatCurrency(impact.keepTenureSame.emiChange)}
                        <span className="text-xs text-foreground/40 ml-1">
                          ({impact.keepTenureSame.emiChangePercent.toFixed(1)}%)
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground/40 mt-3">
          {keepEmiSame
            ? "Positive tenure change = loan gets longer. Negative = loan gets shorter."
            : "Positive EMI change = monthly payment increases. Negative = decreases."}
        </p>
      </div>
    </div>
  );
}
