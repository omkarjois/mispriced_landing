import React from "react";

export type PlatformType =
  | "x"
  | "twitter"
  | "gpt"
  | "chatgpt"
  | "claude"
  | "grok"
  | "gemini"
  | "whatsapp"
  | "telegram"
  | "discord"
  | "reddit"
  | "stocktwits"
  | "seekingalpha"
  | "robinhood"
  | "youtube"
  | "instagram"
  | "tiktok"
  | "substack"
  | "linkedin"
  | "bloomberg"
  | "cnbc";

export interface PlatformTheme {
  name: string;
  brandColor: string;
  chipBg: string;
  borderColor: string;
  glowShadow: string;
  headerAccent: string;
  tagColor?: string;
}

export const PLATFORM_THEMES: Record<PlatformType, PlatformTheme> = {
  x: {
    name: "X",
    brandColor: "#ffffff",
    chipBg: "bg-black",
    borderColor: "border-white/30",
    glowShadow: "0 0 20px rgba(255, 255, 255, 0.32)",
    headerAccent: "border-t-2 border-white/50",
  },
  twitter: {
    name: "X",
    brandColor: "#ffffff",
    chipBg: "bg-black",
    borderColor: "border-white/30",
    glowShadow: "0 0 20px rgba(255, 255, 255, 0.32)",
    headerAccent: "border-t-2 border-white/50",
  },
  gpt: {
    name: "ChatGPT",
    brandColor: "#10A37F",
    chipBg: "bg-[#10A37F]",
    borderColor: "border-[#10A37F]/50",
    glowShadow: "0 0 24px rgba(16, 163, 127, 0.55)",
    headerAccent: "border-t-2 border-[#10A37F]",
  },
  chatgpt: {
    name: "ChatGPT",
    brandColor: "#10A37F",
    chipBg: "bg-[#10A37F]",
    borderColor: "border-[#10A37F]/50",
    glowShadow: "0 0 24px rgba(16, 163, 127, 0.55)",
    headerAccent: "border-t-2 border-[#10A37F]",
  },
  claude: {
    name: "Claude",
    brandColor: "#D97706",
    chipBg: "bg-[#CC785C]",
    borderColor: "border-[#CC785C]/50",
    glowShadow: "0 0 24px rgba(204, 120, 92, 0.55)",
    headerAccent: "border-t-2 border-[#CC785C]",
  },
  grok: {
    name: "Grok",
    brandColor: "#ffffff",
    chipBg: "bg-black",
    borderColor: "border-white/40",
    glowShadow: "0 0 24px rgba(255, 255, 255, 0.45)",
    headerAccent: "border-t-2 border-white/60",
  },
  gemini: {
    name: "Gemini",
    brandColor: "#4E88D4",
    chipBg: "bg-gradient-to-tr from-[#1A73E8] via-[#4E88D4] to-[#9B72CF]",
    borderColor: "border-sky-400/50",
    glowShadow: "0 0 24px rgba(78, 136, 212, 0.55)",
    headerAccent: "border-t-2 border-[#4E88D4]",
  },
  whatsapp: {
    name: "WhatsApp",
    brandColor: "#25D366",
    chipBg: "bg-[#25D366]",
    borderColor: "border-[#25D366]/50",
    glowShadow: "0 0 24px rgba(37, 211, 102, 0.55)",
    headerAccent: "border-t-2 border-[#25D366]",
  },
  telegram: {
    name: "Telegram",
    brandColor: "#229ED9",
    chipBg: "bg-[#229ED9]",
    borderColor: "border-[#229ED9]/50",
    glowShadow: "0 0 24px rgba(34, 158, 217, 0.55)",
    headerAccent: "border-t-2 border-[#229ED9]",
  },
  discord: {
    name: "Discord",
    brandColor: "#5865F2",
    chipBg: "bg-[#5865F2]",
    borderColor: "border-[#5865F2]/50",
    glowShadow: "0 0 24px rgba(88, 101, 242, 0.55)",
    headerAccent: "border-t-2 border-[#5865F2]",
  },
  reddit: {
    name: "Reddit",
    brandColor: "#FF4500",
    chipBg: "bg-[#FF4500]",
    borderColor: "border-[#FF4500]/50",
    glowShadow: "0 0 24px rgba(255, 69, 0, 0.55)",
    headerAccent: "border-t-2 border-[#FF4500]",
  },
  stocktwits: {
    name: "StockTwits",
    brandColor: "#1E88E5",
    chipBg: "bg-[#1E88E5]",
    borderColor: "border-[#1E88E5]/50",
    glowShadow: "0 0 24px rgba(30, 136, 229, 0.55)",
    headerAccent: "border-t-2 border-[#1E88E5]",
  },
  seekingalpha: {
    name: "Seeking Alpha",
    brandColor: "#F37021",
    chipBg: "bg-[#F37021]",
    borderColor: "border-[#F37021]/50",
    glowShadow: "0 0 24px rgba(243, 112, 33, 0.55)",
    headerAccent: "border-t-2 border-[#F37021]",
  },
  robinhood: {
    name: "Robinhood",
    brandColor: "#00C805",
    chipBg: "bg-[#00C805]",
    borderColor: "border-[#00C805]/50",
    glowShadow: "0 0 24px rgba(0, 200, 5, 0.55)",
    headerAccent: "border-t-2 border-[#00C805]",
  },
  youtube: {
    name: "YouTube",
    brandColor: "#FF0000",
    chipBg: "bg-[#FF0000]",
    borderColor: "border-[#FF0000]/50",
    glowShadow: "0 0 24px rgba(255, 0, 0, 0.55)",
    headerAccent: "border-t-2 border-[#FF0000]",
  },
  instagram: {
    name: "Instagram",
    brandColor: "#E1306C",
    chipBg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    borderColor: "border-pink-400/50",
    glowShadow: "0 0 24px rgba(225, 48, 108, 0.55)",
    headerAccent: "border-t-2 border-[#E1306C]",
  },
  tiktok: {
    name: "TikTok",
    brandColor: "#00F2FE",
    chipBg: "bg-black",
    borderColor: "border-cyan-400/50",
    glowShadow: "0 0 24px rgba(0, 242, 254, 0.55)",
    headerAccent: "border-t-2 border-[#00F2FE]",
  },
  substack: {
    name: "Substack",
    brandColor: "#FF6719",
    chipBg: "bg-[#FF6719]",
    borderColor: "border-[#FF6719]/50",
    glowShadow: "0 0 24px rgba(255, 103, 25, 0.55)",
    headerAccent: "border-t-2 border-[#FF6719]",
  },
  linkedin: {
    name: "LinkedIn",
    brandColor: "#0A66C2",
    chipBg: "bg-[#0A66C2]",
    borderColor: "border-[#0A66C2]/50",
    glowShadow: "0 0 24px rgba(10, 102, 194, 0.55)",
    headerAccent: "border-t-2 border-[#0A66C2]",
  },
  bloomberg: {
    name: "Bloomberg",
    brandColor: "#1769FF",
    chipBg: "bg-[#1769FF]",
    borderColor: "border-[#1769FF]/50",
    glowShadow: "0 0 24px rgba(23, 105, 255, 0.55)",
    headerAccent: "border-t-2 border-[#1769FF]",
  },
  cnbc: {
    name: "CNBC",
    brandColor: "#002F6C",
    chipBg: "bg-[#002F6C]",
    borderColor: "border-[#0055B8]/50",
    glowShadow: "0 0 24px rgba(0, 85, 184, 0.55)",
    headerAccent: "border-t-2 border-[#0055B8]",
  },
};

export function PlatformBadge({
  platform,
  size = 38,
  variant = "chip",
  className = "",
}: {
  platform: PlatformType;
  size?: number;
  variant?: "chip" | "sticker";
  className?: string;
}) {
  const theme = PLATFORM_THEMES[platform] || PLATFORM_THEMES.x;
  const isSticker = variant === "sticker";

  return (
    <div
      aria-hidden="true"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: isSticker
          ? `${theme.glowShadow}, 0 10px 30px rgba(0,0,0,0.8)`
          : theme.glowShadow,
      }}
      className={`relative shrink-0 flex items-center justify-center select-none ${
        isSticker
          ? "rounded-2xl border-2 border-white/50"
          : "rounded-xl border border-white/30"
      } ${theme.chipBg} ${className}`}
    >
      {/* Platform SVG Glyphs */}
      {(platform === "x" || platform === "twitter") && (
        <svg
          viewBox="0 0 24 24"
          className="w-[58%] h-[58%] fill-current text-white"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )}

      {/* ChatGPT / OpenAI */}
      {(platform === "gpt" || platform === "chatgpt") && (
        <svg
          viewBox="0 0 24 24"
          className="w-[62%] h-[62%] fill-current text-white"
        >
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm15.865 3.923L12.362 8.45l2.02-1.166a.076.076 0 0 1 .071 0l4.83 2.79a4.504 4.504 0 0 1-.678 7.915v-5.73a.795.795 0 0 0-.4-.68zM20.4 5.696a4.47 4.47 0 0 1 .535 3.014l-.142-.085-4.783-2.759a.771.771 0 0 0-.78 0L9.387 9.235V6.903a.08.08 0 0 1 .033-.062L14.26 4.05a4.5 4.5 0 0 1 6.14 1.646zM10.74 1.57a4.476 4.476 0 0 1 2.876 1.04l-.141.081-4.779 2.758a.795.795 0 0 0-.392.681v6.737l-2.02-1.168a.071.071 0 0 1-.038-.052V6.064A4.504 4.504 0 0 1 10.74 1.57zm-.965 7.424l2.903-1.677 2.903 1.677v3.354l-2.903 1.677-2.903-1.677z" />
        </svg>
      )}

      {/* Claude / Anthropic */}
      {platform === "claude" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[62%] h-[62%] fill-current text-white"
        >
          <path d="M12 2a1.5 1.5 0 0 1 1.415 1l1.523 4.57 4.57 1.523a1.5 1.5 0 0 1 0 2.83l-4.57 1.524L13.415 21a1.5 1.5 0 0 1-2.83 0l-1.524-4.553-4.57-1.524a1.5 1.5 0 0 1 0-2.83l4.57-1.523L10.585 3A1.5 1.5 0 0 1 12 2z" />
        </svg>
      )}

      {/* Grok / xAI */}
      {platform === "grok" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[62%] h-[62%] fill-current text-white"
        >
          <path d="M3.5 3.5h5.8l11.2 17h-5.8L3.5 3.5zm11.2 0h5.8L9.3 20.5H3.5L14.7 3.5z" />
        </svg>
      )}

      {/* Google Gemini */}
      {platform === "gemini" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[64%] h-[64%] fill-current text-white"
        >
          <path d="M12 2C12 7.52 7.52 12 2 12c5.48 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" />
        </svg>
      )}

      {platform === "whatsapp" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[62%] h-[62%] fill-current text-white"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C16.58 3.68 20.27 7.37 20.27 11.91C20.27 16.45 16.58 20.15 12.04 20.15ZM16.55 14.39C16.3 14.26 15.08 13.66 14.85 13.58C14.63 13.5 14.46 13.45 14.3 13.7C14.13 13.95 13.65 14.51 13.5 14.68C13.36 14.84 13.21 14.87 12.96 14.74C12.71 14.62 11.9 14.35 10.95 13.51C10.2 12.85 9.7 12.03 9.55 11.78C9.41 11.53 9.54 11.39 9.66 11.27C9.77 11.16 9.91 10.98 10.04 10.83C10.16 10.68 10.21 10.58 10.29 10.41C10.37 10.24 10.33 10.1 10.27 9.97C10.21 9.85 9.71 8.62 9.5 8.12C9.3 7.63 9.1 7.7 8.94 7.69C8.8 7.68 8.63 7.68 8.46 7.68C8.3 7.68 8.03 7.74 7.8 7.99C7.57 8.24 6.93 8.84 6.93 10.06C6.93 11.28 7.82 12.45 7.94 12.61C8.07 12.78 9.68 15.26 12.16 16.33C12.75 16.59 13.21 16.74 13.57 16.86C14.16 17.05 14.7 17.02 15.13 16.96C15.61 16.89 16.6 16.36 16.81 15.78C17.01 15.2 17.01 14.7 16.95 14.6C16.89 14.51 16.8 14.46 16.55 14.39Z" />
        </svg>
      )}

      {platform === "telegram" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[60%] h-[60%] fill-current text-white -translate-x-[1px]"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      )}

      {platform === "discord" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[62%] h-[62%] fill-current text-white"
        >
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      )}

      {platform === "reddit" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[62%] h-[62%] fill-current text-white"
        >
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .688.56 1.25 1.25 1.25.688 0 1.25-.562 1.25-1.25 0-.69-.562-1.25-1.25-1.25zm5.5 0c-.688 0-1.25.56-1.25 1.25 0 .688.562 1.25 1.25 1.25.69 0 1.25-.562 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.094z" />
        </svg>
      )}

      {platform === "stocktwits" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[62%] h-[62%] fill-current text-white"
        >
          <path d="M19.5 3H4.5C3.67 3 3 3.67 3 4.5v15c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zm-5.8 5.7h-3.4v1.8h2.6v1.7h-2.6v3.8H8.5V7H13.7v1.7zm5.5 0h-3.4v1.8h2.6v1.7h-2.6v3.8h-1.8V7h5.2v1.7z" />
        </svg>
      )}

      {platform === "robinhood" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[64%] h-[64%] fill-current text-white"
        >
          <path d="M17.48 4.2C16.8 3.5 15.6 3 14.2 3c-3.1 0-5.8 2.2-6.5 5.2-.8 3.3.6 6.8 3.5 8.4l-.8 3.4c-.1.5.2 1 .7 1.1.5.1 1-.2 1.1-.7l1.1-4.7c.3-.1.7-.2 1-.3 3.6-1.4 5.7-5.3 4.9-9.1-.2-1.5-.8-2.8-1.7-3.9zm-4.3 9.9c-2.3 0-4.3-1.7-4.6-4.1-.3-2.3 1.2-4.5 3.5-4.8 2.3-.3 4.5 1.2 4.8 3.5.4 2.4-1.2 4.8-3.7 5.4z" />
        </svg>
      )}

      {platform === "youtube" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[64%] h-[64%] fill-current text-white"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )}

      {platform === "instagram" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[60%] h-[60%] fill-current text-white"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )}

      {platform === "substack" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[56%] h-[56%] fill-current text-white"
        >
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      )}

      {platform === "seekingalpha" && (
        <span className="font-bold text-white text-[12px] tracking-tighter">
          SA
        </span>
      )}

      {platform === "linkedin" && (
        <svg
          viewBox="0 0 24 24"
          className="w-[58%] h-[58%] fill-current text-white"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      )}

      {platform === "bloomberg" && (
        <span className="font-black text-white text-[10.5px] tracking-tight">
          BBG
        </span>
      )}

      {platform === "cnbc" && (
        <span className="font-black text-white text-[9.5px] tracking-tight">
          CNBC
        </span>
      )}

      {platform === "tiktok" && (
        <span className="font-black text-white text-[10px]">TT</span>
      )}
    </div>
  );
}

export type ScreenshotCardType =
  | "twitter"
  | "ai_chat"
  | "whatsapp"
  | "telegram"
  | "discord"
  | "reddit"
  | "stocktwits"
  | "brokerage"
  | "tv_chyron"
  | "youtube"
  | "instagram"
  | "newsletter";

export interface ScreenshotCardConfig {
  id: string;
  type: ScreenshotCardType;
  platform: PlatformType;
  top: number; // percentage 0-100
  left: number; // percentage 0-100
  rotate?: number; // degrees -4 to +4
  width?: number; // px width
  layer?: "back" | "front"; // depth layer
  cornerSticker?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  // Card-specific data
  authorName?: string;
  authorHandle?: string;
  verified?: boolean;
  timestamp?: string;
  tag?: string;
  tagColor?: string;
  title?: string;
  bodyText?: string;
  secondaryText?: string;
  metrics?: {
    likes?: string;
    comments?: string;
    shares?: string;
    views?: string;
    members?: string;
    profit?: string;
    percentage?: string;
    timestamp?: string;
  };
}

export const NOISE_SCREENSHOT_CARDS: ScreenshotCardConfig[] = [
  // --- TOP BAND & CORNERS ---
  {
    id: "tw-1",
    type: "twitter",
    platform: "x",
    top: 4,
    left: 14,
    rotate: -2.2,
    width: 325,
    layer: "back",
    cornerSticker: "top-right",
    authorName: "Alpha Whale",
    authorHandle: "@alphawhale_quant",
    verified: true,
    timestamp: "12m",
    bodyText:
      "$NVDA $150 calls are PRINTING 🖨️🚀 Shorts got completely obliterated on the morning gap.",
    metrics: { comments: "482", shares: "1.4K", likes: "9.2K", views: "340K" },
  },
  {
    id: "tv-1",
    type: "tv_chyron",
    platform: "cnbc",
    top: 3,
    left: 48,
    rotate: 1.1,
    width: 345,
    layer: "front",
    title: "CONSENSUS PRICE TARGET RAISED TO $185",
    bodyText: "NVDA ▲ 142.80 (+8.4%) | TSM ▲ 188.50 (+4.2%) | TSLA ▼ 210.10",
    tag: "BREAKING NOW",
    timestamp: "LIVE",
  },
  {
    id: "yt-1",
    type: "youtube",
    platform: "youtube",
    top: 5,
    left: 82,
    rotate: -1.6,
    width: 310,
    layer: "back",
    cornerSticker: "top-left",
    authorName: "Tech Capital Daily",
    title: "THIS AI STOCK WILL 10X BEFORE EARNINGS (DO NOT SELL) 🚀🚨",
    metrics: { views: "148K views", timestamp: "3 hours ago" },
  },

  // --- UPPER QUADRANT ---
  {
    id: "wa-1",
    type: "whatsapp",
    platform: "whatsapp",
    top: 15,
    left: -2,
    rotate: 2.4,
    width: 315,
    layer: "front",
    cornerSticker: "top-right",
    authorName: "Alpha Signals VIP 🚀",
    tag: "Forwarded",
    bodyText:
      "My TSMC contact says 2nm Blackwell allocation is 100% booked through late 2027 🔥",
    secondaryText: "Loading up another $50k on the open dip 💎",
    timestamp: "09:41 AM",
  },
  {
    id: "rd-1",
    type: "reddit",
    platform: "reddit",
    top: 16,
    left: 24,
    rotate: -1.8,
    width: 335,
    layer: "back",
    authorName: "r/wallstreetbets • u/DiamondHands_99",
    tag: "YOLO 🚀",
    tagColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    title: "Sold my entire 401k for NVDA & AMD leaps. Witness me.",
    secondaryText:
      "Top comment: 'Either you buy a yacht or work at Wendy's. Respect.'",
    metrics: { likes: "4.8k", comments: "912" },
  },
  {
    id: "st-1",
    type: "stocktwits",
    platform: "stocktwits",
    top: 14,
    left: 68,
    rotate: 1.5,
    width: 295,
    layer: "front",
    authorName: "BullishKing",
    tag: "BULLISH 🟢",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    bodyText:
      "$TSLA Autonomy valuation isn't priced in yet. Massive short squeeze incoming by Friday.",
    metrics: { comments: "44", likes: "192" },
  },
  {
    id: "nl-1",
    type: "newsletter",
    platform: "substack",
    top: 16,
    left: 98,
    rotate: -2.1,
    width: 315,
    layer: "back",
    cornerSticker: "bottom-left",
    authorName: "Substack • The Macro Insider",
    title: "Why The AI CapEx Frenzy Is Just Getting Started",
    bodyText:
      "Hyperscalers committed $210B in 2026. The bottleneck isn't demand, it's nuclear & grid power.",
    timestamp: "Issue #184",
  },

  // --- UPPER-MID FLANKS (FEATURING CHATGPT & TELEGRAM) ---
  {
    id: "tg-1",
    type: "telegram",
    platform: "telegram",
    top: 28,
    left: 6,
    rotate: 1.9,
    width: 320,
    layer: "front",
    cornerSticker: "top-right",
    authorName: "⚡ VIP OPTIONS ALERTS",
    tag: "📌 Pinned Message",
    bodyText:
      "🚨 SIGNAL ALERT 🚨 Ticker: $META / Target: $620 / Conviction: 10/10 🔥🔥🔥",
    metrics: { members: "24.8K members", views: "14.2K" },
  },
  {
    id: "gpt-1",
    type: "ai_chat",
    platform: "gpt",
    top: 28,
    left: 30,
    rotate: -1.3,
    width: 325,
    layer: "front",
    cornerSticker: "top-left",
    authorName: "ChatGPT Plus • GPT-4o",
    authorHandle: "OpenAI Research",
    tag: "Model Analysis",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    title: "Prompt: Evaluate NVDA valuation vs hyperscaler capex",
    bodyText:
      "Valuation is elevated at 33x forward sales, yet custom ASIC transitions are offset by CUDA moat and >75% gross margins.",
    secondaryText: "Response time: 0.38s • Sources: 10k-filings",
  },
  {
    id: "br-1",
    type: "brokerage",
    platform: "robinhood",
    top: 26,
    left: 82,
    rotate: 2.2,
    width: 305,
    layer: "front",
    cornerSticker: "top-left",
    authorName: "Robinhood • Portfolio",
    title: "$342,890.12",
    metrics: { profit: "+$48,120.40", percentage: "+16.3% Today" },
    bodyText: "NVDA $150 Call 10/18 • +248.4%",
    tag: "⚡ Instant Margin: $80,000 Active",
  },

  // --- MID FLANKS (FEATURING CLAUDE & GEMINI & DISCORD) ---
  {
    id: "st-2",
    type: "stocktwits",
    platform: "stocktwits",
    top: 42,
    left: -4,
    rotate: -1.7,
    width: 300,
    layer: "back",
    authorName: "DeepValueMacro",
    tag: "BEARISH 🔴",
    tagColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    bodyText:
      "$AAPL AI upgrade supercycle is overhyped. Consumer upgrade cycles are stretching to 4 years.",
    metrics: { comments: "88", likes: "142" },
  },
  {
    id: "claude-1",
    type: "ai_chat",
    platform: "claude",
    top: 40,
    left: 92,
    rotate: 1.6,
    width: 320,
    layer: "front",
    cornerSticker: "top-right",
    authorName: "Claude 3.5 Sonnet",
    authorHandle: "Anthropic Enterprise",
    tag: "Deep Reasoning",
    tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "Prompt: Analyze TSMC 2nm packaging bottlenecks",
    bodyText:
      "CoWoS packaging yields remain the primary constraint. Multi-chiplet interconnect standards defend pricing power through FY27.",
    secondaryText: "Deep analysis generated with high confidence",
  },
  {
    id: "wa-2",
    type: "whatsapp",
    platform: "whatsapp",
    top: 54,
    left: 2,
    rotate: 2.1,
    width: 300,
    layer: "front",
    authorName: "Bay Area Tech Insiders 💻",
    tag: "Forwarded",
    bodyText:
      "Meta compute cluster spend just got approved for another 150k H200s. Enterprise AI fund buying.",
    secondaryText: "This is going to blow past estimates",
    timestamp: "01:24 PM",
  },
  {
    id: "gemini-1",
    type: "ai_chat",
    platform: "gemini",
    top: 54,
    left: 90,
    rotate: -1.5,
    width: 315,
    layer: "back",
    cornerSticker: "top-left",
    authorName: "Gemini 1.5 Pro",
    authorHandle: "Google DeepMind",
    tag: "Multimodal AI",
    tagColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    title: "Prompt: Synthesize sell-side consensus for Cloud AI",
    bodyText:
      "Consensus price target raised across 38 investment banks following Azure and GCP cloud enterprise acceleration.",
  },

  // --- MID-LOWER FLANKS (FEATURING GROK & YOUTUBE) ---
  {
    id: "grok-1",
    type: "ai_chat",
    platform: "grok",
    top: 68,
    left: 22,
    rotate: -1.9,
    width: 320,
    layer: "front",
    cornerSticker: "bottom-right",
    authorName: "Grok 2",
    authorHandle: "xAI Real-Time",
    tag: "Live X Search",
    tagColor: "bg-white/10 text-white/90 border-white/20",
    title: "Real-time query: Semiconductor supply chain sentiment",
    bodyText:
      "Real-time data: Foxconn GB200 rack shipments up 240% QoQ. All the bears who panic-sold last week are now market-buying ATH lol.",
    secondaryText: "Analyzed 1.8M real-time posts in 0.12s",
  },
  {
    id: "tg-2",
    type: "telegram",
    platform: "telegram",
    top: 68,
    left: 76,
    rotate: 1.7,
    width: 310,
    layer: "back",
    authorName: "💎 100x GEM HUNTERS",
    tag: "Pinned Alert",
    bodyText:
      "WHALES ACCUMULATING RELIANCE & TATA IN INDIAN SESSIONS 🚀 Target +35% EOM.",
    metrics: { members: "61.1K members", views: "22K" },
  },
  {
    id: "wa-3",
    type: "whatsapp",
    platform: "whatsapp",
    top: 65,
    left: 99,
    rotate: -2.3,
    width: 295,
    layer: "front",
    authorName: "London City Traders 🇬🇧",
    tag: "Forwarded",
    bodyText:
      "Barclays & HSBC net interest margins crushing consensus expectations. FTSE breakout.",
    timestamp: "03:12 PM",
  },

  // --- LOWER QUADRANT ---
  {
    id: "tw-4",
    type: "twitter",
    platform: "x",
    top: 80,
    left: 8,
    rotate: -1.4,
    width: 325,
    layer: "front",
    cornerSticker: "top-left",
    authorName: "Quant Trader",
    authorHandle: "@quant_leverage",
    verified: true,
    timestamp: "3h",
    bodyText:
      "If you don't own $META and $AMZN here, you're literally fighting compounding free cash flows.",
    metrics: { comments: "210", shares: "640", likes: "4.8K", views: "180K" },
  },
  {
    id: "st-3",
    type: "stocktwits",
    platform: "stocktwits",
    top: 80,
    left: 82,
    rotate: 1.2,
    width: 295,
    layer: "front",
    authorName: "ShortSqueezer",
    tag: "BULLISH 🟢",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    bodyText:
      "$UBER robotaxi partnership margins are massively accretive. Next stop $100.",
    metrics: { comments: "52", likes: "240" },
  },
  {
    id: "rd-2",
    type: "reddit",
    platform: "reddit",
    top: 82,
    left: 58,
    rotate: -1.1,
    width: 325,
    layer: "back",
    cornerSticker: "top-right",
    authorName: "r/investing • u/ValueWatcher",
    tag: "DD Analysis 📊",
    tagColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    title: "Why sovereign AI demand creates a multi-year floor for semis",
    secondaryText:
      "Top comment: 'Middle East sovereign funds alone have $80B capex earmarked.'",
    metrics: { likes: "3.2k", comments: "441" },
  },
  {
    id: "nl-2",
    type: "newsletter",
    platform: "substack",
    top: 80,
    left: 34,
    rotate: 1.8,
    width: 310,
    layer: "back",
    authorName: "Substack • Tech Capital Letter",
    title: "The Great Valuation Divide: AI Leaders vs Followers",
    bodyText:
      "Gross margin durability is the only metric that will matter in Q4 earnings season.",
    timestamp: "Yesterday",
  },

  // --- BOTTOM BAND & CORNERS ---
  {
    id: "tv-2",
    type: "tv_chyron",
    platform: "bloomberg",
    top: 91,
    left: 22,
    rotate: 1.4,
    width: 345,
    layer: "front",
    title: "RETAIL MARGIN DEBT HITS ALL-TIME HIGH OF $990B",
    bodyText:
      "FOMO, DERIVATIVE INFLOWS FUEL RETAIL SPECULATION | JENSEN HUANG KEYNOTE AT 2PM ET",
    tag: "BLOOMBERG MARKETS",
    timestamp: "LIVE",
  },
  {
    id: "ds-2",
    type: "discord",
    platform: "discord",
    top: 92,
    left: 66,
    rotate: -1.3,
    width: 305,
    layer: "front",
    cornerSticker: "top-left",
    authorName: "Discord • #general-crypto",
    authorHandle: "#Crypto & Tech Alpha",
    tag: "VIP Member",
    bodyText: "Just bought 100 shares of $COIN on the breakout. Moon or zero! 🌕",
    metrics: { likes: "124 🔥", comments: "68 🚀" },
  },
  {
    id: "ig-1",
    type: "instagram",
    platform: "instagram",
    top: 89,
    left: 96,
    rotate: 2.0,
    width: 295,
    layer: "back",
    authorName: "@tech_investor_daily",
    tag: "Reels • 2h ago",
    bodyText:
      "POV: You held semiconductor stocks through a 20% drawdown and bought the exact bottom 📈✨",
    metrics: { likes: "18.4K", comments: "642" },
  },
  {
    id: "tw-2",
    type: "twitter",
    platform: "x",
    top: 24,
    left: 20,
    rotate: -1.2,
    width: 325,
    layer: "back",
    authorName: "Bearish Skeptic",
    authorHandle: "@short_everything",
    verified: false,
    timestamp: "45m",
    bodyText:
      "Sell everything. Cash is king. This is Cisco 2000 all over again. Don't be exit liquidity.",
    metrics: { comments: "910", shares: "840", likes: "3.1K", views: "210K" },
  },
];

export function ScreenshotCard({ card }: { card: ScreenshotCardConfig }) {
  const isBack = card.layer === "back";
  const theme = PLATFORM_THEMES[card.platform] || PLATFORM_THEMES.x;

  return (
    <div className="relative w-full select-none">
      {/* 1. OVERLAPPING CORNER STICKER BADGE (Exempt from blur & dimming) */}
      {card.cornerSticker && (
        <div
          style={{
            filter: "none",
            opacity: isBack ? 0.9 : 1,
          }}
          className={`absolute pointer-events-none transition-transform duration-300 z-30 ${
            card.cornerSticker === "top-right"
              ? "-top-3.5 -right-3.5 sm:-top-4 sm:-right-4"
              : card.cornerSticker === "top-left"
                ? "-top-3.5 -left-3.5 sm:-top-4 sm:-left-4"
                : card.cornerSticker === "bottom-right"
                  ? "-bottom-3.5 -right-3.5 sm:-bottom-4 sm:-right-4"
                  : "-bottom-3.5 -left-3.5 sm:-bottom-4 sm:-left-4"
          }`}
        >
          <PlatformBadge
            platform={card.platform}
            size={isBack ? 38 : 46}
            variant="sticker"
          />
        </div>
      )}

      {/* 2. CARD CONTAINER WITH BRAND ACCENT TOP BORDER */}
      <div
        className={`w-full rounded-[16px] sm:rounded-[18px] border border-white/12 bg-[#131417]/95 shadow-2xl backdrop-blur-md overflow-hidden ${theme.headerAccent}`}
      >
        {/* PLATFORM HEADER STRIP: Platform Badge (Exempt from blur) + Platform Name Lockup */}
        <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 bg-black/40 border-b border-white/8 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Crisp unblurred PlatformBadge in Header */}
            <div
              style={{
                filter: "none",
                opacity: isBack ? 0.92 : 1,
              }}
              className="shrink-0 z-20"
            >
              <PlatformBadge
                platform={card.platform}
                size={isBack ? 28 : 34}
                variant="chip"
              />
            </div>

            {/* Platform & Account Label */}
            <div
              style={{
                filter: isBack ? "blur(0.4px)" : "none",
                opacity: isBack ? 0.8 : 1,
              }}
              className="flex flex-col min-w-0"
            >
              <span className="text-[11px] sm:text-[11.5px] font-bold text-white/95 truncate tracking-tight flex items-center gap-1.5">
                <span>{theme.name}</span>
                <span className="text-white/30 text-[10px]">•</span>
                <span className="text-white/70 font-medium truncate">
                  {card.authorName || card.authorHandle}
                </span>
                {card.verified && (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-sky-400 shrink-0"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </span>
              {card.authorHandle && card.authorName && (
                <span className="text-[9.5px] text-white/40 font-mono truncate">
                  {card.authorHandle}
                </span>
              )}
            </div>
          </div>

          {/* Right badge/timestamp */}
          <div
            style={{
              filter: isBack ? "blur(0.4px)" : "none",
              opacity: isBack ? 0.75 : 1,
            }}
            className="shrink-0 flex items-center gap-1.5"
          >
            {card.tag && (
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold border ${
                  card.tagColor || "bg-white/10 text-white/80 border-white/15"
                }`}
              >
                {card.tag}
              </span>
            )}
            {card.timestamp && !card.tag && (
              <span className="text-[10px] text-white/40 font-mono">
                {card.timestamp}
              </span>
            )}
          </div>
        </div>

        {/* 3. CARD BODY (Selectively blurred and dimmed on back layer so logos pop) */}
        <div
          style={{
            filter: isBack ? "blur(1.5px)" : "none",
            opacity: isBack ? 0.58 : 0.95,
          }}
        >
          {/* AI CHAT (ChatGPT, Claude, Grok, Gemini) */}
          {card.type === "ai_chat" && (
            <div className="p-3 sm:p-3.5 flex flex-col gap-2 font-sans text-white text-[12px]">
              {card.title && (
                <div className="bg-white/5 border border-white/5 rounded-lg px-2.5 py-1.5 text-[11px] text-white/70 font-mono flex items-center gap-2">
                  <span className="text-white/40">💬</span>
                  <span className="truncate">{card.title}</span>
                </div>
              )}
              <p className="text-white/90 text-[11.8px] sm:text-[12.2px] leading-snug">
                {card.bodyText}
              </p>
              {card.secondaryText && (
                <div className="text-[9.5px] text-white/40 font-mono pt-1 border-t border-white/5 flex items-center justify-between">
                  <span>{card.secondaryText}</span>
                  <span className="text-emerald-400/80 font-semibold">AI Verified</span>
                </div>
              )}
            </div>
          )}

          {/* X / TWITTER POST */}
          {card.type === "twitter" && (
            <div className="p-3 sm:p-3.5 flex flex-col gap-2 font-sans text-white text-[12.5px] leading-relaxed">
              <p className="text-white/90 text-[12px] sm:text-[12.5px] leading-snug">
                {card.bodyText}
              </p>
              {card.metrics && (
                <div className="flex items-center justify-between text-white/50 text-[10px] sm:text-[10.5px] pt-2 border-t border-white/8 font-mono">
                  <span>💬 {card.metrics.comments}</span>
                  <span>🔄 {card.metrics.shares}</span>
                  <span>❤️ {card.metrics.likes}</span>
                  <span>📊 {card.metrics.views}</span>
                </div>
              )}
            </div>
          )}

          {/* WHATSAPP GROUP CHAT */}
          {card.type === "whatsapp" && (
            <div
              className="p-3 sm:p-3.5 flex flex-col gap-2 font-sans text-white text-[12px]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            >
              <div className="self-start max-w-[92%] bg-[#1f2c34] text-[#e9edef] rounded-lg rounded-tl-none p-2 shadow-sm border border-white/5">
                <span className="text-[10px] text-teal-400 font-semibold block">
                  ~Insider
                </span>
                <p className="text-[11.5px] leading-snug">{card.bodyText}</p>
              </div>
              {card.secondaryText && (
                <div className="self-end max-w-[85%] bg-[#005c4b] text-[#e9edef] rounded-lg rounded-tr-none p-2 shadow-sm flex items-center justify-between gap-2 border border-white/5">
                  <p className="text-[11.5px] leading-snug">
                    {card.secondaryText}
                  </p>
                  <span className="text-[9px] text-[#53bdeb] font-mono shrink-0">
                    ✓✓
                  </span>
                </div>
              )}
            </div>
          )}

          {/* TELEGRAM CHANNEL */}
          {card.type === "telegram" && (
            <div className="p-3 sm:p-3.5 bg-[#17212b]/95 flex flex-col gap-2 font-sans text-white text-[12px]">
              <div className="p-2.5 rounded-lg bg-[#242f3d] border border-white/5 text-[11.5px] leading-relaxed text-sky-100">
                {card.bodyText}
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/40 font-mono pt-1">
                <span>{card.metrics?.members}</span>
                <span>👁️ {card.metrics?.views}</span>
              </div>
            </div>
          )}

          {/* DISCORD CHANNEL */}
          {card.type === "discord" && (
            <div className="p-3 sm:p-3.5 bg-[#2b2d31]/95 flex flex-col gap-2 font-sans text-white text-[12px]">
              <p className="text-white/90 text-[12px] leading-snug">
                {card.bodyText}
              </p>
              {card.metrics && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 bg-[#313338] rounded text-[10.5px] text-white/80 font-mono border border-white/5">
                    {card.metrics.likes}
                  </span>
                  <span className="px-2 py-0.5 bg-[#313338] rounded text-[10.5px] text-white/80 font-mono border border-white/5">
                    {card.metrics.comments}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* REDDIT WSB THREAD */}
          {card.type === "reddit" && (
            <div className="p-3 sm:p-3.5 bg-[#1a1a1b]/95 flex flex-col gap-2 font-sans text-white text-[12px]">
              <h4 className="font-semibold text-white text-[12.5px] leading-snug">
                {card.title}
              </h4>
              {card.secondaryText && (
                <p className="text-white/60 text-[11px] italic bg-white/5 p-2 rounded border border-white/5">
                  {card.secondaryText}
                </p>
              )}
              {card.metrics && (
                <div className="flex items-center gap-3 text-white/40 text-[10px] font-mono pt-1">
                  <span>▲ {card.metrics.likes}</span>
                  <span>💬 {card.metrics.comments} comments</span>
                </div>
              )}
            </div>
          )}

          {/* STOCKTWITS */}
          {card.type === "stocktwits" && (
            <div className="p-3 sm:p-3.5 bg-[#181a1b]/95 flex flex-col gap-2 font-sans text-white text-[12px]">
              <p className="text-white/90 text-[12px] leading-snug">
                {card.bodyText}
              </p>
              {card.metrics && (
                <div className="flex items-center gap-3 text-white/40 text-[10.5px] pt-1 font-mono">
                  <span>💬 {card.metrics.comments}</span>
                  <span>❤️ {card.metrics.likes}</span>
                </div>
              )}
            </div>
          )}

          {/* ROBINHOOD BROKERAGE */}
          {card.type === "brokerage" && (
            <div className="p-3 sm:p-3.5 bg-[#101314]/95 flex flex-col gap-2 font-sans text-white text-[12px]">
              <div className="flex items-baseline justify-between">
                <span className="text-[17px] font-bold text-white tracking-tight font-mono">
                  {card.title}
                </span>
                <span className="text-[11.5px] font-bold text-emerald-400 font-mono">
                  {card.metrics?.percentage}
                </span>
              </div>
              {/* Sparkline line simulation */}
              <div className="w-full h-8 flex items-end">
                <svg
                  viewBox="0 0 100 24"
                  className="w-full h-full stroke-emerald-400 fill-none stroke-[2]"
                >
                  <path d="M0 20 L20 18 L35 21 L50 12 L65 14 L80 6 L100 2" />
                </svg>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-white/80">{card.bodyText}</span>
                <span className="text-emerald-400 font-mono font-bold">
                  {card.metrics?.profit}
                </span>
              </div>
            </div>
          )}

          {/* CNBC / BLOOMBERG TV CHYRON */}
          {card.type === "tv_chyron" && (
            <div className="p-3 sm:p-3.5 bg-[#0a0c10]/95 flex flex-col gap-1.5 font-sans text-white text-[12px]">
              <h4 className="font-extrabold text-amber-400 text-[12.5px] tracking-tight leading-snug uppercase font-mono">
                {card.title}
              </h4>
              <div className="bg-black/80 px-2 py-1.5 rounded border border-white/10 font-mono text-[10px] text-white/80 truncate">
                {card.bodyText}
              </div>
            </div>
          )}

          {/* YOUTUBE THUMBNAIL */}
          {card.type === "youtube" && (
            <div className="p-3 sm:p-3.5 bg-[#0f0f0f]/95 flex flex-col gap-2 font-sans text-white text-[12px]">
              <div className="relative w-full h-16 rounded-lg bg-gradient-to-r from-red-950/60 to-black border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-white translate-x-[1px]"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="absolute bottom-1 right-1.5 bg-black/80 px-1 py-0.5 rounded text-[9px] font-mono text-white/80">
                  14:28
                </span>
              </div>
              <h4 className="font-bold text-white/95 text-[11.5px] leading-tight line-clamp-2">
                {card.title}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-white/40 font-mono">
                <span>{card.authorName}</span>
                <span>{card.metrics?.views}</span>
              </div>
            </div>
          )}

          {/* INSTAGRAM FINFLUENCER */}
          {card.type === "instagram" && (
            <div className="p-3 sm:p-3.5 bg-[#121212]/95 flex flex-col gap-1.5 font-sans text-white text-[12px]">
              <p className="text-white/85 text-[11.5px] leading-relaxed">
                {card.bodyText}
              </p>
              {card.metrics && (
                <div className="flex items-center gap-3 text-white/50 text-[10.5px] pt-1.5 border-t border-white/5 font-mono">
                  <span>❤️ {card.metrics.likes}</span>
                  <span>💬 {card.metrics.comments}</span>
                </div>
              )}
            </div>
          )}

          {/* SUBSTACK / NEWSLETTER */}
          {card.type === "newsletter" && (
            <div className="p-3 sm:p-3.5 bg-[#141518]/95 flex flex-col gap-1.5 font-sans text-white text-[12px]">
              <h4 className="font-bold text-white text-[12.5px] leading-snug">
                {card.title}
              </h4>
              <p className="text-white/70 text-[11px] leading-relaxed line-clamp-2">
                {card.bodyText}
              </p>
              <span className="text-[9.5px] text-white/35 font-mono pt-1 border-t border-white/5">
                {card.timestamp}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
