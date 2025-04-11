"use client";
import { useState } from "react";

export default function CalcLife() {
  const [fileSize, setFileSize] = useState<number | "">("");
  const [lifetimeValue, setLifetimeValue] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setFileSize(isNaN(value) ? "" : value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (typeof fileSize === "number") {
      setLifetimeValue(lifetime(fileSize));
    }
  };

  function lifetime(x: number): number {
    const minAge = 30; // days
    const maxAge = 365; // days
    const maxSize = 512.0; // MiB
    return minAge + (minAge - maxAge) * Math.pow(x / maxSize - 1, 3);
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="number"
          name="size"
          id="fileSize"
          min="0"
          max="512"
          value={fileSize}
          onChange={handleChange}
          className="w-full flex-grow px-2 py-2 rounded"
          placeholder="Enter file size in MiB"
        />
        <button type="submit" className="btn flex-grow w-full">
          Calculate Lifetime
        </button>
      </form>
      {lifetimeValue !== null && (
        <p className="mt-4 text-center">
          Estimated file lifetime: <span className="font-bold text-[var(--accent-color)] text-xl">{lifetimeValue.toFixed(2)}</span> days
        </p>
      )}
    </div>
  );
}
