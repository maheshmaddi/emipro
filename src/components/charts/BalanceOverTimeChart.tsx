"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { generateChartData } from "@/lib/amortization";

interface BalanceOverTimeChartProps {
  principal: number;
  rate: number;
  tenure: number;
}

export function BalanceOverTimeChart({ principal, rate, tenure }: BalanceOverTimeChartProps) {
  const chartData = generateChartData(principal, rate, tenure);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-xl text-sm">
          <p className="font-semibold mb-1">Year {label}</p>
          <p className="font-mono">Balance: ₹{Math.round(payload[0].value).toLocaleString("en-IN")}</p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="month"
            tickFormatter={(value) => `${value}yr`}
            stroke="rgba(255,255,255,0.3)"
            tick={{ fontSize: 11 }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            stroke="rgba(255,255,255,0.3)"
            width={55}
            tick={{ fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6C5CE7"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#balanceGradient)"
            animationBegin={0}
            animationDuration={600}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
