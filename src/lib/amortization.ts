import { calculateEMI } from "./emi";

export interface AmortizationEntry {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface YearlyAmortizationEntry {
  year: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  tenureYears: number
): AmortizationEntry[] {
  const monthlyRate = annualRate / 12 / 100;
  const tenureMonths = tenureYears * 12;
  const { emi } = calculateEMI(principal, annualRate, tenureYears);

  const schedule: AmortizationEntry[] = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;

    if (balance < 0) balance = 0;

    schedule.push({
      month,
      emi,
      principal: principalPayment,
      interest: interestPayment,
      balance,
    });
  }

  return schedule;
}

export function generateYearlySchedule(
  principal: number,
  annualRate: number,
  tenureYears: number
): YearlyAmortizationEntry[] {
  const monthlySchedule = generateAmortizationSchedule(principal, annualRate, tenureYears);

  const yearlySchedule: YearlyAmortizationEntry[] = [];
  const monthsPerYear = 12;

  for (let year = 1; year <= tenureYears; year++) {
    const startMonth = (year - 1) * monthsPerYear;
    const endMonth = year * monthsPerYear;

    const yearData = monthlySchedule.slice(startMonth, endMonth);

    const totalEmi = yearData.reduce((sum, entry) => sum + entry.emi, 0);
    const totalPrincipal = yearData.reduce((sum, entry) => sum + entry.principal, 0);
    const totalInterest = yearData.reduce((sum, entry) => sum + entry.interest, 0);
    const balance = yearData[yearData.length - 1]?.balance || 0;

    yearlySchedule.push({
      year,
      emi: totalEmi,
      principal: totalPrincipal,
      interest: totalInterest,
      balance,
    });
  }

  return yearlySchedule;
}

export function generateChartData(
  principal: number,
  annualRate: number,
  tenureYears: number
) {
  const schedule = generateAmortizationSchedule(principal, annualRate, tenureYears);

  return schedule.map((entry) => ({
    month: entry.month,
    balance: entry.balance,
    principal: entry.principal,
    interest: entry.interest,
  }));
}
