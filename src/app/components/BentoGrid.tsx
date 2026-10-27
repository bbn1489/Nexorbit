"use client";

import { useEffect, useRef } from "react";

interface BentoCardData {
  title: string;
  description: string;
  icon: string;
  span?: "span-2" | "featured";
  stat?: string;
  statLabel?: string;
}

const cards: BentoCardData[] = [
  {
    title: "AI-Powered Workflows",
    description: "Automate repetitive tasks with intelligent agents that learn your patterns and optimize delivery pipelines.",
    icon: "🧠",
    span: "span-2",
  },
  {
    title: "Real-time Collab",
    description: "Work together with zero latency. Multiplayer cursors, live presence, and instant sync.",
    icon: "⚡",
  },
  {
    title: "Edge Deployment",
    description: "Ship to 300+ edge locations worldwide. Sub-50ms response times, everywhere.",
    icon: "🌐",
    stat: "300+",
    statLabel: "Edge Locations",
    span: "featured",
  },
  {
    title: "Built-in Analytics",
    description: "Track performance, user behavior, and business metrics in one beautiful dashboard.",
    icon: "📊",
  },
  {
    title: "Enterprise Security",
    description: "SOC 2 Type II, HIPAA, and GDPR compliant. Zero-trust architecture with end-to-end encryption.",
    icon: "🔒",
  },
  {
    title: "Infinite Scalability",
    description: "From prototype to planet-scale. Auto-scaling infrastructure that grows with your ambitions.",
    icon: "🚀",
    span: "span-2",
  },
];

export default function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = gridRef.current?.querySelectorAll(".bento-card");
    cards?.forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bento-section" id="features">
      <div className="section-header">
        <p className="section-label">Features</p>
        <h2 className="section-title">Everything you need to build faster</h2>
        <p className="section-subtitle">
          A complete platform with powerful primitives, so you can focus on what
          matters — shipping incredible products.
        </p>
      </div>

      <div className="bento-grid" ref={gridRef}>
        {cards.map((card) => (
          <div
            key={card.title}
            className={`bento-card reveal ${card.span || ""}`}
            id={`bento-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="bento-icon">{card.icon}</div>
            {card.stat && (
              <>
                <div className="bento-stat">{card.stat}</div>
                <div className="bento-stat-label">{card.statLabel}</div>
              </>
            )}
            <h3 className="bento-title">{card.title}</h3>
            <p className="bento-desc">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
