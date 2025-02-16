import { useState } from "react";
import graph from "../assets/desmos-graph.svg";

export default function Info() {
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
    <div className="info">
      <img src={String(graph)} className="graph" />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="size"
          id="fileSize"
          min="0"
          max="512"
          value={fileSize}
          onChange={handleChange}
          placeholder="Enter file size in MiB"
          className="file-size-inp"
        />
        <br />
        <button
          type="submit"
          className="file-size-btn"
        >
          Calculate Lifetime
        </button>
      </form>
      {lifetimeValue !== null && (
        <p className="">
          Estimated file lifetime: {lifetimeValue.toFixed(2)} days
        </p>
      )}
    </div>
  );
}
