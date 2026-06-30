"use client";

import { motion } from "framer-motion";

export default function BloomFlower({ full = false }: { full?: boolean }) {
  return (
    <motion.div className={full ? "welcome-flower full" : "welcome-flower"} initial={{ opacity: 0, scale: .55, filter: "blur(7px)" }} animate={{ opacity: 1, scale: full ? 1.08 : 1, filter: "blur(0px)" }} transition={{ duration: full ? 1.8 : 2, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true">
      <span className="flower-center" />
      {Array.from({ length: 8 }).map((_, petal) => (
        <motion.i key={petal} className="welcome-petal" initial={{ scale: .25, opacity: 0, rotate: petal * 45 }} animate={{ scale: full ? 1.08 : 1, opacity: .92, rotate: petal * 45 }} transition={{ duration: 1.5, delay: .15 + petal * .08, ease: [0.22, 1, 0.36, 1] }} />
      ))}
      <motion.span className="flower-glow" animate={{ opacity: [.22, .48, .22], scale: [.92, 1.08, .92] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
    </motion.div>
  );
}
