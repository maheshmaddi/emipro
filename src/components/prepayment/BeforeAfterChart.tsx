"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { PrepaymentResult } from "@/lib/prepayment";
import { formatCurrency } from "@/lib/format";
import { useChartTheme } from "@/lib/chart-theme";

interface BeforeAfterChartProps {
  result: PrepaymentResult;
  originalTenure: number;
  rate: number;
}

export function BeforeAfterChart({ result, originalTenure, rate }: BeforeAfterChartProps) {
  const chartTheme = useChartTheme();
  const monthlyRate = rate / 12 / 100;
  const tenureMonths = Math.ceil(result.newTenure * 12) || 1;
  const beforeEmi = result.before.emi;
  const afterEmi = result.after.emi;

  // Generate before curve using before EMI (without prepayment)
  const beforeData: { month: number; before: number; after: number }[] = [];
  let beforeBalance = result.before.principal;

  for (let i = 1; i <= originalTenure * 12; i++) {
    const interest = beforeBalance * monthlyRate;
    const principal = beforeEmi - interest;
    beforeBalance -= principal;
    if (beforeBalance < 0) beforeBalance = 0;

    beforeData.push({ month: i, before: beforeBalance, after: 0 });
  }

  // Generate after curve using after EMI (with prepayment)
  const afterData = [...beforeData];
  let afterBalance = result.after.principal;

  for (let i = 1; i <= tenureMonths; i++) {
    const interest = afterBalance * monthlyRate;
    const principal = afterEmi - interest;
    afterBalance -= principal;
    if (afterBalance < 0) afterBalance = 0;

    if (afterData[i - 1]) {
      afterData[i - 1].after = afterBalance;
    }
  }

  const displayData = afterData.slice(0, Math.max(tenureMonths, originalTenure * 12));

  if (result.interestSaved === 0 && result.tenureSaved.years === 0 && result.tenureSaved.months === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-foreground/40">
        Add a prepayment above to see the balance impact
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={displayData}>
          <defs>
            <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00B894" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00B894" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
          <XAxis
            dataKey="month"
            stroke={chartTheme.axisColor}
            tick={{ fill: chartTheme.axisColor, fontSize: 11 }}
            tickFormatter={(v) => `${Math.floor(v / 12)}y${v % 12 > 0 ? v % 12 + "m" : ""}`}
          />
          <YAxis
            stroke={chartTheme.axisColor}
            tick={{ fill: chartTheme.axisColor, fontSize: 11 }}
            tickFormatter={(v) => formatCurrency(v)}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatCurrency(value),
              name === "before" ? "Without Prepayment" : "With Prepayment",
            ]}
            labelFormatter={(label) => `Month ${label}`}
            contentStyle={{
              backgroundColor: chartTheme.tooltipBackground,
              border: `1px solid ${chartTheme.tooltipBorder}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: chartTheme.axisColor }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="before"
            stroke="#6C5CE7"
            fillOpacity={1}
            fill="url(#colorBefore)"
            name="Without Prepayment"
          />
          <Area
            type="monotone"
            dataKey="after"
            stroke="#00B894"
            fillOpacity={1}
            fill="url(#colorAfter)"
            name="With Prepayment"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
