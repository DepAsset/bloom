"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Contrast, Music2, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sounds = [
  { id: "rain", label: "Rain", icon: "☂" },
  { id: "forest", label: "Forest", icon: "⌁" },
  { id: "cafe", label: "Cafe", icon: "♨" },
  { id: "wind", label: "Wind", icon: "≈" },
  { id: "night", label: "Night", icon: "☾" },
  { id: "birds", label: "Birds", icon: "⌇" },
  { id: "fireplace", label: "Fireplace", icon: "♢" },
] as const;
type SoundId = typeof sounds[number]["id"];

export default function AmbientSound() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState<SoundId>("rain");
  const [volume, setVolume] = useState(.22);
  const [contrast, setContrast] = useState(false);
  const audio = useRef<{ context: AudioContext; gain: GainNode; source: AudioBufferSourceNode } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bloom-ambient");
    if (saved) {
      try { const value = JSON.parse(saved); setSound(value.sound ?? "rain"); setVolume(value.volume ?? .22); } catch { /* a quiet fallback */ }
    }
    setContrast(localStorage.getItem("bloom-contrast") === "true");
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("gentle-contrast", contrast); localStorage.setItem("bloom-contrast", String(contrast)); }, [contrast]);
  useEffect(() => { if (audio.current) audio.current.gain.gain.setTargetAtTime(playing ? volume : 0, audio.current.context.currentTime, .7); }, [playing, volume]);
  useEffect(() => { localStorage.setItem("bloom-ambient", JSON.stringify({ sound, volume })); if (playing) { stopAudio(); startAudio(sound, volume); } return () => undefined; }, [sound]);
  useEffect(() => () => stopAudio(), []);

  const startAudio = (id: SoundId, level: number) => {
    const context = new AudioContext();
    const duration = 4;
    const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const time = i / context.sampleRate;
      const white = Math.random() * 2 - 1;
      const pulse = id === "fireplace" && Math.random() > .998 ? .8 : 0;
      const birdMoment = time % 1.7;
      const bird = id === "birds" && birdMoment < .14 ? Math.sin(2 * Math.PI * (1650 + birdMoment * 5200) * time) * (1 - birdMoment / .14) * .11 : 0;
      const cricket = id === "night" && time % .72 < .08 ? Math.sin(2 * Math.PI * 3100 * time) * .035 : 0;
      const roomHum = id === "cafe" ? Math.sin(2 * Math.PI * 84 * time) * .025 : 0;
      data[i] = white * (id === "night" ? .07 : id === "cafe" ? .16 : .3) + pulse + bird + cricket + roomHum;
    }
    const source = context.createBufferSource();
    source.buffer = buffer; source.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = id === "rain" ? "highpass" : "lowpass";
    filter.frequency.value = id === "rain" ? 1100 : id === "wind" ? 450 : id === "night" ? 240 : 780;
    const gain = context.createGain(); gain.gain.value = 0;
    source.connect(filter).connect(gain).connect(context.destination); source.start();
    gain.gain.setTargetAtTime(level, context.currentTime, .8);
    audio.current = { context, gain, source };
  };
  const stopAudio = () => {
    if (!audio.current) return;
    const current = audio.current; current.gain.gain.setTargetAtTime(0, current.context.currentTime, .25);
    window.setTimeout(() => current.context.close(), 900); audio.current = null;
  };
  const toggle = () => {
    if (!playing) startAudio(sound, volume); else stopAudio();
    setPlaying(!playing);
  };

  return <div className="ambient-root">
    <button className={playing ? "icon-button active" : "icon-button"} onClick={() => setOpen(!open)} aria-label="Open ambient sounds" aria-expanded={open}><Music2 size={17} /></button>
    <AnimatePresence>{open && <motion.aside className="ambient-panel" initial={{ opacity: 0, y: -8, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .98 }}>
      <div className="ambient-heading"><div><span className="kicker">A softer room</span><h3>Ambient sound</h3></div><button onClick={() => setOpen(false)} aria-label="Close sounds"><X size={16} /></button></div>
      <div className="sound-grid">{sounds.map((item) => <button key={item.id} className={sound === item.id ? "selected" : ""} onClick={() => setSound(item.id)}><i>{item.icon}</i><span>{item.label}</span>{sound === item.id && <Check size={11} />}</button>)}</div>
      <label className="volume-row"><Volume2 size={15} /><input aria-label="Ambient volume" type="range" min="0" max="0.5" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></label>
      <button className="primary-button sound-toggle" onClick={toggle}>{playing ? "Let the room rest" : `Play ${sounds.find((item) => item.id === sound)?.label}`}</button>
      <button className={contrast ? "contrast-toggle active" : "contrast-toggle"} onClick={() => setContrast(!contrast)}><Contrast size={14} /><span>Gentle high contrast</span><i>{contrast ? "On" : "Off"}</i></button>
    </motion.aside>}</AnimatePresence>
  </div>;
}
