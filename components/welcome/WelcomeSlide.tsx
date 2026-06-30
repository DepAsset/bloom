"use client";

import { motion } from "framer-motion";

type Props = {
  lines: string[];
  quiet?: boolean;
  delay?: number;
};

export default function WelcomeSlide({ lines, quiet = false, delay = .35 }: Props) {
  return (
    <motion.div className={quiet ? "welcome-copy quiet" : "welcome-copy"} initial={{ opacity: 0, scale: .985, filter: "blur(9px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.012, filter: "blur(8px)" }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}>
      {lines.map((line, index) => <motion.p key={line} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay + index * 1.35, duration: 1 }}>{line}</motion.p>)}
    </motion.div>
  );
}
