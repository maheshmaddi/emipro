"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SliderInput } from "@/components/calculator/SliderInput";
import { calculateAffordability } from "@/lib/affordability";
import { DTIGauge } from "@/components/afford/DTIGauge";
import { AffordabilityResultCard } from "@/components/afford/AffordabilityResult";

export default function AffordPage() {
  const [monthlyIncome, setMonthlyIncome] = React.useState(80000);
  const [existingEMIs, setExistingEMIs] = React.useState(10000);
  const [rate, setRate] = React.useState(8.5);
  const [tenure, setTenure] = React.useState(20);

  const result = calculateAffordability({
    monthlyIncome,
    existingEMIs,
    rate,
    tenure,
  });

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="w-10 h-10 rounded-lg bg-card border border-white/5 flex items-center justify-center hover:bg-card/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">💰 How Much Can You Afford?</h1>
          <p className="text-sm text-foreground/50">Check your loan eligibility based on income</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-6">
        {/* Left: Input Form */}
        <div className="bg-card rounded-2xl p-6 border border-white/5 space-y-6">
          <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">
            Your Financial Details
          </h3>

          <SliderInput
            label="Monthly Income"
            value={monthlyIncome}
            onChange={setMonthlyIncome}
            min={20000}
            max={500000}
            step={5000}
            chips={[30000, 50000, 80000, 120000, 200000]}
          />

          <SliderInput
            label="Existing EMIs"
            value={existingEMIs}
            onChange={setExistingEMIs}
            min={0}
            max={100000}
            step={1000}
            chips={[0, 5000, 10000, 25000, 50000]}
          />

          <SliderInput
            label="Interest Rate"
            value={rate}
            onChange={setRate}
            min={5}
            max={18}
            step={0.1}
            chips={[6, 7, 8, 9, 10, 12]}
            suffix="%"
            formatAsCurrency={false}
          />

          <SliderInput
            label="Desired Tenure"
            value={tenure}
            onChange={setTenure}
            min={1}
            max={30}
            step={1}
            chips={[5, 10, 15, 20, 25, 30]}
            suffix=" yr"
            formatAsCurrency={false}
          />
        </div>

        {/* Right: Results */}
        <div className="space-y-6">
          {/* DTI Gauge */}
          <div className="bg-card rounded-2xl p-5 border border-white/5">
            <DTIGauge dti={result.dtiRatio} />
          </div>

          {/* Affordability Result */}
          <AffordabilityResultCard result={result} />
        </div>
      </div>
    </div>
  );
}
