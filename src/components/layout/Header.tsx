"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
            E
          </div>
          <span className="font-bold text-lg tracking-tight">EMIPro</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
