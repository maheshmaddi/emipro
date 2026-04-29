import { create } from "zustand";
import { LoanOption } from "@/lib/comparison";

interface CompareState {
  loans: LoanOption[];
  updateLoan: (id: string, updates: Partial<Omit<LoanOption, "id">>) => void;
  addLoan: () => void;
  removeLoan: (id: string) => void;
  resetLoans: () => void;
}

const defaultLoans: LoanOption[] = [
  { id: "A", name: "Loan A", amount: 3000000, rate: 8.5, tenure: 20 },
  { id: "B", name: "Loan B", amount: 3000000, rate: 9.2, tenure: 15 },
];

export const useCompareStore = create<CompareState>((set) => ({
  loans: defaultLoans,
  updateLoan: (id, updates) =>
    set((state) => ({
      loans: state.loans.map((loan) =>
        loan.id === id ? { ...loan, ...updates } : loan
      ),
    })),
  addLoan: () =>
    set((state) => {
      if (state.loans.length >= 3) return state;
      const nextId = String.fromCharCode(65 + state.loans.length); // A, B, C
      return {
        loans: [
          ...state.loans,
          { id: nextId, name: `Loan ${nextId}`, amount: 3000000, rate: 9, tenure: 20 },
        ],
      };
    }),
  removeLoan: (id) =>
    set((state) => ({
      loans: state.loans.filter((loan) => loan.id !== id),
    })),
  resetLoans: () => set({ loans: defaultLoans }),
}));
