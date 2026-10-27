"use client";

import { useMemo } from "react";

export default function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => {
      // Deterministic generation to ensure safe SSR prerendering
      const seed1 = ((i * 37.17) % 1);
      const seed2 = ((i * 59.43) % 1);
      const seed3 = ((i * 13.89) % 1);
      const seed4 = ((i * 83.21) % 1);
      const seed5 = ((i * 47.65) % 1);

      return {
        left: `${(seed1 * 100).toFixed(2)}%`,
        top: `${(seed2 * 100).toFixed(2)}%`,
        duration: `${(2 + seed3 * 4).toFixed(2)}s`,
        delay: `${(seed4 * 3).toFixed(2)}s`,
        size: `${(1 + seed5 * 2).toFixed(2)}px`,
      };
    });
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            // @ts-expect-error css custom property
            "--duration": star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
