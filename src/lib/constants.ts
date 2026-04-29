export const loanDefaults = {
  home: { amount: 3000000, rate: 8.5, tenure: 20 },
  car: { amount: 800000, rate: 9.5, tenure: 5 },
  personal: { amount: 500000, rate: 12, tenure: 3 },
  education: { amount: 1000000, rate: 9, tenure: 7 },
  gold: { amount: 300000, rate: 9, tenure: 2 },
  business: { amount: 2000000, rate: 11, tenure: 5 },
} as const;

export const loanTypeLabels: Record<keyof typeof loanDefaults, { label: string; emoji: string }> = {
  home: { label: "Home Loan", emoji: "🏠" },
  car: { label: "Car Loan", emoji: "🚗" },
  personal: { label: "Personal Loan", emoji: "👤" },
  education: { label: "Education Loan", emoji: "📚" },
  gold: { label: "Gold Loan", emoji: "💰" },
  business: { label: "Business Loan", emoji: "💼" },
};

export const amountChips = [500000, 1000000, 2500000, 5000000, 7500000, 10000000];
export const rateChips = [6, 7, 8, 9, 10, 12];
export const tenureChips = [5, 10, 15, 20, 25, 30];
