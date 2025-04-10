"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export default function DownArrow() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: showScrollHint ? 1 : 0, y: showScrollHint ? 0 : 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute left-[50vw] bottom-25 flex flex-col items-center justify-center"
    >
      <FiChevronDown className="text-2xl text-[var(--accent-color)] animate-bounce" />
    </motion.div>
  );
}
