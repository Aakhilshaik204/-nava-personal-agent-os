import React, { useState } from 'react';
import { Terminal, ChevronRight, Copy, Check, Command, Sparkles, ArrowUpRight } from 'lucide-react';

interface DeveloperSurfacesProps {
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

export function DeveloperSurfaces({ onShowToast }: DeveloperSurfacesProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const commands = `pip install nava-agent\nnava --help\nnava run "audit workspace security"`;
    try {
      await navigator.clipboard.writeText(commands);
      setCopied(true);
      onShowToast('Commands copied to clipboard', 'Ready to run in terminal: pip install nava-agent', 'success');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      onShowToast('Copy unavailable', 'Run: pip install nava-agent in your terminal.', 'warning');
    }
  };

  return (
    <section className="developer-section" id="developers">
      <div className="developer-heading">
        <p className="field-kicker">DEVELOPER SURFACES / CLI & MCP</p>
        <h2>
          Use the OS
          <br />
          from your terminal or tools.
        </h2>
      </div>

      <div className="developer-grid">
        {/* Process Flow */}
        <div className="developer-process">
          <span>
            <Terminal size={13} />
            <span>pip install nava-agent</span>
          </span>
          <ChevronRight size={14} />
          <span className="developer-process-live">
            <i />
            <span>governed 12-step gateway</span>
          </span>
          <ChevronRight size={14} />
          <span>scoped runtime</span>
          <ChevronRight size={14} />
          <span>portable skill</span>
        </div>

        {/* 1. CLI Surface */}
        <article className="cli-surface">
          <div className="cli-top">
            <span>
              <i />
              <i />
              <i />
            </span>
            <div className="flex items-center gap-1.5">
              <b>nava / terminal cli</b>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                v0.2.0 PyPI
              </span>
            </div>
            <button type="button" onClick={handleCopy} className="cursor-pointer" title="Copy CLI Commands">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre>
            <span># 1. Install terminal agent from PyPI</span>
            <br />
            <b>$</b> pip install nava-agent
            <br />
            <br />
            <span># 2. Inspect available commands & agents</span>
            <br />
            <b>$</b> nava --help
            <br />
            <br />
            <span># 3. Execute deterministic autonomous mission</span>
            <br />
            <b>$</b> nava run "audit workspace security"
            <br />
            <br />
            <em>✓ action gateway armed • 21 invariants enforced</em>
          </pre>
        </article>

        {/* 2. MCP Surface */}
        <article className="mcp-surface">
          <div className="mcp-top">
            <span className="network-badge">
              <Command size={15} />
              <i />
            </span>
            <span>MCP TOOL REGISTRY</span>
            <b>JSON-RPC 2.0</b>
          </div>
          <div className="mcp-tool">
            <span>github.create_pr</span>
            <i className="bg-amber-100 text-amber-800">APPROVAL</i>
          </div>
          <div className="mcp-tool">
            <span>filesystem.read</span>
            <i className="bg-emerald-100 text-emerald-800">ALLOW</i>
          </div>
          <div className="mcp-tool">
            <span>gmail.send</span>
            <i className="bg-red-100 text-red-800">HIGH RISK</i>
          </div>
          <p>
            Every tool declares a schema, permission, credential scope, risk level, and
            reversibility profile.
          </p>
        </article>

        {/* 3. Skill Surface */}
        <article className="skill-surface">
          <span className="skill-icon">
            <Sparkles size={20} />
          </span>
          <h3>Promote a proven workflow.</h3>
          <p>
            Dynamic work becomes a reusable <code>SKILL.md</code> only when the user promotes it.
            Learning never bypasses governance.
          </p>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() =>
              onShowToast('Skill promotion', 'Custom SKILL.md validation suite is active.')
            }
          >
            <span>Explore skills</span>
            <ArrowUpRight size={15} />
          </button>
        </article>
      </div>
    </section>
  );
}
