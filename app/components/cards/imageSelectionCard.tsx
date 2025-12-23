import type { HTMLAttributes } from "react";
import ImageSelect from "../imageSelect";
import ImagePreview from "../imagePreview";
import { useImageStore } from "~/stores/imageStore";
import { useShallow } from "zustand/shallow";

export default function ImageSelectionCard({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { images, setImages } = useImageStore(
    useShallow((s) => ({
      images: s.images,
      setImages: s.setImages,
    }))
  );

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
