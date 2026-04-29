"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/", emoji: "🏠" },
  { label: "Compare", href: "/compare", emoji: "⚖️" },
  { label: "Prepayment", href: "/prepayment", emoji: "⚡" },
  { label: "Affordability", href: "/afford", emoji: "💰" },
  { label: "Refinance", href: "/refinance", emoji: "🔄" },
  { label: "Foreclosure", href: "/foreclosure", emoji: "🏦" },
  { label: "Rate Change", href: "/rate-change", emoji: "📈" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname.endsWith("-loan");
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/5">
      {/* Top row: logo + theme toggle */}
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          aria-label="EMIPro home"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
            E
          </div>
          <span className="font-bold text-lg tracking-tight">EMIPro</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Secondary nav strip */}
      <div className="relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4">
            <nav
              aria-label="Main navigation"
              className="flex gap-1 pb-2 pt-1.5 w-max min-w-full"
            >
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
        {/* Right-side fade to hint at scrollable overflow */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background/80 to-transparent" />
      </div>
    </header>
  );
}
