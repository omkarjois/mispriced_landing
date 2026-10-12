export interface EmotionItem {
  id: string;
  label: string;
  color: string;
}

export const EMOTION_ITEMS: EmotionItem[] = [
  { id: "fear", label: "fear", color: "#f87171" }, // 1. Initial steep drop (coral red)
  { id: "pain", label: "pain", color: "#f472b6" }, // 2. Low bottom trough (pink)
  { id: "fomo", label: "fomo", color: "#bef264" }, // 3. Sudden vertical spike (neon lime)
  { id: "anxiety", label: "anxiety", color: "#c084fc" }, // 4. Secondary drop (lavender purple)
  { id: "hope", label: "hope", color: "#38bdf8" }, // 5. Recovery to new highs (sky blue)
];

// Unified timing budget configuration (all timestamps derived from these constants)
export const TIMING_CONFIG = {
  desktop: {
    FURNITURE_FADE: 0.3,
    DRAW_START: 0.1,
    DRAW_DURATION: 2.7, // Draws continuously 0.10s -> 2.80s
    WORD_FADE_DURATION: 0.28,
    TAG_FADE_LEAD: 0.4, // Tag & ticker crossfade start at 2.40s
    TICKER_CROSSFADE_DURATION: 0.25,
    CENTER_START: 2.75, // Seamless trigger right as line draw completes
    CENTER_DURATION: 0.65, // Snappy, crisp reveal (fully sharp by 3.40s)
    TOTAL_BUDGET: 5.0, // Clean hold 3.40s -> 5.00s
  },
  mobile: {
    FURNITURE_FADE: 0.3,
    DRAW_START: 0.1,
    DRAW_DURATION: 2.1, // Draws 0.10s -> 2.20s
    WORD_FADE_DURATION: 0.22,
    TAG_FADE_LEAD: 0.35, // Starts at 1.85s
    TICKER_CROSSFADE_DURATION: 0.25,
    CENTER_START: 2.15, // Starts at 2.15s
    CENTER_DURATION: 0.55, // Sharp by 2.70s
    TOTAL_BUDGET: 4.0, // Clean hold 2.70s -> 4.00s
  },
};

export const STOCK_CHART_PATH =
  "M 20,62 L 28,56 L 34,48 L 42,68 L 50,96 L 59,120 L 67,102 L 75,84 L 84,110 L 92,148 L 100,186 L 109,212 L 117,188 L 125,192 L 133,214 L 142,226 L 150,238 L 158,230 L 167,218 L 175,214 L 183,224 L 192,212 L 200,226 L 208,216 L 216,198 L 225,184 L 233,168 L 241,180 L 250,196 L 258,208 L 266,194 L 275,206 L 283,224 L 291,230 L 299,246 L 308,236 L 316,228 L 324,252 L 333,274 L 341,258 L 349,242 L 357,234 L 366,256 L 374,266 L 382,256 L 391,250 L 399,236 L 407,218 L 415,226 L 424,216 L 432,234 L 440,252 L 449,244 L 457,228 L 465,206 L 474,214 L 482,202 L 490,192 L 498,168 L 507,126 L 515,86 L 523,72 L 532,102 L 540,132 L 548,154 L 557,142 L 565,164 L 573,188 L 581,202 L 590,194 L 598,216 L 606,228 L 615,208 L 623,194 L 631,204 L 639,188 L 648,212 L 656,218 L 664,242 L 673,268 L 681,238 L 689,208 L 697,194 L 706,178 L 714,188 L 722,168 L 731,152 L 739,156 L 747,144 L 755,158 L 764,148 L 772,132 L 780,142 L 789,126 L 797,136 L 805,116 L 814,92 L 822,62 L 830,46 L 838,74 L 847,98 L 855,70 L 863,82 L 872,102 L 880,94 L 888,80 L 897,86 L 905,104 L 913,90 L 921,72 L 930,88 L 940,74";

export const STOCK_CHART_AREA = `${STOCK_CHART_PATH} L 940,360 L 20,360 Z`;

// Coordinate samples along the path for smooth head tracking
export const CHART_COORDS: [number, number][] = [
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
  [921, 72], [930, 88], [940, 74],
];

export interface ChartSegment {
  p0: [number, number];
  p1: [number, number];
  len: number;
}

export const SEGMENTS: ChartSegment[] = [];
for (let i = 1; i < CHART_COORDS.length; i++) {
  const prev = CHART_COORDS[i - 1]!;
  const curr = CHART_COORDS[i]!;
  const dx = curr[0] - prev[0];
  const dy = curr[1] - prev[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  SEGMENTS.push({ p0: prev, p1: curr, len });
}

export const TOTAL_PATH_LEN = SEGMENTS.reduce((sum, s) => sum + s.len, 0);

export function getPointAtProgress(progress: number): { x: number; y: number } {
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

export interface EmotionAnchor {
  id: string;
  word: string;
  x: number;
  y: number;
  anchorX: number;
  anchorY: number;
  color: string;
  glow: string;
  progress: number;
}

// 5 Emotion Anchors with clear placement and progress points
export const EMOTION_ANCHORS: EmotionAnchor[] = [
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

export interface PriceGridline {
  y: number;
  price: string;
}

// 5 Price Gridlines matching ServiceNow chart levels (160, 140, 120, 100, 80)
export const PRICE_GRIDLINES: PriceGridline[] = [
  { y: 50, price: "$160" },
  { y: 110, price: "$140" },
  { y: 180, price: "$120" },
  { y: 250, price: "$100" },
  { y: 320, price: "$80" },
];

export interface TimeAxisLabel {
  x: number;
  text: string;
  hideMobile: boolean;
}

// 4 Date Axis Labels matching YTD timeline (Mar 2026, May 2026, Jul 2026, Sept 2026)
export const TIME_AXIS_LABELS: TimeAxisLabel[] = [
  { x: 265, text: "Mar 2026", hideMobile: false },
  { x: 470, text: "May 2026", hideMobile: false },
  { x: 675, text: "Jul 2026", hideMobile: false },
  { x: 845, text: "Sept 2026", hideMobile: false },
];
