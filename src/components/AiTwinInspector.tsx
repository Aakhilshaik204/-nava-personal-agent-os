import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';

interface ProfileMemoryItem {
  id: string;
  category: string;
  fact: string;
  trustLevel: 'VERIFIED' | 'UNVERIFIED';
  source: string;
}

export const AiTwinInspector: React.FC = () => {
  const [memories, setMemories] = useState<ProfileMemoryItem[]>([
    {
      id: 'MEM-001',
      category: 'Coding Standard',
      fact: 'TypeScript strict mode with Tailwind CSS utility classes.',
      trustLevel: 'VERIFIED',
      source: 'User explicit instruction',
    },
    {
      id: 'MEM-002',
      category: 'Trusted Contact',
      fact: 'sarah.chen@internal.corp has verified collaboration status.',
      trustLevel: 'VERIFIED',
      source: 'HITL confirmation',
    },
    {
      id: 'MEM-003',
      category: 'Inferred Schedule',
      fact: 'Flag outbound tasks scheduled after 20:00 local time.',
      trustLevel: 'UNVERIFIED',
      source: 'Inferred from local audit frequency',
    },
  ]);

  const handleApprove = (id: string) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, trustLevel: 'VERIFIED', source: 'User explicitly confirmed' } : m
      )
    );
  };

  const handleReject = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <section className="py-12 px-4 md:px-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
            AI Twin & Memory Provenance Gate
          </h2>
          <p className="text-slate-600 text-xs mt-0.5">
            Retrieved content can never silently overwrite Profile Memory. Only user confirmation grants VERIFIED status (Invariant #20).
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 self-start sm:self-auto">
          Provenance Boundary Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {memories.map((mem) => (
          <div
            key={mem.id}
            className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-slate-500">{mem.category}</span>
                <span
                  className={`px-1.5 py-0.5 rounded font-semibold ${
                    mem.trustLevel === 'VERIFIED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {mem.trustLevel}
                </span>
              </div>
              <p className="text-slate-800 font-medium leading-relaxed">
                {mem.fact}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="truncate max-w-[140px]">{mem.source}</span>
              {mem.trustLevel === 'UNVERIFIED' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleApprove(mem.id)}
                    className="px-1.5 py-0.5 bg-slate-900 text-white rounded text-[10px] cursor-pointer"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => handleReject(mem.id)}
                    className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] cursor-pointer hover:bg-slate-200"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
