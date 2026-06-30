"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Season = "spring" | "summer" | "autumn" | "winter";

function currentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

export default function LivingBackground() {
  const season = useMemo(currentSeason, []);
  return (
    <div className={`living-background season-${season}`} aria-hidden="true">
      <motion.div className="season-art" initial={{ opacity: 0 }} animate={{ opacity: .64 }} transition={{ duration: 1.8 }} />
      <motion.div className="sun-wash" animate={{ x: ["-8%", "8%", "-8%"], opacity: [.25, .48, .25] }} transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }} />
      <div className="pollen">{Array.from({ length: 9 }).map((_, index) => <motion.i key={index} animate={{ y: [0, -42, 0], x: [0, index % 2 ? 13 : -10, 0], opacity: [.08, .3, .08] }} transition={{ duration: 13 + index * 1.7, delay: index * 1.9, repeat: Infinity, ease: "easeInOut" }} />)}</div>
      <motion.div className="quiet-butterfly" initial={{ x: "-12vw", y: "62vh", opacity: 0 }} animate={{ x: ["-12vw", "45vw", "112vw"], y: ["62vh", "48vh", "32vh"], opacity: [0, .28, 0] }} transition={{ duration: 34, delay: 42, repeat: Infinity, repeatDelay: 145, ease: "linear" }}><i /><i /></motion.div>
    </div>
  );
}
