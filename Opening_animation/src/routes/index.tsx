import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  StocksEvokeSequence,
  NoiseOverwhelmSequence,
  OpeningSequence,
  FinalSequence,
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
  FinalSequence,
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
  | "chatting_ui"
  | "final_brand";

export function RouteComponent() {
  const [stage, setStage] = useState<AnimationStage>("stocks_evoke");
  const [key] = useState(0);

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#121314] font-display font-light font-[300] text-foreground antialiased selection:bg-teal-500/30">
      {/* Atmospheric dark gradient background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(15, 118, 110, 0.28) 0%, rgba(11, 46, 42, 0.18) 45%, rgba(18, 19, 20, 0) 80%), #121314",
        }}
      />

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
                filter: "blur(8px)",
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              style={{ willChange: "opacity, filter, transform" }}
              className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
            >
              <StocksEvokeSequence
                onComplete={() => setStage("noise_overwhelm")}
              />
            </motion.div>
          )}

          {/* Step 2: "Overwhelmed by the noise" with static answer company logos */}
          {stage === "noise_overwhelm" && (
            <motion.div
              key={`noise-overwhelm-step-${key}`}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                scale: 0.98,
                filter: "blur(8px)",
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "opacity, filter, transform" }}
              className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
            >
              <NoiseOverwhelmSequence
                onComplete={() => setStage("chatting_ui")}
              />
            </motion.div>
          )}

          {/* Step 3: Chatting UI Search Bar Sequence & Constellation Zoom-out */}
          {stage === "chatting_ui" && (
            <motion.div
              key={`chatting-ui-sequence-${key}`}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                filter: "blur(6px)",
                transition: { duration: 0.35, ease: "easeOut" },
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "opacity, filter, transform" }}
              className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
            >
              <OpeningSequence
                onComplete={() => setStage("final_brand")}
              />
            </motion.div>
          )}

          {/* Step 4: Final Brand Screen */}
          {stage === "final_brand" && (
            <motion.section
              key={`final-screen-${key}`}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "opacity, filter" }}
              className="absolute inset-0 flex h-full w-full items-center justify-center"
            >
              <FinalSequence
                key={`final-step-${key}`}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default RouteComponent;
