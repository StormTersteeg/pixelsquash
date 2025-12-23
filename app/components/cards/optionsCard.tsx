import type { HTMLAttributes } from "react";
import { useShallow } from "zustand/shallow";
import { useGlobalStore } from "~/stores/globalStore";
import { useOptionStore } from "~/stores/optionsStore";

export default function OptionsCard({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const setOverflow = useGlobalStore((state) => state.setOverflow);
  const { quality, setQuality, setMaxWidth, setMaxHeight } = useOptionStore(
    useShallow((s) => ({
      quality: s.quality,
      setQuality: s.setQuality,
      setMaxWidth: s.setMaxWidth,
      setMaxHeight: s.setMaxHeight,
    }))
  );
  const marks = [0, 20, 40, 60, 80, 99];

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
                setQuality(e.target.valueAsNumber / 100);
              }}
            />
            <div className="flex justify-between px-2.5 mt-2 text-xs">
              {marks.map((mark, i) => (
                <span key={i}>{mark}</span>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Max width</legend>
          <label className="input w-full md:w-auto">
            <input
              type="number"
              className="grow"
              placeholder="1280"
              onChange={(e) => setMaxWidth(e.target.valueAsNumber)}
            />
            <span className="badge badge-neutral badge-xs">Optional</span>
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Max height</legend>
          <label className="input w-full md:w-auto">
            <input
              type="number"
              className="grow"
              placeholder="720"
              onChange={(e) => setMaxHeight(e.target.valueAsNumber)}
            />
            <span className="badge badge-neutral badge-xs">Optional</span>
          </label>
        </fieldset>
      </div>
    </div>
  );
}
