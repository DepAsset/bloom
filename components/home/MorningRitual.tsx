"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CloudRain, Flower2, Leaf, Sparkles, Sprout, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { DailyRitual } from "@/data/daily";

type Props = {
  ritual: DailyRitual;
  onClose: () => void;
  onReady: () => void;
  firstVisit?: boolean;
};

export default function MorningRitual({ ritual, onClose, onReady, firstVisit = false }: Props) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (step >= ritual.messages.length) return;
    const timer = window.setTimeout(() => setStep((current) => current + 1), 1450);
    return () => window.clearTimeout(timer);
  }, [step, ritual.messages.length]);

  const begin = () => {
    setLeaving(true);
    window.setTimeout(onReady, 900);
  };

  const journeyIcons = ritual.journey === "rain" ? [CloudRain, Sprout, Flower2] : ritual.journey === "light" ? [Sparkles, Leaf, Flower2] : [Sprout, Leaf, Flower2];
  const Icon = journeyIcons[Math.min(step, journeyIcons.length - 1)];

  return (
    <motion.div className={firstVisit ? "ritual-overlay first-visit" : "ritual-overlay"} initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(14px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} transition={{ duration: 0.7 }}>
      {!firstVisit && <button className="ritual-close" onClick={onClose} aria-label="Leave the ritual"><X size={18} /></button>}
      <AnimatePresence mode="wait">
        {step < ritual.messages.length ? (
          <motion.div className="ritual-breath" key={step} initial={{ opacity: 0, filter: "blur(8px)", scale: 0.92 }} animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }} exit={{ opacity: 0, filter: "blur(7px)", scale: 1.04 }} transition={{ duration: 0.6 }}>
            <motion.span className={`ritual-seed step-${step} flower-${ritual.flower} journey-${ritual.journey}`} animate={{ scale: [1, 1.08, 1], rotate: step === 2 ? [0, -4, 4, 0] : 0 }} transition={{ duration: ritual.breath, ease: "easeInOut" }}><Icon /></motion.span>
            <p>{ritual.messages[step]}</p>
            {step < 2 && <motion.i animate={{ y: [0, 5, 0], opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 1.2, repeat: Infinity }}>↓</motion.i>}
          </motion.div>
        ) : (
          <motion.section className="ritual-promise" initial={{ opacity: 0, scale: 0.94, y: 18, filter: "blur(10px)" }} animate={leaving ? { opacity: 0, scale: 1.04, y: -12, filter: "blur(8px)" } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <PetalFarewell active={leaving} />
            <span className={`promise-flower flower-${ritual.flower}`}><Flower2 /></span>
            <span className="kicker">Begin today's promise</span>
            <h2>{ritual.promise}</h2>
            <p>Today's promise isn't perfection.<br />It's simply beginning.</p>
            <small>When you're ready, we'll begin together.</small>
            <button className="primary-button ritual-ready" onClick={begin} disabled={leaving}>I'm ready <Leaf size={15} /></button>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PetalFarewell({ active }: { active: boolean }) {
  return <div className="ritual-petals" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map((petal) => <motion.i key={petal} initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }} animate={active ? { opacity: [0, .7, 0], x: (petal - 2.5) * 35, y: -60 - (petal % 2) * 35, rotate: 120 + petal * 40 } : {}} transition={{ duration: .9, delay: petal * .04 }} />)}</div>;
}
