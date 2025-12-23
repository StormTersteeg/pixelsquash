import { useEffect, useMemo } from "react";
import { download } from "~/utils/file";

type Props = {
  images: File[];
  setImages?: (images: File[]) => void;
  onPreview?: (file: File, index: number) => void;
};

export default function ImagePreview({ images, setImages, onPreview }: Props) {
  const urls = useMemo(
    () => images.map((file) => URL.createObjectURL(file)),
    [images]
  );

  useEffect(() => {
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [urls]);

  return (
    <div className="bg-gray-800 p-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8 rounded-xl max-h-[384px] min-h-[256px] overflow-y-auto">
      {images.map((f, index) => (
        <div className="relative" key={`${f.name}-${f.lastModified}`}>
          <img className="rounded-md" src={urls[index]} alt={f.name} />

          {setImages ? (
            <div
              className="tooltip absolute top-0 right-0 m-1"
              data-tip="Remove"
            >
              <button
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="btn btn-xs bg-red-700 border-none shadow-none"
              >
                ×
              </button>
            </div>
          ) : (
            onPreview && (
              <>
                <button
                  onClick={() => onPreview(f, index)}
                  className="btn btn-xs btn-info absolute top-0 right-0 m-1 shadow-none"
                >
                  ▭
                </button>
                <button
                  onClick={() => download(f)}
                  className="btn btn-xs btn-success absolute top-9 right-0 m-1 shadow-none min-w-[29.4167px]"
                >
                  ↓
                </button>
              </>
            )
          )}
        </div>
      ))}
    </div>
  );
}
