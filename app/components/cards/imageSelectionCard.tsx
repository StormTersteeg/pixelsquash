import type { HTMLAttributes } from "react";
import ImageSelect from "../imageSelect";

export default function ImageSelectionCard({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-gray-900 rounded-none sm:rounded-xl p-6 pt-4 pb-6 w-full ${className}`}
    >
      <div className="text-center mb-4">
        <label className="text-xl font-bold">Select images</label>
      </div>
      <ImageSelect />
    </div>
  );
}
