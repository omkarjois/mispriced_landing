import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { CompanyLogo } from "./CompanyLogo";
import { TICKER_REEL_ITEMS } from "../data/tickers";

export interface VerticalTickerDrumProps {
  activeIndex: number;
  isHighSpeed?: boolean;
  flipDurationSec?: number;
  slotHeight: number;
  isMobile: boolean;
  isLargeWidget: boolean;
}

export function VerticalTickerDrum({
  activeIndex,
  isHighSpeed,
  flipDurationSec = 0.38,
  slotHeight,
  isMobile,
  isLargeWidget,
}: VerticalTickerDrumProps) {
  // Balanced gap between ticker cards in the vertical column
  const gap = slotHeight > 60 ? Math.round(slotHeight * 0.18) : 10;
  const stepDistance = slotHeight + gap;

  // Window height displaying 7 items (3 above + 1 active center + 3 below)
  const windowHeight = stepDistance * 7;

  // Center alignment: places activeIndex exactly at y = 0 inside the search pill slot
  const translateY =
    3.5 * stepDistance - slotHeight / 2 - activeIndex * stepDistance;

  const prevActiveIndexRef = useRef(activeIndex);
  const isIndexChange = prevActiveIndexRef.current !== activeIndex;

  useEffect(() => {
    prevActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  const borderRadiusClass = isMobile
    ? "rounded-xl xs:rounded-2xl"
    : isLargeWidget
      ? "rounded-2xl sm:rounded-[24px]"
      : "rounded-xl sm:rounded-2xl";

  const motionTransition = isIndexChange
    ? isHighSpeed
      ? { duration: flipDurationSec, ease: "linear" as const }
      : { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const }
    : { duration: 0 };

  return (
    <div
      className="absolute inset-x-0 pointer-events-none select-none"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        height: `${windowHeight}px`,
        overflow: "hidden",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 18%, black 36%, black 64%, rgba(0,0,0,0.2) 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 18%, black 36%, black 64%, rgba(0,0,0,0.2) 82%, transparent 100%)",
      }}
    >
      <motion.div
        initial={false}
        animate={{ y: translateY }}
        transition={motionTransition}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${gap}px`,
          width: "100%",
        }}
      >
        {TICKER_REEL_ITEMS.map((ticker, idx) => {
          const dist = Math.abs(idx - activeIndex);
          const isActive = dist === 0;

          let opacity = 0;
          let scale = 0.75;
          let boxStyles = "bg-[#18191c]/35 border-white/5";

          if (isActive) {
            opacity = 1;
            scale = 1;
            boxStyles = "bg-black border-white/20 shadow-xl ring-1 ring-white/10";
          } else if (dist === 1) {
            opacity = 0;
            scale = 0.75;
            boxStyles = "bg-[#18191c]/60 border-white/5 shadow-sm";
          } else if (dist === 2) {
            opacity = 0;
            scale = 0.75;
            boxStyles = "bg-[#18191c]/30 border-white/5";
          } else if (dist === 3) {
            opacity = 0;
            scale = 0.75;
            boxStyles = "bg-[#18191c]/15 border-transparent";
          }

          return (
            <div
              key={`${ticker}-${idx}`}
              className="w-full shrink-0 flex items-center justify-center"
              style={{
                height: `${slotHeight}px`,
              }}
            >
              <div
                className={`h-full aspect-square flex items-center justify-center overflow-hidden border transition-[opacity,transform,background-color,border-color] ${isHighSpeed ? "duration-100 ease-out" : "duration-300"} ${borderRadiusClass} ${boxStyles}`}
                style={{
                  width: `${slotHeight}px`,
                  height: `${slotHeight}px`,
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                {dist <= 3 ? <CompanyLogo ticker={ticker} /> : null}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
