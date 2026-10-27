"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [heroOpacity, setHeroOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img1 = new Image();
    const img2 = new Image();
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      if (loaded === 2) {
        requestAnimationFrame(draw);
      }
    };

    img1.onload = onLoad;
    img2.onload = onLoad;
    img1.src = "/hero-scene-1.jpg";
    img2.src = "/hero-scene-2.jpg";

    let animFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const section = sectionRef.current;
      if (!section || !ctx) return;

      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);

      const w = canvas.width;
      const h = canvas.height;

      // Scene 1 zoom + Scene 2 crossfade
      const zoom1 = 1 + progress * 0.5;
      const alpha2 = Math.min(progress * 2, 1);

      // Hero text opacity — fade it out as we scroll
      const textOpacity = 1 - Math.min(progress * 3, 1);
      setHeroOpacity(textOpacity);

      ctx.clearRect(0, 0, w, h);

      // Draw Scene 1 with zoom effect
      ctx.save();
      ctx.globalAlpha = 1;
      const s1w = w * zoom1;
      const s1h = h * zoom1;
      ctx.drawImage(img1, (w - s1w) / 2, (h - s1h) / 2, s1w, s1h);
      ctx.restore();

      // Portal/vignette transition effect
      if (progress > 0.1) {
        const portalProgress = (progress - 0.1) / 0.9;

        // Draw scene 2 with expanding circular reveal
        ctx.save();
        const radius = Math.max(w, h) * portalProgress * 0.8;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, radius, 0, Math.PI * 2);
        ctx.clip();

        ctx.globalAlpha = alpha2;
        const s2w = w * (1 + (1 - portalProgress) * 0.3);
        const s2h = h * (1 + (1 - portalProgress) * 0.3);
        ctx.drawImage(img2, (w - s2w) / 2, (h - s2h) / 2, s2w, s2h);
        ctx.restore();

        // Glowing portal edge ring
        if (portalProgress < 0.9) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.6 * (1 - portalProgress)})`;
          ctx.lineWidth = 3 + 15 * (1 - portalProgress);
          ctx.shadowColor = "rgba(139, 92, 246, 0.8)";
          ctx.shadowBlur = 40;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Floating particles
      const time = Date.now() / 1000;
      for (let i = 0; i < 30; i++) {
        const px = (Math.sin(time * 0.3 + i * 1.7) * 0.5 + 0.5) * w;
        const py = (Math.cos(time * 0.2 + i * 2.3) * 0.5 + 0.5) * h;
        const size = 1 + Math.sin(time + i) * 1;
        const pAlpha = 0.2 + Math.sin(time * 0.5 + i * 0.8) * 0.15;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${pAlpha})`;
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(draw);
    };

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      <div className="hero-sticky">
        <div className="hero-canvas-container">
          <canvas ref={canvasRef} />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content" style={{ opacity: heroOpacity, transform: `translateY(${(1 - heroOpacity) * -30}px)` }}>
          <div className="hero-badge">
            <span>✦</span> Next-Gen Platform — Now in Beta
          </div>
          <h1 className="hero-title">
            Launch into the<br />
            <span className="gradient-text">Future of Building</span>
          </h1>
          <p className="hero-description">
            Nexorbit empowers teams to ship products at lightspeed.
            AI-powered workflows, real-time collaboration, and infrastructure
            that scales beyond the stars.
          </p>
          <div className="hero-cta-group">
            <a href="#cta" className="btn-primary" id="hero-cta-primary">
              Start Free Trial →
            </a>
            <a href="#features" className="btn-secondary" id="hero-cta-secondary">
              See Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
