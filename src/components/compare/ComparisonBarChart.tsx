"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ComparisonResult } from "@/lib/comparison";
import { formatCurrency } from "@/lib/format";
import { useChartTheme } from "@/lib/chart-theme";

interface ComparisonBarChartProps {
  result: ComparisonResult;
}

export function ComparisonBarChart({ result }: ComparisonBarChartProps) {
  const colors = ["#6C5CE7", "#00B894", "#FDCB6E"];
  const chartTheme = useChartTheme();

  const data = [
    {
      name: "EMI",
      ...result.loans.reduce((acc, loan, i) => {
        acc[loan.id] = loan.emi;
        return acc;
      }, {} as Record<string, number>),
    },
    {
      name: "Total Interest",
      ...result.loans.reduce((acc, loan, i) => {
        acc[loan.id] = loan.interest;
        return acc;
      }, {} as Record<string, number>),
    },
    {
      name: "Total Payment",
      ...result.loans.reduce((acc, loan, i) => {
        acc[loan.id] = loan.totalAmount;
        return acc;
      }, {} as Record<string, number>),
    },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} className="text-xs" />
          <YAxis type="category" dataKey="name" width={100} className="text-xs" />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: chartTheme.tooltipBackground,
              border: `1px solid ${chartTheme.tooltipBorder}`,
              borderRadius: "8px",
            }}
          />
          {result.loans.map((loan, i) => (
            <Bar key={loan.id} dataKey={loan.id} fill={colors[i]} radius={[0, 4, 4, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
