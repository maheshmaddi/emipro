"use client";

import React, { useEffect, useRef } from "react";

interface EmiHeroProps {
  emi: number;
}

export function EmiHero({ emi }: EmiHeroProps) {
  const prevEmi = useRef(emi);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    const start = prevEmi.current;
    const end = emi;
    const dur = 250;
    const t0 = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = Math.round(start + (end - start) * ease);
      if (nodeRef.current) {
        nodeRef.current.textContent = val.toLocaleString("en-IN");
      }
      if (t < 1) requestAnimationFrame(tick);
      else prevEmi.current = emi;
    };
    requestAnimationFrame(tick);
  }, [emi]);

  return (
    <span
      ref={nodeRef}
      className="text-4xl md:text-[44px] font-bold font-mono tracking-tight text-foreground"
    >
      ₹{Math.round(emi).toLocaleString("en-IN")}
    </span>
  );
}
