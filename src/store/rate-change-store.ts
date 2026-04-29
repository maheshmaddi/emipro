import { create } from "zustand";

interface RateChangeState {
  amount: number;
  currentRate: number;
  tenure: number;
  monthsCompleted: number;
  keepEmiSame: boolean;
  setAmount: (amount: number) => void;
  setCurrentRate: (rate: number) => void;
  setTenure: (tenure: number) => void;
  setMonthsCompleted: (months: number) => void;
  setKeepEmiSame: (keep: boolean) => void;
  reset: () => void;
}

const defaultState = {
  amount: 3000000,
  currentRate: 8.5,
  tenure: 20,
  monthsCompleted: 36,
  keepEmiSame: false, // Default to keeping tenure same
};

export const useRateChangeStore = create<RateChangeState>((set) => ({
  ...defaultState,
  setAmount: (amount) => set({ amount }),
  setCurrentRate: (rate) => set({ currentRate: rate }),
  setTenure: (tenure) => set({ tenure }),
  setMonthsCompleted: (months) => set({ monthsCompleted: months }),
  setKeepEmiSame: (keep) => set({ keepEmiSame: keep }),
  reset: () => set(defaultState),
}));
