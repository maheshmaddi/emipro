"use client";

import React from "react";
import Link from "next/link";

export function FeatureLinks() {
  return (
    <>
      {/* Smart Features */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Smart Features
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/compare"
            className="group bg-card rounded-2xl p-5 border border-white/5 hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              ⚖️
            </div>
            <h3 className="font-semibold mb-1">Compare Loans</h3>
            <p className="text-sm text-foreground/40">
              Compare 2-3 loans side-by-side to find the best option
            </p>
          </Link>

          <Link
            href="/prepayment"
            className="group bg-card rounded-2xl p-5 border border-white/5 hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="font-semibold mb-1">Prepayment Simulator</h3>
            <p className="text-sm text-foreground/40">
              See how prepayments can save you interest and time
            </p>
          </Link>

          <Link
            href="/afford"
            className="group bg-card rounded-2xl p-5 border border-white/5 hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              💰
            </div>
            <h3 className="font-semibold mb-1">Affordability Checker</h3>
            <p className="text-sm text-foreground/40">
              Check how much loan you can afford based on your income
            </p>
          </Link>
        </div>
      </section>

      {/* Pro Features */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Pro Features
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/refinance"
            className="group bg-card rounded-2xl p-5 border border-white/5 hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🔄
            </div>
            <h3 className="font-semibold mb-1">Refinance Calculator</h3>
            <p className="text-sm text-foreground/40">
              Should you switch to a new loan? See the savings
            </p>
          </Link>

          <Link
            href="/foreclosure"
            className="group bg-card rounded-2xl p-5 border border-white/5 hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🏦
            </div>
            <h3 className="font-semibold mb-1">Foreclosure Calculator</h3>
            <p className="text-sm text-foreground/40">
              Calculate the impact of closing your loan early
            </p>
          </Link>

          <Link
            href="/rate-change"
            className="group bg-card rounded-2xl p-5 border border-white/5 hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              📈
            </div>
            <h3 className="font-semibold mb-1">Rate Change Impact</h3>
            <p className="text-sm text-foreground/40">
              See how interest rate changes affect your loan
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
