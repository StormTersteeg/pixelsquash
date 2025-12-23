import { useEffect, useState, type HTMLAttributes } from "react";
import { useShallow } from "zustand/shallow";
import { useImageStore } from "~/stores/imageStore";
import { useOptionStore } from "~/stores/optionsStore";
import { downloadAsZip } from "~/utils/file";
import ImagePreview from "../imagePreview";
import ImageComparison from "../imageComparison";
import CompressionResult from "../compressionResult";
import { useImageCompression } from "~/hooks/useImageCompression";

export default function ExportCard({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { images, compressedImages, setCompressedImages } = useImageStore(
    useShallow((s) => ({
      images: s.images,
      compressedImages: s.compressedImages,
      setCompressedImages: s.setCompressedImages,
    }))
  );

  const { quality, maxWidth, maxHeight } = useOptionStore(
    useShallow((s) => ({
      quality: s.quality,
      maxWidth: s.maxWidth,
      maxHeight: s.maxHeight,
    }))
  );

  const { compress, progress, isProcessing } = useImageCompression();
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    setCompressedImages([]);
    setPreviewIndex(null);
  }, [images, setCompressedImages]);

  const canShowResult =
    compressedImages.length !== 0 && images.length === compressedImages.length;

  async function process() {
    if (images.length === 0 || isProcessing) return;
    const result = await compress(images, maxWidth, maxHeight, quality);
    if (result.length) setCompressedImages(result);
  }

  return (
    <div
      className={`bg-gray-900 rounded-none sm:rounded-xl p-6 pt-4 w-full ${className ?? ""}`}
    >
      <div className="text-center mb-4">
        <label className="text-xl font-bold">Compress</label>
      </div>

      <div className="flex mb-4">
        <button
          className="btn btn-info w-25 mr-4 shadow-none rounded-xl"
          disabled={images.length === 0 || isProcessing}
          onClick={process}
        >
          SQUASH
        </button>

        <progress
          className="progress progress-info w-75 h-10 grow"
          value={progress}
          max={100}
        />
      </div>

      <button
        className="btn btn-success w-full shadow-none rounded-xl mb-4"
        disabled={!canShowResult || isProcessing}
        onClick={() => downloadAsZip(compressedImages, "images.zip")}
      >
        Download All
      </button>

      {canShowResult && (
        <>
          <CompressionResult original={images} compressed={compressedImages} />

          <ImagePreview
            images={compressedImages}
            onPreview={(_, index) => setPreviewIndex(index)}
          />

          {previewIndex !== null && (
            <ImageComparison
              images={[images[previewIndex], compressedImages[previewIndex]]}
              onClose={() => setPreviewIndex(null)}
            />
          )}
        </>
      )}
    </div>
  );
}
