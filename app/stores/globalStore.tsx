import { create } from "zustand";

interface GlobalStore {
  overflow: boolean;
  setOverflow: (overflow: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  overflow: true,
  setOverflow: (overflow: boolean) => set({ overflow }),
}));
