import { EmiResult, calculateEMI } from "./emi";

export interface RateChangeInput {
  amount: number;
  currentRate: number;
  tenure: number;
  monthsCompleted: number;
}

export interface RateChangeScenario {
  rateChange: number; // Percentage point change
  newRate: number;
}

export interface RateChangeImpact {
  scenario: RateChangeScenario;
  keepEmiSame: {
    newTenure: number;
    newTotalInterest: number;
    tenureChange: {
      years: number;
      months: number;
    };
  };
  keepTenureSame: {
    newEmi: number;
    newTotalInterest: number;
    emiChange: number;
    emiChangePercent: number;
  };
}

export function calculateOutstandingBalance(
  amount: number,
  rate: number,
  tenure: number,
  monthsCompleted: number
): number {
  const originalResult = calculateEMI(amount, rate, tenure);
  const monthlyRate = rate / 12 / 100;

  let balance = amount;
  for (let month = 1; month <= monthsCompleted; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = originalResult.emi - interestPayment;
    balance -= principalPayment;
  }

  return Math.max(0, balance);
}

export function calculateRateChangeImpact(
  input: RateChangeInput,
  scenarios: RateChangeScenario[]
): RateChangeImpact[] {
  const { amount, currentRate, tenure, monthsCompleted } = input;

  // Calculate current state
  const originalResult = calculateEMI(amount, currentRate, tenure);
  const outstandingBalance = calculateOutstandingBalance(amount, currentRate, tenure, monthsCompleted);
  const remainingMonths = tenure * 12 - monthsCompleted;

  return scenarios.map((scenario) => {
    const newRate = Math.max(0, currentRate + scenario.rateChange);

    // Option 1: Keep EMI same, adjust tenure
    const monthlyRate = newRate / 12 / 100;
    let newTenureMonths = remainingMonths;

    if (newRate === 0) {
      newTenureMonths = remainingMonths;
    } else {
      // Solve for tenure given EMI and new rate
      // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
      // This is complex to solve algebraically, so we'll iterate
      let low = 1;
      let high = remainingMonths * 2; // Allow for significant increase

      for (let i = 0; i < 100; i++) {
        const mid = Math.floor((low + high) / 2);
        const testEmi =
          (outstandingBalance * monthlyRate * Math.pow(1 + monthlyRate, mid)) /
          (Math.pow(1 + monthlyRate, mid) - 1);

        if (testEmi > originalResult.emi) {
          low = mid + 1;
        } else {
          high = mid;
        }

        if (high - low <= 1) break;
      }

      // Check if we can even pay off the loan with this EMI at the new rate
      const minEmi = outstandingBalance * monthlyRate;
      if (originalResult.emi <= minEmi) {
        // EMI is too low to cover interest
        newTenureMonths = remainingMonths * 5; // Cap at a large number
      } else {
        newTenureMonths = high;
      }
    }

    const newTenureYears = newTenureMonths / 12;
    const newTotalInterestKeepEmi = originalResult.emi * newTenureMonths - outstandingBalance;

    const tenureChangeYears = Math.floor((newTenureYears - (remainingMonths / 12)));
    const tenureChangeMonths = Math.round((newTenureYears - (remainingMonths / 12)) * 12) % 12;

    // Option 2: Keep tenure same, adjust EMI
    const newTenureSameYears = remainingMonths / 12;
    const newResult = calculateEMI(outstandingBalance, newRate, newTenureSameYears);
    const newTotalInterestKeepTenure = newResult.interest;
    const emiChange = newResult.emi - originalResult.emi;
    const emiChangePercent = (emiChange / originalResult.emi) * 100;

    return {
      scenario: {
        ...scenario,
        newRate,
      },
      keepEmiSame: {
        newTenure: newTenureYears,
        newTotalInterest: newTotalInterestKeepEmi,
        tenureChange: {
          years: tenureChangeYears,
          months: tenureChangeMonths,
        },
      },
      keepTenureSame: {
        newEmi: newResult.emi,
        newTotalInterest: newTotalInterestKeepTenure,
        emiChange,
        emiChangePercent,
      },
    };
  });
}

export function getDefaultScenarios(): RateChangeScenario[] {
  return [
    { rateChange: -1, newRate: 0 },
    { rateChange: -0.5, newRate: 0 },
    { rateChange: -0.25, newRate: 0 },
    { rateChange: 0.25, newRate: 0 },
    { rateChange: 0.5, newRate: 0 },
    { rateChange: 1, newRate: 0 },
  ];
}
