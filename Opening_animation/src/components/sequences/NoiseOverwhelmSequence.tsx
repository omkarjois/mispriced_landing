import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  NOISE_SCREENSHOT_CARDS,
  ScreenshotCard,
} from "../NoiseScreenshots";

export interface NoiseOverwhelmSequenceProps {
  onComplete: () => void;
}

export function NoiseOverwhelmSequence({
  onComplete,
}: NoiseOverwhelmSequenceProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timer = setTimeout(() => {
      onCompleteRef.current();
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex h-[100svh] w-full items-center justify-center px-4 sm:px-8 md:px-12 select-none overflow-hidden">
      {/* Central Headline: "Everyone claims to know" with clean radial contrast backdrop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{
          opacity: 0,
          scale: 0.96,
          filter: "blur(8px)",
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-40 flex items-center justify-center pointer-events-none"
      >
        <div
          className="relative max-w-5xl px-10 py-8 sm:px-16 sm:py-12 text-center rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(18, 19, 20, 0.96) 0%, rgba(18, 19, 20, 0.85) 45%, rgba(18, 19, 20, 0.45) 75%, rgba(18, 19, 20, 0) 100%)",
          }}
        >
          <h2
            className="font-display font-light font-[300] tracking-tight leading-tight text-[2.4rem] xs:text-[3.1rem] sm:text-[3.8rem] md:text-[4.5rem] text-center text-white select-none"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.32)" }}
          >
            Every one has an opinion
          </h2>
        </div>
      </motion.div>

      {/* 3D-Tilted Drifting Field of Mock Screenshots */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 45%",
        }}
      >
        {/* Tilting drift container */}
        <motion.div
          initial={{ rotateX: 6, rotateY: -3, scale: 1.02 }}
          animate={{
            rotateX: [6, 4, 7, 5, 6],
            rotateY: [-3, -1, -4, -2, -3],
            x: [0, -12, 10, -8, 0],
            y: [0, 8, -10, 6, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="relative w-full h-full"
        >
          {NOISE_SCREENSHOT_CARDS.map((card, idx) => {
            const isBack = card.layer === "back";
            return (
              <div
                key={`screenshot-wrapper-${card.id}`}
                style={{
                  position: "absolute",
                  top: `${card.top}%`,
                  left: `${card.left}%`,
                  transform: "translate(-50%, -50%)",
                  width: `${card.width || 310}px`,
                  zIndex: isBack ? 12 : 20,
                }}
                className={`pointer-events-none transition-all duration-300 ${
                  // Hide some cards on small mobile screens to prevent clutter
                  idx > 16 ? "hidden sm:block" : ""
                }`}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: isBack ? 0.88 : 0.94,
                    rotate: card.rotate || 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: isBack ? 0.92 : 1,
                    x: [
                      0,
                      idx % 2 === 0 ? -4 : 4,
                      idx % 3 === 0 ? 3 : -3,
                      0,
                    ],
                    y: [
                      0,
                      idx % 3 === 0 ? 4 : -4,
                      idx % 2 === 0 ? -3 : 3,
                      0,
                    ],
                    rotate: [
                      card.rotate || 0,
                      (card.rotate || 0) + (idx % 2 === 0 ? -0.8 : 0.8),
                      (card.rotate || 0) + (idx % 2 === 0 ? 0.6 : -0.6),
                      card.rotate || 0,
                    ],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    filter: "blur(6px)",
                    transition: { duration: 0.35, ease: "easeOut" },
                  }}
                  transition={{
                    opacity: {
                      duration: 0.65,
                      delay: 0.03 + (idx % 12) * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    scale: {
                      duration: 0.7,
                      delay: 0.03 + (idx % 12) * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    x: {
                      duration: 6 + (idx % 4) * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "mirror",
                    },
                    y: {
                      duration: 7 + (idx % 3) * 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "mirror",
                    },
                    rotate: {
                      duration: 8 + (idx % 5) * 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "mirror",
                    },
                  }}
                  style={{
                    willChange: "transform, opacity",
                  }}
                  className="w-full relative"
                >
                  <ScreenshotCard card={card} />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
