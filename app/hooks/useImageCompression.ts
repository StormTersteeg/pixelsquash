import { useState } from "react";
import { compressImage } from "~/utils/compression";

export function useImageCompression() {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  async function compress(
    images: File[],
    maxWidth?: number,
    maxHeight?: number,
    quality?: number
  ) {
    if (isProcessing) return [];

    setIsProcessing(true);
    setProgress(0);

    const result: File[] = [];

    for (let i = 0; i < images.length; i++) {
      const blob = await compressImage(images[i], maxWidth, maxHeight, quality);
      result.push(new File([blob], images[i].name, { type: "image/jpeg" }));

      if (i === images.length - 1 || i % 3 === 0) {
        setProgress(((i + 1) / images.length) * 100);
      }
    }

    setIsProcessing(false);
    return result;
  }

  return { compress, progress, isProcessing };
}
