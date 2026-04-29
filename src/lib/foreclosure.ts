import { EmiResult, calculateEMI } from "./emi";

export interface ForeclosureInput {
  amount: number;
  rate: number;
  tenure: number;
  foreclosureAtMonth: number;
  prepaymentPenaltyPercent: number;
}

export interface ForeclosureResult {
  originalLoan: EmiResult;
  foreclosureMonth: number;
  outstandingBalance: number;
  totalPaidSoFar: number;
  principalPaidSoFar: number;
  interestPaidSoFar: number;
  interestSaved: number;
  prepaymentPenalty: number;
  netSavings: number;
  isWorthIt: boolean;
  balanceHistory: number[];
}

export function calculateForeclosure(input: ForeclosureInput): ForeclosureResult {
  const { amount, rate, tenure, foreclosureAtMonth, prepaymentPenaltyPercent } = input;

  const originalLoan = calculateEMI(amount, rate, tenure);
  const monthlyRate = rate / 12 / 100;
  const totalMonths = tenure * 12;

  // Calculate loan amortization up to foreclosure month
  let balance = amount;
  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;
  let balanceHistory: number[] = [amount];

  for (let month = 1; month <= Math.min(foreclosureAtMonth, totalMonths); month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = originalLoan.emi - interestPayment;

    totalInterestPaid += interestPayment;
    totalPrincipalPaid += principalPayment;
    balance -= principalPayment;

    if (balance < 0) balance = 0;
    balanceHistory.push(balance);
  }

  const outstandingBalance = Math.max(0, balance);
  const totalPaidSoFar = originalLoan.emi * Math.min(foreclosureAtMonth, totalMonths);

  // Calculate remaining interest if loan continued normally
  let remainingInterest = 0;
  let tempBalance = outstandingBalance;
  for (let month = foreclosureAtMonth + 1; month <= totalMonths && tempBalance > 0; month++) {
    const interestPayment = tempBalance * monthlyRate;
    remainingInterest += interestPayment;
    const principalPayment = originalLoan.emi - interestPayment;
    tempBalance -= principalPayment;
    if (tempBalance < 0) tempBalance = 0;
  }

  const interestSaved = remainingInterest;
  const prepaymentPenalty = (outstandingBalance * prepaymentPenaltyPercent) / 100;
  const netSavings = interestSaved - prepaymentPenalty;
  const isWorthIt = netSavings > 0;

  // Generate full balance history for chart
  if (foreclosureAtMonth < totalMonths) {
    let remainingBalance = outstandingBalance;
    for (let month = foreclosureAtMonth + 1; month <= totalMonths && remainingBalance > 0; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = originalLoan.emi - interestPayment;
      remainingBalance -= principalPayment;
      if (remainingBalance < 0) remainingBalance = 0;
      balanceHistory.push(remainingBalance);
    }
  }

  return {
    originalLoan,
    foreclosureMonth: foreclosureAtMonth,
    outstandingBalance,
    totalPaidSoFar,
    principalPaidSoFar: totalPrincipalPaid,
    interestPaidSoFar: totalInterestPaid,
    interestSaved,
    prepaymentPenalty,
    netSavings,
    isWorthIt,
    balanceHistory,
  };
}
