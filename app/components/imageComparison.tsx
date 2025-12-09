import React, { useState, useRef, useMemo, useEffect } from "react";
import { useGlobalStore } from "~/stores/globalStore";

type Props = {
  images: File[];
  onClose: () => void;
};

export default function ImageComparison({ images, onClose }: Props) {
  const setOverflow = useGlobalStore((state) => state.setOverflow);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setOverflow(false);
    return () => {
      setOverflow(true);
    };
  }, [setOverflow]);

  const urls = useMemo(
    () => images.map((f) => URL.createObjectURL(f)),
    [images]
  );

  useEffect(
    () => () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    },
    [urls]
  );

  if (images.length < 2) return null;

  const handlePositionFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    setPosition(ratio * 100);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handlePositionFromClientX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handlePositionFromClientX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handlePositionFromClientX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handlePositionFromClientX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-gray-900 rounded-xl shadow-xl max-w-5xl w-full mx-4 p-6">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-circle btn-ghost absolute right-4 top-4 text-2xl"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold text-gray-100 mb-4">
          Image Comparison
        </h2>
        <div
          ref={containerRef}
          className="relative w-full h-96 overflow-hidden rounded-lg bg-gray-800 cursor-col-resize select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={urls[0]}
            alt={images[0].name}
            className="absolute inset-0 w-full h-full object-contain u"
            draggable="false"
          />
          <img
            src={urls[1]}
            alt={images[1].name}
            className="absolute inset-0 w-full h-full object-contain"
            draggable="false"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          />
          <div
            className="absolute top-0 bottom-0"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div className="h-full w-0.5 bg-white/70" />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1">
              <span className="badge badge-sm badge-neutral">Drag</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-3">
          <span>Compressed</span>
          <span>Original</span>
        </div>
      </div>
    </div>
  );
}
