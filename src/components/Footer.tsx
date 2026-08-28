import React from 'react';
import { ArrowUpRight, Github, ShieldCheck, Terminal, BookOpen, Scale } from 'lucide-react';

interface FooterProps {
  onOpenBlueprint: () => void;
  onOpenDocs: () => void;
  onOpenLicense: () => void;
  onShowToast: (msg: string, desc?: string) => void;
}

export function Footer({ onOpenBlueprint, onOpenDocs, onOpenLicense, onShowToast }: FooterProps) {
  return (
    <footer className="w-full bg-white border-t border-slate-200/90 text-slate-900 overflow-hidden">
      {/* Enhanced Top Utility & Navigation Row */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100">
        {/* Left: System Status & Core Guarantees */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
          <a
            href="https://pypi.org/project/nava-agent/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-600 font-mono font-medium hover:underline cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>nava-agent v0.3.1 on PyPI</span>
          </a>

          <span className="text-slate-300 hidden sm:inline">•</span>

          <span className="font-mono text-slate-600 text-[11px]">
            Terminal CLI Live • UI Studio in Dev
          </span>

          <span className="text-slate-300 hidden sm:inline">•</span>

          <span className="text-slate-500 text-[11px] font-mono">
            21 Invariant Tests Passing
          </span>
        </div>

        {/* Right: Clean Navigation Links */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-[13px] font-medium text-slate-600">
          <a
            href="https://pypi.org/project/nava-agent/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-slate-950 transition-colors cursor-pointer text-indigo-600 font-semibold"
          >
            <Terminal size={13} />
            <span>PyPI (pip)</span>
          </a>

          <button
            type="button"
            onClick={onOpenDocs}
            className="flex items-center gap-1 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <BookOpen size={13} className="text-slate-400" />
            <span>Documentation</span>
          </button>

          <button
            type="button"
            onClick={onOpenBlueprint}
            className="flex items-center gap-1 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <span>55-Page Blueprint</span>
            <ArrowUpRight size={13} className="text-slate-400" />
          </button>
          
          <a
            href="https://github.com/Aakhilshaik204/nava-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <Github size={13} className="text-slate-500" />
            <span>GitHub</span>
          </a>

          <button
            type="button"
            onClick={onOpenLicense}
            className="flex items-center gap-1 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <Scale size={13} className="text-slate-400" />
            <span>License (Apache 2.0)</span>
          </button>
        </nav>
      </div>

      {/* Left-most aligned massive bottom display wordmark & Copyright Row */}
      <div className="w-full px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-12 sm:pb-16 flex flex-col justify-between gap-10 select-none">
        <div className="flex items-baseline text-left">
          <span className="text-[clamp(80px,18vw,260px)] font-bold tracking-tight text-slate-950 leading-[0.8] select-none">
            Nava
          </span>
          <span 
            className="inline-block w-[clamp(14px,2.6vw,40px)] h-[clamp(14px,2.6vw,40px)] bg-indigo-600 rounded-[2px] ml-[clamp(12px,2.2vw,36px)] mb-[clamp(8px,1.4vw,22px)] flex-shrink-0" 
            aria-hidden="true" 
          />
        </div>

        {/* Attribution and Copyright Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2 text-slate-700">
            <span>© 2026 <strong className="text-slate-950 font-semibold">Aakhil Shaik</strong>. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>NAVA Personal Agent OS Kernel</span>
            <span>•</span>
            <a
              href="https://github.com/Aakhilshaik204"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-950 underline underline-offset-2 transition-colors cursor-pointer"
            >
              github.com/Aakhilshaik204
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
