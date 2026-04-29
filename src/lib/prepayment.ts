import { EmiResult, calculateEMI } from "./emi";

export interface PrepaymentInput {
  amount: number;
  rate: number;
  tenure: number;
}

export interface OneTimePrepayment {
  amount: number;
  atMonth: number;
}

export interface PrepaymentResult {
  before: EmiResult;
  after: EmiResult;
  tenureSaved: {
    years: number;
    months: number;
  };
  interestSaved: number;
  newTenure: number;
}

export function calculateWithPrepayment(
  input: PrepaymentInput,
  oneTimePrepayments: OneTimePrepayment[],
  monthlyExtra: number,
  reduceTenure: boolean
): PrepaymentResult {
  const before = calculateEMI(input.amount, input.rate, input.tenure);

  // If no prepayments, return before for both
  if (oneTimePrepayments.length === 0 && monthlyExtra === 0) {
    return {
      before,
      after: before,
      tenureSaved: { years: 0, months: 0 },
      interestSaved: 0,
      newTenure: input.tenure,
    };
  }

  // Simulate prepayment
  let balance = input.amount;
  const monthlyRate = input.rate / 12 / 100;
  const emi = before.emi;
  let month = 0;
  let totalInterest = 0;

  // Create prepayment map for quick lookup
  const prepaymentMap = new Map<number, number>();
  oneTimePrepayments.forEach((p) => {
    const existing = prepaymentMap.get(p.atMonth) || 0;
    prepaymentMap.set(p.atMonth, existing + p.amount);
  });

  while (balance > 0 && month < input.tenure * 12 * 2) {
    month++;

    const interestPayment = balance * monthlyRate;
    const principalPayment = emi - interestPayment;

    totalInterest += interestPayment;
    balance -= principalPayment;

    // Apply one-time prepayment for this month
    if (prepaymentMap.has(month)) {
      const prepayAmount = Math.min(balance, prepaymentMap.get(month)!);
      balance -= prepayAmount;
    }

    // Apply monthly extra payment
    if (monthlyExtra > 0) {
      const extra = Math.min(balance, monthlyExtra);
      balance -= extra;
    }

    if (balance < 1) balance = 0;
  }

  const newTenureYears = month / 12;
  const newTenureMonths = Math.round(newTenureYears * 12);

  let afterEmi = emi;
  let afterTotalAmount = emi * month + totalInterest;
  let afterPrincipal = input.amount;
  let afterInterest = totalInterest;

  if (!reduceTenure) {
    // Reduce EMI option - keep original tenure, calculate new EMI
    const originalMonths = input.tenure * 12;
    const remainingBalance = input.amount;

    // Recalculate EMI for the reduced principal
    if (input.rate === 0) {
      afterEmi = remainingBalance / originalMonths;
    } else {
      afterEmi =
        (remainingBalance * monthlyRate * Math.pow(1 + monthlyRate, originalMonths)) /
        (Math.pow(1 + monthlyRate, originalMonths) - 1);
    }

    // Recalculate with prepayments reducing EMI
    balance = input.amount;
    totalInterest = 0;
    month = 0;

    while (balance > 0 && month < originalMonths) {
      month++;

      const interestPayment = balance * monthlyRate;
      const principalPayment = afterEmi - interestPayment;

      totalInterest += interestPayment;
      balance -= principalPayment;

      // Apply prepayments
      if (prepaymentMap.has(month)) {
        const prepayAmount = Math.min(balance, prepaymentMap.get(month)!);
        balance -= prepayAmount;
      }

      if (monthlyExtra > 0) {
        const extra = Math.min(balance, monthlyExtra);
        balance -= extra;
      }

      if (balance < 1) balance = 0;
    }

    afterEmi = (input.amount + totalInterest) / originalMonths;
    afterTotalAmount = afterEmi * originalMonths;
    afterInterest = totalInterest;
  }

  const after: EmiResult = {
    emi: afterEmi,
    principal: before.principal,
    interest: afterInterest,
    totalAmount: afterPrincipal + afterInterest,
  };

  const tenureSavedYears = Math.floor((input.tenure * 12 - newTenureMonths) / 12);
  const tenureSavedMonths = (input.tenure * 12 - newTenureMonths) % 12;

  return {
    before,
    after,
    tenureSaved: {
      years: Math.max(0, tenureSavedYears),
      months: Math.max(0, tenureSavedMonths),
    },
    interestSaved: Math.max(0, before.interest - after.interest),
    newTenure: reduceTenure ? newTenureYears : input.tenure,
  };
}
