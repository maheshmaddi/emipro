"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ChevronDown } from "lucide-react";
import { generateAmortizationSchedule, generateYearlySchedule } from "@/lib/amortization";
import { formatCurrency } from "@/lib/format";
import jsPDF from "jspdf";

interface Props {
  principal: number;
  rate: number;
  tenure: number;
}

type View = "monthly" | "yearly";

export function AmortizationTable({ principal, rate, tenure }: Props) {
  const [view, setView] = useState<View>("monthly");
  const [showAll, setShowAll] = useState(false);

  const monthly = generateAmortizationSchedule(principal, rate, tenure);
  const yearly = generateYearlySchedule(principal, rate, tenure);
  const data = view === "monthly" ? monthly : yearly;
  const limit = view === "monthly" ? 12 : 5;
  const display = showAll ? data : data.slice(0, limit);
  const hasMore = data.length > limit;

  const label = view === "monthly" ? "Month" : "Year";
  const keyProp = view === "monthly" ? "month" : "year";

  const csvExport = () => {
    const rows = [
      [label, "EMI", "Principal", "Interest", "Balance"],
      ...data.map((e: any) => [e[keyProp], e.emi, e.principal, e.interest, e.balance]),
    ];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `amortization-${view}.csv`;
    a.click();
  };

  const fmtNum = (n: number) => Math.round(n).toLocaleString("en-IN");

  const pdfExport = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const emiLabel = view === "yearly" ? "Total EMI (Year)" : "EMI";

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("EMIPro - Amortization Schedule", 14, 15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Loan: Rs.${fmtNum(principal)} | Rate: ${rate}% | Tenure: ${tenure} years | EMI: Rs.${fmtNum(monthly[0]?.emi ?? 0)}/month`,
      14, 21
    );

    let y = 30;
    const cols = [label, emiLabel, "Principal", "Interest", "Balance"];
    const widths = [14, 45, 100, 155, 210];
    const pageHeight = 195;

    // Header
    doc.setFillColor(108, 92, 231); // primary purple
    doc.rect(12, y - 4, 275, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    cols.forEach((c, i) => doc.text(c, widths[i], y));
    y += 8;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    const rows = data;
    rows.forEach((e: any, idx: number) => {
      if (y > pageHeight) { doc.addPage(); y = 15; }
      // Alternate row shading
      if (idx % 2 === 0) {
        doc.setFillColor(245, 245, 250);
        doc.rect(12, y - 4, 275, 6, "F");
      }
      doc.text(String(e[keyProp]), widths[0], y);
      doc.text(`Rs.${fmtNum(e.emi)}`, widths[1], y);
      doc.text(`Rs.${fmtNum(e.principal)}`, widths[2], y);
      doc.text(`Rs.${fmtNum(e.interest)}`, widths[3], y);
      doc.text(`Rs.${fmtNum(e.balance)}`, widths[4], y);
      y += 6;
    });

    // Footer
    const totalPrincipal = data.reduce((s: number, e: any) => s + e.principal, 0);
    const totalInterest = data.reduce((s: number, e: any) => s + e.interest, 0);
    const totalEmi = data.reduce((s: number, e: any) => s + e.emi, 0);
    y += 4;
    if (y > pageHeight) { doc.addPage(); y = 15; }
    doc.setDrawColor(108, 92, 231);
    doc.line(12, y - 2, 287, y - 2);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL", widths[0], y + 2);
    doc.text(`Rs.${fmtNum(totalEmi)}`, widths[1], y + 2);
    doc.text(`Rs.${fmtNum(totalPrincipal)}`, widths[2], y + 2);
    doc.text(`Rs.${fmtNum(totalInterest)}`, widths[3], y + 2);

    // Page numbers
    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pages} | EMIPro`, 270, 205);
    }

    doc.save(`emipro-amortization-${view}.pdf`);
  };

  return (
    <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <h3 className="text-sm font-semibold">Amortization Schedule</h3>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => { setView(v as View); setShowAll(false); }}>
            <TabsList className="h-8">
              <TabsTrigger value="monthly" className="text-xs px-3 h-6">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="text-xs px-3 h-6">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          <button
            onClick={csvExport}
            aria-label="Export as CSV"
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary/50 text-foreground/40 hover:text-foreground/70 transition-colors text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            CSV
          </button>
          <button
            onClick={pdfExport}
            aria-label="Export as PDF"
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary/50 text-foreground/40 hover:text-foreground/70 transition-colors text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Amortization schedule — {view} view
          </caption>
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-foreground/30">
              <th scope="col" className="text-left py-3 px-5 font-medium">{label}</th>
              <th scope="col" className="text-right py-3 px-5 font-medium">EMI</th>
              <th scope="col" className="text-right py-3 px-5 font-medium">Principal</th>
              <th scope="col" className="text-right py-3 px-5 font-medium">Interest</th>
              <th scope="col" className="text-right py-3 px-5 font-medium">Balance</th>
            </tr>
          </thead>
          <tbody>
            {display.map((entry: any) => (
              <tr key={`${view}-${entry[keyProp]}`} className="border-t border-white/[0.03] hover:bg-white/[0.02]">
                <td className="py-2.5 px-5 font-mono">{entry[keyProp]}</td>
                <td className="py-2.5 px-5 text-right font-mono">{formatCurrency(entry.emi)}</td>
                <td className="py-2.5 px-5 text-right font-mono text-[#6C5CE7]">{formatCurrency(entry.principal)}</td>
                <td className="py-2.5 px-5 text-right font-mono text-[#00B894]">{formatCurrency(entry.interest)}</td>
                <td className="py-2.5 px-5 text-right font-mono">{formatCurrency(entry.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More */}
      {hasMore && (
        <div className="text-center py-3 border-t border-white/[0.03]">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 mx-auto"
          >
            {showAll ? "Show Less" : `Show all ${data.length} ${view === "monthly" ? "months" : "years"}`}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  );
}
