"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  Check,
  Feather,
  Flower2,
  Heart,
  Home,
  Leaf,
  Mail,
  Menu,
  MoonStar,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Sprout,
  SunMedium,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import BackgroundMusic from "./home/BackgroundMusic";
import { getMorningWhisper } from "@/lib/morningWhisper";
import { clearMood, loadMood, saveMood, type Mood } from "@/lib/mood";
import CheckInCard from "@/components/home/CheckInCard";
import MorningRitual from "@/components/home/MorningRitual";
import { getDailyContent } from "@/data/daily";
import LivingBackground from "@/components/layout/LivingBackground";
import AmbientSound from "@/components/layout/AmbientSound";
import JournalSanctuary from "@/components/JournalSanctuary";
import LettersSanctuary from "@/components/LettersSanctuary";
import GardenSanctuary from "@/components/GardenSanctuary";
import WelcomeExperience from "@/components/welcome/WelcomeExperience";
import HeartNote from "@/components/home/HeartNote";
import { getRandomNote } from "@/lib/noteEngine";

type View = "home" | "journal" | "letters" | "garden";

const missionByMood = {
  peaceful: {
    subject: "Use today's calm",
    title: "Complete one full session.",
    description: "Financial Reporting • Consolidation",
    sessions: "1 session",
  },

  okay: {
    subject: "A simple beginning",
    title: "Study one familiar concept.",
    description: "Twenty quiet minutes is enough.",
    sessions: "1 session",
  },

  tired: {
    subject: "A lighter day",
    title: "Study one concept. Then rest.",
    description: "Come back only if your body says yes.",
    sessions: "1 session",
  },

  low: {
    subject: "A quiet return",
    title: "Read for only ten minutes.",
    description: "No questions to solve. Just be with the page.",
    sessions: "Gentle day",
  },

  heavy: {
    subject: "Gentle return",
    title: "Open your notes.",
    description: "Read one page. Closing it afterward is allowed.",
    sessions: "No pressure",
  },
};
const nav = [
  { id: "home" as View, label: "Home", icon: Home },
  { id: "journal" as View, label: "Journal", icon: BookOpenText },
  { id: "letters" as View, label: "Letters", icon: Mail },
  { id: "garden" as View, label: "My garden", icon: Sprout },
];

function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setValue(JSON.parse(stored));
  }, [key]);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}

export function BloomApp() {
  const [heartOpen,setHeartOpen]=useState(false);
  const [note, setNote] = useState(getRandomNote());
  const [welcomeStatus, setWelcomeStatus] = useState<"checking" | "show" | "ritual" | "done">("checking");
  const [view, setView] = useState<View>("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [mood, setMood] = useState<Mood | null>(null);
  const todayKey = useMemo(() => new Date().toLocaleDateString("en-CA"), []);
  const [missionDone, setMissionDone] = useLocalState(`bloom-promise-${todayKey}`, false);
  const [gardenGrowth, setGardenGrowth] = useLocalState("bloom-garden-growth", 0);
  const [journal, setJournal] = useLocalState("bloom-journal", "");
  const [timerOpen, setTimerOpen] = useState(false);
  const [ritualOpen, setRitualOpen] = useState(false);
  const [welcome, setWelcome] = useState("");
  const whisper = useMemo(() => getMorningWhisper(),[]);
  const daily = useMemo(() => getDailyContent(), []);
  useEffect(() => {
    setWelcomeStatus(localStorage.getItem("bloom-welcome-viewed") === "true" ? "done" : "show");
    setMood(loadMood());
    const raw = localStorage.getItem("bloom-return-days");
    const days: string[] = raw ? JSON.parse(raw) : [];
    const next = days.includes(todayKey) ? days : [...days, todayKey].slice(-60);
    localStorage.setItem("bloom-return-days", JSON.stringify(next));
    if (next.length >= 14) setWelcome("You've shown quiet courage, again and again.");
    else if (next.length >= 7) setWelcome("You've been gentle with yourself lately.");
    else if (next.length >= 3) setWelcome("I'm glad you returned.");
  }, []);

  const chooseMood = (nextMood: Mood | null) => {
    setMood(nextMood);
    if (nextMood) saveMood(nextMood);
    else clearMood();
  };


  const go = (next: View) => {
    setView(next);
    setMobileNav(false);
  };

  const currentMission =
    missionByMood[mood ?? "okay"];
  const completePromise = () => {
    if (!missionDone) setGardenGrowth((growth) => growth + 1);
    setMissionDone(true);
  };

  return (
    <main className="app-shell">
      <BackgroundMusic />
      <LivingBackground />
      <div className="grain" />
      <Petals />

      <AnimatePresence>
        {welcomeStatus === "show" && <WelcomeExperience onBegin={() => {
          localStorage.setItem("bloom-welcome-viewed", "true");
          setWelcomeStatus("ritual");
        }} />}
        {welcomeStatus === "ritual" && <MorningRitual ritual={daily.ritual} firstVisit onClose={() => undefined} onReady={() => setWelcomeStatus("done")} />}
      </AnimatePresence>

      {welcomeStatus === "done" && <>

      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu /></button>
        <button className="brand" onClick={() => go("home")} aria-label="Bloom home">
          <span className="brand-mark"><Flower2 size={19} /></span>
          <span>Bloom</span>
          <motion.i
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:1.2}}
          >
              made for Palak
          </motion.i>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => go(item.id)}>{item.label}</button>)}
        </nav>
        <div className="header-actions">
          <AmbientSound />
          <button className="avatar" aria-label="Your profile">J</button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === "home" ? (
          <motion.section key="home" className="page home-page" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="greeting">
              <span className="eyebrow">🌸 Morning Whisper</span>
              <h1>{whisper.title}
                <motion.div
                layoutId="heartPortal"
                whileHover={{
                  scale: 1.18,
                }}
                whileTap={{
                  scale: 0.88,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 18,
                }}
                style={{
                  display: "inline-flex",
                  cursor: "pointer",
                  marginLeft: 8,
                }}
                onClick={() => {
                  setNote(getRandomNote());
                  setHeartOpen(true);
                }}
              >
                <Heart
                  className="heart"
                  size={23}
                  fill="currentColor"
                />
              </motion.div>
              </h1>
              <p>{welcome || whisper.subtitle}</p>
            </div>

            <div className="daily-grid">

              <CheckInCard
                  mood={mood}
                  setMood={chooseMood}
              />
              <section className={missionDone ? "glass-card mission-card completed" : "glass-card mission-card"}>
                <div className="mission-top"><span className="kicker">Today’s one thing</span><span className="leaf-badge"><Leaf size={15} /></span></div>
                <div className="mission-content">
                  <div><span className="subject">{currentMission.subject}</span><h2>{missionDone ? "Beautifully done." : currentMission.title}</h2><p>{missionDone ? "You showed up. Let that be enough for today." : currentMission.description}</p></div>
                  {!missionDone && <div className="session-dots"><i /><i /><span>{currentMission.sessions}</span></div>}
                </div>
                <div className="mission-actions">
                  <button className={missionDone ? "primary-button promise-kept" : "primary-button"} onClick={() => { if (!missionDone) setRitualOpen(true); }}>
                    {missionDone ? <><Flower2 size={17} /> Promise kept</> : <><Play size={16} fill="currentColor" /> Begin gently</>}
                  </button>
                  {!missionDone && <button className="text-button" onClick={completePromise}>I've done enough <Check size={16} /></button>}
                </div>
              </section>

              <section className="glass-card quote-card">
                <Feather className="quote-feather" size={19} />
                <blockquote>“{daily.quote}”</blockquote>
                <span>— A note for today</span>
              </section>

              <section className="glass-card evidence-card">
                <div><span className="kicker">Remember</span><h2>{daily.evidence[0]}</h2><p>{daily.evidence[1]}</p></div>
                <button onClick={() => go("letters")} aria-label="Read your evidence"><ArrowRight size={18} /></button>
              </section>
            </div>

            <div className="bottom-note"><Flower2 size={15} /><span>A gentle place to return to, whenever you need it.</span></div>
          </motion.section>
        ) : (
          <InnerView key={view} view={view} journal={journal} setJournal={setJournal} gardenGrowth={gardenGrowth} onBack={() => go("home")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileNav && (
          <MobileNav
            view={view}
            go={go}
            close={() => setMobileNav(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ritualOpen && (
          <MorningRitual ritual={daily.ritual} onClose={() => setRitualOpen(false)} onReady={() => { setRitualOpen(false); setTimerOpen(true); }} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {timerOpen && (
          <FocusTimer
            onClose={() => setTimerOpen(false)}
            onComplete={() => {
              completePromise();
              setTimerOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <HeartNote open={heartOpen} onClose={()=>setHeartOpen(false)} title={note.title} body={note.body} />
      </>}
    </main>
  );
}

function Petals() {
  return <div className="petals" aria-hidden="true">{[0, 1, 2, 3, 4].map((n) => <motion.i key={n} animate={{ y: [0, 28, 0], x: [0, n % 2 ? 15 : -12, 0], rotate: [0, 80, 160] }} transition={{ duration: 9 + n, repeat: Infinity, ease: "easeInOut", delay: n * 1.4 }} />)}</div>;
}

function InnerView({ view, journal, setJournal, gardenGrowth, onBack }: { view: Exclude<View, "home">; journal: string; setJournal: (v: string) => void; gardenGrowth: number; onBack: () => void }) {
  const content = {
    journal: { icon: BookOpenText, eyebrow: "Your quiet page", title: "What would feel good to put down?", subtitle: "No perfect words. No one else will read this." },
    letters: { icon: Mail, eyebrow: "Words kept for you", title: "Open a letter when you need one.", subtitle: "There is no wrong moment to ask for a little tenderness." },
    garden: { icon: Sprout, eyebrow: "Your garden", title: "Every return grows something.", subtitle: "No flowers disappear when you rest." },
  }[view];
  const Icon = content.icon;
  return (
    <motion.section className="page inner-page" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <button className="back-link" onClick={onBack}>← Home</button>
      <div className="inner-title"><span><Icon size={18} /> {content.eyebrow}</span><h1>{content.title}</h1><p>{content.subtitle}</p></div>
      {view === "journal" && <JournalSanctuary value={journal} onChange={setJournal} />}
      {view === "letters" && <LettersSanctuary />}
      {view === "garden" && <GardenSanctuary growth={gardenGrowth} />}
    </motion.section>
  );
}

function MobileNav({ view, go, close }: { view: View; go: (v: View) => void; close: () => void }) {
  return <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}><button className="close" onClick={close}><X /></button><div className="brand"><span className="brand-mark"><Flower2 size={19} /></span><span>Bloom</span></div><nav>{nav.map(({ id, label, icon: Icon }) => <button key={id} className={view === id ? "active" : ""} onClick={() => go(id)}><Icon size={18} />{label}</button>)}</nav></motion.aside></motion.div>;
}

function FocusTimer({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
  const totalSeconds = 25 * 60;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (!running || complete) return;
    const id = window.setInterval(() => setSeconds((current) => current > 0 ? current - 1 : 0), 1000);
    return () => window.clearInterval(id);
  }, [running, complete]);
  useEffect(() => {
    if (seconds === 0) { setRunning(false); setComplete(true); }
  }, [seconds]);
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const circumference = 2 * Math.PI * 116;
  const offset = circumference * (seconds / totalSeconds);
  const bloomScale = .62 + (1 - seconds / totalSeconds) * .38;

  return (
    <motion.div className="modal-wrap focus-wrap" initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(13px)" }} exit={{ opacity: 0 }} transition={{ duration: .7 }}>
      <motion.div className="timer-modal premium-timer" initial={{ scale: .94, y: 18, filter: "blur(8px)" }} animate={{ scale: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>
        <button className="close" onClick={onClose} aria-label="Close focus session"><X /></button>
        <AnimatePresence mode="wait">
          {!complete ? (
            <motion.div key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(6px)" }}>
              <p className="timer-kicker">One quiet focus session</p>
              <div className={running ? "focus-orbit breathing" : "focus-orbit"}>
                <div className="focus-motes" aria-hidden="true">{[0,1,2,3,4].map((mote) => <motion.i key={mote} animate={running ? { y: [0, -25, 0], opacity: [.05, .32, .05] } : { opacity: .05 }} transition={{ duration: 5 + mote, delay: mote * .8, repeat: Infinity }} />)}</div>
                <svg viewBox="0 0 260 260" aria-hidden="true">
                  <circle className="ring-track" cx="130" cy="130" r="116" />
                  <motion.circle className="ring-progress" cx="130" cy="130" r="116" strokeDasharray={circumference} animate={{ strokeDashoffset: offset }} transition={{ duration: .7, ease: "linear" }} />
                </svg>
                <motion.span className="growing-flower" animate={running ? { scale: [bloomScale, bloomScale + .045, bloomScale], rotate: [0, 2, -2, 0] } : { scale: bloomScale }} transition={{ duration: 4, repeat: running ? Infinity : 0 }}><Flower2 /></motion.span>
                <div className="timer-digits">{mins}<i>:</i>{secs}</div>
              </div>
              <small>Financial Reporting · one gentle session</small>
              <button className="primary-button timer-play" onClick={() => setRunning(!running)}>{running ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}{running ? "Pause and breathe" : "Start when ready"}</button>
              <button className="finish-link" onClick={() => { setRunning(false); setComplete(true); }}>I've done enough for today</button>
            </motion.div>
          ) : (
            <motion.div className="focus-complete" key="complete" initial={{ opacity: 0, scale: .9, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: .8 }}>
              <div className="completion-bloom"><motion.span initial={{ scale: 0, rotate: -25 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 90, damping: 12 }}><Flower2 /></motion.span>{[0,1,2,3,4].map((petal) => <motion.i key={petal} animate={{ opacity: [0, .65, 0], x: (petal - 2) * 38, y: -55 - petal * 8, rotate: petal * 70 }} transition={{ duration: 2, repeat: Infinity, delay: petal * .2 }} />)}</div>
              <span className="kicker">A flower for today</span>
              <h2>I'm proud of you.</h2>
              <p>You began. You stayed for what you could.<br />Nothing more is asked of you.</p>
              <button className="primary-button ritual-ready" onClick={onComplete}>Return to Bloom <Leaf size={15} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
