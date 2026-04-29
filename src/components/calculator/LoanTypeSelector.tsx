"use client";

import React from "react";
import { motion } from "framer-motion";
import { loanTypeLabels, loanDefaults } from "@/lib/constants";
import { useCalculatorStore } from "@/store/calculator-store";
import { cn } from "@/lib/utils";

const loanTypes = Object.keys(loanDefaults) as Array<keyof typeof loanDefaults>;

export function LoanTypeSelector() {
  const { loanType, setLoanType } = useCalculatorStore();

  return (
    <div className="overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
      <div className="flex gap-2">
        {loanTypes.map((type) => {
          const { label, emoji } = loanTypeLabels[type];
          const active = loanType === type;
          return (
            <button
              key={type}
              onClick={() => setLoanType(type)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                "min-h-[40px]",
                active
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-card text-foreground/50 hover:text-foreground/80 border border-white/5"
              )}
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
