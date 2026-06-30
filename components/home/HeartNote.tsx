"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import BloomFlower from "./heart/BloomFlower";
import PetalExplosion from "./heart/PetalExplosion";
import LetterPaper from "./heart/LetterPaper";
type HeartNoteProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string;
};

export default function HeartNote({
  open,
  onClose,
  title,
  body,
}: HeartNoteProps) {
    const [phase, setPhase] = useState(0);

    useEffect(() => {

        if (!open) {
            setPhase(0);
            return;
        }

        const timers = [

            setTimeout(() => setPhase(1), 100),   // ❤️ flies

            setTimeout(() => setPhase(2), 650),   // ❤️ beats

            setTimeout(() => setPhase(3), 1200),  // ✨ sparkles

            setTimeout(() => setPhase(4), 1750),  // 🌸 flower

            setTimeout(() => setPhase(5), 2400),  // 💥 explosion

            setTimeout(() => setPhase(6), 3100),  // 📜 paper rises

            setTimeout(() => setPhase(7), 3800),  // 📖 unfold

            setTimeout(() => setPhase(8), 4300),  // ✍ typing

        ];

        return () => timers.forEach(clearTimeout);

    }, [open]);
  return (
    <AnimatePresence>
        {open && (
            <motion.div
            className="heart-overlay"

            initial={{
                opacity:0,
                backdropFilter:"blur(0px)"
            }}

            animate={{
                opacity:1,
                backdropFilter:"blur(12px)"
            }}

            exit={{
                opacity:0,
                backdropFilter:"blur(0px)"
            }}

            transition={{
                duration:.45
            }}
        >
                <button
                className="heart-close"
                onClick={onClose}
                >
                <X size={20} />
                </button>
                <div className="heart-stage" onClick={(e)=>e.stopPropagation()}>

                    <BloomFlower phase={phase} />

                    <PetalExplosion phase={phase} />

                    <LetterPaper
                        phase={phase}
                        title={title}
                        body={body}
                    />

                </div>

            </motion.div>
        )}
    </AnimatePresence>
  );
}