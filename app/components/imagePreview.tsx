type Props = {
  images: File[];
  setImages: (images: File[]) => void;
};

export default function ImagePreview({ images, setImages }: Props) {
  return (
    <div className="bg-gray-800 p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8 rounded-xl max-h-[384px] min-h-[256px] overflow-y-auto">
      {images.map((f) => (
        <div className="relative" key={f.name}>
          <img
            className="rounded-md"
            key={f.name}
            src={URL.createObjectURL(f)}
            alt={f.name}
          />
          <button
            onClick={() => setImages(images.filter((o) => o.name != f.name))}
            className="btn btn-xs bg-red-700 border-none absolute top-0 right-0 m-1 shadow-none"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
