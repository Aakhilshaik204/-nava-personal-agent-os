import React, { useState } from 'react';
import { 
  GitMerge, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Layers, 
  Cpu, 
  Terminal, 
  Check, 
  AlertCircle,
  TrendingDown,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ParallelSwarmSectionProps {
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

interface SwarmStage {
  id: number;
  badge: string;
  badgeColor: string;
  name: string;
  type: 'parallel' | 'barrier' | 'validation';
  durationEst: string;
  concurrencyModel: string;
  description: string;
  agents: {
    name: string;
    role: string;
    target: string;
    status: 'completed' | 'active' | 'waiting';
    tools: string[];
    lockHeld: string;
  }[];
}

const SWARM_STAGES: SwarmStage[] = [
  {
    id: 1,
    badge: '[STAGE 1: PARALLEL]',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    name: 'Concurrent Discovery & AST Auditing',
    type: 'parallel',
    durationEst: '4.2s (vs 14.8s sequential)',
    concurrencyModel: 'Managed Thread Pool (3 concurrent workers)',
    description: '3 independent subagents execute simultaneously across web APIs and local code ASTs. Shared read locks granted.',
    agents: [
      {
        name: 'WebResearchAgent-Alpha',
        role: 'RFC Specification Ingestion',
        target: 'rfc9110.ietf.org/spec',
        status: 'completed',
        tools: ['browser.fetch', 'dom.extract'],
        lockHeld: 'SHARED_READ(cache_spec)',
      },
      {
        name: 'WebResearchAgent-Beta',
        role: 'CVE Database Cross-Check',
        target: 'nvd.nist.gov/vuln/cve-2026',
        status: 'completed',
        tools: ['http.get', 'rag.embed'],
        lockHeld: 'SHARED_READ(cve_db)',
      },
      {
        name: 'CodeAuditAgent',
        role: 'Static AST & Linter Analysis',
        target: 'src/auth/jwt_provider.ts',
        status: 'completed',
        tools: ['filesystem.read', 'ast.parse'],
        lockHeld: 'SHARED_READ(src/auth/)',
      },
    ],
  },
  {
    id: 2,
    badge: '[STAGE 2: BARRIER / SYNTHESIS]',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    name: 'Stage-Gated Synthesis & Patch Construction',
    type: 'barrier',
    durationEst: '3.1s',
    concurrencyModel: 'Single Authoritative Executor (Exclusive Write Lock)',
    description: 'Waits for all Stage 1 outputs to settle at the barrier gate. Acquires exclusive write lock on filesystem to prevent collisions.',
    agents: [
      {
        name: 'CodingAgent-Prime',
        role: 'Unified Patch & Deliverable Synthesizer',
        target: 'src/auth/jwt_provider.ts (diff)',
        status: 'active',
        tools: ['filesystem.diff', 'patch.apply'],
        lockHeld: 'EXCLUSIVE_WRITE(src/auth/jwt_provider.ts)',
      },
    ],
  },
  {
    id: 3,
    badge: '[STAGE 3: VALIDATION]',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    name: 'Cryptographic Diff & Automated Invariant CI',
    type: 'validation',
    durationEst: '1.8s',
    concurrencyModel: 'Sandboxed Test Runner & AST Verifier',
    description: 'Executes automated regression unit tests, generates cryptographic receipt, and writes to immutable audit ledger.',
    agents: [
      {
        name: 'VerifierAgent',
        role: 'Regression Test & AST Validator',
        target: 'test/auth.test.ts (21 Invariants)',
        status: 'waiting',
        tools: ['test.run', 'audit.append_receipt'],
        lockHeld: 'SHARED_READ(test/)',
      },
    ],
  },
];

export function ParallelSwarmSection({ onShowToast }: ParallelSwarmSectionProps) {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeStage = SWARM_STAGES.find((s) => s.id === activeStageId) || SWARM_STAGES[0];

  const handleNextStage = () => {
    setActiveStageId((prev) => (prev < 3 ? prev + 1 : 1));
  };

  return (
    <section id="parallel-swarms" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[11px] font-mono font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              [PARALLEL SWARM ORCHESTRATION]
            </span>
            <span className="text-xs font-mono text-slate-400">INVARIANT #04 & #07</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Stage-Gated Swarm Orchestration with Native Concurrency
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Complex goals are automatically decomposed into topological dependency stages. Independent sub-goals execute simultaneously across a managed thread pool, slashing latency by up to <strong className="text-slate-900 font-semibold">70%</strong> while pessimistic locks prevent race conditions.
          </p>
        </div>

        {/* Latency & Metric Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Latency Reduction</span>
              <div className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-1.5 mt-0.5">
                <TrendingDown className="w-5 h-5 text-emerald-600" />
                <span>-70.2% Latency</span>
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-semibold">
              9.1s vs 31.4s
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Concurrency Model</span>
              <div className="text-sm sm:text-base font-bold text-slate-950 mt-0.5">
                Thread-Safe Locks
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded font-medium">
              Read / Write Split
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Failure Isolation</span>
              <div className="text-sm sm:text-base font-bold text-slate-950 mt-0.5">
                Barrier Rollbacks
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-1 bg-slate-200/80 text-slate-700 rounded font-medium">
              Zero Spillover
            </span>
          </div>
        </div>

        {/* Live Stage Graph & Thread Visualizer */}
        <div className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6">
          {/* Stage Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div className="flex items-center gap-2">
              <GitMerge className="w-4 h-4 text-indigo-600" />
              <span className="font-bold text-sm text-slate-900">
                Topological Execution Graph
              </span>
            </div>

            {/* Interactive Stage Selector */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              {SWARM_STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStageId(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeStageId === s.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  Stage {s.id}: {s.type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Overview Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded border ${activeStage.badgeColor}`}>
                    {activeStage.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Est. Duration: {activeStage.durationEst}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {activeStage.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleNextStage}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer self-start sm:self-center"
              >
                <span>Advance Stage</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeStage.description}
            </p>

            {/* Subagent Thread Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {activeStage.agents.map((agent, idx) => (
                <div
                  key={agent.name}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400">Thread #{idx + 1}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                        agent.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : agent.status === 'active'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {agent.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 truncate">{agent.name}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{agent.role}</div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-[11px] font-mono">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[10px] text-slate-400">Target:</span>
                      <span className="text-slate-800 truncate max-w-[120px]">{agent.target}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[10px] text-slate-400">Lock:</span>
                      <span className="text-indigo-600 font-semibold truncate max-w-[140px]">{agent.lockHeld}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concurrency Invariant Footnote */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Invariant #7:</strong> Pessimistic lock manager serializes all mutating operations at barrier stages.
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 shrink-0">
              ZERO SHARED-WRITE HAZARDS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
