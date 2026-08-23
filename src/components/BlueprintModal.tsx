import React, { useState } from 'react';
import { 
  X, 
  Search, 
  ShieldCheck, 
  Terminal, 
  Lock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileCode2
} from 'lucide-react';

interface BlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: string;
}

interface SectionItem {
  id: string;
  title: string;
  pageNum: number;
  category: string;
  summary: string;
  content: string;
  codeOrAxiom?: string;
}

export const BlueprintModal: React.FC<BlueprintModalProps> = ({
  isOpen,
  onClose,
  initialSection = 'sec-1',
}) => {
  const [selectedSection, setSelectedSection] = useState<string>(initialSection);
  const [searchQuery, setSearchQuery] = useState('');

  const sections: SectionItem[] = [
    {
      id: 'sec-1',
      title: '1. Executive Summary & Vision',
      pageNum: 4,
      category: 'Overview',
      summary: 'Autonomous Personal Agent OS running local-first behind deterministic security and risk controls.',
      content: `NAVA is a local-first, autonomous Personal Agent OS — not a chatbot, not a single assistant, but an operating layer that understands the user, operates their computer and connected services, learns from past work, delegates tasks to specialized and dynamically-created agents, and places every real-world action behind deterministic security, policy, risk, budget, and audit controls.

The system accepts high-level natural-language goals ("Prepare everything for my interview at Company X") and autonomously understands the goal, gathers context, researches, plans, spawns the right agents, executes tasks, verifies results, asks for approval where necessary, produces deliverables, stores useful memories, and generates an immutable receipt of everything it did.`,
      codeOrAxiom: 'Core Philosophy: Capability + Personalization + Autonomy + Governance + Privacy',
    },
    {
      id: 'sec-2',
      title: '2. Non-Negotiable Design Axiom',
      pageNum: 5,
      category: 'Axiom',
      summary: 'The mathematical ceiling invariant governing agent intelligence vs authority.',
      content: `NAVA can become more autonomous, but it can never become more privileged merely because it became more intelligent.

Every capability described in this blueprint — the AI Twin, four-tier memory, dynamic Agent Factory, parallel subagents — exists inside the Action Gateway and Governance Stack, not alongside it. Autonomy is the product; governance is the constraint that makes shipping that autonomy safe.`,
      codeOrAxiom: 'Invariant #2: child_scope = parent_scope ∩ requested_scope ∩ policy_allowed_scope',
    },
    {
      id: 'sec-4',
      title: '4. High-Level System Architecture',
      pageNum: 7,
      category: 'Architecture',
      summary: 'Vertical deterministic pipeline from client interface down to immutable audit ledger.',
      content: `The system is structured as a vertical deterministic pipeline:
1. NAVA Client: Chat, Task Manager, AI Twin, Memory, Approvals, Audit, Terminal, Agent Monitor.
2. Agent Runtime: Planner, Reasoner, Router, Executor, Verifier, Critic (LangGraph/Agent Runtime).
3. Subagents & Knowledge: Specialized Agents, AI Twin Memory, Semantic RAG.
4. Tool Registry / MCP: Real JSON-RPC 2.0 servers (Gmail, Calendar, Drive, GitHub, Browser, Filesystem, Shell, Docker).
5. Action Gateway: Schema Validation, Agent Identity, Permission Scope, Policy Engine, Deterministic Risk Engine, Budget Engine, Concurrency Lock, Credential Broker, HITL Decision.
6. Execution & Sandboxing: Local Computer, Browser, Files, APIs.
7. Observability & Audit: Pre/Post Diffing, State Snapshots, Cryptographic Receipts, Append-Only Ledger.`,
      codeOrAxiom: 'Execution Path: Request -> Gateway [12 Steps] -> Sandbox -> Receipt -> Ledger -> Memory',
    },
    {
      id: 'sec-5',
      title: '5. Local-First Footprint & Model Router',
      pageNum: 9,
      category: 'Architecture',
      summary: 'Local LLM, Vision, Vector DB, and dynamic privacy-aware tiering modes.',
      content: `NAVA is designed around a local-first machine footprint. Nothing leaves the machine unless the user explicitly enables an external service.

Model Router selects between:
- Main Reasoner: Complex planning, coding, and logical reasoning
- Small Model: Intent classification, routing, extraction
- Vision Model: Screenshots, UI understanding, OCR

Local Model Tiering Modes:
- LOCAL_ONLY: Never leaves the machine. Mandatory for sensitive personal data (resumes, credentials, finances).
- LOCAL_PREFERRED: Default. Local execution unless local hardware capability is insufficient.
- HYBRID: Mixed local and cloud depending on task privacy profile.
- CLOUD_OPTIONAL: Cloud fallback when user explicitly permits.`,
      codeOrAxiom: 'Resume.pdf -> sensitive -> Policy: LOCAL_ONLY -> Local Ollama/vLLM Model',
    },
    {
      id: 'sec-7',
      title: '7. Four-Tier Memory Architecture',
      pageNum: 12,
      category: 'Memory & AI Twin',
      summary: 'Working, Episodic, Semantic (RAG), and Profile Memory with strict trust gates.',
      content: `NAVA implements four distinct memory layers:
• Tier 1 - Working Memory: Task-scoped, discarded on completion. Contains active plan, tool outputs, scratchpad.
• Tier 2 - Episodic Memory: Stores execution experiences and debugging trajectories (e.g. past Docker port failure and fix), TTL 30-90 days.
• Tier 3 - Semantic Memory (RAG): Ingests PDFs, markdown, notes, research into Qdrant vector store with BM25 hybrid search and reranking.
• Tier 4 - Profile Memory (AI Twin): Structured, user-visible facts (preferred languages, coding style, trusted contacts). User-editable at all times.

Memory Lifecycle Metadata: memory_id, type, source, confidence, importance, expiration, sensitivity, trust_level (VERIFIED | UNVERIFIED | CONFLICTED).`,
      codeOrAxiom: 'Hard Rule 31.2: Retrieved content can NEVER set Trust: VERIFIED on Profile Memory without explicit user confirmation.',
    },
    {
      id: 'sec-9',
      title: '9. Agent Factory & Dynamic Swarms',
      pageNum: 15,
      category: 'Dynamic Agents',
      summary: 'Hybrid model of static templates and on-demand composed ephemeral dynamic agents.',
      content: `The Agent Factory sits between Planner and Runtime to compose task-specific dynamic subagents on the fly (e.g., "Analyze these 3 financial PDFs").

Key Constraints:
1. Permission Inheritance: child_scope = parent_scope ∩ requested_scope ∩ policy_allowed_scope.
2. Spawn Depth Limit: MAX_DEPTH = 3 to prevent recursive runaway explosions.
3. Spawn Budget: Dynamic agents consume from the shared task budget and are ephemeral (destroyed immediately upon task completion).
4. Deduplication: AgentSpec is normalized and hashed (role + goal-embedding + tool-set) to reuse active agents.
5. Governed Creation: Agent creation is validated exactly like a tool call through the Action Gateway.`,
      codeOrAxiom: 'AgentSpec { requested_role, goal, parent_agent_id, requested_tools, ttl, max_steps, max_tokens, dedup_hash }',
    },
    {
      id: 'sec-12',
      title: '12. Action Gateway: The Central Trust Boundary',
      pageNum: 21,
      category: 'Governance',
      summary: 'Mandatory 12-step choke point for all mutating actions.',
      content: `The Action Gateway is Invariant #1: No agent — static, dynamic, or the root agent — may execute a mutating action without passing through it.

12 Step Flow:
1. Schema Validation
2. Agent Identity Verification
3. Parent Scope Verification
4. Policy Evaluation (ALLOW / APPROVAL / BLOCK)
5. Additive Risk Evaluation
6. Budget Engine Check
7. Concurrency Lock Acquisition
8. Scoped Short-Lived Credential Issuance (5 min TTL)
9. HITL Human Authorization & Batching
10. Dry Run & Sandboxed Execution
11. State Diff & Domain Verification
12. AI Receipt & Append-Only Audit Ledger`,
      codeOrAxiom: 'No tool mutation bypasses the Action Gateway (System Invariant #1)',
    },
    {
      id: 'sec-14',
      title: '14. Deterministic Risk & Budget Engines',
      pageNum: 23,
      category: 'Governance',
      summary: 'Additive scoring function and immutable resource budget caps.',
      content: `The LLM never determines authorization. Risk is calculated mathematically:
External recipient (+30) | Attachment (+20) | Unknown contact (+25) | Sensitive file (+40) | Outside working hours (+15).

Thresholds:
- 0-19: LOW (Auto-execute)
- 20-49: MEDIUM (Notify / Dashboard)
- 50-74: HIGH (HITL Approval Required)
- 75+: CRITICAL (Blocked)

Runaway Loop Protection: Detects identical failure states 3 times -> terminates execution -> escalates to Reviewer/HITL.`,
      codeOrAxiom: 'TaskBudget { max_agents: 10, max_depth: 3, max_steps: 500, max_tokens: 100,000, max_runtime: 30m, max_retries: 5 }',
    },
    {
      id: 'sec-15',
      title: '15. Concurrency Control & Pessimistic Locks',
      pageNum: 25,
      category: 'Concurrency',
      summary: 'Thread-safe lock manager preventing parallel write collisions.',
      content: `When multiple parallel agents execute concurrently:
Lock Types:
- Shared / Read: Multiple agents may hold concurrently (e.g. filesystem.read)
- Exclusive / Write: Single holder only (e.g. filesystem.write to app.py)
- Directory-level & Global locks for critical resources.

Conflict Resolution: Serialize -> Merge -> Rebase -> Reviewer Agent -> HITL.`,
      codeOrAxiom: 'Agent A writes -> Lock acquired -> Agent B waits -> Lock released -> Agent B writes',
    },
    {
      id: 'sec-27',
      title: '27. The 21 Core System Invariants',
      pageNum: 40,
      category: 'Invariants',
      summary: 'Non-negotiable unit-testable contracts enforced against the Gateway and Factory.',
      content: `All 21 Invariants are enforced as CI-gated regression tests:
1. Universal Gateway Mediation
2. Strict Non-Increasing Permissions (child_scope ⊆ parent_scope)
3. Model Permission Sovereignty Barrier
4. Deterministic Policy & Risk Scoring
5. Uniform Dynamic Agent Governance
6. Hard Compute & Token Budgets
7. Thread-Safe Concurrency Locks
8. Zero Direct Credential Exposure (5m Scoped Tokens)
9. Mandatory High-Risk HITL Authorization (Risk ≥ 50)
10. Deterministic Approval Batching
11. State Snapshot & Evidence Verification
12. Cryptographic AI Receipts (SHA-256)
13. Append-Only Audit Ledger
14. Explicit Reversibility & Rollback Metadata
15. Local-First Data Boundary (LOCAL_ONLY)
16. Dynamic Agent Ephemerality (TTL)
17. Runaway Spawning & Loop Limit Caps (Depth ≤ 3)
18. Invariant Learning Immunity
19. Untrusted-Content Authority Barrier (Section 30)
20. Memory Provenance & Verified Trust Gate (Section 31.2)
21. Out-of-Band Emergency Kill Switch (< 5ms halt)`,
      codeOrAxiom: '21 / 21 Automated Invariant Tests CI-Gated and Enforced',
    },
    {
      id: 'sec-29',
      title: '29. Security Threat Model & Catalog',
      pageNum: 44,
      category: 'Security',
      summary: 'Threat -> Attack Surface -> Mitigation -> Detection -> Recovery for 13 vector classes.',
      content: `Covers Prompt Injection, Malicious Web Pages, Malicious Documents, Tool Poisoning, MCP Server Compromise, Credential Theft, Agent Impersonation, Permission Escalation, Memory Poisoning, Data Exfiltration, Malicious Skills, Compromised Dependencies, and Sandbox Escape with concrete recovery procedures.`,
      codeOrAxiom: 'Forensic Reconstruction: Every threat recovery leverages immutable audit receipts and state diffs.',
    },
    {
      id: 'sec-31',
      title: '31. Memory Security & Emergency Kill Switch',
      pageNum: 50,
      category: 'Safety & Emergency',
      summary: 'Out-of-band kill switch operating directly against Runtime and Credential Vault.',
      content: `The Kill Switch operates outside the LLM reasoning path entirely. Triggered via UI button, global hotkey (Cmd+Shift+Esc), or CLI command.

Immediate Action:
1. Prevents new actions from entering the Action Gateway
2. Terminates in-flight agent executions
3. Revokes all active credential tokens in Credential Vault
4. Cancels all pending approvals
5. Freezes background/scheduled cron daemons. Execution halts in < 5ms.`,
      codeOrAxiom: 'Out-of-Band Kill Switch: Zero LLM mediation. Cannot be talked out of halting.',
    },
  ];

  if (!isOpen) return null;

  const filteredSections = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeIndex = sections.findIndex((s) => s.id === selectedSection);
  const activeSection = sections[activeIndex >= 0 ? activeIndex : 0];

  const handlePrev = () => {
    if (activeIndex > 0) {
      setSelectedSection(sections[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < sections.length - 1) {
      setSelectedSection(sections[activeIndex + 1].id);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/40 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200/90 w-full max-w-5xl h-[86vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimalist Top Bar */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-950 text-sm tracking-tight">
              NAVA Blueprint
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500 font-mono">
              55-Page Architecture Spec
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search blueprint..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none focus:bg-white focus:border-slate-400 transition-colors placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Navigation */}
          <aside className="w-72 sm:w-80 border-r border-slate-100 flex flex-col bg-slate-50/40">
            <div className="p-3 border-b border-slate-100/80 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Specification Sections
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
              {filteredSections.map((sec) => {
                const isSelected = selectedSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white font-medium shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <span className="truncate flex-1">{sec.title}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-slate-800 text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      p.{sec.pageNum}
                    </span>
                  </button>
                );
              })}

              {filteredSections.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching sections found.
                </div>
              )}
            </div>
          </aside>

          {/* Main Document Content */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white flex flex-col justify-between gap-6">
            <div className="space-y-5 max-w-3xl">
              {/* Header Meta */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    PAGE {activeSection.pageNum} // {activeSection.category.toUpperCase()}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-950 mt-1">
                    {activeSection.title}
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                  {activeSection.category}
                </span>
              </div>

              {/* Code / Invariant Box (Clean Minimalist) */}
              {activeSection.codeOrAxiom && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                    <span>System Invariant Contract:</span>
                  </div>
                  <div className="text-slate-800 leading-relaxed font-mono">
                    {activeSection.codeOrAxiom}
                  </div>
                </div>
              )}

              {/* Body Text */}
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 whitespace-pre-line">
                {activeSection.content}
              </div>

              {/* Minimal Enforcement & CI Highlights */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1 text-[11px]">
                    <Lock className="w-3.5 h-3.5 text-slate-700" />
                    <span>Deterministic Enforcement</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Enforced at binary runtime and Action Gateway layers. No model prompt manipulation can widen authority.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1 text-[11px]">
                    <Terminal className="w-3.5 h-3.5 text-slate-700" />
                    <span>Automated Invariant CI</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Verified continuously across 21 test suites in the adversarial test harness before releases.
                  </p>
                </div>
              </div>
            </div>

            {/* Linear Section Navigation */}
            <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-950 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft size={14} />
                <span>Previous Section</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === sections.length - 1}
                className="flex items-center gap-1 text-slate-900 font-medium hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <span>Next Section</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </main>
        </div>

        {/* Minimal Footer */}
        <div className="px-6 py-2.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[11px] text-slate-400">
            NAVA_Personal_Agent_OS_Blueprint.pdf (55 pages)
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-200/60 rounded-md cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
