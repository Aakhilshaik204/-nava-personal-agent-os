import React, { useState } from 'react';
import {
  Terminal,
  ArrowUpRight,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Github,
  Laptop,
  Package,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface DownloadSectionProps {
  onOpenBlueprint: () => void;
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

export function DownloadSection({ onOpenBlueprint, onShowToast }: DownloadSectionProps) {
  const [copiedPip, setCopiedPip] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);

  const handleCopyPip = async () => {
    const cmd = 'pip install nava-agent';
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedPip(true);
      onShowToast('Copied to clipboard!', 'Run "pip install nava-agent" in your terminal.', 'success');
      setTimeout(() => setCopiedPip(false), 2000);
    } catch {
      onShowToast('Install command', 'Run: pip install nava-agent in your terminal.', 'info');
    }
  };

  const handleCopyQuickstart = async () => {
    const script = `pip install nava-agent\nnava --help\nnava run "audit workspace and compile findings"`;
    try {
      await navigator.clipboard.writeText(script);
      setCopiedFull(true);
      onShowToast('Quickstart script copied!', 'Ready to paste into your terminal.', 'success');
      setTimeout(() => setCopiedFull(false), 2000);
    } catch {
      onShowToast('Quickstart script', 'Run "pip install nava-agent" to begin.', 'info');
    }
  };

  return (
    <section className="download-section" id="downloads">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Section Header */}
        <div className="text-left mb-10">
          <p className="field-kicker !text-indigo-400">DISTRIBUTION & QUICKSTART / LOCAL-FIRST OS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Get NAVA Agent OS.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
            The <strong className="text-white font-semibold">terminal-based CLI agent is live on PyPI (v0.2.0)</strong> and ready for immediate local execution. The <strong className="text-white font-semibold">graphical desktop studio</strong> is currently in active development.
          </p>
        </div>

        {/* Dual Release Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Terminal CLI Edition (Live on PyPI) - 7 Columns */}
          <div className="lg:col-span-7 bg-slate-900/90 border-2 border-indigo-500/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-left backdrop-blur-sm">
            {/* Top Accent Gradient Pill */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500" />

            <div>
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-indigo-950 border border-indigo-500/40 rounded-xl text-indigo-300">
                    <Terminal size={20} />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Terminal / CLI Edition
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">Python Package (PyPI)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    v0.2.0 LIVE ON PyPI
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                The complete autonomous agent OS kernel. Includes the 12-step Action Gateway, JIT Dynamic Agent Factory, Model Context Protocol (MCP) registry, and 21 certified system invariants.
              </p>

              {/* Install Box */}
              <div className="mb-5 bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5 overflow-x-auto text-xs sm:text-sm font-mono">
                  <span className="text-indigo-400 font-bold select-none">$</span>
                  <span className="text-emerald-300 font-semibold select-all whitespace-nowrap">
                    pip install nava-agent
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPip}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 flex-shrink-0 shadow-xs"
                >
                  {copiedPip ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedPip ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-medium mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>12-Step Chokepoint Action Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>21 Mathematical Invariants Enforced</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>Dynamic JIT Agent Synthesis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>Cross-Platform (macOS, Linux, Win)</span>
                </div>
              </div>
            </div>

            {/* Actions Bottom Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
              <a
                href="https://pypi.org/project/nava-agent/0.2.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Package size={14} />
                <span>View on PyPI (v0.2.0)</span>
                <ExternalLink size={13} className="text-indigo-200" />
              </a>

              <a
                href="https://github.com/Aakhilshaik204/nava-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-xl font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Github size={14} />
                <span>GitHub Repository</span>
              </a>

              <button
                type="button"
                onClick={handleCopyQuickstart}
                className="px-3.5 py-2 text-slate-400 hover:text-white font-mono text-xs transition-colors cursor-pointer ml-auto flex items-center gap-1.5"
              >
                {copiedFull ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>Quickstart script</span>
              </button>
            </div>
          </div>

          {/* Card 2: Desktop & Web Cowork Studio (In Development) - 5 Columns */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl text-left backdrop-blur-sm">
            <div>
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300">
                    <Laptop size={20} />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Desktop UI Studio
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">macOS • Windows • Linux</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <Clock size={12} />
                  IN ACTIVE DEVELOPMENT
                </span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                The visual personal agent operating surface. Features real-time multi-agent swarm DAG visualizers, human-in-the-loop approval triage, 4-tier memory inspector, and sandbox screen monitoring.
              </p>

              {/* Target Platforms */}
              <div className="space-y-2 mb-6">
                <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">macOS (.dmg)</span>
                  <span className="text-slate-500 font-mono text-[11px]">Apple Silicon & Intel • In Dev</span>
                </div>
                <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Windows (.exe)</span>
                  <span className="text-slate-500 font-mono text-[11px]">x64 / ARM Native • In Dev</span>
                </div>
                <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Linux (.AppImage)</span>
                  <span className="text-slate-500 font-mono text-[11px]">Desktop & Headless • In Dev</span>
                </div>
              </div>
            </div>

            {/* Actions Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={onOpenBlueprint}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Read 55-Page Blueprint</span>
                <ArrowUpRight size={14} />
              </button>

              <button
                type="button"
                onClick={() =>
                  onShowToast(
                    'UI Studio in Development',
                    'Star the GitHub repository to get notified when desktop binaries launch!',
                    'info'
                  )
                }
                className="px-4 py-2.5 bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-800"
              >
                <Sparkles size={13} className="text-indigo-400" />
                <span>Track UI Progress</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quickstart 3-Step Guide Footer */}
        <div className="mt-8 p-5 sm:p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-left">
          <div className="text-xs font-mono uppercase text-indigo-400 font-semibold mb-3">
            Terminal Quickstart (30 Seconds)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl">
              <span className="text-slate-500 font-mono block mb-1">01 / INSTALL</span>
              <code className="text-emerald-300 font-mono block font-semibold">pip install nava-agent</code>
              <small className="text-slate-400 mt-1 block">Requires Python 3.10+ on any OS.</small>
            </div>

            <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl">
              <span className="text-slate-500 font-mono block mb-1">02 / CONFIGURE KEYS</span>
              <code className="text-indigo-300 font-mono block font-semibold">export GEMINI_API_KEY="..."</code>
              <small className="text-slate-400 mt-1 block">Supports Gemini, OpenAI, Anthropic, or local Ollama.</small>
            </div>

            <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl">
              <span className="text-slate-500 font-mono block mb-1">03 / EXECUTE GOAL</span>
              <code className="text-slate-200 font-mono block font-semibold">nava run "audit project security"</code>
              <small className="text-slate-400 mt-1 block">Runs with 12-step gateway & cryptographic receipt.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
