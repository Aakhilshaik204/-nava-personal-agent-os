import React from 'react';
import { CheckCircle2, Milestone } from 'lucide-react';

interface PhaseItem {
  phase: number;
  title: string;
  focus: string;
  status: 'COMPLETED' | 'IN_PROGRESS';
}

export const RoadmapSection: React.FC = () => {
  const phases: PhaseItem[] = [
    { phase: 0, title: 'Core Schemas & Gateway', focus: 'Action Gateway skeleton & append-only audit ledger.', status: 'COMPLETED' },
    { phase: 1, title: 'MCP Protocol & Tool Registry', focus: 'JSON-RPC 2.0 filesystem, shell, and web sandboxes.', status: 'COMPLETED' },
    { phase: 2, title: 'Deterministic Risk Engine', focus: 'Additive risk evaluation & single HITL approval UI.', status: 'COMPLETED' },
    { phase: 3, title: '4-Tier Memory & AI Twin', focus: 'Qdrant/BM25 hybrid RAG & memory trust gate.', status: 'COMPLETED' },
    { phase: 4, title: 'Dynamic Agent Swarms', focus: 'Subagent composition with permission intersections.', status: 'COMPLETED' },
    { phase: 5, title: 'Concurrency & Locking', focus: 'Shared read & exclusive write lock manager.', status: 'COMPLETED' },
    { phase: 6, title: 'Credential Vault', focus: 'Short-lived 5-minute scoped tokens (zero LLM exposure).', status: 'COMPLETED' },
    { phase: 7, title: 'Rollbacks & Undo', focus: 'State snapshots & compensating action pipeline.', status: 'COMPLETED' },
    { phase: 8, title: 'Background Daemons', focus: 'Scheduled tasks & typed agent-to-agent event bus.', status: 'COMPLETED' },
    { phase: 9, title: 'Computer Use & Surfaces', focus: 'Sandboxed browser & local terminal agent.', status: 'COMPLETED' },
    { phase: 10, title: 'CI Adversarial Hardening', focus: 'Automated test suite asserting all 21 invariants.', status: 'COMPLETED' },
  ];

  return (
    <section id="roadmap" className="py-20 px-4 md:px-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
          Implementation Roadmap
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          11-phase architecture specification from core schemas to CI invariant verification.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {phases.map((p) => (
          <div
            key={p.phase}
            className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-1">
                <span>Phase {p.phase}</span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                  {p.status}
                </span>
              </div>
              <div className="font-display font-bold text-slate-900 text-sm">
                {p.title}
              </div>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                {p.focus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
