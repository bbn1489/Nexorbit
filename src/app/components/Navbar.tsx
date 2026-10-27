"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="navbar" className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#" className="nav-logo">
        <span className="nav-logo-icon">✦</span>
        Nexorbit
      </a>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#explore">Explore</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li>
          <a href="#cta" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>
            Get Started
          </a>
        </li>
      </ul>
    </nav>
  );
}
