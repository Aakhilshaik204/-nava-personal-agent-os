import React, { useState, useEffect } from 'react';
import { Terminal, ArrowDown, ChevronRight, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBlueprint: () => void;
  onShowToast?: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
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

export function Hero({ onOpenBlueprint, onShowToast }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typedText.length >= fullHeadline.length) return;
    const timer = window.setTimeout(() => {
      setTypedText(fullHeadline.slice(0, typedText.length + 1));
    }, 34);
    return () => window.clearTimeout(timer);
  }, [typedText]);

  const handleCopyPip = async () => {
    const cmd = 'pip install nava-agent';
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      if (onShowToast) {
        onShowToast('Copied to clipboard!', 'Run "pip install nava-agent" in your terminal.', 'success');
      }
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (onShowToast) {
        onShowToast('Install command', 'Run: pip install nava-agent in your terminal.', 'info');
      }
    }
  };

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
        {/* PyPI Release & UI Status Banner */}
        <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/5 border border-slate-200/80 mb-3 text-xs">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            v0.2.0 Live on PyPI
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">Terminal CLI Agent</span>
          <span className="text-slate-300">•</span>
          <span className="text-indigo-600 font-medium flex items-center gap-1">
            <Sparkles size={12} />
            Desktop UI in Dev
          </span>
        </div>

        <p className="field-kicker">NAVA / AUTONOMOUS PERSONAL AGENT OPERATING SYSTEM</p>
        <h1>
          {typedText}
          <span className="typing-caret" aria-hidden="true" />
        </h1>
        <p className="field-hero-description">
          A local-first system that plans, delegates, verifies, and remembers—without ever turning
          intelligence into unearned authority. Install the terminal agent today via PyPI.
        </p>

        {/* Quick Pip Install Bar */}
        <div className="my-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl">
          <div className="flex-1 flex items-center justify-between px-3.5 py-2.5 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs border border-slate-800 shadow-md">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Terminal size={14} className="text-indigo-400 flex-shrink-0" />
              <span className="text-slate-400 select-none">$</span>
              <span className="text-white font-medium select-all whitespace-nowrap">pip install nava-agent</span>
            </div>
            <button
              type="button"
              onClick={handleCopyPip}
              className="ml-3 p-1 text-slate-400 hover:text-white cursor-pointer transition-colors flex items-center gap-1 text-[11px]"
              title="Copy pip install command"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span className="hidden sm:inline text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <a
            href="https://pypi.org/project/nava-agent/0.2.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <span>PyPI Release</span>
            <ExternalLink size={13} className="text-slate-400" />
          </a>
        </div>

        <div className="field-hero-actions mt-3">
          <button
            type="button"
            className="field-primary cursor-pointer flex items-center gap-2"
            onClick={() => scrollTo('downloads')}
          >
            <Terminal size={16} />
            <span>Install CLI & Quickstart</span>
          </button>
          <button
            type="button"
            className="field-secondary cursor-pointer flex items-center gap-2"
            onClick={() => scrollTo('runtime')}
          >
            <span>Explore UI Simulator</span>
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
