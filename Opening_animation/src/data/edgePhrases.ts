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
