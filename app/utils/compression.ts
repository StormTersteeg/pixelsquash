export function compressImage(
  file: File,
  maxWidth?: number | null,
  maxHeight?: number | null,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;

        const safeMaxWidth = maxWidth && maxWidth > 0 ? maxWidth : imgWidth;
        const safeMaxHeight =
          maxHeight && maxHeight > 0 ? maxHeight : imgHeight;

        const widthScale = safeMaxWidth / imgWidth;
        const heightScale = safeMaxHeight / imgHeight;
        const scale = Math.min(widthScale, heightScale, 1);

        const width = Math.max(1, Math.round(imgWidth * scale));
        const height = Math.max(1, Math.round(imgHeight * scale));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context not available"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const q =
          typeof quality === "number" && quality >= 0 && quality <= 1
            ? quality
            : 0.8;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Compression failed: empty blob"));
              return;
            }
            resolve(blob);
          },
          "image/jpeg",
          q
        );
      };
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("File reading failed"));
    reader.readAsDataURL(file);
  });
}
