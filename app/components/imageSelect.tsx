import { useImageStore } from "~/stores/imageStore";

export default function ImageSelect() {
  const setImages = useImageStore((s) => s.setImages);

  return (
    <div className="w-full">
      <input
        multiple={true}
        type="file"
        accept="image/*"
        onChange={(e) => setImages(Array.from(e.target.files ?? []))}
        className="file-input bg-gray-800 rounded-xl w-full mb-5"
      />
    </div>
  );
}
