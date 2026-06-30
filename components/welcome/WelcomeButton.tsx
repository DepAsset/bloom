"use client";

import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

export default function WelcomeButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button className="welcome-button" onClick={onClick} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.65, duration: .9 }} whileHover={{ y: -2, scale: 1.015 }} whileTap={{ scale: .985 }} autoFocus>
      <Flower2 size={16} /> Begin
    </motion.button>
  );
}
