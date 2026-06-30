"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Flower2 } from "lucide-react";
import { useEffect, useState } from "react";
import BloomFlower from "./BloomFlower";
import WelcomeButton from "./WelcomeButton";
import WelcomeSlide from "./WelcomeSlide";

const slides = [
  ["Hi Palak."],
  ["Before anything else…", "I'm really glad you're here."],
  ["I know the last few months have been difficult."],
  ["I watched how hard you worked."],
  ["I know how much you gave."],
  ["And I also know that one result cannot measure that."],
  ["So…"],
  ["I wanted to make something for you."],
  ["Not another study planner."],
  ["Not another productivity app."],
  ["Just a place where you can breathe."],
  ["A place that reminds you who you are on the days you forget."],
] as const;

const durations = [4300, 4300, 2900, 2700, 2700, 3300, 2300, 2900, 2600, 2700, 2900, 3500];

export default function WelcomeExperience({ onBegin }: { onBegin: () => void }) {
  const [slide, setSlide] = useState(0);
  const final = slide === slides.length;

  useEffect(() => {
    if (final) return;
    const timeout = window.setTimeout(() => setSlide((current) => current + 1), durations[slide]);
    return () => window.clearTimeout(timeout);
  }, [slide, final]);

  return (
    <motion.section className="welcome-experience" role="dialog" aria-modal="true" aria-label="Welcome to Bloom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(8px)" }} transition={{ duration: 1 }}>
      <div className="welcome-light" />
      <div className="welcome-drift" aria-hidden="true">{Array.from({ length: 6 }).map((_, petal) => <motion.i key={petal} animate={{ y: [0, 30, 0], x: [0, petal % 2 ? 12 : -10, 0], rotate: [0, 70, 130], opacity: [.08, .24, .08] }} transition={{ duration: 11 + petal * 1.8, delay: petal * 1.4, repeat: Infinity, ease: "easeInOut" }} />)}</div>
      <div className="welcome-stage" aria-live="polite">
        <AnimatePresence mode="wait">
          {!final ? (
            <motion.div className="welcome-slide" key={slide}>
              {slide === 0 && <BloomFlower />}
              <WelcomeSlide lines={[...slides[slide]]} quiet={slide === 6} delay={slide === 0 ? 2 : .35} />
            </motion.div>
          ) : (
            <motion.div className="welcome-final" key="final" initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1.2 }}>
              <BloomFlower full />
              <motion.div className="welcome-logo" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65, duration: .9 }}><span><Flower2 size={18} /></span>Bloom</motion.div>
              <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9, duration: .9 }}>Welcome to Bloom.</motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: .9 }}>Made with love.<br />Only for you.</motion.p>
              <WelcomeButton onClick={onBegin} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
