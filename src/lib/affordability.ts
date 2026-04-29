import { calculateEMI } from "./emi";

export interface AffordabilityInput {
  monthlyIncome: number;
  existingEMIs: number;
  rate: number;
  tenure: number;
}

export interface AffordabilityResult {
  maxLoanAmount: number;
  resultingEMI: number;
  dtiRatio: number;
  dtiStatus: "healthy" | "caution" | "high";
  maxEMI: number;
}

export function calculateAffordability(
  input: AffordabilityInput,
  targetDTI = 50
): AffordabilityResult {
  // Calculate max EMI based on DTI target
  const maxEMI = (input.monthlyIncome * targetDTI) / 100 - input.existingEMIs;

  // If max EMI is too low, return conservative values
  if (maxEMI <= 0) {
    return {
      maxLoanAmount: 0,
      resultingEMI: 0,
      dtiRatio: 0,
      dtiStatus: "high",
      maxEMI: 0,
    };
  }

  // Binary search to find max loan amount
  let low = 0;
  let high = 100000000; // 10 crore max
  let maxLoan = 0;

  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    const result = calculateEMI(mid, input.rate, input.tenure);

    if (result.emi <= maxEMI) {
      maxLoan = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  const finalResult = calculateEMI(maxLoan, input.rate, input.tenure);
  const dtiRatio = ((finalResult.emi + input.existingEMIs) / input.monthlyIncome) * 100;

  let dtiStatus: "healthy" | "caution" | "high" = "healthy";
  if (dtiRatio > 50) dtiStatus = "high";
  else if (dtiRatio > 40) dtiStatus = "caution";

  return {
    maxLoanAmount: maxLoan,
    resultingEMI: finalResult.emi,
    dtiRatio,
    dtiStatus,
    maxEMI,
  };
}
