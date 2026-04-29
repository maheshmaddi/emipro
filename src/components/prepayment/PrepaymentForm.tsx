"use client";

import React from "react";
import { SliderInput } from "@/components/calculator/SliderInput";
import { OneTimePrepayment } from "@/lib/prepayment";

interface PrepaymentFormProps {
  amount: number;
  rate: number;
  tenure: number;
  oneTimePrepayments: OneTimePrepayment[];
  monthlyExtra: number;
  onAmountChange: (v: number) => void;
  onRateChange: (v: number) => void;
  onTenureChange: (v: number) => void;
  onAddPrepayment: (p: OneTimePrepayment) => void;
  onRemovePrepayment: (index: number) => void;
  onMonthlyExtraChange: (v: number) => void;
}

export function PrepaymentForm({
  amount,
  rate,
  tenure,
  oneTimePrepayments,
  monthlyExtra,
  onAmountChange,
  onRateChange,
  onTenureChange,
  onAddPrepayment,
  onRemovePrepayment,
  onMonthlyExtraChange,
}: PrepaymentFormProps) {
  const [prepaymentAmount, setPrepaymentAmount] = React.useState(100000);
  const [prepaymentMonth, setPrepaymentMonth] = React.useState(12);

  const maxMonth = tenure * 12;

  return (
    <div className="bg-card rounded-2xl p-6 border border-white/5 space-y-6">
      <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">
        Base Loan Configuration
      </h3>

      <SliderInput
        label="Loan Amount"
        value={amount}
        onChange={onAmountChange}
        min={100000}
        max={10000000}
        step={100000}
        chips={[500000, 1000000, 2500000, 5000000, 7500000, 10000000]}
      />

      <SliderInput
        label="Interest Rate"
        value={rate}
        onChange={onRateChange}
        min={5}
        max={18}
        step={0.1}
        chips={[6, 7, 8, 9, 10, 12]}
        suffix="%"
        formatAsCurrency={false}
      />

      <SliderInput
        label="Tenure"
        value={tenure}
        onChange={onTenureChange}
        min={1}
        max={30}
        step={1}
        chips={[5, 10, 15, 20, 25, 30]}
        suffix=" yr"
        formatAsCurrency={false}
      />

      <div className="h-px bg-border/50" />

      <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">
        Prepayment Options
      </h3>

      {/* One-time Prepayments */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-foreground/70">One-time Prepayments</label>
        </div>

        {oneTimePrepayments.map((p, i) => (
          <div
            key={i}
            className="bg-secondary/30 rounded-lg p-3 flex items-center justify-between"
          >
            <span className="text-sm">
              ₹{(p.amount / 100000).toFixed(2)}L at month {p.atMonth}
            </span>
            <button
              onClick={() => onRemovePrepayment(i)}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
          <SliderInput
            label="Amount"
            value={prepaymentAmount}
            onChange={setPrepaymentAmount}
            min={10000}
            max={1000000}
            step={10000}
            chips={[50000, 100000, 250000, 500000, 1000000]}
            compact
          />
          <div className="flex items-center justify-center pt-6">
            <span className="text-foreground/30">@</span>
          </div>
          <div className="pt-6">
            <label className="text-[13px] font-medium text-foreground/50 block mb-2">
              At Month
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={prepaymentMonth}
                onChange={(e) => setPrepaymentMonth(Math.max(1, Math.min(maxMonth, parseInt(e.target.value) || 1)))}
                className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm font-mono"
                min={1}
                max={maxMonth}
              />
              <button
                onClick={() =>
                  onAddPrepayment({ amount: prepaymentAmount, atMonth: prepaymentMonth })
                }
                className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Extra */}
      <div>
        <SliderInput
          label="Monthly Extra Payment"
          value={monthlyExtra}
          onChange={onMonthlyExtraChange}
          min={0}
          max={100000}
          step={1000}
          chips={[0, 5000, 10000, 25000, 50000]}
        />
      </div>
    </div>
  );
}
