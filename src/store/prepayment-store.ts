import { create } from "zustand";
import { PrepaymentInput, OneTimePrepayment } from "@/lib/prepayment";

interface PrepaymentState {
  baseLoan: PrepaymentInput;
  oneTimePrepayments: OneTimePrepayment[];
  monthlyExtra: number;
  reduceTenure: boolean;
  setBaseLoan: (loan: PrepaymentInput) => void;
  setBaseLoanAmount: (amount: number) => void;
  setBaseLoanRate: (rate: number) => void;
  setBaseLoanTenure: (tenure: number) => void;
  addOneTimePrepayment: (prepayment: OneTimePrepayment) => void;
  updateOneTimePrepayment: (index: number, prepayment: OneTimePrepayment) => void;
  removeOneTimePrepayment: (index: number) => void;
  setMonthlyExtra: (amount: number) => void;
  setReduceTenure: (reduce: boolean) => void;
  reset: () => void;
}

const defaultBaseLoan: PrepaymentInput = {
  amount: 3000000,
  rate: 8.5,
  tenure: 20,
};

export const usePrepaymentStore = create<PrepaymentState>((set) => ({
  baseLoan: defaultBaseLoan,
  oneTimePrepayments: [],
  monthlyExtra: 0,
  reduceTenure: true,
  setBaseLoan: (loan) => set({ baseLoan: loan }),
  setBaseLoanAmount: (amount) =>
    set((state) => ({ baseLoan: { ...state.baseLoan, amount } })),
  setBaseLoanRate: (rate) =>
    set((state) => ({ baseLoan: { ...state.baseLoan, rate } })),
  setBaseLoanTenure: (tenure) =>
    set((state) => ({ baseLoan: { ...state.baseLoan, tenure } })),
  addOneTimePrepayment: (prepayment) =>
    set((state) => ({
      oneTimePrepayments: [...state.oneTimePrepayments, prepayment],
    })),
  updateOneTimePrepayment: (index, prepayment) =>
    set((state) => ({
      oneTimePrepayments: state.oneTimePrepayments.map((p, i) =>
        i === index ? prepayment : p
      ),
    })),
  removeOneTimePrepayment: (index) =>
    set((state) => ({
      oneTimePrepayments: state.oneTimePrepayments.filter((_, i) => i !== index),
    })),
  setMonthlyExtra: (amount) => set({ monthlyExtra: amount }),
  setReduceTenure: (reduce) => set({ reduceTenure: reduce }),
  reset: () => ({
    baseLoan: defaultBaseLoan,
    oneTimePrepayments: [],
    monthlyExtra: 0,
    reduceTenure: true,
  }),
}));
