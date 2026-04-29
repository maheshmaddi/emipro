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

  const pdfExport = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text("Amortization Schedule", 14, 15);
    doc.setFontSize(9);
    let y = 25;
    const cols = [label, "EMI", "Principal", "Interest", "Balance"];
    // Proportional columns across landscape width (297mm), leaving 14mm left margin
    const widths = [14, 65, 120, 178, 236];
    const pageHeight = 200; // usable height in landscape

    doc.setFont("helvetica", "bold");
    cols.forEach((c, i) => doc.text(c, widths[i], y));
    y += 7;
    doc.setFont("helvetica", "normal");

    const rows = data.slice(0, 100);
    rows.forEach((e: any) => {
      if (y > pageHeight) { doc.addPage(); y = 15; }
      doc.text(String(e[keyProp]), widths[0], y);
      doc.text(formatCurrency(e.emi), widths[1], y);
      doc.text(formatCurrency(e.principal), widths[2], y);
      doc.text(formatCurrency(e.interest), widths[3], y);
      doc.text(formatCurrency(e.balance), widths[4], y);
      y += 5;
    });

    if (data.length > 100) {
      if (y > pageHeight) { doc.addPage(); y = 15; }
      doc.setFont("helvetica", "italic");
      doc.text(`... and ${data.length - 100} more rows (showing first 100)`, 14, y + 4);
    }

    doc.save(`amortization-${view}.pdf`);
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
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-foreground/30">
              <th className="text-left py-3 px-5 font-medium">{label}</th>
              <th className="text-right py-3 px-5 font-medium">EMI</th>
              <th className="text-right py-3 px-5 font-medium">Principal</th>
              <th className="text-right py-3 px-5 font-medium">Interest</th>
              <th className="text-right py-3 px-5 font-medium">Balance</th>
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
