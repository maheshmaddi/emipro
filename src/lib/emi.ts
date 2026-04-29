export interface EmiResult {
  emi: number;
  principal: number;
  interest: number;
  totalAmount: number;
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureYears: number
): EmiResult {
  const monthlyRate = annualRate / 12 / 100;
  const tenureMonths = tenureYears * 12;

  let emi = 0;
  if (annualRate === 0) {
    emi = principal / tenureMonths;
  } else {
    emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  }

  const totalAmount = emi * tenureMonths;
  const interest = totalAmount - principal;

  return {
    emi,
    principal,
    interest,
    totalAmount,
  };
}
