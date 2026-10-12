import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  NOISE_SCREENSHOT_CARDS,
  ScreenshotCard,
} from "../NoiseScreenshots";

// Timings and milestones (in milliseconds, trimmed slightly across all steps to reach/complete by ~9.75s cumulative)
const T_HOLD_BEFORE_COLLAPSE = 2150; // Holds screenshot cards & headline (2.15s, trimmed by 450ms)
const T_COLLAPSE_START = T_HOLD_BEFORE_COLLAPSE; // 2150ms: Headline fades out, cards collapse to center
const COLLAPSE_TOTAL_DURATION_MS = 680; // Crisp collapse duration (~0.68s)

export interface WordCloudItem {
  id: string;
  text: string;
  x: number; // offset in px relative to center on desktop
  y: number; // offset in px relative to center on desktop
  rotate?: number; // 0, 90, or -90 degrees
  tier: "hero" | "large" | "medium" | "small";
  isProminent?: boolean;
  opacity: number;
  staggerMs: number;
}

// Symmetrically balanced, non-overlapping Word Cloud layout (horizontal, uniform density)
// All words are strictly horizontal with dedicated bounding envelopes and intentional spacing
export const WORD_CLOUD_ITEMS: WordCloudItem[] = [
  // 1. Dominant Hero Anchor: "Opinions" (commands central focus)
  { id: "opinions", text: "Opinions", x: 0, y: 0, rotate: 0, tier: "hero", isProminent: true, opacity: 1, staggerMs: 0 },

  // 2. Primary Anchors (Strictly horizontal, clear flanking & vertical balance, stepped down from Opinions)
  { id: "management", text: "Management", x: -255, y: 0, rotate: 0, tier: "large", isProminent: true, opacity: 0.85, staggerMs: 60 },
  { id: "sell-side", text: "Sell side", x: 255, y: 0, rotate: 0, tier: "large", isProminent: true, opacity: 0.85, staggerMs: 160 },
  { id: "rumours", text: "Rumours", x: -135, y: -64, rotate: 0, tier: "large", isProminent: true, opacity: 0.85, staggerMs: 120 },
  { id: "news", text: "News", x: 135, y: -64, rotate: 0, tier: "large", isProminent: true, opacity: 0.85, staggerMs: 90 },
  { id: "stock-price", text: "Stock price movement", x: 0, y: 100, rotate: 0, tier: "large", isProminent: true, opacity: 0.85, staggerMs: 200 },

  // 3. Supporting Vocabulary (Subtle, balanced hexagonal diamond)
  { id: "earnings", text: "Earnings", x: 0, y: -64, rotate: 0, tier: "medium", opacity: 0.65, staggerMs: 140 },
  { id: "guidance", text: "Guidance", x: -175, y: -30, rotate: 0, tier: "medium", opacity: 0.65, staggerMs: 180 },
  { id: "valuation", text: "Valuation", x: 175, y: -30, rotate: 0, tier: "medium", opacity: 0.65, staggerMs: 180 },
  { id: "consensus", text: "Consensus", x: -175, y: 32, rotate: 0, tier: "medium", opacity: 0.65, staggerMs: 210 },
  { id: "upgrades", text: "Upgrades", x: 175, y: 32, rotate: 0, tier: "medium", opacity: 0.65, staggerMs: 210 },
  { id: "sentiment", text: "Sentiment", x: 0, y: 58, rotate: 0, tier: "medium", opacity: 0.65, staggerMs: 190 },
  { id: "headlines", text: "Headlines", x: -285, y: -64, rotate: 0, tier: "medium", opacity: 0.62, staggerMs: 170 },
  { id: "macro", text: "Macro", x: 285, y: -64, rotate: 0, tier: "medium", opacity: 0.62, staggerMs: 170 },
  { id: "downgrades", text: "Downgrades", x: -225, y: 96, rotate: 0, tier: "medium", opacity: 0.62, staggerMs: 240 },
  { id: "price-targets", text: "Price targets", x: 225, y: 96, rotate: 0, tier: "medium", opacity: 0.62, staggerMs: 240 },

  // 4. Perimeter Ambient Market Noise (Soft, atmospheric, balanced density)
  { id: "fed-cuts", text: "Fed cuts", x: -115, y: -112, rotate: 0, tier: "small", opacity: 0.42, staggerMs: 220 },
  { id: "whispers", text: "Whispers", x: 0, y: -110, rotate: 0, tier: "small", opacity: 0.45, staggerMs: 180 },
  { id: "multiples", text: "multiples", x: 115, y: -112, rotate: 0, tier: "small", opacity: 0.42, staggerMs: 220 },

  { id: "reddit", text: "Reddit", x: -375, y: -22, rotate: 0, tier: "small", opacity: 0.42, staggerMs: 240 },
  { id: "fomo", text: "FOMO", x: -380, y: 10, rotate: 0, tier: "small", opacity: 0.42, staggerMs: 260 },
  { id: "alpha", text: "alpha", x: -375, y: 42, rotate: 0, tier: "small", opacity: 0.42, staggerMs: 280 },

  { id: "breakouts", text: "breakouts", x: 375, y: -22, rotate: 0, tier: "small", opacity: 0.42, staggerMs: 240 },
  { id: "momentum", text: "momentum", x: 380, y: 10, rotate: 0, tier: "small", opacity: 0.42, staggerMs: 260 },
  { id: "squeeze", text: "squeeze", x: 375, y: 42, rotate: 0, tier: "small", opacity: 0.42, staggerMs: 280 },

  { id: "leverage", text: "leverage", x: -140, y: 142, rotate: 0, tier: "small", opacity: 0.40, staggerMs: 280 },
  { id: "dividends", text: "dividends", x: 0, y: 142, rotate: 0, tier: "small", opacity: 0.42, staggerMs: 270 },
  { id: "cash-flow", text: "cash flow", x: 140, y: 142, rotate: 0, tier: "small", opacity: 0.40, staggerMs: 280 },
  { id: "calls-puts", text: "calls & puts", x: 270, y: 138, rotate: 0, tier: "small", opacity: 0.40, staggerMs: 300 },
];

// Start word cloud bloom while the last cards are still collapsing (~680ms into collapse)
const T_CLOUD_START = T_COLLAPSE_START + 680; // 2830ms (trimmed from 3400ms)
const CLOUD_HOLD_MS = 1150; // Fluid hold on full word cloud (trimmed from 1400ms)
const T_CLOUD_FADE_OUT_START = T_CLOUD_START + 280 + CLOUD_HOLD_MS; // 4260ms (trimmed from 5120ms)
const CLOUD_FADE_OUT_DURATION_MS = 200; // Snappy fade out of word cloud (~200ms)
const T_CLOUD_GONE = T_CLOUD_FADE_OUT_START + CLOUD_FADE_OUT_DURATION_MS; // 4460ms

// Final text constants (BEAT 3: "We've got your back")
const T_FINAL_TEXT_START = T_CLOUD_GONE + 50; // 4510ms: Starts entering at 4.51s (total ~8.01s from 0.0s)
const FINAL_TEXT_DRIFT_DURATION_MS = 380; // Smooth 380ms upward drift (fully locked in at ~8.39s)
const FINAL_TEXT_HOLD_MS = 1360; // Clean hold on "We've got your back"
const T_COMPLETE = T_FINAL_TEXT_START + FINAL_TEXT_DRIFT_DURATION_MS + FINAL_TEXT_HOLD_MS; // 6250ms (total ~9.75s from 0.0s)

export interface NoiseOverwhelmSequenceProps {
  onComplete: () => void;
  isPaused?: boolean;
  skipWordCloud?: boolean;
}

export function NoiseOverwhelmSequence({
  onComplete,
  isPaused = false,
  skipWordCloud = false,
}: NoiseOverwhelmSequenceProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  }));

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track viewport size for accurate collapse and cluster coordinate calculations
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous rAF timeline with pause support
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isPausedRef.current) {
        setElapsedMs((prev) => prev + delta);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Milestones adjusted if word cloud is skipped completely
  const actualFinalTextStart = skipWordCloud
    ? T_COLLAPSE_START + COLLAPSE_TOTAL_DURATION_MS + 60 // 2150 + 680 + 60 = 2890ms
    : T_FINAL_TEXT_START;

  const actualCompleteTime = skipWordCloud
    ? actualFinalTextStart + FINAL_TEXT_DRIFT_DURATION_MS + FINAL_TEXT_HOLD_MS
    : T_COMPLETE;

  // Step complete handoff
  const hasCompletedRef = useRef(false);
  useEffect(() => {
    if (elapsedMs >= actualCompleteTime && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onCompleteRef.current();
    }
  }, [elapsedMs, actualCompleteTime]);

  // Derived state milestones
  const isCollapsing = elapsedMs >= T_COLLAPSE_START;
  const isCloudFadingOut = elapsedMs >= T_CLOUD_FADE_OUT_START;
  const areCloudWordsGone = elapsedMs >= T_CLOUD_GONE;
  const showFinalText = elapsedMs >= actualFinalTextStart;
  const isMobile = viewport.width < 640;

  return (
    <div className="relative flex h-[100svh] w-full items-center justify-center px-4 sm:px-8 md:px-12 select-none overflow-hidden">
      {/* Central Headline: "Every one has an opinion" (fades out at collapse start) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
        animate={{
          opacity: isCollapsing ? 0 : 1,
          scale: isCollapsing ? 0.96 : 1,
          filter: isCollapsing ? "blur(4px)" : "blur(0px)",
        }}
        transition={{
          duration: isCollapsing ? 0.22 : 0.32,
          ease: [0.16, 1, 0.3, 1],
        }}
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

      {/* BEAT 2: Typographic Word Cloud (Arranged like the image, guaranteed zero overlap) */}
      {!skipWordCloud && !areCloudWordsGone && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none select-none">
          {WORD_CLOUD_ITEMS.map((item) => {
            const itemStartTime = T_CLOUD_START + item.staggerMs;
            const isVisible = elapsedMs >= itemStartTime;
            const targetX = isMobile ? item.x * 0.44 : item.x;
            const targetY = isMobile ? item.y * 0.48 : item.y;

            let fontClass = "text-[0.72rem] xs:text-[0.80rem] sm:text-[0.88rem] md:text-[0.98rem] font-light text-white/50 tracking-wide";
            let shadowStyle: React.CSSProperties | undefined = { textShadow: "0 0 8px rgba(255,255,255,0.06)" };

            if (item.tier === "hero") {
              fontClass = "text-[3.2rem] xs:text-[3.8rem] sm:text-[4.6rem] md:text-[5.4rem] lg:text-[6.2rem] font-bold tracking-tight text-white";
              shadowStyle = { textShadow: "0 0 54px rgba(255,255,255,0.60), 0 4px 28px rgba(0,0,0,0.95)" };
            } else if (item.tier === "large") {
              fontClass = "text-[1.25rem] xs:text-[1.42rem] sm:text-[1.65rem] md:text-[1.88rem] font-medium text-white/85 tracking-tight";
              shadowStyle = { textShadow: "0 0 18px rgba(255,255,255,0.18), 0 2px 10px rgba(0,0,0,0.8)" };
            } else if (item.tier === "medium") {
              fontClass = "text-[0.92rem] xs:text-[1.02rem] sm:text-[1.14rem] md:text-[1.26rem] font-normal text-white/65";
              shadowStyle = { textShadow: "0 0 10px rgba(255,255,255,0.10)" };
            }

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  scale: prefersReducedMotion ? 1 : 0.6,
                  x: targetX,
                  y: targetY,
                  rotate: item.rotate || 0,
                }}
                animate={{
                  opacity: isCloudFadingOut ? 0 : isVisible ? item.opacity : 0,
                  scale: isCloudFadingOut ? 0.96 : isVisible ? 1 : (prefersReducedMotion ? 1 : 0.6),
                  x: targetX,
                  y: targetY,
                  rotate: item.rotate || 0,
                }}
                transition={{
                  opacity: {
                    duration: isCloudFadingOut
                      ? CLOUD_FADE_OUT_DURATION_MS / 1000
                      : 0.22,
                    ease: isCloudFadingOut ? "easeInOut" : [0.16, 1, 0.3, 1],
                  },
                  scale: {
                    duration: isCloudFadingOut
                      ? CLOUD_FADE_OUT_DURATION_MS / 1000
                      : 0.26,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="absolute flex items-center justify-center whitespace-nowrap pointer-events-none"
              >
                <span
                  className={`font-display font-light font-[300] tracking-tight leading-none text-center select-none ${fontClass}`}
                  style={shadowStyle}
                >
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* BEAT 3: Final Text "We've got your back" (drift upward 12-16px, fade in, no exit animation) */}
      <AnimatePresence>
        {showFinalText && (
          <motion.div
            key="final-text-we-got-your-back"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: FINAL_TEXT_DRIFT_DURATION_MS / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none px-4 select-none"
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
                We've got your back
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D-Tilted Drifting Field of Mock Screenshots with Collapse to Center */}
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
            rotateX: isCollapsing ? 0 : [6, 4, 7, 5, 6],
            rotateY: isCollapsing ? 0 : [-3, -1, -4, -2, -3],
            x: isCollapsing ? 0 : [0, -12, 10, -8, 0],
            y: isCollapsing ? 0 : [0, 8, -10, 6, 0],
          }}
          transition={{
            duration: isCollapsing ? 0.45 : 20,
            repeat: isCollapsing ? 0 : Infinity,
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

            // Target coordinates to collapse to center (50%, 50%)
            const targetX = prefersReducedMotion
              ? 0
              : ((50 - card.left) / 100) * viewport.width;
            const targetY = prefersReducedMotion
              ? 0
              : ((50 - card.top) / 100) * viewport.height;

            // Distance from center determines pull stagger (closer cards start first, 20-40ms apart - delay kept identical)
            const dist = Math.hypot(card.left - 50, card.top - 50);
            const staggerDelay = prefersReducedMotion
              ? 0
              : Math.min(0.35, (dist / 65) * 0.32);
            const collapseDuration = prefersReducedMotion ? 0.25 : 0.50;

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
                  animate={
                    isCollapsing
                      ? {
                        x: targetX,
                        y: targetY,
                        scale: prefersReducedMotion ? 1 : 0.2,
                        opacity: 0,
                        rotate: card.rotate || 0,
                      }
                      : {
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
                      }
                  }
                  transition={
                    isCollapsing
                      ? {
                        x: {
                          duration: collapseDuration,
                          delay: staggerDelay,
                          ease: [0.4, 0, 1, 1], // ease-in (accelerating toward center)
                        },
                        y: {
                          duration: collapseDuration,
                          delay: staggerDelay,
                          ease: [0.4, 0, 1, 1],
                        },
                        scale: {
                          duration: collapseDuration,
                          delay: staggerDelay,
                          ease: [0.4, 0, 1, 1],
                        },
                        opacity: {
                          duration: collapseDuration * 0.75,
                          delay: staggerDelay + collapseDuration * 0.25,
                          ease: "easeIn",
                        },
                        rotate: {
                          duration: collapseDuration,
                          delay: staggerDelay,
                          ease: "linear",
                        },
                      }
                      : {
                        opacity: {
                          duration: 0.38,
                          delay: 0.03 + (idx % 12) * 0.03,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        scale: {
                          duration: 0.42,
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
                      }
                  }
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
