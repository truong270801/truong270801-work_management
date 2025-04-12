import { create } from 'zustand';

export const useStateApi = create((set) => ({
  shouldFetch: false,
  toggleFetch: () => set((state) => ({ shouldFetch: !state.shouldFetch })),
}));
