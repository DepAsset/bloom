"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Feather, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const prompts = [
  "What felt lighter today?",
  "What frightened you—and what helped you stay?",
  "What surprised you?",
  "What deserves a little gratitude?",
  "What did you learn about yourself?",
  "What would you like to leave on this page?",
  "Where did you show yourself kindness?",
  "What can wait until tomorrow?",
];

export default function JournalSanctuary({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const initial = useMemo(() => new Date().getDate() % prompts.length, []);
  const [prompt, setPrompt] = useState(initial);
  const [saved, setSaved] = useState(true);
  const date = useMemo(() => new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long" }).format(new Date()), []);
  useEffect(() => { if (saved) return; const timeout = window.setTimeout(() => setSaved(true), 650); return () => window.clearTimeout(timeout); }, [saved, value]);

  return <div className="journal-sanctuary">
    <motion.div className="journal-prompt" key={prompt} initial={{ opacity: 0, y: 6, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}>
      <Feather size={15} /><span>{prompts[prompt]}</span><button onClick={() => setPrompt((prompt + 1) % prompts.length)} aria-label="Another writing prompt"><RefreshCw size={13} /></button>
    </motion.div>
    <div className="journal-sheet linen-paper">
      <span className="handwritten-date">{date}</span>
      <textarea autoFocus value={value} onChange={(event) => { setSaved(false); onChange(event.target.value); }} placeholder="Begin wherever you are…" aria-label="Your private journal page" />
      <AnimatePresence mode="wait"><motion.small key={saved ? "saved" : "saving"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{saved ? <><Check size={12} /> Saved quietly</> : "Ink settling…"}</motion.small></AnimatePresence>
    </div>
  </div>;
}
