import { useState } from "react";

interface EventImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

export function EventImage({ src, alt, className = "" }: EventImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const shouldShowFallback = !src || imageError;

  return (
    <div className={`relative w-full h-full ${className}`}>
      {shouldShowFallback ? (
        // Museum-themed gradient fallback
        <div className="w-full h-full bg-gradient-to-br from-indigo-900/40 via-purple-800/40 to-pink-700/40 flex items-center justify-center">
          <div className="text-center opacity-30">
            <svg
              className="w-20 h-20 mx-auto mb-2 text-purple-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm font-serif text-purple-300">Museum Event</p>
          </div>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-800/40 to-pink-700/40 animate-pulse" />
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
