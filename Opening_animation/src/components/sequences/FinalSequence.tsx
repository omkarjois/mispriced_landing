import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface FinalSequenceProps {
  onAnimationEnd?: () => void;
}

export function FinalSequence({ onAnimationEnd }: FinalSequenceProps) {
  const [phase, setPhase] = useState<"statement" | "brand">("statement");
  const onAnimationEndRef = useRef(onAnimationEnd);
  onAnimationEndRef.current = onAnimationEnd;

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // 1. Transition from statement to final brand after reading time
    timeouts.push(
      setTimeout(() => {
        setPhase("brand");
      }, 3300)
    );

    const finishTimer = setTimeout(() => {
      onAnimationEndRef.current?.();
    }, 5000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className="relative flex h-[100svh] w-full items-center justify-center px-4 sm:px-8 md:px-12 select-none overflow-hidden">
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
        <AnimatePresence mode="wait">
          {phase === "statement" ? (
            <motion.div
              key="analyst-statement"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.96,
                filter: "blur(8px)",
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center text-center px-4"
            >
              <h2
                className="font-display font-light font-[300] tracking-tight leading-tight text-[2.2rem] xs:text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] text-center text-white select-none max-w-none"
                style={{ textShadow: "0 0 40px rgba(255,255,255,0.32)" }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="block whitespace-nowrap"
                >
                  Hedge fund-grade analysts.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="block whitespace-nowrap"
                >
                  Always aware. Always outhinking.
                </motion.span>
              </h2>
            </motion.div>
          ) : (
            /* Step 2: Brand Reveal (Logo + "mispriced" + Subtitle "Your analyst army") */
            <motion.div
              key="final-brand-container"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-flex flex-col items-center justify-center text-center"
            >
              {/* Final Brand Logo mark directly above mispriced */}
              <motion.div
                key="brand-logo-top"
                initial={{ opacity: 0, y: -12, scale: 0.9, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-2 sm:mb-2.5 md:mb-3 flex items-center justify-center pointer-events-none"
              >
                <img
                  src="/mispriced-logo.png"
                  alt="Mispriced.ai logo"
                  className="h-auto w-12 xs:w-14 sm:w-20 md:w-20"
                />
              </motion.div>

              {/* Title: mispriced */}
              <motion.span
                initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block font-display font-light font-[300] tracking-tight leading-none text-center text-white text-[2.4rem] xs:text-[3.1rem] sm:text-[3.8rem] md:text-[4.5rem]"
                style={{ textShadow: "0 0 40px rgba(255,255,255,0.32)" }}
              >
                mispriced
              </motion.span>

              {/* Subtitle: "Your analyst army" */}
              <motion.h2
                key="analyst-army-subtitle"
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                style={{ textShadow: "0 0 32px rgba(255,255,255,0.25)" }}
                className="mt-3 sm:mt-4 md:mt-5 font-display font-light font-[300] tracking-tight leading-none text-center text-white/60 text-[1.4rem] xs:text-[1.7rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[2.75rem] select-none whitespace-nowrap"
              >
                Your analyst army
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
