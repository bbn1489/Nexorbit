"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LogoCarousel from "./components/LogoCarousel";
import BentoGrid from "./components/BentoGrid";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";

// Dynamically import Three.js component (SSR not supported)
const Interactive3D = dynamic(() => import("./components/Interactive3D"), {
  ssr: false,
  loading: () => (
    <section className="interactive-3d-section" id="explore">
      <div className="interactive-3d-wrapper">
        <div className="interactive-3d-info">
          <p className="section-label">Interactive Experience</p>
          <h2 className="section-title">Loading 3D Experience...</h2>
        </div>
        <div className="interactive-3d-canvas" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "rgba(139, 92, 246, 0.5)", fontSize: "1.2rem" }}>Loading...</div>
        </div>
      </div>
    </section>
  ),
});

export default function Home() {
  return (
    <main>
      <Starfield />
      <Navbar />
      <HeroSection />
      <LogoCarousel />
      <BentoGrid />
      <Interactive3D />
      <CTASection />
      <Footer />
    </main>
  );
}
