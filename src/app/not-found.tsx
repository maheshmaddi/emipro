import Link from "next/link";
import { Home, Calculator } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[180px] font-bold text-foreground/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Calculator className="w-16 h-16 md:w-24 md:h-24 text-primary/20" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-foreground/60 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to calculating!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card text-foreground rounded-xl font-semibold border border-white/5 hover:border-primary/50 transition-all"
          >
            <Calculator className="w-5 h-5" />
            Compare Loans
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 p-6 bg-card rounded-2xl border border-white/5">
          <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Link href="/" className="text-foreground/60 hover:text-primary transition-colors">
              EMI Calculator
            </Link>
            <Link href="/compare" className="text-foreground/60 hover:text-primary transition-colors">
              Compare Loans
            </Link>
            <Link href="/prepayment" className="text-foreground/60 hover:text-primary transition-colors">
              Prepayment Simulator
            </Link>
            <Link href="/afford" className="text-foreground/60 hover:text-primary transition-colors">
              Affordability Checker
            </Link>
            <Link href="/home-loan" className="text-foreground/60 hover:text-primary transition-colors">
              Home Loan Calculator
            </Link>
            <Link href="/car-loan" className="text-foreground/60 hover:text-primary transition-colors">
              Car Loan Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
