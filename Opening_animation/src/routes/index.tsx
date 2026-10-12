import { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";

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

const TICKER_SYMBOL_MAP: Record<string, string> = {
  NETFLIX: "NFLX",
  NFLX: "NFLX",
  INTEL: "INTC",
  INTC: "INTC",
  GOOGLE: "GOOGL",
  GOOGL: "GOOGL",
  AMAZON: "AMZN",
  AMZN: "AMZN",
  META: "META",
  AAPL: "AAPL",
  MSFT: "MSFT",
  AMD: "AMD",
  TSM: "TSM",
  AVGO: "AVGO",
  QCOM: "QCOM",
  ARM: "ARM",
  PLTR: "PLTR",
  ORCL: "ORCL",
  SNOW: "SNOW",
  CRM: "CRM",
  DELL: "DELL",
  SMCI: "SMCI",
  FIGMA: "FIGMA",
  SPOT: "SPOT",
  UBER: "UBER",
  COIN: "COIN",
  SQ: "SQ",
  HOOD: "HOOD",
  PANW: "PANW",
  CRWD: "CRWD",
  DIS: "DIS",
  SHOP: "SHOP",
  ABNB: "ABNB",
  TSLA: "TSLA",
  NVDA: "NVDA",
  ADBE: "ADBE",
  NOW: "NOW",
  ASML: "ASML",
  MU: "MU",
  MRVL: "MRVL",
  NET: "NET",
  DDOG: "DDOG",
  MDB: "MDB",
  ZS: "ZS",
  PYPL: "PYPL",
  SE: "SE",
  MELI: "MELI",
  BABA: "BABA",
  TXN: "TXN",
  CSCO: "CSCO",
  IBM: "IBM",
  // LSEG (London Stock Exchange)
  HSBC: "HSBA.L",
  BARCLAYS: "BARC.L",
  UNILEVER: "ULVR.L",
  SHELL: "SHEL.L",
  ROLLSROYCE: "RR.L",
  // NSE (National Stock Exchange of India)
  TCS: "TCS.NS",
  INFY: "INFY.NS",
  RELIANCE: "RELIANCE.NS",
  HDFCBANK: "HDFCBANK.NS",
};

const TICKER_DOMAIN_MAP: Record<string, string> = {
  NETFLIX: "netflix.com",
  NFLX: "netflix.com",
  INTEL: "intel.com",
  INTC: "intel.com",
  GOOGLE: "google.com",
  GOOGL: "google.com",
  AMAZON: "amazon.com",
  AMZN: "amazon.com",
  META: "meta.com",
  AAPL: "apple.com",
  MSFT: "microsoft.com",
  AMD: "amd.com",
  TSM: "tsmc.com",
  AVGO: "broadcom.com",
  QCOM: "qualcomm.com",
  ARM: "arm.com",
  PLTR: "palantir.com",
  ORCL: "oracle.com",
  SNOW: "snowflake.com",
  CRM: "salesforce.com",
  DELL: "dell.com",
  SMCI: "supermicro.com",
  FIGMA: "figma.com",
  SPOT: "spotify.com",
  UBER: "uber.com",
  COIN: "coinbase.com",
  SQ: "block.xyz",
  HOOD: "robinhood.com",
  PANW: "paloaltonetworks.com",
  CRWD: "crowdstrike.com",
  DIS: "disney.com",
  SHOP: "shopify.com",
  ABNB: "airbnb.com",
  TSLA: "tesla.com",
  NVDA: "nvidia.com",
  ADBE: "adobe.com",
  NOW: "servicenow.com",
  ASML: "asml.com",
  MU: "micron.com",
  MRVL: "marvell.com",
  NET: "cloudflare.com",
  DDOG: "datadoghq.com",
  MDB: "mongodb.com",
  ZS: "zscaler.com",
  PYPL: "paypal.com",
  SE: "sea.com",
  MELI: "mercadolibre.com",
  BABA: "alibaba.com",
  TXN: "ti.com",
  CSCO: "cisco.com",
  IBM: "ibm.com",
  // LSEG (London Stock Exchange)
  HSBC: "hsbc.com",
  BARCLAYS: "barclays.com",
  UNILEVER: "unilever.com",
  SHELL: "shell.com",
  ROLLSROYCE: "rolls-royce.com",
  // NSE (National Stock Exchange of India)
  TCS: "tcs.com",
  INFY: "infosys.com",
  RELIANCE: "ril.com",
  HDFCBANK: "hdfcbank.com",
};

const CUSTOM_LOGO_MAP: Record<string, string> = {
  AAPL: "https://api.iconify.design/simple-icons:apple.svg?color=white",
  NVDA: "https://api.iconify.design/simple-icons:nvidia.svg?color=%2376B900",
  META: "https://api.iconify.design/simple-icons:meta.svg?color=%230081FB",
  MSFT: "https://api.iconify.design/logos:microsoft-icon.svg",
  GOOGLE: "https://api.iconify.design/logos:google-icon.svg",
  GOOGL: "https://api.iconify.design/logos:google-icon.svg",
  AMAZON: "https://api.iconify.design/simple-icons:amazon.svg?color=%23FF9900",
  AMZN: "https://api.iconify.design/simple-icons:amazon.svg?color=%23FF9900",
  TSLA: "https://api.iconify.design/simple-icons:tesla.svg?color=%23E82127",
  NFLX: "https://api.iconify.design/simple-icons:netflix.svg?color=%23E50914",
  PLTR: "https://api.iconify.design/simple-icons:palantir.svg?color=white",
  UBER: "https://api.iconify.design/simple-icons:uber.svg?color=white",
  COIN: "https://api.iconify.design/simple-icons:coinbase.svg?color=%230052FF",
  CRM: "https://api.iconify.design/simple-icons:salesforce.svg?color=%2300A1E0",
  AMD: "https://api.iconify.design/simple-icons:amd.svg?color=%23ED1C24",
  HOOD: "https://api.iconify.design/simple-icons:robinhood.svg?color=%2300C805",
  SHOP: "https://api.iconify.design/simple-icons:shopify.svg?color=%237AB55C",
  ARM: "https://api.iconify.design/simple-icons:arm.svg?color=%230091BD",
  SPOT: "https://api.iconify.design/simple-icons:spotify.svg?color=%231DB954",
  ADBE: "https://api.iconify.design/simple-icons:adobe.svg?color=%23FF0000",
  SNOW: "https://api.iconify.design/simple-icons:snowflake.svg?color=%2329B5E8",
  FIGMA: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/figma.svg",
  MRVL: "https://www.google.com/s2/favicons?domain=marvell.com&sz=128",
  TSM: "https://unavatar.io/tsmc.com",
  // LSEG logos (Crisp SVGs)
  HSBC: "https://api.iconify.design/simple-icons:hsbc.svg?color=%23DB0011",
  BARCLAYS: "https://api.iconify.design/simple-icons:barclays.svg?color=%2300AEEF",
  UNILEVER: "https://api.iconify.design/simple-icons:unilever.svg?color=%231F36C7",
  SHELL: "https://api.iconify.design/simple-icons:shell.svg?color=%23FFD700",
  ROLLSROYCE: "https://api.iconify.design/simple-icons:rollsroyce.svg?color=white",
  // NSE logos (Crisp SVGs & Favicons)
  TCS: "https://api.iconify.design/simple-icons:tata.svg?color=%23005A9C",
  TATA: "https://api.iconify.design/simple-icons:tata.svg?color=%23005A9C",
  INFY: "https://api.iconify.design/simple-icons:infosys.svg?color=%23007CC3",
  INFOSYS: "https://api.iconify.design/simple-icons:infosys.svg?color=%23007CC3",
  RELIANCE: "https://www.google.com/s2/favicons?domain=ril.com&sz=128",
  HDFCBANK: "https://www.google.com/s2/favicons?domain=hdfcbank.com&sz=128",
};

export function CompanyLogo({
  ticker,
  className,
  containerClassName,
}: {
  ticker: string;
  className?: string;
  containerClassName?: string;
}) {
  const upperTicker = ticker.toUpperCase();
  const symbol = TICKER_SYMBOL_MAP[upperTicker] || ticker;
  const domain = TICKER_DOMAIN_MAP[upperTicker] || `${ticker.toLowerCase()}.com`;
  const primaryUrl = CUSTOM_LOGO_MAP[upperTicker] || `https://assets.parqet.com/logos/symbol/${symbol}?format=png`;
  const fallbackUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const tertiaryUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;

  const [imgSrc, setImgSrc] = useState<string>(primaryUrl);
  const [errorCount, setErrorCount] = useState<number>(0);

  useEffect(() => {
    setImgSrc(CUSTOM_LOGO_MAP[upperTicker] || `https://assets.parqet.com/logos/symbol/${symbol}?format=png`);
    setErrorCount(0);
  }, [upperTicker, symbol]);

  const handleError = () => {
    if (errorCount === 0) {
      setErrorCount(1);
      setImgSrc(fallbackUrl);
    } else if (errorCount === 1) {
      setErrorCount(2);
      setImgSrc(tertiaryUrl);
    }
  };

  return (
    <div className={containerClassName ?? "flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] aspect-square p-2"}>
      <img
        src={imgSrc}
        alt={`${ticker} logo`}
        loading="eager"
        decoding="async"
        onError={handleError}
        className={className ?? "h-full w-full object-contain rounded-[inherit]"}
      />
    </div>
  );
}

interface RapidTickerItem {
  ticker: string;
  durationMs: number;
}

// ============================================================================
// TICKER FAST SCROLL SPEED CONFIGURATION
// Rapid speed with abrupt full stop directly on the final ticker.
// ============================================================================
export const TICKER_SCROLL_CONFIG = {
  SPIN_SPEED_MS: 38,
  HOLD_AFTER_STOP_MS: 1000,
};

// High-speed constant rate ticker spin that stops abruptly on the target stock (NOW / ServiceNow)
const RAPID_TICKER_SEQUENCE = [
  { ticker: "TSM", durationMs: 42 },
  { ticker: "AVGO", durationMs: 38 },
  { ticker: "QCOM", durationMs: 38 },
  { ticker: "ASML", durationMs: 38 },
  { ticker: "ARM", durationMs: 38 },
  { ticker: "MU", durationMs: 38 },
  { ticker: "MRVL", durationMs: 38 },
  { ticker: "ADBE", durationMs: 38 },
  { ticker: "ORCL", durationMs: 38 },
  { ticker: "CRM", durationMs: 38 },
  { ticker: "SNOW", durationMs: 38 },
  { ticker: "DELL", durationMs: 38 },
  { ticker: "SMCI", durationMs: 38 },
  { ticker: "NET", durationMs: 38 },
  { ticker: "DDOG", durationMs: 38 },
  { ticker: "MDB", durationMs: 38 },
  { ticker: "ZS", durationMs: 38 },
  { ticker: "PANW", durationMs: 38 },
  { ticker: "CRWD", durationMs: 38 },
  { ticker: "FIGMA", durationMs: 38 },
  { ticker: "SPOT", durationMs: 38 },
  { ticker: "UBER", durationMs: 38 },
  { ticker: "COIN", durationMs: 38 },
  { ticker: "PLTR", durationMs: 38 },
  { ticker: "NVDA", durationMs: 38 },
  { ticker: "NOW", durationMs: 38 }, // Abrupt stop landing on ServiceNow (NOW)!
];

const RAPID_TICKERS: RapidTickerItem[] = RAPID_TICKER_SEQUENCE;

export const EMOTION_ITEMS = [
  { id: "fear", label: "fear", color: "#f87171" },       // 1. Initial steep drop (coral red)
  { id: "pain", label: "pain", color: "#f472b6" },       // 2. Low bottom trough (pink)
  { id: "fomo", label: "fomo", color: "#bef264" },       // 3. Sudden vertical spike (neon lime)
  { id: "anxiety", label: "anxiety", color: "#c084fc" }, // 4. Secondary drop (lavender purple)
  { id: "hope", label: "hope", color: "#38bdf8" },       // 5. Recovery to new highs (sky blue)
];

export interface EdgePhraseItem {
  prefix?: string;
  subHighlight?: string;
  highlight?: string;
  highlightColor?: string;
  suffix?: string;
  text: string;
}

export const EDGE_PHRASES: EdgePhraseItem[] = [
  {
    prefix: "Cut to",
    highlight: "what matters",
    highlightColor: "#14b8a6", // teal
    text: "Cut to what matters",
  },
  {
    prefix: "If its",
    highlight: "priced in",
    highlightColor: "#fbbf24", // amber
    suffix: "or not",
    text: "If its priced in or not",
  },
];

export type OurViewItem = EdgePhraseItem;
export const OUR_VIEW_ITEMS: EdgePhraseItem[] = EDGE_PHRASES;

// Unified timing budget configuration (all timestamps derived from these constants)
const TIMING_CONFIG = {
  desktop: {
    FURNITURE_FADE: 0.30,
    DRAW_START: 0.10,
    DRAW_DURATION: 2.70, // Draws continuously 0.10s -> 2.80s
    WORD_FADE_DURATION: 0.28,
    TAG_FADE_LEAD: 0.40, // Tag & ticker crossfade start at 2.40s
    TICKER_CROSSFADE_DURATION: 0.25,
    CENTER_START: 2.75, // Seamless trigger right as line draw completes
    CENTER_DURATION: 0.65, // Snappy, crisp reveal (fully sharp by 3.40s)
    TOTAL_BUDGET: 5.00, // Clean hold 3.40s -> 5.00s
  },
  mobile: {
    FURNITURE_FADE: 0.30,
    DRAW_START: 0.10,
    DRAW_DURATION: 2.10, // Draws 0.10s -> 2.20s
    WORD_FADE_DURATION: 0.22,
    TAG_FADE_LEAD: 0.35, // Starts at 1.85s
    TICKER_CROSSFADE_DURATION: 0.25,
    CENTER_START: 2.15, // Starts at 2.15s
    CENTER_DURATION: 0.55, // Sharp by 2.70s
    TOTAL_BUDGET: 4.00, // Clean hold 2.70s -> 4.00s
  },
};

const STOCK_CHART_PATH =
  "M 20,62 L 28,56 L 34,48 L 42,68 L 50,96 L 59,120 L 67,102 L 75,84 L 84,110 L 92,148 L 100,186 L 109,212 L 117,188 L 125,192 L 133,214 L 142,226 L 150,238 L 158,230 L 167,218 L 175,214 L 183,224 L 192,212 L 200,226 L 208,216 L 216,198 L 225,184 L 233,168 L 241,180 L 250,196 L 258,208 L 266,194 L 275,206 L 283,224 L 291,230 L 299,246 L 308,236 L 316,228 L 324,252 L 333,274 L 341,258 L 349,242 L 357,234 L 366,256 L 374,266 L 382,256 L 391,250 L 399,236 L 407,218 L 415,226 L 424,216 L 432,234 L 440,252 L 449,244 L 457,228 L 465,206 L 474,214 L 482,202 L 490,192 L 498,168 L 507,126 L 515,86 L 523,72 L 532,102 L 540,132 L 548,154 L 557,142 L 565,164 L 573,188 L 581,202 L 590,194 L 598,216 L 606,228 L 615,208 L 623,194 L 631,204 L 639,188 L 648,212 L 656,218 L 664,242 L 673,268 L 681,238 L 689,208 L 697,194 L 706,178 L 714,188 L 722,168 L 731,152 L 739,156 L 747,144 L 755,158 L 764,148 L 772,132 L 780,142 L 789,126 L 797,136 L 805,116 L 814,92 L 822,62 L 830,46 L 838,74 L 847,98 L 855,70 L 863,82 L 872,102 L 880,94 L 888,80 L 897,86 L 905,104 L 913,90 L 921,72 L 930,88 L 940,74";

const STOCK_CHART_AREA = `${STOCK_CHART_PATH} L 940,360 L 20,360 Z`;

// Coordinate samples along the path for smooth head tracking
const CHART_COORDS: [number, number][] = [
  [20, 62], [28, 56], [34, 48], [42, 68], [50, 96], [59, 120], [67, 102], [75, 84], [84, 110], [92, 148],
  [100, 186], [109, 212], [117, 188], [125, 192], [133, 214], [142, 226], [150, 238], [158, 230], [167, 218],
  [175, 214], [183, 224], [192, 212], [200, 226], [208, 216], [216, 198], [225, 184], [233, 168], [241, 180],
  [250, 196], [258, 208], [266, 194], [275, 206], [283, 224], [291, 230], [299, 246], [308, 236], [316, 228],
  [324, 252], [333, 274], [341, 258], [349, 242], [357, 234], [366, 256], [374, 266], [382, 256], [391, 250],
  [399, 236], [407, 218], [415, 226], [424, 216], [432, 234], [440, 252], [449, 244], [457, 228], [465, 206],
  [474, 214], [482, 202], [490, 192], [498, 168], [507, 126], [515, 86], [523, 72], [532, 102], [540, 132],
  [548, 154], [557, 142], [565, 164], [573, 188], [581, 202], [590, 194], [598, 216], [606, 228], [615, 208],
  [623, 194], [631, 204], [639, 188], [648, 212], [656, 218], [664, 242], [673, 268], [681, 238], [689, 208],
  [697, 194], [706, 178], [714, 188], [722, 168], [731, 152], [739, 156], [747, 144], [755, 158], [764, 148],
  [772, 132], [780, 142], [789, 126], [797, 136], [805, 116], [814, 92], [822, 62], [830, 46], [838, 74],
  [847, 98], [855, 70], [863, 82], [872, 102], [880, 94], [888, 80], [897, 86], [905, 104], [913, 90],
  [921, 72], [930, 88], [940, 74]
];

const SEGMENTS: { p0: [number, number]; p1: [number, number]; len: number }[] = [];
for (let i = 1; i < CHART_COORDS.length; i++) {
  const prev = CHART_COORDS[i - 1]!;
  const curr = CHART_COORDS[i]!;
  const dx = curr[0] - prev[0];
  const dy = curr[1] - prev[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  SEGMENTS.push({ p0: prev, p1: curr, len });
}
const TOTAL_PATH_LEN = SEGMENTS.reduce((sum, s) => sum + s.len, 0);

function getPointAtProgress(progress: number): { x: number; y: number } {
  const first = CHART_COORDS[0]!;
  const last = CHART_COORDS[CHART_COORDS.length - 1]!;
  if (progress <= 0) return { x: first[0], y: first[1] };
  if (progress >= 1) return { x: last[0], y: last[1] };

  const targetDist = progress * TOTAL_PATH_LEN;
  let accumulated = 0;
  for (const seg of SEGMENTS) {
    if (accumulated + seg.len >= targetDist) {
      const segProgress = (targetDist - accumulated) / seg.len;
      return {
        x: seg.p0[0] + (seg.p1[0] - seg.p0[0]) * segProgress,
        y: seg.p0[1] + (seg.p1[1] - seg.p0[1]) * segProgress,
      };
    }
    accumulated += seg.len;
  }
  return { x: last[0], y: last[1] };
}

// 5 Emotion Anchors with clear placement and progress points
const EMOTION_ANCHORS = [
  {
    id: "fear",
    word: "fear",
    x: 114,
    y: 92, // Above drop
    anchorX: 114,
    anchorY: 196,
    color: "#f87171",
    glow: "rgba(248,113,113,0.65)",
    progress: 0.101,
  },
  {
    id: "pain",
    word: "pain",
    x: 345,
    y: 308, // Below trough (line is at 258)
    anchorX: 341,
    anchorY: 258,
    color: "#f472b6",
    glow: "rgba(244,114,182,0.65)",
    progress: 0.347,
  },
  {
    id: "fomo",
    word: "fomo",
    x: 523,
    y: 30, // Above peak (line is at 72)
    anchorX: 523,
    anchorY: 72,
    color: "#bef264",
    glow: "rgba(190,242,100,0.65)",
    progress: 0.548,
  },
  {
    id: "anxiety",
    word: "anxiety",
    x: 685,
    y: 298, // Below dip (line is at 238)
    anchorX: 681,
    anchorY: 238,
    color: "#c084fc",
    glow: "rgba(192,132,252,0.65)",
    progress: 0.722,
  },
  {
    id: "hope",
    word: "hope",
    x: 830,
    y: 8, // Above final breakout peak (line is at 46)
    anchorX: 830,
    anchorY: 46,
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.65)",
    progress: 0.879,
  },
];

// 5 Price Gridlines matching ServiceNow chart levels (160, 140, 120, 100, 80)
const PRICE_GRIDLINES = [
  { y: 50, price: "$160" },
  { y: 110, price: "$140" },
  { y: 180, price: "$120" },
  { y: 250, price: "$100" },
  { y: 320, price: "$80" },
];

// 4 Date Axis Labels matching YTD timeline (Mar 2026, May 2026, Jul 2026, Sept 2026)
const TIME_AXIS_LABELS = [
  { x: 265, text: "Mar 2026", hideMobile: false },
  { x: 470, text: "May 2026", hideMobile: false },
  { x: 675, text: "Jul 2026", hideMobile: false },
  { x: 845, text: "Sept 2026", hideMobile: false },
];

interface StocksEvokeSequenceProps {
  onComplete: () => void;
  ticker?: string;
}

function StocksEvokeSequence({ onComplete, ticker = "NOW" }: StocksEvokeSequenceProps) {
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
  }, [isMobile, prefersReducedMotion]);

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
              ticker="NOW"
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

import { NOISE_SCREENSHOT_CARDS, ScreenshotCard } from "../components/NoiseScreenshots";

function NoiseOverwhelmSequence({ onComplete }: { onComplete: () => void }) {
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
                      (idx % 2 === 0 ? -4 : 4),
                      (idx % 3 === 0 ? 3 : -3),
                      0,
                    ],
                    y: [
                      0,
                      (idx % 3 === 0 ? 4 : -4),
                      (idx % 2 === 0 ? -3 : 3),
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

function FinalSequence({ onAnimationEnd }: { onAnimationEnd?: () => void }) {
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

export const TICKER_REEL_ITEMS: string[] = [
  "IBM",      // index 0
  "TXN",      // index 1
  "AAPL",     // index 2
  "CSCO",     // index 3  (faded top)
  "INTEL",    // index 4  (above Google)
  "GOOGLE",   // index 5  (directly above NVDA)
  "NVDA",     // index 6  (Question 1 - active on initial landing)
  "META",     // index 7  (Question 2 - directly below NVDA)
  "AMD",      // index 8  (Question 3 - directly below META)
  "FIGMA",    // index 9
  "SPOT",     // index 10
  "UBER",     // index 11
  "PLTR",     // index 12
  // Continuous pool for rapid ticker roll (starting at index 13)
  "TSM",
  "AVGO",
  "QCOM",
  "ASML",
  "ARM",
  "MU",
  "MRVL",
  "ADBE",
  "NOW",
  "ORCL",
  "CRM",
  "SNOW",
  "DELL",
  "SMCI",
  "NET",
  "DDOG",
  "MDB",
  "ZS",
  "PANW",
  "CRWD",
  "FIGMA",
  "SPOT",
  "UBER",
  "ABNB",
  "COIN",
  "HOOD",
  "SQ",
  "PYPL",
  "SHOP",
  "SE",
  "MELI",
  "BABA",
  "DIS",
  "NFLX",
  "TSLA",
  "INTEL",
  "GOOGLE",
  "AMAZON",
  "META",
  "AAPL",
  "MSFT",
  "TXN",
  "CSCO",
  "IBM",
  "PLTR",
  "NVDA",
  "AMD",
  "TSM",
  "AVGO",
  "QCOM",
  "ASML",
  "ARM",
  "MU",
  "MRVL",
  "ADBE",
  "NOW",
  "ORCL",
  "CRM",
  "SNOW",
  "DELL",
  "SMCI",
  "NET",
  "DDOG",
  "MDB",
  "ZS",
  "PANW",
  "CRWD",
  "FIGMA",
  "SPOT",
  "UBER",
  "ABNB",
  "COIN",
  "HOOD",
  "SQ",
  "PYPL",
  "SHOP",
  "SE",
  "MELI",
  "BABA",
  "DIS",
  "NFLX",
  "TSLA",
  "INTEL",
  "GOOGLE",
  "AMAZON",
  "META",
  "AAPL",
  "MSFT",
  "TXN",
  "CSCO",
  "IBM",
  "PLTR",
  "NVDA",
  "AMD",
  "TSM",
  "AVGO",
  "QCOM",
  "ASML",
  "ARM",
  "MU",
  "MRVL",
  "ADBE",
  "NOW",
  "ORCL",
  "CRM",
  "SNOW",
  "DELL",
  "SMCI",
  "NET",
  "DDOG",
  "MDB",
  "ZS",
  "PANW",
  "CRWD",
];

interface VerticalTickerDrumProps {
  activeIndex: number;
  isHighSpeed?: boolean;
  flipDurationSec?: number;
  slotHeight: number;
  isMobile: boolean;
  isLargeWidget: boolean;
}

function VerticalTickerDrum({
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
  const translateY = (3.5 * stepDistance - slotHeight / 2) - (activeIndex * stepDistance);

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

export type NoiseSource =
  | "gpt"
  | "claude"
  | "gemini"
  | "grok"
  | "twitter"
  | "whatsapp"
  | "instagram"
  | "bloomberg"
  | "cnbc"
  | "wsj"
  | "reuters"
  | "reddit"
  | "ft";

export const NOISE_SOURCE_INFO: Record<
  NoiseSource,
  { name: string; domain: string; primaryUrl: string }
> = {
  gpt: {
    name: "ChatGPT",
    domain: "openai.com",
    primaryUrl: "https://api.iconify.design/simple-icons:openai.svg?color=%2310a37f",
  },
  claude: {
    name: "Claude",
    domain: "anthropic.com",
    primaryUrl: "https://api.iconify.design/simple-icons:anthropic.svg?color=%23D97706",
  },
  gemini: {
    name: "Gemini",
    domain: "gemini.google.com",
    primaryUrl: "https://api.iconify.design/logos:google-gemini.svg",
  },
  grok: {
    name: "Grok",
    domain: "x.ai",
    primaryUrl: "https://api.iconify.design/simple-icons:x.svg?color=white",
  },
  twitter: {
    name: "X (Twitter)",
    domain: "x.com",
    primaryUrl: "https://api.iconify.design/simple-icons:x.svg?color=white",
  },
  whatsapp: {
    name: "WhatsApp",
    domain: "whatsapp.com",
    primaryUrl: "https://api.iconify.design/logos:whatsapp-icon.svg",
  },
  instagram: {
    name: "Instagram",
    domain: "instagram.com",
    primaryUrl: "https://api.iconify.design/skill-icons:instagram.svg",
  },
  bloomberg: {
    name: "Bloomberg",
    domain: "bloomberg.com",
    primaryUrl: "https://unavatar.io/bloomberg.com",
  },
  cnbc: {
    name: "CNBC",
    domain: "cnbc.com",
    primaryUrl: "https://unavatar.io/cnbc.com",
  },
  wsj: {
    name: "The Wall Street Journal",
    domain: "wsj.com",
    primaryUrl: "https://unavatar.io/wsj.com",
  },
  reuters: {
    name: "Reuters",
    domain: "reuters.com",
    primaryUrl: "https://unavatar.io/reuters.com",
  },
  reddit: {
    name: "Reddit",
    domain: "reddit.com",
    primaryUrl: "https://api.iconify.design/logos:reddit-icon.svg",
  },
  ft: {
    name: "Financial Times",
    domain: "ft.com",
    primaryUrl: "https://unavatar.io/ft.com",
  },
};

export function SourceLogo({
  source,
  className,
}: {
  source: NoiseSource;
  className?: string;
}) {
  const info = NOISE_SOURCE_INFO[source] || {
    name: source,
    domain: `${source}.com`,
    primaryUrl: `https://www.google.com/s2/favicons?domain=${source}.com&sz=128`,
  };

  const primaryUrl = info.primaryUrl;
  const fallbackUrl = `https://www.google.com/s2/favicons?domain=${info.domain}&sz=128`;
  const tertiaryUrl = `https://icons.duckduckgo.com/ip3/${info.domain}.ico`;

  const [imgSrc, setImgSrc] = useState<string>(primaryUrl);
  const [errorCount, setErrorCount] = useState<number>(0);

  useEffect(() => {
    setImgSrc(info.primaryUrl);
    setErrorCount(0);
  }, [source, info.primaryUrl]);

  const handleError = () => {
    if (errorCount === 0) {
      setErrorCount(1);
      setImgSrc(fallbackUrl);
    } else if (errorCount === 1) {
      setErrorCount(2);
      setImgSrc(tertiaryUrl);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] aspect-square p-2">
      <img
        src={imgSrc}
        alt={`${info.name} logo`}
        loading="eager"
        decoding="async"
        onError={handleError}
        className={className ?? "h-full w-full object-contain rounded-[inherit]"}
      />
    </div>
  );
}

interface ScatteredCard {
  id: string;
  ticker: string;
  question: string;
  source: NoiseSource;
  sourceName: string;
  answer: string;
  top: number; // percentage 0-100
  left: number; // percentage 0-100
  rotate?: number; // degrees
  isHeroQ1?: boolean;
  isHeroQ2?: boolean;
}

// Tuned selection of iconic NASDAQ, NSE, and LSEG stocks with user's customized layout
const INITIAL_SCATTERED_CARDS: ScatteredCard[] = [
  {
    id: "aapl-1",
    ticker: "AAPL",
    question: "Is Apple Intelligence driving an iPhone supercycle?",
    source: "twitter",
    sourceName: "X",
    answer: "Supply chain leaks point to supercycle upgrade demand 📱",
    top: 14,
    left: 16,
    rotate: -4.4,
  },
  {
    id: "hsbc-1",
    ticker: "HSBC",
    question: "How resilient are net interest margins across Asia?",
    source: "bloomberg",
    sourceName: "Bloomberg",
    answer: "Asia wealth management and corporate banking sustain double-digit return on tangible equity",
    top: 6,
    left: 67,
    rotate: -9.2,
  },
  {
    id: "msft-1",
    ticker: "MSFT",
    question: "Are enterprise Copilot seat revenues accelerating?",
    source: "gpt",
    sourceName: "ChatGPT",
    answer: "Azure enterprise cloud acceleration outpacing consensus estimates",
    top: 13,
    left: 87,
    rotate: -12,
  },
  {
    id: "tsla-1",
    ticker: "TSLA",
    question: "Is full autonomy already priced into the stock?",
    source: "bloomberg",
    sourceName: "Bloomberg",
    answer: "Robotaxi fleet economics face regulatory valuation discount",
    top: 29,
    left: 21,
    rotate: 3.2,
  },
  {
    id: "barclays-1",
    ticker: "BARCLAYS",
    question: "Will investment bank restructuring unlock shareholder yield?",
    source: "ft",
    sourceName: "FT",
    answer: "Capital reallocation towards UK consumer bank drives RoTE expansion above 12%",
    top: 28,
    left: 74,
    rotate: -2.4,
  },
  {
    id: "tcs-1",
    ticker: "TCS",
    question: "Will digital transformation deal wins boost margins?",
    source: "cnbc",
    sourceName: "CNBC",
    answer: "Enterprise digital transformation and cloud migration drive double-digit deal TCV",
    top: 45,
    left: 6,
    rotate: -12,
  },
  {
    id: "unilever-1",
    ticker: "UNILEVER",
    question: "Can emerging market volume growth counter pricing pressure?",
    source: "reuters",
    sourceName: "Reuters",
    answer: "Power brand volume growth in India and LatAm sustains underlying operating margin uplift",
    top: 42,
    left: 100,
    rotate: 2.2,
  },
  {
    id: "nvda-hero",
    ticker: "NVDA",
    question: "Am I too late?",
    source: "claude",
    sourceName: "Claude",
    answer: "Blackwell Ultra ramp & DC margin durability remain underappreciated",
    top: 44,
    left: 50,
    rotate: 0,
    isHeroQ1: true,
  },
  {
    id: "meta-hero",
    ticker: "META",
    question: "What am I missing in this stock?",
    source: "gpt",
    sourceName: "ChatGPT",
    answer: "Ad spend AI optimization driving 22% CTR lift across family apps",
    top: 54,
    left: 50,
    rotate: 0,
    isHeroQ2: true,
  },
  {
    id: "amzn-1",
    ticker: "AMAZON",
    question: "Is AWS cloud growth re-accelerating ahead of consensus?",
    source: "grok",
    sourceName: "Grok",
    answer: "AWS cloud margins reach multi-year highs of 38% with Bedrock demand",
    top: 54,
    left: 90,
    rotate: -12,
  },
  {
    id: "infy-1",
    ticker: "INFY",
    question: "Can enterprise AI adoption drive contract renewals?",
    source: "ft",
    sourceName: "FT",
    answer: "Topaz AI suite integration drives 20%+ increase in large mega-deal pipelines",
    top: 62,
    left: 9,
    rotate: 1.7,
  },
  {
    id: "shell-1",
    ticker: "SHELL",
    question: "Can integrated gas and LNG trading offset crude volatility?",
    source: "wsj",
    sourceName: "WSJ",
    answer: "Integrated Gas division generates record operational cash flow supporting share buybacks",
    top: 68,
    left: 63,
    rotate: 2.5,
  },
  {
    id: "reliance-1",
    ticker: "RELIANCE",
    question: "Will Jio 5G tariff hikes accelerate retail cash flows?",
    source: "bloomberg",
    sourceName: "Bloomberg",
    answer: "Telecom ARPU expansion and consumer retail EBITDA compounding at 18% YoY",
    top: 74,
    left: 15,
    rotate: -2.2,
  },
  {
    id: "rollsroyce-1",
    ticker: "ROLLSROYCE",
    question: "Are civil aerospace engine flying hours breaking records?",
    source: "ft",
    sourceName: "FT",
    answer: "Large engine flying hours surpass 105% of 2019 levels driving free cash flow expansion",
    top: 84,
    left: 79,
    rotate: -1.8,
  },
  {
    id: "hdfcbank-1",
    ticker: "HDFCBANK",
    question: "Is deposit growth catching up post-merger integration?",
    source: "reuters",
    sourceName: "Reuters",
    answer: "Branch expansion accelerates retail deposit mobilization and normalizes loan-to-deposit ratio",
    top: 92,
    left: 38,
    rotate: 5.8,
  },
];

const SPREAD_X = 0.72;
const SPREAD_Y = 0.92;
const ZOOM_SCALE = 1.15;
const CARD_WIDTH = 390;
const CARD_HEIGHT = 58;

function OpeningSequence({ onComplete }: { onComplete: () => void }) {
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
          let cardTransition: { duration: number; ease: [number, number, number, number]; delay: number } = {
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
                {/* Question Input Card */}
                <div className="absolute inset-0 w-full h-full flex items-center backdrop-blur-xl rounded-[16px] sm:rounded-[16px] md:rounded-[20px] border border-white/12 bg-[#15161a]/90 shadow-xl hover:border-white/20 pr-4 sm:pr-5 gap-3 sm:gap-3.5 select-none overflow-hidden">
                  {/* Company Logo slot */}
                  <div className="flex items-center justify-center shrink-0 h-full aspect-square overflow-hidden">
                    <CompanyLogo ticker={card.ticker} className="h-full w-full object-contain" />
                  </div>

                  {/* Stock Question Text */}
                  <div className="min-w-0 flex items-center flex-1 pr-1 sm:pr-2 overflow-hidden">
                    <span className="font-display font-light text-[1.08rem] sm:text-[1.18rem] md:text-[1.26rem] text-white tracking-tight whitespace-nowrap overflow-hidden text-ellipsis leading-none">
                      {displayText}
                      {showCursor && (
                        <span className="inline-block bg-white ml-2 w-[2.5px] h-[1.05em] animate-pulse rounded-[1px] align-middle -translate-y-[1px]" />
                      )}
                    </span>
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

function RouteComponent() {
  const [stage, setStage] = useState<"stocks_evoke" | "noise_overwhelm" | "chatting_ui" | "final_brand">("stocks_evoke");
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

