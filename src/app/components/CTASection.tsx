"use client";

export default function CTASection() {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-card">
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="section-label">Ready to Launch?</p>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            Start building the future today
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto 2rem", textAlign: "center" }}>
            Join thousands of teams already shipping faster with Nexorbit.
            Free to start, no credit card required.
          </p>
          <div className="hero-cta-group">
            <a href="#" className="btn-primary" id="cta-start">
              Get Started Free →
            </a>
            <a href="#" className="btn-secondary" id="cta-demo">
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
