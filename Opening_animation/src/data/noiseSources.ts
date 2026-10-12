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

export interface NoiseSourceInfo {
  name: string;
  domain: string;
  primaryUrl: string;
}

export const NOISE_SOURCE_INFO: Record<NoiseSource, NoiseSourceInfo> = {
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
