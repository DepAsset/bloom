"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import type { Mood } from "@/lib/mood";

const moods: { id: Mood; icon: string; label: string }[] = [
  { id: "peaceful", icon: "☀️", label: "Peaceful" },
  { id: "okay", icon: "🙂", label: "Okay" },
  { id: "tired", icon: "😴", label: "Tired" },
  { id: "low", icon: "🌧️", label: "Low" },
  { id: "heavy", icon: "🫂", label: "Heavy" },
];

const moodContent: Record<Mood, { title: string; message: string; suggestion: string; emoji: string }> = {
  peaceful: {
    emoji: "☀️",
    title: "Let's protect this feeling today.",
    message: "Some days are gentle. You don't have to chase them—just enjoy them.",
    suggestion: "Use the calm that is already here. One focused session is beautiful.",
  },
  okay: {
    emoji: "🙂",
    title: "Okay is enough.",
    message: "You don't need to feel amazing to move forward. Being here already matters.",
    suggestion: "Begin with twenty minutes. You can decide what comes next afterward.",
  },
  tired: {
    emoji: "😴",
    title: "Let's make today lighter.",
    message: "Being tired doesn't mean you're falling behind. It means you've been carrying a lot.",
    suggestion: "One concept, then a real break. Let today have softer edges.",
  },
  low: {
    emoji: "🌧️",
    title: "You don't have to force a smile.",
    message: "Even cloudy days belong in the garden. Bloom isn't keeping score.",
    suggestion: "Read for ten quiet minutes. Continuing is optional.",
  },
  heavy: {
    emoji: "🫂",
    title: "I'm here with you today.",
    message: "Nothing needs to be solved right now. You are safe here.",
    suggestion: "Forget the whole syllabus. Open your notes and let that be enough.",
  },
};

type Props = {
  mood: Mood | null;
  setMood: (mood: Mood | null) => void;
};

export default function CheckInCard({ mood, setMood }: Props) {
  const [thinking, setThinking] = useState(false);

  const handleMood = (selectedMood: Mood) => {
    setThinking(true);
    window.setTimeout(() => {
      setMood(selectedMood);
      setThinking(false);
    }, 900);
  };

  return (
    <motion.section className={`glass-card checkin-card mood-${mood ?? "unset"}`} layout transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
      <div className="card-heading">
        <div><span className="kicker">A small check-in</span><h2>How are you feeling?</h2></div>
        <span className="time-pill">Just for you</span>
      </div>

      <AnimatePresence mode="wait">
        {!mood && !thinking && (
          <motion.div className="moods" key="choices" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -5 }}>
            {moods.map((item) => <button key={item.id} className="mood" onClick={() => handleMood(item.id)} aria-label={`I'm feeling ${item.label}`}><span>{item.icon}</span><small>{item.label}</small></button>)}
          </motion.div>
        )}

        {thinking && (
          <motion.div key="thinking" initial={{ opacity: 0, filter: "blur(5px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} className="thinking-box">
            <motion.div className="thinking-icon" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>🤍</motion.div>
            <h3>I'm listening…</h3>
            <div className="thinking-dots"><span /><span /><span /></div>
          </motion.div>
        )}

        {!thinking && mood && (
          <motion.div key={mood} initial={{ opacity: 0, y: 12, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: .5 }} className="mood-result">
            <div className="mood-big-icon">{moodContent[mood].emoji}</div>
            <div><h3>{moodContent[mood].title}</h3><p>{moodContent[mood].message}</p></div>
            <div className="gentle-tip"><strong>🌿 Gentle suggestion</strong><span>{moodContent[mood].suggestion}</span></div>
            <button className="text-button" onClick={() => setMood(null)}>Change today's mood</button>
          </motion.div>
        )}
      </AnimatePresence>

      {!mood && !thinking && <p className="mood-note"><Sparkles size={14} /> Nothing needs to be solved right now. Just stay with me for a breath.</p>}
    </motion.section>
  );
}
