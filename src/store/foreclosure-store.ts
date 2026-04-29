import { create } from "zustand";

interface ForeclosureState {
  amount: number;
  rate: number;
  tenure: number;
  foreclosureAtMonth: number;
  prepaymentPenaltyPercent: number;
  setAmount: (amount: number) => void;
  setRate: (rate: number) => void;
  setTenure: (tenure: number) => void;
  setForeclosureAtMonth: (month: number) => void;
  setPrepaymentPenalty: (penalty: number) => void;
  reset: () => void;
}

const defaultState = {
  amount: 3000000,
  rate: 8.5,
  tenure: 20,
  foreclosureAtMonth: 60,
  prepaymentPenaltyPercent: 2,
};

export const useForeclosureStore = create<ForeclosureState>((set) => ({
  ...defaultState,
  setAmount: (amount) => set({ amount }),
  setRate: (rate) => set({ rate }),
  setTenure: (tenure) => set({ tenure }),
  setForeclosureAtMonth: (month) => set({ foreclosureAtMonth: month }),
  setPrepaymentPenalty: (penalty) => set({ prepaymentPenaltyPercent: penalty }),
  reset: () => set(defaultState),
}));
