"use client";

import { motion } from "framer-motion";

type Props = {
  phase: number;
};

const sparkles = [
  { x: -70, y: -40 },
  { x: -35, y: -70 },
  { x: 0, y: -85 },
  { x: 40, y: -65 },
  { x: 75, y: -35 },
  { x: -80, y: 20 },
  { x: 80, y: 20 },
  { x: -55, y: 70 },
  { x: 0, y: 90 },
  { x: 60, y: 65 },
];

export default function BloomFlower({ phase }: Props) {
  return (
    <div className="bloom-flower-container">

      {/* Sparkles */}

      {sparkles.map((sparkle, index) => (
        <motion.div
          key={index}
          className="sparkle"

          initial={{
            opacity: 0,
            scale: 0,
          }}

          animate={
            phase >= 3
              ? {
                  opacity: [0, 1, 0.5, 1, 0],
                  scale: [0, 1.2, 0.8, 1, 0],
                }
              : {}
          }

          transition={{
            duration: 1.2,
            delay: index * 0.05,
          }}

          style={{
            left: `calc(50% + ${sparkle.x}px)`,
            top: `calc(50% + ${sparkle.y}px)`,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Heart */}

      <motion.div
        className="bloom-heart"

        initial={{
          y: -220,
          opacity: 0,
          scale: 0.3,
        }}

        animate={{
          y: phase >= 1 ? 0 : -220,

          opacity: phase >= 1 ? 1 : 0,

          scale:
            phase === 2
              ? [1, 1.28, 0.92, 1.22, 1]
              : 1,

          filter:
            phase >= 2
              ? [
                  "drop-shadow(0 0 0px rgba(255,120,160,.2))",
                  "drop-shadow(0 0 18px rgba(255,120,160,.7))",
                  "drop-shadow(0 0 42px rgba(255,170,190,1))",
                  "drop-shadow(0 0 20px rgba(255,120,160,.7))",
                ]
              : "drop-shadow(0 0 0px rgba(255,120,160,0))",
        }}

        transition={{
          duration: phase === 1 ? 0.8 : 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <>
            <motion.span

                className="heart-icon"

                animate={

                    phase >= 4

                        ? {

                            opacity: [1, .9, .6, .2, 0],

                            scale: [1, 1.25, 1.45, 1.65, 1.9],

                            rotate: [0, -6, 6, -10, 0]

                        }

                        : {}

                }

                transition={{

                    duration: .7

                }}

            >

                ❤️

            </motion.span>

            <motion.span

                className="flower-icon"

                initial={{

                    opacity:0,

                    scale:.2,

                    rotate:-40

                }}

                animate={

                    phase>=4

                    ?{

                        opacity:1,

                        scale:[.2,1.35,.95,1.12,1],

                        rotate:[-40,-12,6,-2,0]

                    }

                    :{}

                }

                transition={{

                    duration:.9,

                    ease:[0.22,1,0.36,1]

                }}

            >

                🌸

            </motion.span>

        </>
      </motion.div>
    </div>
  );
}