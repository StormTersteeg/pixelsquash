import { create } from "zustand";

interface ImageStore {
  images: File[];
  compressedImages: File[];
  setImages: (images: File[]) => void;
  setCompressedImages: (compressedImages: File[]) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  compressedImages: [],
  setImages: (images: File[]) => set({ images }),
  setCompressedImages: (compressedImages: File[]) => set({ compressedImages }),
}));
