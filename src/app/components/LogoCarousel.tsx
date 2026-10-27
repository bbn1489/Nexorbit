"use client";

import type { ReactNode } from "react";

export default function LogoCarousel() {
  // SVG icon components for tech logos
  const logos = [
    { name: "Vercel", icon: "▲" },
    { name: "AWS", icon: "◆" },
    { name: "Stripe", icon: "⬡" },
    { name: "Figma", icon: "◈" },
    { name: "GitHub", icon: "⬢" },
    { name: "Slack", icon: "⬟" },
    { name: "Linear", icon: "◇" },
    { name: "Notion", icon: "■" },
    { name: "Supabase", icon: "⚡" },
    { name: "Prisma", icon: "◆" },
    { name: "Docker", icon: "🐳" },
    { name: "Cloudflare", icon: "☁" },
  ];

  const LogoSVG = ({ name }: { name: string }) => {
    const svgPaths: Record<string, ReactNode> = {
      Vercel: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M12 2L2 19.5h20L12 2z" />
        </svg>
      ),
      AWS: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576a.391.391 0 01.064.208c0 .096-.064.192-.192.288l-.64.416a.452.452 0 01-.256.096c-.096 0-.192-.048-.288-.144a2.96 2.96 0 01-.336-.432 7.08 7.08 0 01-.288-.528c-.736.864-1.664 1.296-2.784 1.296-.8 0-1.44-.224-1.904-.672-.464-.448-.704-1.04-.704-1.776 0-.784.28-1.424.848-1.904.56-.48 1.312-.72 2.256-.72.32 0 .64.032.976.08.336.048.672.128 1.024.224v-.672c0-.704-.144-1.2-.432-1.472-.296-.272-.8-.4-1.52-.4-.32 0-.656.04-.992.128a7.36 7.36 0 00-.992.336 2.64 2.64 0 01-.32.128c-.064.016-.112.032-.144.032-.128 0-.192-.096-.192-.288v-.48c0-.16.016-.272.064-.336a.67.67 0 01.24-.176c.32-.16.704-.296 1.152-.4A5.4 5.4 0 014.8 5.6c.88 0 1.52.208 1.936.608.416.4.624 1.008.624 1.824v2.4h-.032z" />
          <circle cx="18" cy="12" r="4" />
        </svg>
      ),
      Stripe: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.918 3.757 7.076c0 3.597 2.187 5.188 5.751 6.536 2.314.872 3.109 1.548 3.109 2.509 0 .925-.773 1.484-2.141 1.484-1.835 0-4.587-.948-6.433-2.186L3.13 20.876C4.813 22.043 8.146 23 11.476 23c2.64 0 4.793-.651 6.306-1.87 1.637-1.315 2.459-3.234 2.459-5.58 0-3.687-2.227-5.28-6.265-6.4z" />
        </svg>
      ),
    };

    return svgPaths[name] || (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <rect x="4" y="4" width="16" height="16" rx="3" opacity="0.6" />
      </svg>
    );
  };

  const renderLogos = () =>
    logos.map((logo, i) => (
      <div key={`${logo.name}-${i}`} className="logo-item">
        <LogoSVG name={logo.name} />
        <span>{logo.name}</span>
      </div>
    ));

  return (
    <section className="logo-carousel-section" id="logos">
      <p className="logo-carousel-label">Trusted by teams at</p>
      <div className="logo-carousel-track">
        {renderLogos()}
        {renderLogos()}
      </div>
    </section>
  );
}
