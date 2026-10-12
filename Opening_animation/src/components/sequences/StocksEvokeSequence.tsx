import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { CompanyLogo } from "../CompanyLogo";
import {
  TIMING_CONFIG,
  STOCK_CHART_PATH,
  STOCK_CHART_AREA,
  PRICE_GRIDLINES,
  TIME_AXIS_LABELS,
  EMOTION_ANCHORS,
  getPointAtProgress,
} from "../../data/chartData";

export interface StocksEvokeSequenceProps {
  onComplete: () => void;
  ticker?: string;
}

export function StocksEvokeSequence({
  onComplete,
  ticker = "NOW",
}: StocksEvokeSequenceProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [elapsedSec, setElapsedSec] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cfg = isMobile ? TIMING_CONFIG.mobile : TIMING_CONFIG.desktop;

  // Master Clock (single rAF timeline started only after document.fonts.ready)
  useEffect(() => {
    let isCancelled = false;
    let animId: number;

    const startMasterClock = () => {
      if (isCancelled) return;

      if (prefersReducedMotion) {
        setElapsedSec(cfg.TOTAL_BUDGET);
        const timer = setTimeout(() => {
          onCompleteRef.current();
        }, 300);
        return;
      }

      const startTime = performance.now();
      let centerTextReported = false;

      const frame = (now: number) => {
        if (isCancelled) return;
        const elapsed = (now - startTime) / 1000;
        setElapsedSec(elapsed);

        // Dev-time check: measure center text reveal completion
        const centerEnd = cfg.CENTER_START + cfg.CENTER_DURATION;
        if (elapsed >= centerEnd && !centerTextReported) {
          centerTextReported = true;
          const measuredMs = Math.round(now - startTime);
          console.log(
            `[StocksEvokeSequence] Center text fully revealed at ${elapsed.toFixed(2)}s (${measuredMs}ms). Total Budget: ${cfg.TOTAL_BUDGET}s.`
          );
          if (elapsed > cfg.TOTAL_BUDGET) {
            console.warn(
              `[StocksEvokeSequence] WARNING: Total elapsed ${elapsed.toFixed(2)}s exceeded budget of ${cfg.TOTAL_BUDGET}s!`
            );
          }
        }

        if (elapsed < cfg.TOTAL_BUDGET) {
          animId = requestAnimationFrame(frame);
        } else {
          onCompleteRef.current();
        }
      };

      animId = requestAnimationFrame(frame);
    };

    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(startMasterClock);
    } else {
      startMasterClock();
    }

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animId);
    };
  }, [isMobile, prefersReducedMotion, cfg]);

  // Dev-time assertion ensuring all 5 emotion words exist in the DOM
  useEffect(() => {
    const isDev =
      typeof process !== "undefined" &&
      process.env &&
      process.env["NODE_ENV"] !== "production";
    if (isDev) {
      const assertionTimer = setTimeout(() => {
        EMOTION_ANCHORS.forEach((emo) => {
          const el = document.getElementById(`emotion-word-${emo.id}`);
          if (!el) {
            console.warn(
              `[StocksEvokeSequence] Assertion warning: Emotion word '${emo.id}' element not found in DOM.`
            );
          }
        });
      }, 4500);
      return () => clearTimeout(assertionTimer);
    }
    return undefined;
  }, []);

  // Continuous unbroken draw progress
  const rawDrawProgress = prefersReducedMotion
    ? 1
    : (elapsedSec - cfg.DRAW_START) / cfg.DRAW_DURATION;
  const drawProgress = Math.max(0, Math.min(1, rawDrawProgress));
  const isDrawComplete = drawProgress >= 1;

  const currentHead = getPointAtProgress(drawProgress);

  // Derived timing triggers
  const furnitureOpacity = prefersReducedMotion
    ? 1
    : Math.max(0, Math.min(1, elapsedSec / cfg.FURNITURE_FADE));

  const tagStartTime = cfg.DRAW_START + cfg.DRAW_DURATION - cfg.TAG_FADE_LEAD;
  const isTagVisible = elapsedSec >= tagStartTime;
  const tagOpacity = prefersReducedMotion
    ? 1
    : Math.max(0, Math.min(1, (elapsedSec - tagStartTime) / cfg.TAG_FADE_LEAD));

  const isTickerFinal = elapsedSec >= tagStartTime;

  const rawCenterProgress = prefersReducedMotion
    ? 1
    : Math.max(0, Math.min(1, (elapsedSec - cfg.CENTER_START) / cfg.CENTER_DURATION));
  // Smooth cubic ease-out for immediate, crisp text appearance
  const centerProgress = prefersReducedMotion
    ? 1
    : 1 - Math.pow(1 - rawCenterProgress, 3);
  const centerOpacity = prefersReducedMotion ? 1 : Math.min(1, centerProgress * 1.1);
  const centerScale = 0.96 + 0.04 * centerProgress;
  const centerBlur = Math.max(0, 6 * (1 - centerProgress));

  // Determine latest triggered emotion for 100% vs 85% opacity
  let latestEmotionIndex = -1;
  EMOTION_ANCHORS.forEach((emo, i) => {
    const triggerTime = cfg.DRAW_START + emo.progress * cfg.DRAW_DURATION;
    if (elapsedSec >= triggerTime) {
      latestEmotionIndex = i;
    }
  });

  return (
    <div className="relative flex h-[100svh] w-full items-center justify-center px-3 sm:px-6 md:px-10 select-none overflow-hidden">
      <motion.div
        key="stocks-evoke-graph-container"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{
          opacity: 0,
          scale: 0.94,
          filter: "blur(10px)",
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex items-center justify-center w-full max-w-[96vw] xl:max-w-[1600px] 2xl:max-w-[1780px] pointer-events-none"
      >
        {/* Ticker Identity Chip: ServiceNow Inc · NYSE: NOW */}
        <div
          aria-hidden="true"
          style={{ opacity: furnitureOpacity }}
          className="absolute top-2 left-2 sm:top-4 sm:left-6 z-40 flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#0b0f17]/85 backdrop-blur-md border border-white/[0.08] shadow-2xl pointer-events-none transition-opacity duration-300"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
            <CompanyLogo
              ticker={ticker}
              containerClassName="w-full h-full flex items-center justify-center p-0.5"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-display text-xs sm:text-sm font-semibold tracking-tight text-neutral-100">
            ServiceNow Inc
          </span>
          <span className="font-mono text-xs sm:text-sm text-neutral-300 font-medium tabular-nums">
            {isTickerFinal ? "$139.75" : "$147.45"}
          </span>
        </div>

        {/* Inline SVG Stock Graph restored to full original viewBox frame */}
        <div className="w-full aspect-[960/420] sm:aspect-[960/380] relative flex items-center justify-center">
          <svg
            viewBox="0 -35 960 410"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Soft, premium glow filter for the path stroke */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Area fill gradient */}
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" stopOpacity="0" />
                <stop offset="12%" stopColor="#475569" stopOpacity="0.08" />
                <stop offset="55%" stopColor="#64748b" stopOpacity="0.10" />
                <stop offset="88%" stopColor="#cbd5e1" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#475569" stopOpacity="0" />
              </linearGradient>

              {/* Line stroke gradient */}
              <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" stopOpacity="0" />
                <stop offset="4%" stopColor="#475569" stopOpacity="0.45" />
                <stop offset="25%" stopColor="#64748b" stopOpacity="0.85" />
                <stop offset="55%" stopColor="#94a3b8" stopOpacity="0.95" />
                <stop offset="85%" stopColor="#e2e8f0" stopOpacity="1" />
                <stop offset="92%" stopColor="#f8fafc" stopOpacity="1" />
                <stop offset="97%" stopColor="#cbd5e1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#475569" stopOpacity="0" />
              </linearGradient>

              {/* Mask to ensure area fill gracefully fades out at left and right edges */}
              <mask id="fadeEdgesMask">
                <linearGradient id="fadeEdgesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="3%" stopColor="#000000" />
                  <stop offset="14%" stopColor="#ffffff" />
                  <stop offset="90%" stopColor="#ffffff" />
                  <stop offset="98%" stopColor="#000000" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <rect x="0" y="-40" width="960" height="450" fill="url(#fadeEdgesGrad)" />
              </mask>

              {/* Mask to ensure area fill shadow fades to 0 vertically */}
              <mask id="areaVerticalFadeMask">
                <linearGradient id="areaVerticalFadeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="25%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="55%" stopColor="#ffffff" stopOpacity="0.35" />
                  <stop offset="78%" stopColor="#ffffff" stopOpacity="0.08" />
                  <stop offset="90%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
                <rect x="0" y="-40" width="960" height="450" fill="url(#areaVerticalFadeGrad)" />
              </mask>

              {/* Clip path smoothly following draw head */}
              <clipPath id="chartDrawClip">
                <rect
                  x="0"
                  y="-50"
                  width={prefersReducedMotion ? "960" : Math.max(0, currentHead.x + 3)}
                  height="460"
                />
              </clipPath>
            </defs>

            {/* 1. Quiet Chart Furniture: 3 Gridlines & 4 Time Labels */}
            <g aria-hidden="true" style={{ opacity: furnitureOpacity }}>
              {PRICE_GRIDLINES.map((grid) => (
                <g key={`grid-${grid.y}`}>
                  <line
                    x1="20"
                    y1={grid.y}
                    x2="940"
                    y2={grid.y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="3 4"
                    strokeWidth="1"
                  />
                  <text
                    x="946"
                    y={grid.y + 3.5}
                    textAnchor="start"
                    fill="rgba(255,255,255,0.26)"
                    fontSize="9.5"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    className="select-none"
                  >
                    {grid.price}
                  </text>
                </g>
              ))}

              {/* Baseline & Time labels */}
              <line
                x1="20"
                y1="348"
                x2="940"
                y2="348"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              {TIME_AXIS_LABELS.map((item) => (
                <text
                  key={`time-${item.text}`}
                  x={item.x}
                  y="364"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.24)"
                  fontSize="9.5"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  className={`select-none ${item.hideMobile ? "hidden sm:inline" : ""}`}
                >
                  {item.text}
                </text>
              ))}
            </g>

            {/* 2. Area gradient fill clipped to current draw head */}
            <g mask="url(#areaVerticalFadeMask)" clipPath="url(#chartDrawClip)">
              <path
                d={STOCK_CHART_AREA}
                fill="url(#areaGradient)"
                mask="url(#fadeEdgesMask)"
              />
            </g>

            {/* 3. Main stock polyline drawn with clipPath */}
            <path
              d={STOCK_CHART_PATH}
              stroke="url(#strokeGradient)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              clipPath="url(#chartDrawClip)"
            />

            {/* 4. Leading Draw Head Dot */}
            {drawProgress > 0 && (
              <g aria-hidden="true">
                <circle
                  cx={currentHead.x}
                  cy={currentHead.y}
                  r="3.6"
                  fill="#f8fafc"
                  stroke="#38bdf8"
                  strokeWidth="1.6"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(56,189,248,0.9))",
                  }}
                />

                {/* Gentle pulse after draw completes */}
                {isDrawComplete && (
                  <motion.circle
                    cx={currentHead.x}
                    cy={currentHead.y}
                    r="3.6"
                    animate={{ r: [3.6, 9, 3.6], opacity: [0.6, 0.1, 0.6] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.4"
                  />
                )}
              </g>
            )}

            {/* 5. Last-Price Pill Tag on Right Axis */}
            {isTagVisible && (
              <g
                transform="translate(944, 64.5)"
                style={{ opacity: tagOpacity }}
                aria-hidden="true"
              >
                <rect
                  x="0"
                  y="0"
                  width="54"
                  height="19"
                  rx="4"
                  fill="#881337"
                  fillOpacity="0.9"
                  stroke="rgba(244,63,94,0.3)"
                  strokeWidth="0.8"
                />
                <text
                  x="27"
                  y="13"
                  textAnchor="middle"
                  fill="#fecdd3"
                  fontSize="9.5"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontWeight="600"
                  className="select-none tabular-nums"
                >
                  $139.75
                </text>
              </g>
            )}

            {/* 6. Five Emotion Words & Anchor Dots (Driven by progress) */}
            {EMOTION_ANCHORS.map((emotion, index) => {
              const triggerTime = cfg.DRAW_START + emotion.progress * cfg.DRAW_DURATION;
              const isTriggered = elapsedSec >= triggerTime;
              const revealProgress = prefersReducedMotion
                ? 1
                : Math.max(0, Math.min(1, (elapsedSec - triggerTime) / cfg.WORD_FADE_DURATION));
              const isLatest = index === latestEmotionIndex;
              const targetOpacity = isLatest ? 1 : 0.85;
              const wordOpacity = isTriggered ? revealProgress * targetOpacity : 0;
              const wordYOffset = prefersReducedMotion ? 0 : (1 - revealProgress) * 6;
              const dotOpacity = isTriggered ? Math.min(0.9, revealProgress * 1.5) : 0;

              return (
                <g key={emotion.id} id={`emotion-group-${emotion.id}`}>
                  {/* Anchor Dot on the Line */}
                  <circle
                    cx={emotion.anchorX}
                    cy={emotion.anchorY}
                    r="3.2"
                    fill={emotion.color}
                    style={{
                      opacity: dotOpacity,
                      filter: `drop-shadow(0 0 6px ${emotion.glow})`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Large Serif Emotion Word with soft protective dark halo */}
                  <g transform={`translate(${emotion.x}, ${emotion.y})`}>
                    <text
                      id={`emotion-word-${emotion.id}`}
                      x="0"
                      y={wordYOffset}
                      textAnchor="middle"
                      fontSize="38"
                      fill={emotion.color}
                      className="font-display font-light font-[300] select-none"
                      style={{
                        opacity: wordOpacity,
                        filter: `drop-shadow(0 2px 14px rgba(0,0,0,0.95)) drop-shadow(0 0 22px ${emotion.glow})`,
                      }}
                    >
                      {emotion.word}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Central Overlay Headline: "Recognize the feeling?" */}
        {elapsedSec >= cfg.CENTER_START && (
          <div
            style={{
              opacity: centerOpacity,
              transform: `scale(${centerScale})`,
              filter: `blur(${centerBlur}px)`,
            }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none transition-transform ease-out"
          >
            <div
              className="relative max-w-5xl px-10 py-8 sm:px-16 sm:py-12 text-center rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(18, 19, 20, 0.96) 0%, rgba(18, 19, 20, 0.85) 45%, rgba(18, 19, 20, 0.25) 75%, rgba(18, 19, 20, 0) 800%)",
              }}
            >
              <h2
                className="font-display font-light font-[300] tracking-tight leading-tight text-[2.4rem] xs:text-[3.1rem] sm:text-[3.8rem] md:text-[4.5rem] text-center text-white select-none"
                style={{ textShadow: "0 0 40px rgba(255,255,255,0.32)" }}
              >
                Recognize the feeling?
              </h2>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
