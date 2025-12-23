import { totalSizeOf } from "~/utils/file";

type Props = {
  original: File[];
  compressed: File[];
};

export default function CompressionResult({ original, compressed }: Props) {
  const originalMB = totalSizeOf(original) / 1_000_000;
  const compressedMB = totalSizeOf(compressed) / 1_000_000;
  const savedPct = originalMB > 0 ? 100 - (compressedMB / originalMB) * 100 : 0;

  return (
    <div role="alert" className="alert alert-success alert-dash mb-4">
      <span>
        From {originalMB.toFixed(2)}MB to {compressedMB.toFixed(2)}MB (
        {savedPct.toFixed(0)}%)
      </span>
    </div>
  );
}
