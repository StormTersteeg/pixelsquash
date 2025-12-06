import type { HTMLAttributes } from "react";
import ImageSelect from "../imageSelect";
import ImagePreview from "../imagePreview";
import { useImageStore } from "~/stores/imageStore";

export default function ImageSelectionCard({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const setImages = useImageStore((s) => s.setImages);
  const images = useImageStore((s) => s.images);

  return (
    <div
      className={`bg-gray-900 rounded-none sm:rounded-xl p-6 pt-4 pb-6 w-full ${className}`}
    >
      <div className="text-center mb-4">
        <label className="text-xl font-bold">Select images</label>
      </div>
      <ImageSelect />
      <ImagePreview images={images} setImages={setImages} />
    </div>
  );
}
