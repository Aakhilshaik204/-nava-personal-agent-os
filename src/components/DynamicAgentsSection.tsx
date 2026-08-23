import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Key, 
  Trash2, 
  Cpu, 
  ArrowRight, 
  Check, 
  Copy, 
  Lock, 
  Sparkles, 
  Code2, 
  Clock,
  Layers,
  Terminal,
  ChevronRight
} from 'lucide-react';

interface DynamicAgentsSectionProps {
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

interface AgentGoalPreset {
  id: string;
  name: string;
  role: string;
  goal: string;
  requestedTools: string[];
  maxTokens: string;
  ttl: string;
  dedupHash: string;
  scopeFormula: string;
  derivedScope: string[];
  specJson: string;
}

const PRESETS: AgentGoalPreset[] = [
  {
    id: 'cve-audit',
    name: 'CVE Vulnerability Auditor',
    role: 'SecurityAnalystAgent',
    goal: 'Audit src/auth/jwt.ts against known CVE-2026 patterns and generate patch.',
    requestedTools: ['filesystem.read', 'ast.parse', 'patch.generate', 'network.raw_socket'],
    maxTokens: '15,000 tokens',
    ttl: '120 seconds (ephemeral)',
    dedupHash: 'sha256:7f83b169a2e8c049d9c...08a2',
    scopeFormula: 'child_scope = parent_scope (FS:src/auth/) ∩ requested ∩ policy',
    derivedScope: ['FS:read(src/auth/*)', 'AST:parse()', 'PATCH:propose()'],
    specJson: `{
  "agent_id": "dyn_cve_auditor_9f4",
  "role": "SecurityAnalystAgent",
  "dedup_hash": "sha256:7f83b169a2e8c049d9c...08a2",
  "parent_agent_id": "root_orchestrator",
  "spawn_depth": 1, // MAX_DEPTH <= 3
  "inherited_scope": [
    "filesystem:read:src/auth/**",
    "ast:parse",
    "patch:propose"
  ],
  "denied_tools": ["network.raw_socket"], // Blocked by policy
  "token_ceiling": 15000,
  "ttl_seconds": 120,
  "auto_teardown": true
}`,
  },
  {
    id: 'typst-docs',
    name: 'Typst Spec Synthesizer',
    role: 'DocumentSynthesizerAgent',
    goal: 'Compile system invariant proof logs into formatted Typst PDF deliverable.',
    requestedTools: ['filesystem.read', 'typst.compile', 'artifacts.write', 'shell.sudo'],
    maxTokens: '25,000 tokens',
    ttl: '90 seconds (ephemeral)',
    dedupHash: 'sha256:3a91c7849e01df22b8f...4e19',
    scopeFormula: 'child_scope = parent_scope (Tasks/Artifacts) ∩ requested ∩ policy',
    derivedScope: ['FS:read(tasks/audit/*)', 'TYPST:compile()', 'ARTIFACTS:write(dist/)'],
    specJson: `{
  "agent_id": "dyn_typst_synth_2b1",
  "role": "DocumentSynthesizerAgent",
  "dedup_hash": "sha256:3a91c7849e01df22b8f...4e19",
  "parent_agent_id": "root_orchestrator",
  "spawn_depth": 2,
  "inherited_scope": [
    "filesystem:read:tasks/audit/**",
    "typst:compile",
    "artifacts:write:dist/**"
  ],
  "denied_tools": ["shell.sudo"], // Blocked by invariant #2
  "token_ceiling": 25000,
  "ttl_seconds": 90,
  "auto_teardown": true
}`,
  },
  {
    id: 'parallel-research',
    name: 'Multi-Source Fact Synthesizer',
    role: 'DeepResearchAgent',
    goal: 'Scrape RFC 9110 specification and synthesize header cache invariants.',
    requestedTools: ['browser.headless_fetch', 'dom.extract_text', 'rag.embed_chunks', 'system.reboot'],
    maxTokens: '40,000 tokens',
    ttl: '180 seconds (ephemeral)',
    dedupHash: 'sha256:d82e1189c4501a39f67...90bb',
    scopeFormula: 'child_scope = parent_scope (Network:RFC) ∩ requested ∩ policy',
    derivedScope: ['BROWSER:fetch(rfc-editor.org)', 'DOM:extract()', 'RAG:embed()'],
    specJson: `{
  "agent_id": "dyn_deep_research_4c7",
  "role": "DeepResearchAgent",
  "dedup_hash": "sha256:d82e1189c4501a39f67...90bb",
  "parent_agent_id": "root_orchestrator",
  "spawn_depth": 1,
  "inherited_scope": [
    "browser:fetch:https://www.rfc-editor.org/**",
    "dom:extract",
    "rag:embed"
  ],
  "denied_tools": ["system.reboot"], // Blocked by invariant #2
  "token_ceiling": 40000,
  "ttl_seconds": 180,
  "auto_teardown": true
}`,
  },
];

const PIPELINE_STEPS = [
  {
    num: '01',
    label: 'Goal Decomposition',
    desc: 'Goal is parsed into atomic sub-tasks with strict tool & context requirements.',
  },
  {
    num: '02',
    label: 'Spec Compilation',
    desc: 'AgentSpec is compiled with normalized role, tools, and deduplication SHA-256.',
  },
  {
    num: '03',
    label: 'Ceiling Check',
    desc: 'child_scope = parent_scope ∩ requested_scope ∩ policy_allowed_scope.',
  },
  {
    num: '04',
    label: 'JIT Spawn',
    desc: 'Sub-agent initialized in isolated sandbox with short-lived scoped credentials.',
  },
  {
    num: '05',
    label: 'Deterministic Execution',
    desc: 'Agent operates under token budget & lock constraints; mutations go via Gateway.',
  },
  {
    num: '06',
    label: 'Instant Teardown',
    desc: 'Deliverables verified -> ephemeral memory pruned -> token revoked in < 5ms.',
  },
];

export function DynamicAgentsSection({ onShowToast }: DynamicAgentsSectionProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('cve-audit');
  const [activeStep, setActiveStep] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);

  const activePreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const handleCopySpec = async () => {
    try {
      await navigator.clipboard.writeText(activePreset.specJson);
      setCopied(true);
      onShowToast('AgentSpec copied', 'Cryptographic specification copied to clipboard.', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('Copy unavailable', 'Select the JSON text directly.', 'warning');
    }
  };

  return (
    <section id="dynamic-agents" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[11px] font-mono font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              [JUST-IN-TIME AUTONOMY]
            </span>
            <span className="text-xs font-mono text-slate-400">INVARIANT #16 & #17</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Zero-Bloat Autonomy: Just-in-Time Dynamic Agent Synthesis
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Unlike static agent frameworks burdened by prompt drift and token waste, NAVA synthesizes specialized agents on the fly with cryptographic deduplication hashing (<code className="font-mono text-xs text-slate-800 bg-slate-200/60 px-1 py-0.5 rounded">SHA256(role, tools, permissions)</code>) and instantly tears them down upon task finalization.
          </p>
        </div>

        {/* 6-Stage Lifecycle Pipeline */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>Deterministic JIT Synthesis & Teardown Pipeline</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every dynamic agent moves through a strictly governed 6-stage lifecycle.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200/80 self-start">
              Lifecycle Stage {activeStep + 1} / 6
            </span>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PIPELINE_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-200/80 text-slate-600'
                    }`}>
                      {step.num}
                    </span>
                    {idx < activeStep && (
                      <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    )}
                  </div>
                  <div className="font-semibold text-xs leading-snug">{step.label}</div>
                </button>
              );
            })}
          </div>

          {/* Active Step Explainer Callout */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600">
                Active Step Analysis // Stage {PIPELINE_STEPS[activeStep].num}: {PIPELINE_STEPS[activeStep].label}
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {PIPELINE_STEPS[activeStep].desc}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2 py-1 rounded text-[11px] font-mono bg-white border border-slate-200 text-slate-600">
                MAX_DEPTH = 3
              </span>
              <span className="px-2 py-1 rounded text-[11px] font-mono bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium">
                EPHEMERAL TTL
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Spec Synthesizer & Security Ceiling Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Preset Selector & Security Ceilings (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">
                  Goal Presets
                </span>
                <span className="text-[11px] font-mono text-slate-400">Select to inspect</span>
              </div>

              <div className="space-y-2">
                {PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50/60 hover:bg-slate-100 text-slate-700 border-slate-200/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs">{preset.name}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-200/70 text-slate-500'
                        }`}>
                          {preset.role}
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {preset.goal}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Non-Increasing Security Scope Ceiling Invariant Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Invariant #2: Non-Increasing Scope Ceiling</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed">
                <code className="text-emerald-400">
                  child_scope = parent_scope ∩ requested_scope ∩ policy_allowed_scope
                </code>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Dynamic agents can only inherit a strict subset of their parent's authority. Any unauthorized tool call (e.g. raw network sockets or sudo) is stripped before spawn time.
              </p>
              
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                  Granted Execution Scopes:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activePreset.derivedScope.map((scope) => (
                    <span key={scope} className="px-2 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                      ✓ {scope}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Compiled AgentSpec JSON (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-slate-600" />
                <span className="font-mono text-xs font-semibold text-slate-800">
                  Compiled AgentSpec.json
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded">
                  [GOVERNED]
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopySpec}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 bg-white border border-slate-200/80 hover:border-slate-300 px-2.5 py-1 rounded-md cursor-pointer transition-colors"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy Spec'}</span>
              </button>
            </div>

            <div className="p-5 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="text-slate-300">{activePreset.specJson}</pre>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Deduplication Hash</span>
                <div className="font-mono text-[11px] text-slate-800 truncate mt-0.5">
                  {activePreset.dedupHash}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Token Ceiling</span>
                <div className="font-mono text-[11px] text-slate-800 font-medium mt-0.5">
                  {activePreset.maxTokens}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Lifespan & Teardown</span>
                <div className="font-mono text-[11px] text-indigo-600 font-medium mt-0.5">
                  {activePreset.ttl}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
