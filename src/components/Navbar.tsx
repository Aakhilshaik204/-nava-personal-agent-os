import React, { useState } from 'react';
import { Github, Menu, X, ChevronRight, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBlueprint: () => void;
  onOpenDocs: () => void;
  onOpenLicense?: () => void;
  onShowToast: (msg: string, desc?: string) => void;
}

export function Navbar({ onOpenBlueprint, onOpenDocs, onOpenLicense, onShowToast }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    ['Runtime', 'runtime'],
    ['Dynamic Agents', 'dynamic-agents'],
    ['Swarms', 'parallel-swarms'],
    ['Skills', 'skills-subsystem'],
    ['Tools & MCP', 'tools-mcp'],
    ['Projects', 'projects-isolation'],
    ['Gateway', 'gateway'],
    ['Developers', 'developers'],
  ];

  return (
    <header className="field-header !px-4 sm:!px-8 lg:!px-12 flex items-center justify-between">
      {/* Left-most aligned brand */}
      <a href="#top" className="field-brand flex items-center gap-3 mr-auto" aria-label="Nava home">
        <span className="flex items-baseline font-extrabold tracking-tight text-2xl sm:text-[26px] text-slate-950">
          Nava
          <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-indigo-600 rounded-[1.5px] ml-1.5 mb-1 sm:mb-1.5" aria-hidden="true" />
        </span>
        <small className="hidden sm:inline-block text-xs sm:text-[13px] text-slate-500 font-medium pl-3 border-l border-slate-300">
          Personal Agent OS
        </small>
      </a>

      <nav className="field-nav !gap-7" aria-label="Main navigation">
        {navItems.map(([label, targetId]) => (
          <button
            key={targetId}
            onClick={() => scrollTo(targetId)}
            type="button"
            className="cursor-pointer !text-sm !font-medium !text-slate-600 hover:!text-slate-950 transition-colors"
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="field-header-actions !gap-2 sm:!gap-2.5">
        <a
          href="https://pypi.org/project/nava-agent/0.2.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="field-version !text-xs !font-mono !px-2.5 !py-1 hover:!bg-slate-200 transition-colors"
          title="View nava-agent on PyPI"
        >
          v0.2.0
        </a>

        <button
          type="button"
          onClick={onOpenDocs}
          className="cursor-pointer !text-xs !py-1.5 !px-3 font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
        >
          <span>Docs</span>
        </button>

        <a
          className="field-github cursor-pointer !text-xs !py-1.5 !px-3"
          href="https://github.com/Aakhilshaik204/nava-agent"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
        >
          <Github size={15} />
          <span className="font-medium hidden sm:inline">GitHub</span>
        </a>

        <button
          className="field-download cursor-pointer !text-xs !py-1.5 !px-3.5"
          type="button"
          onClick={onOpenBlueprint}
        >
          <span className="font-medium">Blueprint</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <button
        className="field-menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={mobileMenuOpen}
        type="button"
      >
        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {mobileMenuOpen && (
        <nav className="field-mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, targetId]) => (
            <button
              key={targetId}
              onClick={() => scrollTo(targetId)}
              type="button"
              className="cursor-pointer flex items-center justify-between"
            >
              <span>{label}</span>
              <ChevronRight size={16} />
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDocs();
            }}
            className="cursor-pointer flex items-center justify-between text-indigo-600 font-semibold"
          >
            <span>Read Docs</span>
            <ArrowUpRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBlueprint();
            }}
            className="cursor-pointer flex items-center justify-between text-slate-700 font-semibold"
          >
            <span>Read blueprint</span>
            <ArrowUpRight size={16} />
          </button>
        </nav>
      )}
    </header>
  );
}
