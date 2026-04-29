"use client";

import React from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/format";

interface LoanSummaryProps {
  principal: number;
  interest: number;
  totalAmount: number;
}

export function LoanSummary({ principal, interest, totalAmount }: LoanSummaryProps) {
  const items = [
    { label: "Principal", value: principal, accent: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { label: "Total Interest", value: interest, accent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { label: "Total Payment", value: totalAmount, accent: "bg-primary/10 text-primary border-primary/20" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className={`rounded-xl p-3 md:p-4 border ${item.accent}`}
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-wider font-semibold opacity-70 mb-1 truncate">
            {item.label}
          </p>
          <p className="text-sm md:text-xl font-bold font-mono truncate">
            ₹{(item.value / 100000).toFixed(1)}L
          </p>
        </motion.div>
      ))}
    </div>
  );
}
