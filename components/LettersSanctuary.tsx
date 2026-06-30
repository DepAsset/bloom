"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useState } from "react";

const letters = [
  { title: "Before FR", note: "For the moments before you begin", body: "Jii, take one breath before you look at the paper. You do not need to know everything at once. Read slowly. Let the first answer be simply the first answer. The room cannot take away what you know." },
  { title: "After a difficult mock", note: "For a day that felt heavier", body: "A mock is allowed to be messy. It came here to show you where to be gentle next—not to decide who you are. Put the paper down for tonight. Your ability will still be there in the morning." },
  { title: "When it all feels heavy", note: "Open without explaining anything", body: "You can stop holding everything up for a moment. Nothing needs to be fixed on this page. Drink some water. Let your shoulders fall. I am glad you came here instead of carrying it alone." },
  { title: "When you forget your strength", note: "A small reminder kept safely", body: "Strength was never only the days you studied well. It was every ordinary morning you returned, every time you asked for help, and this moment too. You have not lost it. You are standing inside it." },
  { title: "When you feel like quitting", note: "No decisions required tonight", body: "You do not have to promise the whole journey. Promise only that you will not decide from inside this tired moment. Rest first. Tomorrow can speak for itself." },
  { title: "After results", note: "Whatever the page says", body: "Before anyone asks what happened, remember this: a result can describe an attempt. It cannot describe your heart, your intelligence, or the life still waiting for you. I am proud of the person opening this letter." },
];

export default function LettersSanctuary() {
  const [opened, setOpened] = useState<number | null>(null);
  return <>
    <div className="envelope-grid">{letters.map((letter, index) => 
      <motion.button
        className="envelope"
        key={letter.title}
        onClick={() => setOpened(index)}
        whileHover={{
          y: -8,
          rotate: index % 2 ? 0.5 : -0.5,
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.94,
          rotate: 0,
          transition: {
            duration: 0.12,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
      >
      <span className="envelope-back" /><span className="envelope-paper"><Heart size={13} fill="currentColor" /></span><span className="envelope-front" /><span className="envelope-flap" />
      <span className="envelope-label"><strong>Open {letter.title}</strong><small>{letter.note}</small></span>
    </motion.button>)}</div>
    <AnimatePresence>{opened !== null && <motion.div className="letter-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpened(null)}>
      <motion.div
          className="opened-envelope"
          onClick={(event) => event.stopPropagation()}
          initial={{
              opacity: 0,
              scale: 0.75,
              y: 60,
          }}
          animate={{
              opacity: 1,
              scale: 1,
              y: 0,
          }}
          exit={{
              opacity: 0,
              scale: 0.92,
              y: 30,
          }}
          transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
          }}
      >
        <button className="letter-close" onClick={() => setOpened(null)} aria-label="Fold the letter away"><X size={17} /></button>
        <motion.div
            className="open-flap"
            initial={{
                rotateX: 0,
            }}
            animate={{
                rotateX: 180,
            }}
            transition={{
                delay: 0.22,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
            }}
        />
        <motion.article
            className="letter-paper"
            initial={{
                y: 160,
                scale: 0.82,
                opacity: 0,
            }}
            animate={{
                y: -20,
                scale: 1,
                opacity: 1,
            }}
            transition={{
                delay: 0.65,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}>For Jii,</motion.span>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }}>{letters[opened].title}</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>{letters[opened].body}</motion.p>
          <motion.small initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.65 }}>Always in your corner ♡</motion.small>
        </motion.article>
        <div className="envelope-pocket" />
      </motion.div>
    </motion.div>}</AnimatePresence>
  </>;
}
