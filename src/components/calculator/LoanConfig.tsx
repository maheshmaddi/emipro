"use client";

import React from "react";
import { SliderInput } from "./SliderInput";
import { useCalculatorStore } from "@/store/calculator-store";
import { amountChips, rateChips, tenureChips } from "@/lib/constants";

export function LoanConfig() {
  const { loanConfig, setAmount, setRate, setTenure } = useCalculatorStore();

  return (
    <div className="space-y-7">
      <SliderInput
        label="Loan Amount"
        value={loanConfig.amount}
        onChange={setAmount}
        min={500000}
        max={50000000}
        step={50000}
        chips={amountChips}
        compact
      />
      <SliderInput
        label="Interest Rate"
        value={loanConfig.rate}
        onChange={setRate}
        min={4}
        max={24}
        step={0.1}
        chips={rateChips}
        suffix="%"
        formatAsCurrency={false}
      />
      <SliderInput
        label="Tenure"
        value={loanConfig.tenure}
        onChange={setTenure}
        min={1}
        max={30}
        step={1}
        chips={tenureChips}
        suffix=" yr"
        formatAsCurrency={false}
      />
    </div>
  );
}
