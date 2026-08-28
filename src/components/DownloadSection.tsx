import React from 'react';
import { Terminal, ArrowUpRight, ExternalLink } from 'lucide-react';

interface DownloadSectionProps {
  onOpenBlueprint: () => void;
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

export function DownloadSection({ onOpenBlueprint, onShowToast }: DownloadSectionProps) {
  return (
    <section className="download-section" id="downloads">
      <div className="download-field">
        <p className="field-kicker">NAVA DISTRIBUTION / LOCAL-FIRST BY DEFAULT</p>
        <h2>
          Take control
          <br />
          of your agent OS.
        </h2>
        <p>
          The terminal agent is available on PyPI (<code>pip install nava-agent</code>). Desktop UI and container releases are currently in development with the same local execution model, visible approvals, scoped credentials, and verifiable receipts.
        </p>

        <div className="download-actions flex flex-wrap items-center gap-4 mt-6">
          <button
            type="button"
            className="field-primary cursor-pointer flex items-center gap-2"
            onClick={() => {
              navigator.clipboard.writeText('pip install nava-agent');
              onShowToast('Copied pip command', 'Run "pip install nava-agent" in your terminal.', 'success');
            }}
          >
            <Terminal size={17} />
            <span>pip install nava-agent</span>
          </button>
          
          <a
            href="https://pypi.org/project/nava-agent/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center gap-1.5 text-slate-300 hover:text-white font-medium text-sm transition-colors"
          >
            <span>View on PyPI (v0.3.1)</span>
            <ExternalLink size={14} />
          </a>

          <button
            type="button"
            className="cursor-pointer flex items-center gap-1.5 text-slate-300 hover:text-white font-medium text-sm transition-colors"
            onClick={onOpenBlueprint}
          >
            <span>Architecture blueprint</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
