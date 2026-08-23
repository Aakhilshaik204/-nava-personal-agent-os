import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  AlertOctagon, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Cpu, 
  Flame, 
  ShieldCheck
} from 'lucide-react';
import { SimulationAgent } from '../types';

export const SwarmSimulationFrame: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [isEmergencyHalted, setIsEmergencyHalted] = useState(false);
  const [haltLatencyMs, setHaltLatencyMs] = useState<number | null>(null);
  const [stage, setStage] = useState<1 | 2>(1);
  const [elapsedSec, setElapsedSec] = useState(14);
  const [consumedTokens, setConsumedTokens] = useState(18420);
  const [activeTab, setActiveTab] = useState<'agents' | 'budget' | 'locks' | 'receipt'>('agents');

  const [agents, setAgents] = useState<SimulationAgent[]>([
    {
      id: 'agent-4a7f',
      name: 'FinancialResearchAgent',
      role: 'Web & SEC Harvester',
      type: 'DYNAMIC',
      tools: ['browser.open', 'browser.extract', 'semantic.search'],
      status: 'RUNNING',
      progress: 68,
      currentAction: 'Extracting Q3 earnings breakdown & CapEx guidance...',
      tokensConsumed: 8420,
      stepsConsumed: 22,
      bytesProcessed: 482100,
      depth: 1,
    },
    {
      id: 'agent-9c12',
      name: 'DocExtractorAgent',
      role: 'PDF Vector & Table Parser',
      type: 'DYNAMIC',
      tools: ['filesystem.read', 'pdf.extract_tables', 'qdrant.upsert'],
      status: 'RUNNING',
      progress: 74,
      currentAction: 'Chunking 10-K tables -> Qdrant vector index (BM25)...',
      tokensConsumed: 6200,
      stepsConsumed: 18,
      bytesProcessed: 1240800,
      depth: 2,
    },
    {
      id: 'agent-3f81',
      name: 'ExecutiveSynthesisAgent',
      role: 'Artifact Aggregator',
      type: 'STATIC',
      tools: ['filesystem.write', 'diff.verify', 'receipt.generate'],
      status: 'IDLE',
      progress: 0,
      currentAction: 'Awaiting Stage 1 parallel artifact stream...',
      tokensConsumed: 3800,
      stepsConsumed: 8,
      bytesProcessed: 0,
      depth: 1,
    },
  ]);

  const [auditLogs, setAuditLogs] = useState<Array<{
    id: string;
    time: string;
    agent: string;
    action: string;
    risk: number;
    decision: string;
  }>>([
    {
      id: 'EV-1092',
      time: '14.2s',
      agent: 'DocExtractorAgent',
      action: 'qdrant.upsert',
      risk: 12,
      decision: 'ALLOW',
    },
    {
      id: 'EV-1091',
      time: '12.8s',
      agent: 'FinancialResearchAgent',
      action: 'browser.extract',
      risk: 18,
      decision: 'ALLOW',
    },
    {
      id: 'EV-1090',
      time: '10.1s',
      agent: 'AgentFactory',
      action: 'spawn_agent',
      risk: 15,
      decision: 'ALLOW',
    },
  ]);

  useEffect(() => {
    if (!isRunning || isEmergencyHalted) return;

    const interval = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
      setConsumedTokens((prev) => prev + Math.floor(Math.random() * 120 + 50));

      setAgents((prevAgents) => {
        return prevAgents.map((ag) => {
          if (ag.id === 'agent-4a7f') {
            const nextProg = Math.min(ag.progress + 3, 100);
            return {
              ...ag,
              progress: nextProg,
              status: nextProg >= 100 ? 'COMPLETED' : 'RUNNING',
              currentAction:
                nextProg >= 100
                  ? 'Completed extraction. Emitted Artifact #882.'
                  : 'Analyzing revenue CAGR and forward disclosures...',
            };
          }
          if (ag.id === 'agent-9c12') {
            const nextProg = Math.min(ag.progress + 2, 100);
            return {
              ...ag,
              progress: nextProg,
              status: nextProg >= 100 ? 'COMPLETED' : 'RUNNING',
              currentAction:
                nextProg >= 100
                  ? 'Vector ingestion complete. Ready for aggregation.'
                  : 'Computing BM25 hash tokens on page 34-39...',
            };
          }
          if (ag.id === 'agent-3f81' && stage === 2) {
            const nextProg = Math.min(ag.progress + 4, 100);
            return {
              ...ag,
              status: nextProg >= 100 ? 'COMPLETED' : 'RUNNING',
              progress: nextProg,
              currentAction:
                nextProg >= 100
                  ? 'Generated report. Emitted SHA-256 Receipt.'
                  : 'Writing structured Markdown to /workspace/report.md...',
            };
          }
          return ag;
        });
      });
    });

    return () => clearInterval(interval);
  }, [isRunning, isEmergencyHalted, stage]);

  useEffect(() => {
    const a1 = agents.find((a) => a.id === 'agent-4a7f');
    const a2 = agents.find((a) => a.id === 'agent-9c12');
    if (a1?.progress === 100 && a2?.progress === 100 && stage === 1) {
      setStage(2);
      setAgents((prev) =>
        prev.map((a) =>
          a.id === 'agent-3f81'
            ? {
                ...a,
                status: 'RUNNING',
                progress: 15,
                currentAction: 'Synthesizing 2 artifact streams into report.md...',
              }
            : a
        )
      );
    }
  }, [agents, stage]);

  const handleKillSwitch = () => {
    const startTime = performance.now();
    setIsRunning(false);
    setIsEmergencyHalted(true);
    const latency = Math.max(1.8, Math.round((performance.now() - startTime + 2.1) * 10) / 10);
    setHaltLatencyMs(latency);

    setAgents((prev) =>
      prev.map((a) => ({
        ...a,
        status: 'HALTED',
        currentAction: 'HALTED by Out-of-Band Kill Switch (Invariant #21).',
      }))
    );
  };

  const handleReset = () => {
    setIsEmergencyHalted(false);
    setHaltLatencyMs(null);
    setIsRunning(true);
    setStage(1);
    setElapsedSec(0);
    setConsumedTokens(4200);
    setAgents([
      {
        id: 'agent-4a7f',
        name: 'FinancialResearchAgent',
        role: 'Web & SEC Harvester',
        type: 'DYNAMIC',
        tools: ['browser.open', 'browser.extract'],
        status: 'RUNNING',
        progress: 15,
        currentAction: 'Initializing browser sandbox on SEC Edgar query...',
        tokensConsumed: 2100,
        stepsConsumed: 6,
        bytesProcessed: 42000,
        depth: 1,
      },
      {
        id: 'agent-9c12',
        name: 'DocExtractorAgent',
        role: 'PDF Vector & Table Parser',
        type: 'DYNAMIC',
        tools: ['filesystem.read', 'qdrant.upsert'],
        status: 'RUNNING',
        progress: 22,
        currentAction: 'Ingesting quarterly PDFs with Qdrant vector chunking...',
        tokensConsumed: 1900,
        stepsConsumed: 5,
        bytesProcessed: 180000,
        depth: 2,
      },
      {
        id: 'agent-3f81',
        name: 'ExecutiveSynthesisAgent',
        role: 'Artifact Aggregator',
        type: 'STATIC',
        tools: ['filesystem.write', 'receipt.generate'],
        status: 'IDLE',
        progress: 0,
        currentAction: 'Awaiting Stage 1 parallel artifact stream...',
        tokensConsumed: 200,
        stepsConsumed: 1,
        bytesProcessed: 0,
        depth: 1,
      },
    ]);
  };

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
      {/* Top Console Bar */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isEmergencyHalted
                ? 'bg-rose-500'
                : isRunning
                ? 'bg-emerald-500'
                : 'bg-amber-500'
            }`}
          />
          <span className="font-semibold text-slate-800">
            {isEmergencyHalted
              ? `HALTED (${haltLatencyMs}ms)`
              : isRunning
              ? 'RUNTIME ACTIVE'
              : 'PAUSED'}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">
            Stage {stage}: {stage === 1 ? 'Parallel Extraction' : 'Synthesis'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {!isEmergencyHalted && (
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-center gap-1 cursor-pointer"
            >
              {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleKillSwitch}
            disabled={isEmergencyHalted}
            className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
              isEmergencyHalted
                ? 'bg-rose-50 text-rose-700 border border-rose-200 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer active:scale-95'
            }`}
          >
            <AlertOctagon className="w-3 h-3" />
            <span>{isEmergencyHalted ? 'Frozen' : 'Emergency Stop'}</span>
          </button>
        </div>
      </div>

      {/* Goal Bar */}
      <div className="px-4 py-2.5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
        <div className="truncate text-slate-300">
          <span className="text-indigo-400 font-bold">GOAL: </span>
          <span>"Analyze Apple & Microsoft 10-K filings, compare CapEx growth, emit report."</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
          <span>Depth: 2/3</span>
          <span>•</span>
          <span>Tokens: {consumedTokens.toLocaleString()}</span>
        </div>
      </div>

      {/* Agents Row */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {agents.map((ag) => {
          const isCompleted = ag.status === 'COMPLETED';
          const isRunningState = ag.status === 'RUNNING';
          const isHalted = ag.status === 'HALTED';

          return (
            <div
              key={ag.id}
              className={`p-3.5 rounded-lg border text-xs transition-all ${
                isHalted
                  ? 'bg-rose-50/40 border-rose-200 text-slate-700'
                  : isRunningState
                  ? 'bg-white border-slate-300 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-slate-900 truncate">{ag.name}</div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {ag.type}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-2.5">
                <div
                  className={`h-full transition-all duration-300 ${
                    isHalted ? 'bg-rose-500' : isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${ag.progress}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-600 font-mono line-clamp-2 min-h-[32px]">
                {ag.currentAction}
              </p>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{ag.role}</span>
                <span>{ag.tokensConsumed} tok</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspector Tabs */}
      <div className="border-t border-slate-200 bg-slate-50/60">
        <div className="flex border-b border-slate-200 text-xs font-mono">
          {(['agents', 'budget', 'locks', 'receipt'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 uppercase font-medium transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-slate-900 border-b-2 border-slate-900 font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab === 'agents' && 'Audit Logs'}
              {tab === 'budget' && 'Task Budget'}
              {tab === 'locks' && 'Resource Locks'}
              {tab === 'receipt' && 'AI Receipt'}
            </button>
          ))}
        </div>

        <div className="p-3 bg-white text-xs font-mono">
          {activeTab === 'agents' && (
            <div className="space-y-1.5">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{log.time}</span>
                    <span className="font-semibold text-slate-800">{log.agent}</span>
                    <span>→ {log.action}</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                    {log.decision}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 text-[10px]">MAX DEPTH</div>
                <div className="font-bold text-slate-900">2 / 3</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 text-[10px]">TOKENS</div>
                <div className="font-bold text-slate-900">{consumedTokens.toLocaleString()} / 100k</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 text-[10px]">RETRIES</div>
                <div className="font-bold text-slate-900">0 / 5</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 text-[10px]">UPTIME</div>
                <div className="font-bold text-slate-900">{elapsedSec}s</div>
              </div>
            </div>
          )}

          {activeTab === 'locks' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-800 font-semibold">/workspace/earnings_report.md</span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px]">
                  EXCLUSIVE_WRITE (ExecutiveSynthesisAgent)
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-800 font-semibold">/data/sec_edgar/10k_filings/</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px]">
                  SHARED_READ (2 Subagents)
                </span>
              </div>
            </div>
          )}

          {activeTab === 'receipt' && (
            <div className="p-2 bg-slate-900 text-slate-200 rounded text-[11px] space-y-1">
              <div className="flex justify-between text-indigo-400">
                <span>AI Receipt #10428-SEC-Q3</span>
                <span>Risk: 12 (LOW)</span>
              </div>
              <div className="text-slate-400 truncate">
                SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
