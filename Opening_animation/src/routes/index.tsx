import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  StocksEvokeSequence,
  NoiseOverwhelmSequence,
  OpeningSequence,
} from "../components/sequences";

// Re-export components and data for backwards-compatibility & clean public API
export { CompanyLogo } from "../components/CompanyLogo";
export type { CompanyLogoProps } from "../components/CompanyLogo";
export { SourceLogo } from "../components/SourceLogo";
export type { SourceLogoProps } from "../components/SourceLogo";
export { VerticalTickerDrum } from "../components/VerticalTickerDrum";
export type { VerticalTickerDrumProps } from "../components/VerticalTickerDrum";

export {
  StocksEvokeSequence,
  NoiseOverwhelmSequence,
  OpeningSequence,
} from "../components/sequences";

export * from "../data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mispriced.ai — Hunch to high conviction" },
      {
        name: "description",
        content: "See what's priced in. Find what's mispriced. Hunch to high conviction.",
      },
      { property: "og:title", content: "Mispriced.ai — Hunch to high conviction" },
      {
        property: "og:description",
        content: "See what's priced in. Find what's mispriced. Hunch to high conviction.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RouteComponent,
});

export type AnimationStage =
  | "stocks_evoke"
  | "noise_overwhelm"
  | "chatting_ui";

export function RouteComponent() {
  const [stage, setStage] = useState<AnimationStage>("stocks_evoke");
  const [key, setKey] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [totalElapsedSec, setTotalElapsedSec] = useState<number>(0);
  const [skipWordCloud, setSkipWordCloud] = useState<boolean>(false);

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const STAGE_START_OFFSETS: Record<AnimationStage, number> = {
    stocks_evoke: 0,
    noise_overwhelm: 3.5,
    chatting_ui: skipWordCloud ? 8.15 : 9.75,
  };

  // Continuous master clock tracking elapsed time from first stage of entire animation
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPausedRef.current) {
        setTotalElapsedSec((prev) => prev + delta);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Global spacebar listener to quickly toggle play / pause for testing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRestart = () => {
    setKey((k) => k + 1);
    setStage("stocks_evoke");
    setTotalElapsedSec(0);
    setIsPaused(false);
  };

  const handleJumpStage = (targetStage: AnimationStage) => {
    setKey((k) => k + 1);
    setStage(targetStage);
    setTotalElapsedSec(STAGE_START_OFFSETS[targetStage]);
    setIsPaused(false);
  };

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#121314] font-display font-light font-[300] text-foreground antialiased selection:bg-teal-500/30">
      {/* Atmospheric dark gradient background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(15, 118, 110, 0.16) 0%, rgba(11, 46, 42, 0.10) 45%, rgba(18, 19, 20, 0) 80%), #121314",
        }}
      />

      {/* Floating Testing Controls Toolbar for easy previewing & debugging */}
      <aside
        aria-label="Animation Testing Controls"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-neutral-900/90 px-3.5 py-2 backdrop-blur-md border border-white/10 shadow-2xl text-xs font-sans text-neutral-200 select-none"
      >
        {/* Play/Pause Button with Live Cumulative Time Badge */}
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-colors ${
            isPaused
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
              : "bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30"
          }`}
          title="Toggle Play / Pause (Spacebar)"
        >
          {isPaused ? (
            <>
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <span>Pause</span>
            </>
          )}

          {/* Time from the first stage of the entire animation */}
          <span className="h-3 w-px bg-current opacity-30 mx-0.5" />
          <span className="font-mono text-[11px] font-semibold tabular-nums">
            {totalElapsedSec.toFixed(1)}s
          </span>
        </button>

        {/* Restart Button */}
        <button
          type="button"
          onClick={handleRestart}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          title="Restart Sequence from Beginning"
        >
          <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>Restart</span>
        </button>

        <div className="h-4 w-px bg-white/10" />

        {/* Stage Jumper Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleJumpStage("stocks_evoke")}
            className={`px-2 py-1 rounded transition-colors ${
              stage === "stocks_evoke"
                ? "bg-white/20 text-white font-semibold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Stocks
          </button>
          <button
            type="button"
            onClick={() => handleJumpStage("noise_overwhelm")}
            className={`px-2 py-1 rounded transition-colors ${
              stage === "noise_overwhelm"
                ? "bg-white/20 text-white font-semibold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Noise
          </button>
          <button
            type="button"
            onClick={() => handleJumpStage("chatting_ui")}
            className={`px-2 py-1 rounded transition-colors ${
              stage === "chatting_ui"
                ? "bg-white/20 text-white font-semibold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Chatting UI
          </button>
        </div>

        <div className="h-4 w-px bg-white/10" />

        {/* Skip Word Cloud Toggle Button */}
        <button
          type="button"
          onClick={() => setSkipWordCloud((prev) => !prev)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all text-xs border ${
            skipWordCloud
              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
              : "bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10 hover:text-white"
          }`}
          title="Toggle skipping the Word Cloud step completely"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0 stroke-current stroke-2 fill-none"
            viewBox="0 0 24 24"
          >
            <polygon points="5 4 15 12 5 20 5 4" fill="currentColor" stroke="none" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
          <span>{skipWordCloud ? "Word Cloud: Skipped" : "Skip Word Cloud"}</span>
        </button>

        <span className="hidden md:inline text-[10px] text-neutral-500 pl-1">
          (Space: toggle)
        </span>
      </aside>

      {/* Main Flow Container */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] h-[100svh] w-full flex-col items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Step 1: Stocks Evoke Sequence & Graph Draw */}
          {stage === "stocks_evoke" && (
            <motion.div
              key={`stocks-evoke-step-${key}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 0.98,
                filter: "blur(4px)",
                transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
              }}
              style={{ willChange: "opacity, filter, transform" }}
              className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
            >
              <StocksEvokeSequence
                isPaused={isPaused}
                onComplete={() => setStage("noise_overwhelm")}
              />
            </motion.div>
          )}

          {/* Step 2: "Overwhelmed by the noise" with static answer company logos */}
          {stage === "noise_overwhelm" && (
            <motion.div
              key={`noise-overwhelm-step-${key}`}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                scale: 0.98,
                filter: "blur(4px)",
                transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "opacity, filter, transform" }}
              className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
            >
              <NoiseOverwhelmSequence
                isPaused={isPaused}
                skipWordCloud={skipWordCloud}
                onComplete={() => setStage("chatting_ui")}
              />
            </motion.div>
          )}

          {/* Step 3: Chatting UI Search Bar Sequence & Constellation Zoom-out */}
          {stage === "chatting_ui" && (
            <motion.div
              key={`chatting-ui-sequence-${key}`}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                filter: "blur(4px)",
                transition: { duration: 0.22, ease: "easeOut" },
              }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "opacity, filter, transform" }}
              className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
            >
              <OpeningSequence isPaused={isPaused} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default RouteComponent;
