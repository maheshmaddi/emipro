"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Github, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", emoji: "🏠" },
  { label: "Compare", href: "/compare", emoji: "⚖️" },
  { label: "Prepayment", href: "/prepayment", emoji: "⚡" },
  { label: "Affordability", href: "/afford", emoji: "💰" },
  { label: "Refinance", href: "/refinance", emoji: "🔄" },
  { label: "Foreclosure", href: "/foreclosure", emoji: "🏦" },
  { label: "Rate Change", href: "/rate-change", emoji: "📈" },
];

const loanCalculators = [
  { href: "/home-loan", label: "Home Loan", emoji: "🏠" },
  { href: "/car-loan", label: "Car Loan", emoji: "🚗" },
  { href: "/personal-loan", label: "Personal Loan", emoji: "👤" },
  { href: "/education-loan", label: "Education Loan", emoji: "📚" },
  { href: "/gold-loan", label: "Gold Loan", emoji: "💰" },
  { href: "/business-loan", label: "Business Loan", emoji: "💼" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname.endsWith("-loan");
    return pathname === href;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                E
              </div>
              <span className="font-bold text-lg tracking-tight">EMIPro</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/maheshmaddi/emipro"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 text-foreground/50 hover:text-foreground transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop nav strip - hidden on mobile */}
        <div className="relative border-t border-white/5 hidden md:block">
          <div className="max-w-4xl mx-auto px-4">
            <div className="overflow-x-auto scrollbar-none -mx-4 px-4">
              <nav aria-label="Main navigation" className="flex gap-1 pb-2 pt-1.5 w-max min-w-full">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                        active
                          ? "text-primary-foreground"
                          : "text-foreground/50 hover:text-foreground/80 hover:bg-white/5"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className="absolute inset-0 bg-primary rounded-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10">{item.emoji}</span>
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background/80 to-transparent" />
        </div>
      </header>

      {/* Mobile Side Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Side panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-[70] w-72 bg-card border-r border-white/5 overflow-y-auto"
            >
              {/* Menu header */}
              <div className="flex items-center justify-between px-4 h-14 border-b border-white/5">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                    E
                  </div>
                  <span className="font-bold text-lg tracking-tight">EMIPro</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tools section */}
              <div className="px-3 py-4">
                <p className="px-3 text-[11px] uppercase tracking-wider text-foreground/30 font-semibold mb-2">
                  Calculators
                </p>
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-primary/15 text-primary"
                          : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <span className="text-base">{item.emoji}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Loan Types section */}
              <div className="px-3 pb-4">
                <p className="px-3 text-[11px] uppercase tracking-wider text-foreground/30 font-semibold mb-2">
                  Loan Types
                </p>
                {loanCalculators.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-primary/15 text-primary"
                          : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <span className="text-base">{item.emoji}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Footer links */}
              <div className="border-t border-white/5 px-3 py-4 space-y-1">
                <a
                  href="https://github.com/maheshmaddi/emipro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/60 hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
                <p className="px-3 pt-2 text-[11px] text-foreground/30">
                  Free, Open Source, No Ads
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
