import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CompanyLogo } from "../CompanyLogo";
import {
  INITIAL_SCATTERED_CARDS,
  SPREAD_X,
  SPREAD_Y,
  ZOOM_SCALE,
  CARD_WIDTH,
  CARD_HEIGHT,
} from "../../data/scatteredCards";

export interface OpeningSequenceProps {
  onComplete: () => void;
}

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [step, setStep] = useState<"q1_type" | "q2_appear" | "zoom_out">("q1_type");
  const [showAskHowever, setShowAskHowever] = useState<boolean>(false);
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const Q1_FULL = "Am I too late?";
  const Q2_FULL = "What am I missing in this stock?";

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // 1. Type out Q1 (NVDA) immediately at 100ms
    timeouts.push(
      setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setText1(Q1_FULL.slice(0, i));
          if (i >= Q1_FULL.length) {
            clearInterval(interval);
          }
        }, 16);
      }, 100)
    );

    // 2. Question 2 pops up below Question 1 at 650ms and types out
    timeouts.push(
      setTimeout(() => {
        setStep("q2_appear");
        let j = 0;
        const interval = setInterval(() => {
          j++;
          setText2(Q2_FULL.slice(0, j));
          if (j >= Q2_FULL.length) {
            clearInterval(interval);
          }
        }, 14);
      }, 950)
    );

    // 3. Zoom out into spatial constellation of diverse stock questions at 1450ms
    timeouts.push(
      setTimeout(() => {
        setStep("zoom_out");
      }, 1750)
    );

    // 4. Reveal "Who speaks your language" at 2200ms
    timeouts.push(
      setTimeout(() => {
        setShowAskHowever(true);
      }, 2200)
    );

    // 5. Fade out and transition into final brand screen at 5200ms
    timeouts.push(
      setTimeout(() => {
        setShowAskHowever(false);
      }, 5200)
    );

    timeouts.push(
      setTimeout(() => {
        onCompleteRef.current();
      }, 5200)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const isZoomedOut = step === "zoom_out";
  const effectiveScale = isMobile ? ZOOM_SCALE * 0.8 : ZOOM_SCALE;
  const zoomedInScale = isMobile ? 1.85 : 2.25;

  return (
    <div className="w-full h-[100svh] overflow-hidden relative select-none flex flex-col items-center justify-center">
      {/* 1. Unified Continuous Spatial Canvas (Q1 & Q2 zoom out in-place, showing all chat inputs) */}
      <motion.div
        initial={{ opacity: 0, scale: zoomedInScale, filter: "blur(0px)" }}
        animate={{
          opacity: 1,
          scale: isZoomedOut ? effectiveScale : zoomedInScale,
          filter: "blur(0px)",
        }}
        transition={{
          opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{ transformOrigin: "50% 51.5%" }}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
      >
        {INITIAL_SCATTERED_CARDS.map((card, idx) => {
          // Apply horizontal and vertical spread factors around center (50, 50)
          const calcTop = 50 + (card.top - 50) * SPREAD_Y;
          const calcLeft = 50 + (card.left - 50) * SPREAD_X;
          const cardRotate = isZoomedOut ? (card.rotate ?? 0) : 0;

          // Determine content and animation state per card type
          let isCardVisible = false;
          let displayText = card.question;
          let showCursor = false;
          let cardAnimation = { opacity: 0, scale: 0.92, y: 0, filter: "blur(4px)" };
          let cardTransition: {
            duration: number;
            ease: [number, number, number, number];
            delay: number;
          } = {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0,
          };

          if (card.isHeroQ1) {
            // NVDA Hero Card
            isCardVisible = true;
            displayText = isZoomedOut ? Q1_FULL : text1;
            showCursor = step === "q1_type" && text1.length > 0;
            cardAnimation = {
              opacity: isCardVisible ? 1 : 0,
              scale: isCardVisible ? 1 : 0.96,
              y: 0,
              filter: "blur(0px)",
            };
            cardTransition = { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0 };
          } else if (card.isHeroQ2) {
            // META Hero Card (pops up below NVDA during q2_appear)
            isCardVisible = step === "q2_appear" || step === "zoom_out";
            displayText = isZoomedOut ? Q2_FULL : text2;
            showCursor = step === "q2_appear" && text2.length > 0;
            cardAnimation = {
              opacity: isCardVisible ? 1 : 0,
              scale: isCardVisible ? 1 : 0.94,
              y: isCardVisible ? 0 : 16,
              filter: "blur(0px)",
            };
            cardTransition = { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0 };
          } else {
            // All other stock cards (fade and scale in smoothly when zooming out)
            isCardVisible = isZoomedOut;
            cardAnimation = {
              opacity: isCardVisible ? 1 : 0,
              scale: isCardVisible ? 1 : 0.92,
              y: 0,
              filter: isCardVisible ? "blur(0px)" : "blur(4px)",
            };
            cardTransition = {
              duration: 0.65,
              delay: isCardVisible ? 0.04 + (idx % 8) * 0.035 : 0,
              ease: [0.16, 1, 0.3, 1],
            };
          }

          return (
            <div
              key={card.id}
              style={{
                position: "absolute",
                top: `${calcTop}%`,
                left: `${calcLeft}%`,
                transform: `translate(-50%, -50%) rotate(${cardRotate}deg)`,
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
              }}
              className="pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
                animate={cardAnimation}
                transition={cardTransition}
                className="w-full h-full relative"
              >
                {/* Question Input Card - Modern AI Chat Composer */}
                <div className="absolute inset-0 w-full h-full flex items-center rounded-[16px] border border-white/10 bg-[#191b20] shadow-[0_4px_24px_rgba(0,0,0,0.45),0_1px_2px_rgba(0,0,0,0.3)] select-none overflow-hidden">
                  {/* Attached Ticker Logo Context Chip */}
                  <div className="flex items-center justify-center shrink-0 w-[40px] h-[40px] rounded-[10px] bg-white/[0.06] border border-white/[0.08] overflow-hidden ml-2 sm:ml-2.5">
                    <CompanyLogo
                      ticker={card.ticker}
                      containerClassName="w-full h-full flex items-center justify-center p-1.5"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Stock Question Text */}
                  <div className="min-w-0 flex items-center flex-1 px-2.5 sm:px-3 overflow-hidden">
                    <span className="font-display font-light text-[1.08rem] sm:text-[1.18rem] md:text-[1.26rem] text-white tracking-tight whitespace-nowrap overflow-hidden text-ellipsis leading-none">
                      {displayText}
                      {showCursor && (
                        <span className="inline-block bg-white ml-2 w-[2.5px] h-[1.05em] animate-pulse rounded-[1px] align-middle -translate-y-[1px]" />
                      )}
                    </span>
                  </div>

                  {/* Decorative Composer Send Button */}
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-full bg-white/[0.08] border border-white/[0.06] text-white/60 mr-2 sm:mr-2.5 pointer-events-none select-none"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Foreground Center Stage Sequences: Sequential Reveal */}
      <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center px-4 sm:px-8 md:px-12">
        {/* Step A: "Who speaks your language" with radial dark background */}
        <AnimatePresence>
          {showAskHowever && (
            <motion.div
              key="ask-however-container"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.96,
                filter: "blur(8px)",
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 flex items-center justify-center pointer-events-none"
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
                  <motion.span
                    initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="block whitespace-nowrap"
                  >
                    When it matters most,
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="block whitespace-nowrap"
                  >
                    who do you turn to?
                  </motion.span>
                </h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
