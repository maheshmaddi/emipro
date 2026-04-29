import { create } from "zustand";
import { RefinanceInput } from "@/lib/refinance";

interface RefinanceState {
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
  setCurrentLoanAmount: (amount: number) => void;
  setCurrentLoanRate: (rate: number) => void;
  setCurrentLoanTenure: (tenure: number) => void;
  setCurrentLoanMonthsCompleted: (months: number) => void;
  setNewLoanRate: (rate: number) => void;
  setNewLoanTenure: (tenure: number) => void;
  setNewLoanProcessingFee: (fee: number) => void;
  reset: () => void;
}

const defaultCurrentLoan = {
  amount: 3000000,
  rate: 8.5,
  tenure: 20,
  monthsCompleted: 36,
};

const defaultNewLoan = {
  rate: 7.2,
  tenure: 20,
  processingFeePercent: 0.5,
};

export const useRefinanceStore = create<RefinanceState>((set) => ({
  currentLoan: defaultCurrentLoan,
  newLoan: defaultNewLoan,
  setCurrentLoanAmount: (amount) =>
    set((state) => ({ currentLoan: { ...state.currentLoan, amount } })),
  setCurrentLoanRate: (rate) =>
    set((state) => ({ currentLoan: { ...state.currentLoan, rate } })),
  setCurrentLoanTenure: (tenure) =>
    set((state) => ({ currentLoan: { ...state.currentLoan, tenure } })),
  setCurrentLoanMonthsCompleted: (months) =>
    set((state) => ({ currentLoan: { ...state.currentLoan, monthsCompleted: months } })),
  setNewLoanRate: (rate) =>
    set((state) => ({ newLoan: { ...state.newLoan, rate } })),
  setNewLoanTenure: (tenure) =>
    set((state) => ({ newLoan: { ...state.newLoan, tenure } })),
  setNewLoanProcessingFee: (fee) =>
    set((state) => ({ newLoan: { ...state.newLoan, processingFeePercent: fee } })),
  reset: () => ({
    currentLoan: defaultCurrentLoan,
    newLoan: defaultNewLoan,
  }),
}));
