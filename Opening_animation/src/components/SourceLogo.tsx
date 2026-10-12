import { useState, useEffect } from "react";
import { NOISE_SOURCE_INFO, type NoiseSource } from "../data/noiseSources";

export interface SourceLogoProps {
  source: NoiseSource;
  className?: string;
}

export function SourceLogo({ source, className }: SourceLogoProps) {
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
