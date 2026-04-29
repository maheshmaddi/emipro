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
    <div className="relative">
      <div className="overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        <div className="flex gap-2">
          {loanTypes.map((type) => {
            const { label, emoji } = loanTypeLabels[type];
            const active = loanType === type;
            return (
              <button
                key={type}
                onClick={() => setLoanType(type)}
                aria-current={active ? "true" : undefined}
                aria-label={`${label} calculator`}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  "min-h-[40px]",
                  active
                    ? "text-primary-foreground"
                    : "bg-card text-foreground/50 hover:text-foreground/80 border border-white/5"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="loan-type-active-pill"
                    className="absolute inset-0 bg-primary rounded-lg shadow-md shadow-primary/25"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10">{emoji}</span>
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Right-edge fade gradient to hint at horizontal scroll on mobile */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
