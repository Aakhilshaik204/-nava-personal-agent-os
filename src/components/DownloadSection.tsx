import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';

interface DownloadSectionProps {
  onOpenBlueprint: () => void;
  onShowToast: (msg: string, desc?: string) => void;
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
          Desktop and container releases will ship with the same local execution model, visible
          approvals, scoped credentials, and verifiable action receipts.
        </p>

        <div className="download-actions flex items-center gap-4 mt-6">
          <button
            type="button"
            className="field-primary cursor-pointer flex items-center gap-2"
            onClick={() =>
              onShowToast(
                'Desktop download',
                'Download binaries for macOS, Linux, and Windows are queued.'
              )
            }
          >
            <Download size={17} />
            <span>Download Nava</span>
          </button>
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
