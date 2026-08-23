import React, { useState, useEffect } from 'react';
import { Download, ArrowDown, ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenBlueprint: () => void;
}

const particles = Array.from({ length: 52 }, (_, i) => ({
  id: i,
  x: (i * 29 + 7) % 97,
  y: (i * 47 + 9) % 82,
  delay: (i % 13) * -0.55,
  duration: 7 + (i % 6) * 1.35,
  size: i % 11 === 0 ? 4 : i % 5 === 0 ? 3 : 2,
  tone: i % 17 === 0 ? 'amber' : i % 7 === 0 ? 'emerald' : 'indigo',
}));

const fullHeadline = 'Run the work. Keep the authority.';

export function Hero({ onOpenBlueprint }: HeroProps) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (typedText.length >= fullHeadline.length) return;
    const timer = window.setTimeout(() => {
      setTypedText(fullHeadline.slice(0, typedText.length + 1));
    }, 34);
    return () => window.clearTimeout(timer);
  }, [typedText]);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="field-hero relative" id="top">
      {/* Floating Particle Field */}
      <div className="particle-field" aria-hidden="true">
        {particles.map((p) => (
          <i
            key={p.id}
            className={`particle particle--${p.tone}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Hero Copy */}
      <div className="field-hero-copy">
        <p className="field-kicker">NAVA / AUTONOMOUS PERSONAL AGENT OPERATING SYSTEM</p>
        <h1>
          {typedText}
          <span className="typing-caret" aria-hidden="true" />
        </h1>
        <p className="field-hero-description">
          A local-first system that plans, delegates, verifies, and remembers—without ever turning
          intelligence into unearned authority.
        </p>

        <div className="field-hero-actions">
          <button
            type="button"
            className="field-primary cursor-pointer flex items-center gap-2"
            onClick={() => scrollTo('downloads')}
          >
            <Download size={17} />
            <span>Download Nava</span>
          </button>
          <button
            type="button"
            className="field-secondary cursor-pointer flex items-center gap-2"
            onClick={() => scrollTo('runtime')}
          >
            <span>Explore the runtime</span>
            <ArrowDown size={16} />
          </button>
        </div>
      </div>

      {/* Hero Boundary / Action Pathway */}
      <div className="hero-boundary">
        <span>Action pathway</span>
        <b>GOAL</b>
        <ChevronRight size={13} />
        <b>POLICY</b>
        <ChevronRight size={13} />
        <b>PROOF</b>
        <ChevronRight size={13} />
        <b>RECEIPT</b>
      </div>

      {/* Scroll Down Trigger */}
      <button
        className="hero-scroll cursor-pointer"
        onClick={() => scrollTo('runtime')}
        aria-label="Scroll to Nava runtime"
        type="button"
      >
        <ArrowDown size={17} />
      </button>
    </section>
  );
}
