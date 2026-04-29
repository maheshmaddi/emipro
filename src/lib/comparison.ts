import { EmiResult, calculateEMI } from "./emi";

export interface LoanOption {
  id: string;
  name: string;
  amount: number;
  rate: number;
  tenure: number;
}

export interface ComparisonResult {
  loans: Array<LoanOption & EmiResult>;
  winner: string | null;
  savings: {
    amount: number;
    betterThan: string;
  } | null;
}

export function compareLoans(loans: LoanOption[]): ComparisonResult {
  if (loans.length === 0) {
    return { loans: [], winner: null, savings: null };
  }

  const results = loans.map((loan) => ({
    ...loan,
    ...calculateEMI(loan.amount, loan.rate, loan.tenure),
  }));

  // Find winner (lowest total payment)
  const sortedByTotal = [...results].sort((a, b) => a.totalAmount - b.totalAmount);
  const winner = sortedByTotal[0].id;

  // Calculate savings
  let savings = null;
  if (results.length >= 2 && sortedByTotal[0].totalAmount < sortedByTotal[1].totalAmount) {
    const savingAmount = sortedByTotal[1].totalAmount - sortedByTotal[0].totalAmount;
    savings = {
      amount: savingAmount,
      betterThan: sortedByTotal[1].id,
    };
  }

  return {
    loans: results,
    winner,
    savings,
  };
}
