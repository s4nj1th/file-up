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

  /*
    min_age = 30 days
    max_age = 1 year
    max_size = 512.0 MiB
    retention = min_age + (min_age - max_age) * pow((file_size / max_size - 1), 3)
    */

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
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="size"
          id="fileSize"
          value={fileSize}
          onChange={handleChange}
          placeholder="Enter file size in MiB"
        />
        <br />
        <button type="submit">Calculate Lifetime</button>
      </form>
      {lifetimeValue !== null && (
        <p className="lifetime">
          Estimated file lifetime: {lifetimeValue.toFixed(2)} days
        </p>
      )}
    </div>
  );
}
