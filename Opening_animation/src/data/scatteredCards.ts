import type { NoiseSource } from "./noiseSources";

export interface ScatteredCard {
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

export const SPREAD_X = 0.72;
export const SPREAD_Y = 0.92;
export const ZOOM_SCALE = 1.15;
export const CARD_WIDTH = 390;
export const CARD_HEIGHT = 58;

// Tuned selection of iconic NASDAQ, NSE, and LSEG stocks with user's customized layout
export const INITIAL_SCATTERED_CARDS: ScatteredCard[] = [
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
