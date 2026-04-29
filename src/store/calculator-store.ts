import { create } from "zustand";
import { loanDefaults } from "@/lib/constants";

interface LoanConfig {
  amount: number;
  rate: number;
  tenure: number;
}

interface CalculatorState {
  loanType: keyof typeof loanDefaults;
  loanConfig: LoanConfig;
  setLoanType: (type: keyof typeof loanDefaults) => void;
  setAmount: (amount: number) => void;
  setRate: (rate: number) => void;
  setTenure: (tenure: number) => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  loanType: "home",
  loanConfig: loanDefaults.home,
  setLoanType: (type) => set({ loanType: type, loanConfig: loanDefaults[type] }),
  setAmount: (amount) => set((state) => ({ loanConfig: { ...state.loanConfig, amount } })),
  setRate: (rate) => set((state) => ({ loanConfig: { ...state.loanConfig, rate } })),
  setTenure: (tenure) => set((state) => ({ loanConfig: { ...state.loanConfig, tenure } })),
}));
