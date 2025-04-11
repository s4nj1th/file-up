"use client";
import { useState } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export default function AboutQn() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowTooltip((prev) => !prev)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="text-[var(--accent-color)]"
      >
        <BsFillQuestionCircleFill size={15} />
      </button>

      {showTooltip && (
        <div className="absolute top-full mt-2 right-0 w-[200px] bg-[var(--sec-bg-opq)] text-sm p-2 rounded shadow-lg z-10">
          <div className="absolute -top-2 right-0 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[var(--sec-bg-opq)]"></div>
          Files you upload are all public. Uploads stay up for a given time
          depending upon their size.
        </div>
      )}
    </div>
  );
}
