import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LoanTypeCalculatorContent } from "@/components/seo/LoanTypeCalculatorContent";
import { loanTypeContent } from "@/lib/loanTypeContent";

interface LoanTypePageProps {
  params: Promise<{ loanType: string }>;
}

const loanTypes = ["home-loan", "car-loan", "personal-loan", "education-loan", "gold-loan", "business-loan"];

export async function generateStaticParams() {
  return loanTypes.map((loanType) => ({
    loanType,
  }));
}

export async function generateMetadata({ params }: LoanTypePageProps): Promise<Metadata> {
  const { loanType } = await params;
  const content = loanTypeContent[loanType];

  if (!content) {
    return {
      title: "EMIPro - Loan Calculator",
      description: "Free, open-source EMI calculator",
    };
  }

  return {
    title: content.title,
    description: content.description,
    keywords: [
      "EMI Calculator",
      "Loan Calculator",
      `${content.h1} EMI`,
      `${content.h1} Calculator`,
    ],
    openGraph: {
      title: content.title,
      description: content.description,
      type: "website",
    },
  };
}

export default async function LoanTypePage({ params }: LoanTypePageProps) {
  const { loanType } = await params;
  const content = loanTypeContent[loanType];

  if (!content) {
    notFound();
  }

  return <LoanTypeCalculatorContent loanType={loanType} {...content} />;
}
