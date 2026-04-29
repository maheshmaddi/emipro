"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PrincipalInterestDonutProps {
  principal: number;
  interest: number;
}

export function PrincipalInterestDonut({ principal, interest }: PrincipalInterestDonutProps) {
  const data = useMemo(
    () => [
      { name: "Principal", value: principal, color: "#6C5CE7" },
      { name: "Interest", value: interest, color: "#00B894" },
    ],
    [principal, interest]
  );

  const total = principal + interest;
  const principalPct = ((principal / total) * 100).toFixed(1);
  const interestPct = ((interest / total) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-xl text-sm">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="font-mono">₹{payload[0].value.toLocaleString("en-IN")}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              animationBegin={0}
              animationDuration={600}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#6C5CE7]" />
          <span className="text-xs text-foreground/60">Principal {principalPct}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00B894]" />
          <span className="text-xs text-foreground/60">Interest {interestPct}%</span>
        </div>
      </div>
    </div>
  );
}
