import type { HTMLAttributes } from "react";
import { useGlobalStore } from "~/stores/globalStore";
import { useOptionStore } from "~/stores/optionsStore";

export default function OptionsCard({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const setOverflow = useGlobalStore((state) => state.setOverflow);
  const quality = useOptionStore((s) => s.quality);
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
          <legend className="fieldset-legend">
            Quality {(quality * 100).toFixed(0)}%
          </legend>
          <div className="w-full">
            <input
              type="range"
              min={0}
              max={99}
              step={1}
              className="range w-full"
              value={quality * 100}
              onPointerDown={() => setOverflow(false)}
              onPointerUp={() => setOverflow(true)}
              onPointerCancel={() => setOverflow(true)}
              onChange={(e) => {
                setQuality(parseInt(e.target.value) / 100);
              }}
            />
            <div className="flex justify-between px-2.5 mt-2 text-xs">
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i}>{i != 5 ? i * 20 : 99}</span>
              ))}
            </div>
          </div>
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
            <span className="badge badge-neutral badge-xs">Optional</span>
          </label>
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
            <span className="badge badge-neutral badge-xs">Optional</span>
          </label>
        </fieldset>
      </div>
    </div>
  );
}
