import React, { useState } from 'react';
import {
  Activity,
  LockKeyhole,
  Database,
  Check,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileKey,
  Layers,
  Sparkles,
  Sliders,
  Terminal,
  ShieldAlert,
  Clock,
  Key,
} from 'lucide-react';

interface ProductSurfacesProps {
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
  onOpenBlueprint: () => void;
}

interface PipelineStage {
  step: string;
  name: string;
  code: string;
  description: string;
  invariant: string;
}

const GATEWAY_PIPELINE_STAGES: PipelineStage[] = [
  {
    step: '01',
    name: 'Identity & Origin Validation',
    code: 'verify_signature(caller_id, parent_nonce)',
    description: 'Ensures mutation request originates from an authentic, registered sub-agent.',
    invariant: 'Invariant 01: Gateway-Only Mutation',
  },
  {
    step: '02',
    name: 'Strict Schema Type Check',
    code: 'validate_json_schema(tool.args, tool.manifest)',
    description: 'Enforces rigorous typing; rejects malformed or unexpected arguments.',
    invariant: 'Invariant 01: Gateway-Only Mutation',
  },
  {
    step: '03',
    name: 'Hierarchical Scope Confinement',
    code: 'scope(child) ⊆ scope(parent) ∩ policy',
    description: 'Agents can reduce their authority, never expand it.',
    invariant: 'Invariant 02: Non-Increasing Scope',
  },
  {
    step: '04',
    name: 'Declarative Policy Evaluation',
    code: 'decision = eval_policy(action, user_rules)',
    description: 'Deterministic rule engine decides ALLOW / PROMPT / BLOCK.',
    invariant: 'Invariant 03: Deterministic Decision',
  },
  {
    step: '05',
    name: 'Mathematical Risk Scoring',
    code: 'risk = max(tool.risk, path.risk, blast_radius)',
    description: 'Calculates upper-bound blast radius on system and network resources.',
    invariant: 'Invariant 12: Deterministic Risk Scoring',
  },
  {
    step: '06',
    name: 'Token & Compute Quota Check',
    code: 'tokens_used + estimated ≤ quota_cap',
    description: 'Prevents resource exhaustion or unexpected runaway costs.',
    invariant: 'Invariant 18: Resource Quota Ceiling',
  },
  {
    step: '07',
    name: 'Exclusive Resource Locking',
    code: 'acquire_write_lock(target_path, timeout=5s)',
    description: 'Prevents race conditions; parallel agents cannot overwrite shared files.',
    invariant: 'Invariant 04: Write-Exclusive Locks',
  },
  {
    step: '08',
    name: 'Ephemeral Credential Broker',
    code: 'lease_token(tool, ttl=60s, model_view=NULL)',
    description: 'Injects short-lived credentials directly into tool process without exposing to LLM context.',
    invariant: 'Invariant 05: Credential Non-Exposure',
  },
  {
    step: '09',
    name: 'Human Authority Sign-Off Gate',
    code: 'if risk >= HIGH: wait_human_approval()',
    description: 'High-impact mutations pause for explicit out-of-band user authorization.',
    invariant: 'Invariant 06: Human Authority Gate',
  },
  {
    step: '10',
    name: 'Cryptographic Receipt Ledger',
    code: 'hash = SHA256(action_data || prev_hash)',
    description: 'Generates immutable signed receipt committed to append-only local SQLite ledger.',
    invariant: 'Invariant 07: Receipts and Ledger',
  },
];

interface ToolRequest {
  id: string;
  tool: string;
  args: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: string;
  passThroughStage: number; // up to which stage it reaches or stops
  outcome: 'ALLOWED' | 'PROMPTED' | 'BLOCKED';
  outcomeReason: string;
}

const SAMPLE_REQUESTS: ToolRequest[] = [
  {
    id: 'req_read',
    tool: 'filesystem.read_file',
    args: 'path: "src/profile/bio.md"',
    risk: 'LOW',
    type: 'Read-Only Local',
    passThroughStage: 10,
    outcome: 'ALLOWED',
    outcomeReason: 'Safe read-only operation inside pre-approved workspace bounds.',
  },
  {
    id: 'req_git',
    tool: 'github.create_pull_request',
    args: 'repo: "nava-os/core", branch: "feat/ffi"',
    risk: 'HIGH',
    type: 'External Mutation',
    passThroughStage: 9,
    outcome: 'PROMPTED',
    outcomeReason: 'External repository mutation requires explicit human sign-off before dispatch.',
  },
  {
    id: 'req_delete',
    tool: 'filesystem.delete_directory',
    args: 'path: "/home/user/projects/legacy"',
    risk: 'CRITICAL',
    type: 'Destructive Mutation',
    passThroughStage: 9,
    outcome: 'PROMPTED',
    outcomeReason: 'Irreversible file deletion triggers high-risk double confirmation gate.',
  },
  {
    id: 'req_gmail',
    tool: 'gmail.send_bulk_invitations',
    args: 'recipients: 150, template: "invite.html"',
    risk: 'CRITICAL',
    type: 'Un-scoped Network Broadcast',
    passThroughStage: 4,
    outcome: 'BLOCKED',
    outcomeReason: 'Policy Engine rejected: Sub-agent scope restricted from bulk mail broadcast.',
  },
  {
    id: 'req_sqlite',
    tool: 'sqlite.backup_database',
    args: 'target: "~/.nava/backups/ledger_2026.db"',
    risk: 'LOW',
    type: 'Local Persistence',
    passThroughStage: 10,
    outcome: 'ALLOWED',
    outcomeReason: 'Automated local backup verified and committed with cryptographic receipt.',
  },
];

export function ProductSurfaces({ onShowToast, onOpenBlueprint }: ProductSurfacesProps) {
  const [activeTab, setActiveTab] = useState<'runtime' | 'gateway' | 'memory'>('gateway');

  // Gateway Simulator State
  const [selectedRequestId, setSelectedRequestId] = useState('req_git');
  const [evaluating, setEvaluating] = useState(false);
  const [currentEvalStep, setCurrentEvalStep] = useState(10);

  const selectedRequest = SAMPLE_REQUESTS.find((r) => r.id === selectedRequestId) ?? SAMPLE_REQUESTS[0];

  const handleRunEvaluation = () => {
    setEvaluating(true);
    setCurrentEvalStep(1);

    const interval = setInterval(() => {
      setCurrentEvalStep((prev) => {
        if (prev >= selectedRequest.passThroughStage) {
          clearInterval(interval);
          setEvaluating(false);
          onShowToast(
            `Gateway Decision: ${selectedRequest.outcome}`,
            `${selectedRequest.tool} evaluated through 10-point pipeline.`,
            selectedRequest.outcome === 'ALLOWED' ? 'success' : selectedRequest.outcome === 'PROMPTED' ? 'warning' : 'info'
          );
          return selectedRequest.passThroughStage;
        }
        return prev + 1;
      });
    }, 240);
  };

  return (
    <>
      {/* Statement Section */}
      <section className="statement-section bg-white" id="gateway">
        <div className="statement-copy">
          <p className="field-kicker">ONE CONTROL PLANE / BLUEPRINT §12</p>
          <h2>
            Every action gets a route,
            <br />
            a limit, and a record.
          </h2>
        </div>

        <div className="statement-side">
          <p>
            Nava’s Action Gateway is the singular route from intent to mutation. The system evaluates
            identity, schema, scope, declarative policy, mathematical risk score, quota, write locks,
            ephemeral credentials, and human authority gates—every time.
          </p>
          <button
            type="button"
            className="cursor-pointer flex items-center gap-1.5 font-semibold text-sm text-slate-900 hover:text-indigo-600 transition-colors"
            onClick={() => setActiveTab('gateway')}
          >
            <span>Inspect 10-Point Action Gateway</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      {/* Product Surfaces Navigation Tabs */}
      <section className="product-section bg-white" aria-label="NAVA product surfaces">
        <div className="product-tabs !bg-white !border-b !border-slate-200 mb-6">
          <button
            type="button"
            className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === 'gateway'
                ? 'text-slate-950 border-b-2 border-slate-950 -mb-px'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('gateway')}
          >
            <LockKeyhole size={14} />
            <span>Action Gateway (10-Point Pipeline)</span>
          </button>
          <button
            type="button"
            className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === 'runtime'
                ? 'text-slate-950 border-b-2 border-slate-950 -mb-px'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('runtime')}
          >
            <Activity size={14} />
            <span>Agent Queue & Traces</span>
          </button>
          <button
            type="button"
            className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === 'memory'
                ? 'text-slate-950 border-b-2 border-slate-950 -mb-px'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('memory')}
          >
            <Database size={14} />
            <span>Memory Trust & AI Twin</span>
          </button>
        </div>

        {/* Tab 1: Deep Dive 10-Point Action Gateway (Pure Minimalist White Theme) */}
        {activeTab === 'gateway' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            {/* Header & Simulator Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  Deterministic Pipeline Visualizer
                </span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight mt-0.5">
                  10-Stage Verification Pipeline
                </h3>
              </div>

              {/* Minimal Request selector pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 mr-1 font-medium">Select Request:</span>
                {SAMPLE_REQUESTS.map((req) => (
                  <button
                    key={req.id}
                    type="button"
                    onClick={() => {
                      setSelectedRequestId(req.id);
                      setCurrentEvalStep(req.passThroughStage);
                    }}
                    className={`px-3 py-1.5 text-xs rounded-md font-mono cursor-pointer transition-all ${
                      selectedRequestId === req.id
                        ? 'bg-slate-950 text-white font-medium shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {req.tool}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleRunEvaluation}
                  disabled={evaluating}
                  className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-white font-medium text-xs rounded-md cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs ml-1"
                >
                  <Play size={12} fill="currentColor" />
                  <span>{evaluating ? 'Evaluating...' : 'Run Pipeline'}</span>
                </button>
              </div>
            </div>

            {/* Active Request Details Bar */}
            <div className="my-5 p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/90 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="p-1.5 bg-white border border-slate-200 rounded text-slate-700">
                  <Terminal size={14} />
                </span>
                <div>
                  <b className="text-slate-950 font-mono">{selectedRequest.tool}</b>
                  <span className="text-slate-500 font-mono ml-2">({selectedRequest.args})</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-slate-500">Risk:</span>
                <span
                  className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold border ${
                    selectedRequest.risk === 'CRITICAL'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : selectedRequest.risk === 'HIGH'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {selectedRequest.risk}
                </span>

                <span className="text-slate-500 ml-1.5">Decision:</span>
                <span
                  className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-semibold text-white ${
                    selectedRequest.outcome === 'ALLOWED'
                      ? 'bg-slate-950'
                      : selectedRequest.outcome === 'PROMPTED'
                      ? 'bg-amber-600'
                      : 'bg-rose-600'
                  }`}
                >
                  {selectedRequest.outcome}
                </span>
              </div>
            </div>

            {/* Minimalist White 10-Point Pipeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 my-5">
              {GATEWAY_PIPELINE_STAGES.map((stage, idx) => {
                const stageNum = idx + 1;
                const isPassed = currentEvalStep > stageNum;
                const isCurrent = currentEvalStep === stageNum;
                const isHaltingHere = currentEvalStep === stageNum && selectedRequest.outcome !== 'ALLOWED';

                return (
                  <div
                    key={stage.step}
                    className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                      isHaltingHere
                        ? selectedRequest.outcome === 'PROMPTED'
                          ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                          : 'bg-rose-50/50 border-rose-300 shadow-xs'
                        : isCurrent
                        ? 'bg-white border-slate-950 ring-1 ring-slate-950 shadow-xs'
                        : isPassed
                        ? 'bg-slate-50/40 border-slate-200 hover:border-slate-300'
                        : 'bg-white border-slate-200/70 text-slate-400 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-semibold text-slate-400">
                          {stage.step}
                        </span>
                        {isPassed && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600" title="Stage passed" />
                        )}
                        {isHaltingHere && selectedRequest.outcome === 'PROMPTED' && (
                          <AlertTriangle size={14} className="text-amber-600" />
                        )}
                        {isHaltingHere && selectedRequest.outcome === 'BLOCKED' && (
                          <XCircle size={14} className="text-rose-600" />
                        )}
                        {!isPassed && !isHaltingHere && (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        )}
                      </div>

                      <b className="text-xs font-bold text-slate-950 leading-tight block mb-1">
                        {stage.name}
                      </b>
                      <code className="text-[10px] block font-mono text-slate-600 bg-slate-100/70 px-1.5 py-0.5 rounded my-1 truncate border border-slate-200/50">
                        {stage.code}
                      </code>
                      <p className="text-[11px] text-slate-600 leading-snug mt-1">
                        {stage.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                      {stage.invariant.split(':')[0]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Evaluation Result Summary Box (Pure White & Clean) */}
            <div className="mt-5 p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg border ${
                    selectedRequest.outcome === 'ALLOWED'
                      ? 'bg-white text-emerald-700 border-slate-200 shadow-xs'
                      : selectedRequest.outcome === 'PROMPTED'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {selectedRequest.outcome === 'ALLOWED' ? (
                    <ShieldCheck size={20} />
                  ) : selectedRequest.outcome === 'PROMPTED' ? (
                    <AlertTriangle size={20} />
                  ) : (
                    <ShieldAlert size={20} />
                  )}
                </div>
                <div>
                  <span className="font-bold text-slate-950 text-sm block">
                    {selectedRequest.outcome === 'ALLOWED'
                      ? 'Mutation Permitted & Receipt Generated'
                      : selectedRequest.outcome === 'PROMPTED'
                      ? 'Action Paused for Explicit Human Authorization'
                      : 'Action Blocked by Policy Confinement'}
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {selectedRequest.outcomeReason}
                  </p>
                  {selectedRequest.outcome === 'ALLOWED' && (
                    <div className="mt-1 font-mono text-[10px] text-slate-500 flex items-center gap-1.5">
                      <span>Receipt: SHA256:4b91f043e8c...2026_LEGAL</span>
                      <span>• Recorded in local SQLite audit log</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="self-end md:self-center px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 rounded-lg text-xs font-semibold cursor-pointer border border-slate-200 shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                onClick={onOpenBlueprint}
              >
                <span>Read §12 Gateway Spec</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Agent Runtime & Queue (White Minimalist) */}
        {activeTab === 'runtime' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <span className="font-mono text-xs text-slate-500 font-semibold uppercase">MISSION_QUEUE / 04 ACTIVE</span>
              <b className="text-xs font-semibold text-slate-950">3 agents parallelized</b>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-mono font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    research_company
                  </span>
                  <b className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">RUNNING</b>
                  <em className="text-slate-400 font-mono not-italic">01:18</em>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-mono font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    extract_resume
                  </span>
                  <b className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">RUNNING</b>
                  <em className="text-slate-400 font-mono not-italic">00:42</em>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-mono font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    match_profile
                  </span>
                  <b className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">RUNNING</b>
                  <em className="text-slate-400 font-mono not-italic">00:15</em>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs opacity-75">
                  <span className="font-mono font-medium text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    draft_brief
                  </span>
                  <b className="font-semibold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded">WAITING</b>
                  <em className="text-slate-400 text-[11px] not-italic">waits for synthesis lock</em>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between text-xs">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold block mb-2">LIVE MISSION TRACE</span>
                  <p className="text-slate-700 leading-relaxed">
                    Identified 3 interview themes, 2 recent company initiatives, 1 verified profile
                    match, and 0 unresolved scope boundary violations.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg mt-4 font-medium">
                  <Check size={15} />
                  <span>Evidence cryptographically attached to mission trace</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Memory Trust & AI Twin (White Minimalist) */}
        {activeTab === 'memory' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="font-mono text-xs text-slate-500 uppercase font-semibold block">AI TWIN / FOUR-TIER MEMORY TRUST</span>
                <b className="text-slate-950 text-sm">Facts earn their level.</b>
              </div>
              <button
                type="button"
                className="cursor-pointer flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                onClick={() =>
                  onShowToast(
                    'Profile Reconciliation',
                    '3 verified facts in active profile, 1 conflict awaiting human adjudication.',
                    'info'
                  )
                }
              >
                <span>Review claims</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-col justify-between">
                <div>
                  <span className="text-slate-500 block mb-1">Preferred meeting style</span>
                  <b className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mb-2">VERIFIED (L4)</b>
                </div>
                <small className="text-slate-500 text-[11px] block border-t border-slate-200 pt-2 mt-2">Source: explicit user confirmation</small>
              </div>

              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl text-xs flex flex-col justify-between">
                <div>
                  <span className="text-slate-700 block mb-1">Primary calendar timezone</span>
                  <b className="font-mono font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded border border-amber-200 inline-block mb-2">CONFLICT DETECTED</b>
                </div>
                <small className="text-amber-800 text-[11px] block border-t border-amber-200/60 pt-2 mt-2">New flight booking differs from profile</small>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-col justify-between">
                <div>
                  <span className="text-slate-500 block mb-1">Project workspace policy</span>
                  <b className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mb-2">VERIFIED (L4)</b>
                </div>
                <small className="text-slate-500 text-[11px] block border-t border-slate-200 pt-2 mt-2">Source: local workspace config</small>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
