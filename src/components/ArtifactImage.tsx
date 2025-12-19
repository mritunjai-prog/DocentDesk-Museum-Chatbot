import { useState } from "react";

interface ArtifactImageProps {
  src: string | null;
  alt: string;
  className?: string;
  fallbackGradient?: string;
}

export function ArtifactImage({
  src,
  alt,
  className = "",
  fallbackGradient = "from-amber-900/40 via-yellow-800/40 to-amber-700/40",
}: ArtifactImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use placeholder if no src or error occurred
  const shouldShowFallback = !src || imageError;

  return (
    <div className={`relative w-full h-full ${className}`}>
      {shouldShowFallback ? (
        // Egyptian-themed gradient fallback
        <div
          className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}
        >
          <div className="text-center opacity-30">
            <svg
              className="w-24 h-24 mx-auto mb-2 text-amber-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 2C12 2 6 4 6 8v4.5c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V8c0-4-6-6-6-6z"
              />
              <circle cx="12" cy="10" r="2" fill="currentColor" />
              <path d="M12 12v6" strokeLinecap="round" />
              <path d="M9 18h6" strokeLinecap="round" />
            </svg>
            <p className="text-sm font-serif text-amber-300">
              Ancient Artifact
            </p>
          </div>
        </div>
      ) : (
        <>
          {isLoading && (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} animate-pulse`}
            />
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${
              isLoading ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500`}
            onError={() => setImageError(true)}
            onLoad={() => setIsLoading(false)}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
}
