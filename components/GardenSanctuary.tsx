"use client";

import { motion } from "framer-motion";
import { Flower2, Leaf, Sprout } from "lucide-react";

export default function GardenSanctuary({ growth }: { growth: number }) {
  const visible = Math.max(5, Math.min(24, 5 + growth));
  const mature = growth >= 12;
  return <div className="living-garden">
    <motion.div className="garden-light" animate={{ x: [-20, 25, -20], opacity: [.35, .6, .35] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
    {mature && <motion.div className="garden-tree" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}><span /><Leaf /><Leaf /><Leaf /></motion.div>}
    <div className="garden-plants">{Array.from({ length: visible }).map((_, index) => {
      const stage = Math.max(0, Math.min(2, growth - index + 2));
      const Plant = stage === 0 ? Sprout : stage === 1 ? Leaf : Flower2;
      return <motion.div key={index} className={`garden-plant plant-${index % 6} stage-${stage}`} initial={{ scale: 0, y: 22 }} animate={{ scale: 1, y: [0, index % 2 ? -2 : 2, 0], rotate: [0, index % 2 ? 1.5 : -1.5, 0] }} transition={{ scale: { delay: index * .045, duration: .7 }, y: { duration: 6 + index % 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 7 + index % 3, repeat: Infinity, ease: "easeInOut" } }}><i /><Plant /></motion.div>;
    })}</div>
    {growth >= 5 && <motion.div className="garden-butterfly one" animate={{ x: [0, 90, 15], y: [0, -35, 8], rotate: [0, 8, -5] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}><i /><i /></motion.div>}
    {growth >= 8 && <motion.div className="garden-bee" animate={{ x: [0, -70, 20], y: [0, 25, -18] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}>•</motion.div>}
    <div className="garden-whisper"><strong>{growth ? "Your care is taking root." : "The soil is ready for you."}</strong><span>{mature ? "Something strong is growing quietly here." : "Every gentle return leaves something living behind."}</span></div>
  </div>;
}
