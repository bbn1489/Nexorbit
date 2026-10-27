"use client";

import { useMemo } from "react";

export default function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 4}s`,
      delay: `${Math.random() * 3}s`,
      size: `${1 + Math.random() * 2}px`,
    }));
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
