import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CompanyLogo } from "../CompanyLogo";

// Headline animation timing constants
const HEADING_FADE_DURATION = 0.32; // Snappy: ~320ms
const DRIFT_DISTANCE = 14; // ~14px upward drift

const PHRASE_SLIDE_DURATION = 0.26; // Fluid: ~260ms vertical slide-and-fade
const RESPONSE_FADE_DURATION = 0.24; // Fluid: ~240ms fade in/out
const PHRASE_SLIDE_DISTANCE = 16; // 16px vertical slide offset
const QUESTION_TYPE_DURATION_MS = 200; // Question types out in 0.2s (200ms)

// Rotating phrase interval & transition constants
export const PHRASE_ROTATION_INTERVAL_MS = 2600; // Increased delay: 2.6s per phrase for comfortable reading of question & answer

// Sequence timeline milestones (ms from mount) - Starts DIRECTLY at "respond in your language"
const T_SHOW_HEADLINE = 40; // Headline fades in immediately
const T_START_ROTATION = 180; // 180ms: Starts typing directly at Phrase 0 once container settles
const T_PHRASE_1 = T_START_ROTATION + PHRASE_ROTATION_INTERVAL_MS; // 2780ms: "are unbiased"
const T_PHRASE_2 = T_PHRASE_1 + PHRASE_ROTATION_INTERVAL_MS; // 5380ms: "find what's priced in"
const T_PHRASE_3 = T_PHRASE_2 + PHRASE_ROTATION_INTERVAL_MS; // 7980ms: "find what's mispriced"
const T_START_BRAND_FOCUS = T_PHRASE_3 + PHRASE_ROTATION_INTERVAL_MS; // 10580ms: Final "mispriced" focus & logo reveal
const T_COMPLETE = T_START_BRAND_FOCUS + 2500; // 13080ms: Complete

export const PHRASE_START_TIMES = [
  T_START_ROTATION,
  T_PHRASE_1,
  T_PHRASE_2,
  T_PHRASE_3,
];

export interface ResponseSegment {
  text: string;
  highlight?: "teal" | "amber";
}

export interface PhrasePart {
  text: string;
  color?: "teal" | "amber";
}

export interface PhraseData {
  phrase: string;
  phraseParts: PhrasePart[];
  ticker: string;
  question: string;
  segments: ResponseSegment[];
}

export const ROTATING_PHRASE_ITEMS: PhraseData[] = [
  {
    phrase: "respond in your language",
    phraseParts: [
      { text: "respond in" },
      { text: "your language", color: "teal" },
    ],
    ticker: "NVDA",
    question: "Am I too late?",
    segments: [
      {
        text: "Think of it in plain terms: compute demand remains historic, but consensus expectations leave little margin for near-term supply execution hiccups.",
      },
    ],
  },
  {
    phrase: "are unbiased",
    phraseParts: [
      { text: "are" },
      { text: "unbiased", color: "amber" },
    ],
    ticker: "META",
    question: "What am I missing in this stock?",
    segments: [
      {
        text: "We weight cold evidence over narrative:",
      },
      {
        text: "Reality Labs spend draws skepticism, but AI-driven ad feed recommendation is quietly delivering record return on ad spend compounding.",
        highlight: "amber",
      },
    ],
  },
  {
    phrase: "find what's priced in",
    phraseParts: [
      { text: "find what's" },
      { text: "priced in", color: "teal" },
    ],
    ticker: "TSLA",
    question: "Is all the hype already in the price?",
    segments: [
      {
        text: "This is already priced in:",
      },
      {
        text: "Robotaxi fleet optionality is heavily factored into today's multiple, while core automotive unit gross margins face persistent price pressure.",
        highlight: "teal",
      },
    ],
  },
  {
    phrase: "find what's mispriced",
    phraseParts: [
      { text: "find what's" },
      { text: "mispriced", color: "amber" },
    ],
    ticker: "AMZN",
    question: "Is the market panicking for no reason?",
    segments: [
      {
        text: "The market is missing this:",
      },
      {
        text: "Cloud workload optimizations have troughed and generative AI training contracts are expanding multi-year backlog faster than modeled.",
        highlight: "amber",
      },
    ],
  },
];

export interface OpeningSequenceProps {
  onComplete?: () => void;
  isPaused?: boolean;
}

export function OpeningSequence({
  onComplete,
  isPaused = false,
}: OpeningSequenceProps) {
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  // Single continuous rAF timeline for perfectly pausable deterministic states
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

  const hasCompletedRef = useRef(false);
  useEffect(() => {
    if (elapsedMs >= T_COMPLETE && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [elapsedMs]);

  // Purely derived states from elapsedMs (pausing freezes all of them precisely)
  const showAskHowever = elapsedMs >= T_SHOW_HEADLINE;

  const phraseIndex =
    elapsedMs >= T_PHRASE_3
      ? 3
      : elapsedMs >= T_PHRASE_2
        ? 2
        : elapsedMs >= T_PHRASE_1
          ? 1
          : 0;

  const isBrandFocus = elapsedMs >= T_START_BRAND_FOCUS;

  // 0.2s Typewriter calculation for active question box
  const currentPhraseStart = PHRASE_START_TIMES[phraseIndex] ?? T_START_ROTATION;
  const timeSincePhraseStart = Math.max(0, elapsedMs - currentPhraseStart);
  const typeProgress = Math.min(1, timeSincePhraseStart / QUESTION_TYPE_DURATION_MS);

  const currentItem = ROTATING_PHRASE_ITEMS[phraseIndex];
  const fullQuestion = currentItem?.question ?? "";
  const charIndex = Math.min(
    fullQuestion.length,
    Math.floor(typeProgress * fullQuestion.length)
  );
  const typedQuestion = fullQuestion.slice(0, charIndex);
  const isTyping = typeProgress < 1;

  return (
    <div className="w-full h-[100svh] overflow-hidden relative select-none flex flex-col items-center justify-center">
      {/* Foreground Center Stage Sequences: Sequential Reveal */}
      <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center px-4 sm:px-8 md:px-12">
        {/* Step A: "Expert analysts" headline and phrase reveal */}
        <AnimatePresence>
          {showAskHowever && !isBrandFocus && (
            <motion.div
              key="expert-analysts-container"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.97,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-30 w-full flex items-center justify-center pointer-events-none"
            >
              <div
                className="relative w-full max-w-6xl xl:max-w-7xl px-4 py-8 sm:px-8 md:px-10 sm:py-10 text-center flex flex-col items-center justify-center mx-auto"
              >
                {/* Line 1: "Our expert analysts" */}
                <motion.h2
                  initial={{ opacity: 0, y: DRIFT_DISTANCE }}
                  animate={{
                    opacity: isBrandFocus ? 0 : 1,
                    y: 0,
                  }}
                  transition={{
                    opacity: { duration: HEADING_FADE_DURATION, ease: "easeOut" },
                    y: { duration: HEADING_FADE_DURATION, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="w-full font-display font-light font-[300] tracking-tight leading-tight text-[2.2rem] xs:text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] text-center text-white select-none whitespace-normal sm:whitespace-nowrap flex items-center justify-center mx-auto"
                  style={{ textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 40px rgba(255,255,255,0.32)" }}
                >
                  Our expert analysts
                </motion.h2>

                {/* Line 2: Masked vertical slide container (the old word slides up and fades out while the new word slides up and fades in) */}
                <div
                  className="relative w-full h-[4.2rem] xs:h-[5.2rem] sm:h-[4.4rem] md:h-[5.2rem] flex items-center justify-center text-center overflow-hidden select-none mt-1 sm:mt-2 mx-auto"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    {!isBrandFocus && (
                      <motion.div
                        key={`phrase-${phraseIndex}`}
                        initial={{ opacity: 0, y: 52, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{
                          opacity: 0,
                          y: -52,
                          filter: "blur(4px)",
                          transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                        }}
                        transition={{
                          duration: 0.44,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full flex items-center justify-center text-center font-display font-light font-[300] tracking-tight leading-tight text-[2.2rem] xs:text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] text-white px-2 whitespace-normal sm:whitespace-nowrap select-none mx-auto"
                        style={{ textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 35px rgba(255,255,255,0.3)" }}
                      >
                        {ROTATING_PHRASE_ITEMS[phraseIndex]?.phraseParts ? (
                          ROTATING_PHRASE_ITEMS[phraseIndex].phraseParts.map((part, pIdx) => {
                            if (part.color === "amber") {
                              return (
                                <span key={pIdx} className="inline">
                                  {pIdx > 0 && <span className="inline-block w-[0.28em]">&nbsp;</span>}
                                  <span
                                    className="text-amber-400 font-normal inline"
                                    style={{
                                      textShadow:
                                        "0 0 25px rgba(251,191,36,0.55), 0 0 50px rgba(251,191,36,0.28)",
                                    }}
                                  >
                                    {part.text}
                                  </span>
                                </span>
                              );
                            }
                            if (part.color === "teal") {
                              return (
                                <span key={pIdx} className="inline">
                                  {pIdx > 0 && <span className="inline-block w-[0.28em]">&nbsp;</span>}
                                  <span
                                    className="text-teal-400 font-normal inline"
                                    style={{
                                      textShadow:
                                        "0 0 25px rgba(45,212,191,0.5), 0 0 50px rgba(45,212,191,0.25)",
                                    }}
                                  >
                                    {part.text}
                                  </span>
                                </span>
                              );
                            }
                            return (
                              <span key={pIdx} className="inline">
                                {pIdx > 0 && <span className="inline-block w-[0.28em]">&nbsp;</span>}
                                {part.text}
                              </span>
                            );
                          })
                        ) : (
                          ROTATING_PHRASE_ITEMS[phraseIndex]?.phrase
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Question & Answer display below Line 2 */}
                {!isBrandFocus && (
                  <div className="relative w-full max-w-[860px] lg:max-w-[980px] xl:max-w-[1080px] min-h-[220px] overflow-visible mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 mx-auto">
                    <div className="flex flex-col items-stretch text-left select-none w-full">
                      {/* Fixed Question Box UI - Stays steadily mounted, right-aligned, 80% width */}
                      <div className="w-[80%] ml-auto flex items-center h-[54px] sm:h-[60px] md:h-[66px] rounded-[14px] sm:rounded-[18px] md:rounded-[20px] border border-white/12 bg-[#17191e]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.06)] px-2.5 sm:px-3.5 mb-5 sm:mb-6 overflow-hidden">
                        {/* 3D Flipping Ticker Chip */}
                        <div
                          className="relative shrink-0 w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] md:w-[46px] md:h-[46px]"
                          style={{ perspective: "600px" }}
                        >
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                              key={currentItem?.ticker || "NVDA"}
                              initial={{ rotateY: 90, opacity: 0, scale: 0.86 }}
                              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                              exit={{ rotateY: -90, opacity: 0, scale: 0.86 }}
                              transition={{
                                duration: 0.28,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden",
                                willChange: "transform, opacity",
                              }}
                              className="absolute inset-0 flex items-center justify-center rounded-[10px] sm:rounded-[12px] bg-white/[0.07] border border-white/[0.1] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                            >
                              <CompanyLogo
                                ticker={currentItem?.ticker || "NVDA"}
                                containerClassName="w-full h-full flex items-center justify-center p-1 sm:p-1.5"
                                className="h-full w-full object-contain"
                              />
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Stock Question Text with Typewriter Effect */}
                        <div className="min-w-0 flex items-center flex-1 px-3 sm:px-4 pr-3 sm:pr-4 overflow-hidden text-left">
                          <span className="font-display font-light text-[1.10rem] xs:text-[1.22rem] sm:text-[1.36rem] md:text-[1.48rem] text-white tracking-tight whitespace-nowrap overflow-hidden text-ellipsis leading-none">
                            {typedQuestion}
                            {isTyping && (
                              <span className="inline-block bg-teal-400 ml-1.5 w-[2px] sm:w-[2.5px] h-[1.1em] animate-pulse rounded-[1px] align-middle -translate-y-[1px]" />
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Answer: Left-aligned analyst response below fixed question box */}
                      <div className="relative min-h-[90px] w-full">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={`answer-${phraseIndex}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4, transition: { duration: 0.16 } }}
                            transition={{
                              duration: RESPONSE_FADE_DURATION,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="font-display font-light font-[300] tracking-tight text-[1.16rem] xs:text-[1.28rem] sm:text-[1.42rem] md:text-[1.54rem] lg:text-[1.64rem] leading-[1.6] sm:leading-[1.65] text-white/95 text-left select-none w-full"
                          >
                            {currentItem?.segments.map((seg, sIdx) => {
                              return (
                                <span key={sIdx} className="inline">
                                  {sIdx > 0 && <span className="inline-block w-[0.32em]">&nbsp;</span>}
                                  {seg.highlight === "teal" ? (
                                    <span
                                      className="highlight-wipe-teal inline"
                                      style={{
                                        boxDecorationBreak: "clone",
                                        WebkitBoxDecorationBreak: "clone",
                                        padding: "0.1em 4px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      {seg.text}
                                    </span>
                                  ) : seg.highlight === "amber" ? (
                                    <span
                                      className="highlight-wipe-amber inline"
                                      style={{
                                        boxDecorationBreak: "clone",
                                        WebkitBoxDecorationBreak: "clone",
                                        padding: "0.1em 4px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      {seg.text}
                                    </span>
                                  ) : (
                                    <span>{seg.text}</span>
                                  )}
                                </span>
                              );
                            })}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step B: Final Logo & Title Reveal - perfectly centered vertically and horizontally in the viewport */}
        <AnimatePresence>
          {isBrandFocus && (
            <motion.div
              key="final-brand-reveal-centered"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-4 select-none"
            >
              {/* Mispriced Logo directly above "mispriced" */}
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-3 sm:mb-4 flex items-center justify-center pointer-events-none"
              >
                <img
                  src="/mispriced-logo.png"
                  alt="Mispriced.ai logo"
                  className="h-auto w-14 xs:w-16 sm:w-20 md:w-24"
                />
              </motion.div>

              {/* Centered "mispriced" title */}
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display font-light font-[300] tracking-tight leading-none text-center text-white text-[2.8rem] xs:text-[3.5rem] sm:text-[4.2rem] md:text-[5rem] select-none"
                style={{ textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 45px rgba(255,255,255,0.38)" }}
              >
                mispriced
              </motion.h1>

              {/* Subtitle: "Where data ends, analysis begins" */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-3.5 sm:mt-5 font-display font-light font-[300] tracking-tight leading-none text-center text-white/60 text-[1.3rem] xs:text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] select-none whitespace-nowrap"
                style={{ textShadow: "0 0 32px rgba(255,255,255,0.25)" }}
              >
                Where data ends, analysis begins
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Inline keyframe styles for subtle left-to-right highlight wipes */}
      <style>{`
        @keyframes wipeHighlightTeal {
          from { background-size: 0% 100%; }
          to { background-size: 100% 100%; }
        }
        @keyframes wipeHighlightAmber {
          from { background-size: 0% 100%; }
          to { background-size: 100% 100%; }
        }
        .highlight-wipe-teal {
          display: inline;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          padding: 0.12em 3px;
          border-radius: 3px;
          background-image: linear-gradient(rgba(20, 184, 166, 0.14), rgba(20, 184, 166, 0.14));
          background-repeat: no-repeat;
          background-size: 0% 100%;
          animation: wipeHighlightTeal 0.42s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards;
          color: #f8fafc;
        }
        .highlight-wipe-amber {
          display: inline;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          padding: 0.12em 3px;
          border-radius: 3px;
          background-image: linear-gradient(rgba(245, 158, 11, 0.14), rgba(245, 158, 11, 0.14));
          background-repeat: no-repeat;
          background-size: 0% 100%;
          animation: wipeHighlightAmber 0.42s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards;
          color: #f8fafc;
        }
      `}</style>
    </div>
  );
}
