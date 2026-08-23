import React, { useState } from 'react';
import { Terminal, ChevronRight, Copy, Check, Command, Sparkles, ArrowUpRight } from 'lucide-react';

interface DeveloperSurfacesProps {
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

export function DeveloperSurfaces({ onShowToast }: DeveloperSurfacesProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const commands = `pip install nava-os\npython nava_shell.py --local\nnava run "organize my project"`;
    try {
      await navigator.clipboard.writeText(commands);
      setCopied(true);
      onShowToast('Commands copied to clipboard', 'Ready to run in terminal.', 'success');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      onShowToast('Copy unavailable', 'Select the command sequence from the CLI panel.', 'warning');
    }
  };

  return (
    <section className="developer-section" id="developers">
      <div className="developer-heading">
        <p className="field-kicker">DEVELOPER SURFACES</p>
        <h2>
          Use the OS
          <br />
          from your own tools.
        </h2>
      </div>

      <div className="developer-grid">
        {/* Process Flow */}
        <div className="developer-process">
          <span>
            <Terminal size={13} />
            <span>local command</span>
          </span>
          <ChevronRight size={14} />
          <span className="developer-process-live">
            <i />
            <span>governed tool</span>
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
            <b>nava / local shell</b>
            <button type="button" onClick={handleCopy} className="cursor-pointer">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre>
            <span># start Nava locally</span>
            <br />
            <b>$</b> pip install nava-os
            <br />
            <b>$</b> python nava_shell.py --local
            <br />
            <b>$</b> nava run "organize my project"
            <br />
            <br />
            <em>✓ action gateway armed</em>
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
