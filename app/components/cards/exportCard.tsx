import pkg from "file-saver";
const { saveAs } = pkg;
import JSZip from "jszip";
import { useState, type HTMLAttributes } from "react";
import { useImageStore } from "~/stores/imageStore";
import { useOptionStore } from "~/stores/optionsStore";
import { compressImage } from "~/utils/compression";
import { totalSizeOf } from "~/utils/file";

export default function ExportCard({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const images = useImageStore((s) => s.images);
  const compressedImages = useImageStore((s) => s.compressedImages);
  const setCompressedImages = useImageStore((s) => s.setCompressedImages);

  const quality = useOptionStore((s) => s.quality);
  const maxWidth = useOptionStore((s) => s.maxWidth);
  const maxHeight = useOptionStore((s) => s.maxHeight);

  const [progress, setProgress] = useState(0);

  async function process() {
    if (!images.length) return;

    setProgress(0);
    const compressedFiles: File[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const blob = await compressImage(image, maxWidth, maxHeight, quality);
      const compressedFile = new File([blob], image.name, {
        type: "image/jpeg",
      });
      compressedFiles.push(compressedFile);

      const progressPercentage = ((i + 1) / images.length) * 100;
      setProgress(progressPercentage);
    }

    setCompressedImages(compressedFiles);
  }

  async function download() {
    if (!compressedImages.length) return;

    const zip = new JSZip();

    for (const image of compressedImages) {
      const buffer = await image.arrayBuffer();
      zip.file(image.name, buffer);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "images.zip");
  }

  return (
    <div
      className={`bg-gray-900 rounded-none sm:rounded-xl p-6 py-4 w-full ${className ?? ""}`}
    >
      <div className="text-center mb-4">
        <label className="text-xl font-bold">Compress</label>
      </div>

      <div className="flex mb-4">
        <button
          className="btn btn-info w-25 mr-4 shadow-none rounded-xl"
          onClick={process}
        >
          SQUASH
        </button>

        <progress
          className="progress progress-info w-75 h-10 grow"
          value={progress}
          max={100}
        ></progress>
      </div>

      <button
        className={`btn btn-success w-full shadow-none rounded-xl mb-4`}
        disabled={
          compressedImages.length == 0 ||
          images.length != compressedImages.length
        }
        onClick={download}
      >
        Download
      </button>

      <div
        role="alert"
        className={`alert alert-success alert-dash ${images.length == compressedImages.length ? "" : "hidden"}`}
      >
        <span>
          From {(totalSizeOf(images) / 1000000).toFixed(2) + "MB"} to{" "}
          {(totalSizeOf(compressedImages) / 1000000).toFixed(2) + "MB"} (
          {(
            (totalSizeOf(compressedImages) / totalSizeOf(images)) *
            100
          ).toFixed(0)}
          %)
        </span>
      </div>
    </div>
  );
}
