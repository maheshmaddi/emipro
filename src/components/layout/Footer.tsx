import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  const loanCalculators = [
    { href: "/home-loan", label: "Home Loan EMI Calculator" },
    { href: "/car-loan", label: "Car Loan EMI Calculator" },
    { href: "/personal-loan", label: "Personal Loan EMI Calculator" },
    { href: "/education-loan", label: "Education Loan EMI Calculator" },
    { href: "/gold-loan", label: "Gold Loan EMI Calculator" },
    { href: "/business-loan", label: "Business Loan EMI Calculator" },
  ];

  const tools = [
    { href: "/compare", label: "Compare Loans" },
    { href: "/prepayment", label: "Prepayment Simulator" },
    { href: "/afford", label: "Affordability Checker" },
    { href: "/refinance", label: "Refinance Calculator" },
    { href: "/foreclosure", label: "Foreclosure Calculator" },
    { href: "/rate-change", label: "Rate Change Impact" },
  ];

  return (
    <footer className="border-t border-border/50 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold mb-4">EMIPro</h3>
            <p className="text-sm text-foreground/60 mb-4">
              Best-in-class loan and EMI calculator with live calculations, charts, and amortization schedules.
            </p>
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for India
            </div>
          </div>

          {/* Loan Calculators */}
          <div>
            <h3 className="font-semibold mb-4">Loan Calculators</h3>
            <ul className="space-y-2">
              {loanCalculators.map((calc) => (
                <li key={calc.href}>
                  <Link
                    href={calc.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {calc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground/60">
              EMIPro — Free, Open Source, No Ads
            </p>
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} EMIPro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
