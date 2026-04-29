import { EmiResult, calculateEMI } from "./emi";

export interface RefinanceInput {
  currentLoan: {
    amount: number;
    rate: number;
    tenure: number;
    monthsCompleted: number;
  };
  newLoan: {
    rate: number;
    tenure: number;
    processingFeePercent: number;
  };
}

export interface RefinanceResult {
  currentLoan: {
    originalResult: EmiResult;
    outstandingBalance: number;
    remainingMonths: number;
    emi: number;
    totalInterestPaidSoFar: number;
    remainingInterest: number;
    totalCost: number;
  };
  newLoan: {
    emi: number;
    totalInterest: number;
    totalAmount: number;
    processingFee: number;
    totalCost: number;
  };
  savings: {
    total: number;
    monthlyEmiDifference: number;
    breakEvenMonth: number;
  };
  isWorthIt: boolean;
  cumulativeSavings: number[];
}

export function calculateRefinance(input: RefinanceInput): RefinanceResult {
  const { currentLoan, newLoan } = input;

  // Current loan calculations
  const originalResult = calculateEMI(currentLoan.amount, currentLoan.rate, currentLoan.tenure);
  const monthlyRate = currentLoan.rate / 12 / 100;

  // Calculate outstanding balance after months completed
  let balance = currentLoan.amount;
  let totalInterestPaid = 0;

  for (let month = 1; month <= currentLoan.monthsCompleted; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = originalResult.emi - interestPayment;
    totalInterestPaid += interestPayment;
    balance -= principalPayment;
  }

  const outstandingBalance = Math.max(0, balance);
  const remainingMonths = currentLoan.tenure * 12 - currentLoan.monthsCompleted;
  const remainingInterest = originalResult.interest - totalInterestPaid;
  const currentLoanTotalCost = totalInterestPaid + (originalResult.emi * remainingMonths);

  // New loan calculations
  const newLoanResult = calculateEMI(outstandingBalance, newLoan.rate, newLoan.tenure);
  const processingFee = (outstandingBalance * newLoan.processingFeePercent) / 100;
  const newLoanTotalCost = newLoanResult.totalAmount + processingFee;

  // Calculate savings
  const totalSavings = currentLoanTotalCost - newLoanTotalCost;
  const isWorthIt = totalSavings > 0;

  // Monthly EMI difference
  const monthlyEmiDifference = originalResult.emi - newLoanResult.emi;

  // Calculate break-even month
  let cumulativeSavings: number[] = [];
  let breakEvenMonth = -1;

  let cumulativeCostCurrent = 0;
  let cumulativeCostNew = processingFee; // Start with processing fee

  for (let month = 1; month <= Math.max(remainingMonths, newLoan.tenure * 12); month++) {
    if (month <= remainingMonths) {
      cumulativeCostCurrent += originalResult.emi;
    }
    if (month <= newLoan.tenure * 12) {
      cumulativeCostNew += newLoanResult.emi;
    }

    const monthSavings = cumulativeCostCurrent - cumulativeCostNew;
    cumulativeSavings.push(monthSavings);

    if (breakEvenMonth === -1 && monthSavings > 0) {
      breakEvenMonth = month;
    }
  }

  return {
    currentLoan: {
      originalResult,
      outstandingBalance,
      remainingMonths,
      emi: originalResult.emi,
      totalInterestPaidSoFar: totalInterestPaid,
      remainingInterest,
      totalCost: currentLoanTotalCost,
    },
    newLoan: {
      emi: newLoanResult.emi,
      totalInterest: newLoanResult.interest,
      totalAmount: newLoanResult.totalAmount,
      processingFee,
      totalCost: newLoanTotalCost,
    },
    savings: {
      total: totalSavings,
      monthlyEmiDifference,
      breakEvenMonth,
    },
    isWorthIt,
    cumulativeSavings,
  };
}
