import { useState, useEffect } from "react";
import {
  TICKER_SYMBOL_MAP,
  TICKER_DOMAIN_MAP,
  CUSTOM_LOGO_MAP,
} from "../data/tickers";

export interface CompanyLogoProps {
  ticker: string;
  className?: string;
  containerClassName?: string;
}

export function CompanyLogo({
  ticker,
  className,
  containerClassName,
}: CompanyLogoProps) {
  const upperTicker = ticker.toUpperCase();
  const symbol = TICKER_SYMBOL_MAP[upperTicker] || ticker;
  const domain = TICKER_DOMAIN_MAP[upperTicker] || `${ticker.toLowerCase()}.com`;
  const primaryUrl =
    CUSTOM_LOGO_MAP[upperTicker] ||
    `https://assets.parqet.com/logos/symbol/${symbol}?format=png`;
  const fallbackUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const tertiaryUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;

  const [imgSrc, setImgSrc] = useState<string>(primaryUrl);
  const [errorCount, setErrorCount] = useState<number>(0);

  useEffect(() => {
    setImgSrc(
      CUSTOM_LOGO_MAP[upperTicker] ||
        `https://assets.parqet.com/logos/symbol/${symbol}?format=png`
    );
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
    <div
      className={
        containerClassName ??
        "flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] aspect-square p-2"
      }
    >
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
