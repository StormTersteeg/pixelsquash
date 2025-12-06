import { create } from "zustand";

interface OptionStore {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  setQuality: (quality: number) => void;
  setMaxWidth: (maxWidth: number) => void;
  setMaxHeight: (maxHeight: number) => void;
}

export const useOptionStore = create<OptionStore>((set) => ({
  quality: 0.7,
  maxWidth: 0,
  maxHeight: 0,
  setQuality: (quality: number) => set({ quality }),
  setMaxWidth: (maxWidth: number) => set({ maxWidth }),
  setMaxHeight: (maxHeight: number) => set({ maxHeight }),
}));
