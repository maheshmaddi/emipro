"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PrepaymentResult } from "@/lib/prepayment";
import { formatCurrency } from "@/lib/format";

interface BeforeAfterChartProps {
  result: PrepaymentResult;
  originalTenure: number;
  rate: number;
}

export function BeforeAfterChart({ result, originalTenure, rate }: BeforeAfterChartProps) {
  const monthlyRate = rate / 12 / 100;
  const tenureMonths = Math.ceil(result.newTenure * 12) || 1;
  const emi = result.after.emi;

  // Generate before curve
  const beforeData: { month: number; before: number; after: number }[] = [];
  let beforeBalance = result.before.principal;

  for (let i = 1; i <= originalTenure * 12; i++) {
    const interest = beforeBalance * monthlyRate;
    const principal = emi - interest;
    beforeBalance -= principal;
    if (beforeBalance < 0) beforeBalance = 0;

    beforeData.push({ month: i, before: beforeBalance, after: 0 });
  }

  // Generate after curve
  const afterData = [...beforeData];
  let afterBalance = result.after.principal;

  for (let i = 1; i <= tenureMonths; i++) {
    const interest = afterBalance * monthlyRate;
    const principal = emi - interest;
    afterBalance -= principal;
    if (afterBalance < 0) afterBalance = 0;

    if (afterData[i - 1]) {
      afterData[i - 1].after = afterBalance;
    }
  }

  // Trim data to relevant period
  const displayData = afterData.slice(0, Math.max(tenureMonths, originalTenure * 12));

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
          <XAxis
            dataKey="month"
            className="text-xs"
            tickFormatter={(v) => `${Math.floor(v / 12)}y${v % 12 > 0 ? v % 12 + "m" : ""}`}
          />
          <YAxis className="text-xs" tickFormatter={(v) => formatCurrency(v)} />
          <Tooltip
            formatter={(value: number, name: string) => [formatCurrency(value), name === "before" ? "Without Prepayment" : "With Prepayment"]}
            labelFormatter={(label) => `Month ${label}`}
            contentStyle={{
              backgroundColor: "#1A1A2E",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
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
