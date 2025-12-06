import type { HTMLAttributes } from "react";
import { useOptionStore } from "~/stores/optionsStore";
import type CompressionQuality from "~/types/compressionQuality";
import { CompressionQualityRange } from "~/types/compressionQuality";

export default function OptionsCard({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const setQuality = useOptionStore((s) => s.setQuality);
  const setMaxWidth = useOptionStore((s) => s.setMaxWidth);
  const setMaxHeight = useOptionStore((s) => s.setMaxHeight);

  return (
    <div
      className={`bg-gray-900 rounded-none sm:rounded-xl p-6 py-4 w-full ${className}`}
    >
      <div className="text-center mb-4">
        <label className="text-xl font-bold">Options</label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Quality</legend>
          <select
            defaultValue={CompressionQualityRange[3].value}
            className="select w-full md:w-auto"
            onChange={(e) => setQuality(parseFloat(e.target.value))}
          >
            {CompressionQualityRange.map((n: CompressionQuality) => (
              <option key={n.name} value={n.value}>
                {n.name} {n.value == 0.7 ? "(Recommended)" : ""}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Max width</legend>
          <label className="input w-full md:w-auto">
            <input
              type="text"
              className="grow"
              placeholder="1280"
              onChange={(e) => setMaxWidth(parseInt(e.target.value))}
            />
            px
          </label>
          <span className="label">Optional</span>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Max height</legend>
          <label className="input w-full md:w-auto">
            <input
              type="text"
              className="grow"
              placeholder="720"
              onChange={(e) => setMaxHeight(parseInt(e.target.value))}
            />
            px
          </label>
          <span className="label">Optional</span>
        </fieldset>
      </div>
    </div>
  );
}
