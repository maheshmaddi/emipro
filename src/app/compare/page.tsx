"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { useCompareStore } from "@/store/compare-store";
import { compareLoans } from "@/lib/comparison";
import { CompareCard } from "@/components/compare/CompareCard";
import { ComparisonBarChart } from "@/components/compare/ComparisonBarChart";
import { formatCurrency } from "@/lib/format";

export default function ComparePage() {
  const { loans, updateLoan, addLoan, removeLoan } = useCompareStore();
  const result = compareLoans(loans);

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
          <h1 className="text-2xl font-bold">⚖️ Compare Loans</h1>
          <p className="text-sm text-foreground/50">Find the best loan option for your needs</p>
        </div>
      </div>

      {/* Loan Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {loans.map((loan) => (
          <CompareCard
            key={loan.id}
            loan={loan}
            isWinner={result.winner === loan.id}
            onUpdate={(updates) => updateLoan(loan.id, updates)}
            onRemove={() => removeLoan(loan.id)}
            canRemove={loans.length > 2}
          />
        ))}

        {/* Add Loan Button */}
        {loans.length < 3 && (
          <button
            onClick={addLoan}
            className="bg-card/50 border-2 border-dashed border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-card/80 transition-all min-h-[280px]"
          >
            <Plus className="w-8 h-8 text-foreground/30" />
            <span className="text-sm font-medium text-foreground/30">Add Loan</span>
            <span className="text-xs text-foreground/20">Max 3 loans</span>
          </button>
        )}
      </div>

      {/* Comparison Results */}
      {result.loans.length >= 2 && (
        <>
          {/* Savings Callout */}
          {result.savings && result.savings.amount > 0 && (
            <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 mb-6 text-center">
              <p className="text-sm text-emerald-400 font-medium mb-1">
                🎉 You save with {result.loans.find((l) => l.id === result.winner)?.name}!
              </p>
              <p className="text-3xl font-bold text-emerald-400">
                {formatCurrency(result.savings.amount)}
              </p>
            </div>
          )}

          {/* Chart */}
          <div className="bg-card rounded-2xl p-6 border border-white/5 mb-6">
            <h3 className="text-sm font-semibold mb-4">Side-by-Side Comparison</h3>
            <ComparisonBarChart result={result} />
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-sm font-semibold text-foreground/50">Metric</th>
                  {result.loans.map((loan) => (
                    <th
                      key={loan.id}
                      className={`p-4 text-sm font-semibold text-right ${
                        result.winner === loan.id ? "text-emerald-400" : "text-foreground/70"
                      }`}
                    >
                      {loan.name}
                      {result.winner === loan.id && " 🏆"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-sm text-foreground/50">EMI (monthly)</td>
                  {result.loans.map((loan) => (
                    <td
                      key={loan.id}
                      className={`p-4 text-right font-mono font-medium ${
                        result.winner === loan.id ? "text-emerald-400" : ""
                      }`}
                    >
                      {formatCurrency(loan.emi)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-sm text-foreground/50">Total Interest</td>
                  {result.loans.map((loan) => (
                    <td
                      key={loan.id}
                      className={`p-4 text-right font-mono font-medium ${
                        result.winner === loan.id ? "text-emerald-400" : ""
                      }`}
                    >
                      {formatCurrency(loan.interest)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-sm text-foreground/50">Total Payment</td>
                  {result.loans.map((loan) => (
                    <td
                      key={loan.id}
                      className={`p-4 text-right font-mono font-semibold ${
                        result.winner === loan.id ? "text-emerald-400" : ""
                      }`}
                    >
                      {formatCurrency(loan.totalAmount)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
