"use client";

import React, { useEffect } from "react";
import { useCalculatorStore } from "@/store/calculator-store";
import { LoanTypeSelector } from "@/components/calculator/LoanTypeSelector";
import { EmiHero } from "@/components/calculator/EmiHero";
import { LoanConfig } from "@/components/calculator/LoanConfig";
import { LoanSummary } from "@/components/calculator/LoanSummary";
import { PrincipalInterestDonut } from "@/components/charts/PrincipalInterestDonut";
import { BalanceOverTimeChart } from "@/components/charts/BalanceOverTimeChart";
import { AmortizationTable } from "@/components/schedule/AmortizationTable";
import { FeatureLinks } from "@/components/layout/FeatureLinks";
import { calculateEMI } from "@/lib/emi";
import { formatCurrency } from "@/lib/format";

interface LoanTypeCalculatorContentProps {
  loanType: string;
  title: string;
  h1: string;
  content: string;
  faqs: Array<{ question: string; answer: string }>;
  howToUse: string;
  relatedCalculators: Array<{ title: string; url: string }>;
}

export function LoanTypeCalculatorContent({
  loanType,
  title,
  h1,
  content,
  faqs,
  howToUse,
  relatedCalculators,
}: LoanTypeCalculatorContentProps) {
  const setLoanTypeInStore = useCalculatorStore((state) => state.setLoanType);

  useEffect(() => {
    const loanTypeMapping: Record<string, "home" | "car" | "personal" | "education" | "gold" | "business"> = {
      "home-loan": "home",
      "car-loan": "car",
      "personal-loan": "personal",
      "education-loan": "education",
      "gold-loan": "gold",
      "business-loan": "business",
    };

    const mappedType = loanTypeMapping[loanType] || "home";
    setLoanTypeInStore(mappedType);
  }, [loanType, setLoanTypeInStore]);

  const { loanConfig } = useCalculatorStore();
  const result = calculateEMI(loanConfig.amount, loanConfig.rate, loanConfig.tenure);

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* H1 Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">{h1}</h1>

      {/* Loan Type Selector */}
      <LoanTypeSelector />

      {/* ===== TOP SECTION: Sliders + EMI Result ===== */}
      <section className="mt-6 grid md:grid-cols-[1fr_280px] gap-6 items-start">
        {/* Left: Sliders */}
        <div className="space-y-7 bg-card rounded-2xl p-6 border border-white/5">
          <LoanConfig />
        </div>

        {/* Right: EMI Result Card */}
        <div className="bg-gradient-to-b from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20 text-center sticky top-24">
          <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/50 font-semibold">
            Monthly EMI
          </p>
          <div className="mt-2">
            <EmiHero emi={result.emi} />
            <span className="text-xs text-foreground/30 ml-1">/mo</span>
          </div>

          {/* Mini summary */}
          <div className="mt-4 space-y-2 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/50">Principal</span>
              <span className="font-mono font-medium">{formatCurrency(result.principal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/50">Interest</span>
              <span className="font-mono font-medium text-emerald-400">{formatCurrency(result.interest)}</span>
            </div>
            <div className="h-px bg-border/50 my-1" />
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-foreground/70">Total Payment</span>
              <span className="font-mono">{formatCurrency(result.totalAmount)}</span>
            </div>
          </div>

          {/* Interest ratio bar */}
          <div className="mt-4">
            <div className="h-2 rounded-full bg-secondary/50 overflow-hidden flex">
              <div
                className="bg-[#6C5CE7] rounded-l-full transition-all duration-300"
                style={{ width: `${(result.principal / result.totalAmount) * 100}%` }}
              />
              <div
                className="bg-[#00B894] rounded-r-full transition-all duration-300"
                style={{ width: `${(result.interest / result.totalAmount) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-foreground/40">
              <span>Principal {((result.principal / result.totalAmount) * 100).toFixed(0)}%</span>
              <span>Interest {((result.interest / result.totalAmount) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOAN SUMMARY CARDS ===== */}
      <section className="mt-6">
        <LoanSummary
          principal={result.principal}
          interest={result.interest}
          totalAmount={result.totalAmount}
        />
      </section>

      {/* ===== CHARTS ===== */}
      <section className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-5 border border-white/5">
          <h3 className="text-xs uppercase tracking-wider text-foreground/40 font-semibold mb-3">
            Payment Split
          </h3>
          <PrincipalInterestDonut principal={result.principal} interest={result.interest} />
        </div>
        <div className="bg-card rounded-2xl p-5 border border-white/5">
          <h3 className="text-xs uppercase tracking-wider text-foreground/40 font-semibold mb-3">
            Balance Over Time
          </h3>
          <BalanceOverTimeChart principal={loanConfig.amount} rate={loanConfig.rate} tenure={loanConfig.tenure} />
        </div>
      </section>

      {/* ===== AMORTIZATION ===== */}
      <section className="mt-8">
        <AmortizationTable principal={loanConfig.amount} rate={loanConfig.rate} tenure={loanConfig.tenure} />
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="mt-12 bg-card rounded-2xl p-6 border border-white/5">
        <h2 className="text-xl font-bold mb-4">About {h1}</h2>
        <div className="prose prose-invert max-w-none text-foreground/80">
          {content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="mt-8 bg-card rounded-2xl p-6 border border-white/5">
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group">
              <summary className="cursor-pointer font-semibold text-foreground/90 hover:text-primary transition-colors list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="ml-2 text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-3 text-foreground/70 leading-relaxed pl-4 border-l-2 border-primary/30">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ===== HOW TO USE SECTION ===== */}
      {howToUse && (
        <section className="mt-8 bg-card rounded-2xl p-6 border border-white/5">
          <div className="prose prose-invert max-w-none text-foreground/80">
            {howToUse.split("\n\n").map((paragraph, idx) => {
              if (paragraph.startsWith("##")) {
                const headingText = paragraph.replace(/^##\s*/, "");
                return (
                  <h2 key={idx} className="text-xl font-bold mb-4 mt-6">{headingText}</h2>
                );
              }
              if (paragraph.startsWith("-")) {
                const points = paragraph.split("\n").filter(p => p.trim().startsWith("-"));
                return (
                  <ul key={idx} className="list-disc list-inside mb-4 space-y-2">
                    {points.map((point, i) => (
                      <li key={i} className="text-foreground/80">{point.replace(/^-\s*/, "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== RELATED CALCULATORS SECTION ===== */}
      {relatedCalculators && relatedCalculators.length > 0 && (
        <section className="mt-8 bg-card rounded-2xl p-6 border border-white/5">
          <h2 className="text-xl font-bold mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {relatedCalculators.map((calc, idx) => (
              <a
                key={idx}
                href={calc.url}
                className="flex items-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/20"
              >
                <span className="text-2xl mr-3">📊</span>
                <span className="font-medium text-foreground/90">{calc.title}</span>
                <span className="ml-auto text-primary">→</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ===== FEATURE LINKS ===== */}
      <FeatureLinks />
    </div>
  );
}
