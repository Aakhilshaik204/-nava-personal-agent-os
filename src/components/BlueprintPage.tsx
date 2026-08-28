import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Lock,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Sparkles,
  Zap,
  Sliders,
  CheckCircle2,
  FileCode,
  Box,
  ArrowUpRight,
  Home,
  Scale,
  Github,
  Monitor,
  Globe,
  HardDrive,
  FileText,
  Mail,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Menu,
  X
} from 'lucide-react';

interface BlueprintPageProps {
  onNavigate: (page: 'home' | 'docs' | 'license' | 'blueprint') => void;
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

interface BlueprintSection {
  id: string;
  title: string;
  pageNum: number;
  category: string;
  summary: string;
  content: string;
  codeOrAxiom?: string;
  headings: { id: string; text: string }[];
}

export function BlueprintPage({ onNavigate, onShowToast }: BlueprintPageProps) {
  const [activeSectionId, setActiveSectionId] = useState('sec-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [pageCopied, setPageCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFeedbackGiven(null);
  }, [activeSectionId]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    onShowToast('Copied to clipboard', 'Specification text copied.', 'success');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const copyCurrentPageMarkdown = () => {
    const sec = sections.find((s) => s.id === activeSectionId);
    if (!sec) return;
    const text = `# ${sec.title} (Page ${sec.pageNum})\n\n${sec.summary}\n\n${sec.content}\n\n${sec.codeOrAxiom ? `Contract / Axiom:\n${sec.codeOrAxiom}` : ''}\n\nNAVA 55-Page Blueprint Specification. Read more at https://github.com/Aakhilshaik204/nava-agent`;
    navigator.clipboard.writeText(text);
    setPageCopied(true);
    onShowToast('Blueprint section copied', 'Ready to paste or share.', 'success');
    setTimeout(() => setPageCopied(false), 2000);
  };

  const sections: BlueprintSection[] = [
    {
      id: 'sec-1',
      title: '1. Executive Summary & Vision',
      pageNum: 4,
      category: 'Vision & Foundations',
      summary: 'Autonomous Personal Agent OS running local-first behind deterministic security and risk controls.',
      headings: [
        { id: 'vision-summary', text: 'Executive Overview' },
        { id: 'core-tenets', text: 'Core Tenets & Objectives' },
      ],
      content: `NAVA is a local-first, autonomous Personal Agent OS — not a chatbot, not a single assistant, but an operating layer that understands the user, operates their computer and connected services, learns from past work, delegates tasks to specialized and dynamically-created agents, and places every real-world action behind deterministic security, policy, risk, budget, and audit controls.

The system accepts high-level natural-language goals ("Prepare everything for my interview at Company X") and autonomously understands the goal, gathers context, researches, plans, spawns the right agents, executes tasks, verifies results, asks for approval where necessary, produces deliverables, stores useful memories, and generates an immutable receipt of everything it did.`,
      codeOrAxiom: 'Core Philosophy: Capability + Personalization + Autonomy + Governance + Privacy',
    },
    {
      id: 'sec-2',
      title: '2. Non-Negotiable Design Axiom',
      pageNum: 5,
      category: 'Vision & Foundations',
      summary: 'The mathematical ceiling invariant governing agent intelligence vs authority.',
      headings: [
        { id: 'axiom-rule', text: 'The Core Axiom' },
        { id: 'governance-constraint', text: 'Governance as Constraint' },
      ],
      content: `NAVA can become more autonomous, but it can never become more privileged merely because it became more intelligent.

Every capability described in this blueprint — the AI Twin, four-tier memory, dynamic Agent Factory, parallel subagents — exists inside the Action Gateway and Governance Stack, not alongside it. Autonomy is the product; governance is the constraint that makes shipping that autonomy safe.`,
      codeOrAxiom: 'Invariant #2: child_scope = parent_scope ∩ requested_scope ∩ policy_allowed_scope',
    },
    {
      id: 'sec-4',
      title: '4. High-Level System Architecture',
      pageNum: 7,
      category: 'Vision & Foundations',
      summary: 'Vertical deterministic pipeline from client interface down to immutable audit ledger.',
      headings: [
        { id: 'pipeline-layers', text: 'Vertical Pipeline Layers' },
        { id: 'execution-path', text: 'End-to-End Execution Flow' },
      ],
      content: `The system is structured as a vertical deterministic pipeline:
1. NAVA Client: Chat, Task Manager, AI Twin, Memory, Approvals, Audit, Terminal, Agent Monitor.
2. Agent Runtime: Planner, Reasoner, Router, Executor, Verifier, Critic.
3. Subagents & Knowledge: Specialized Agents, AI Twin Memory, Semantic RAG.
4. Tool Registry / MCP: Real JSON-RPC 2.0 servers (Gmail, Calendar, Drive, GitHub, Browser, Filesystem, Shell, Docker).
5. Action Gateway: Schema Validation, Agent Identity, Permission Scope, Policy Engine, Deterministic Risk Engine, Budget Engine, Concurrency Lock, Credential Broker, HITL Decision.
6. Execution & Sandboxing: Local Computer, Browser, Files, APIs.
7. Observability & Audit: Pre/Post Diffing, State Snapshots, Cryptographic Receipts, Append-Only Ledger.`,
      codeOrAxiom: 'Execution Path: Request -> Gateway [17 Steps] -> Sandbox -> Receipt -> Ledger -> Memory',
    },
    {
      id: 'sec-5',
      title: '5. Local-First Footprint & Model Router',
      pageNum: 9,
      category: 'Vision & Foundations',
      summary: 'Local LLM, Vision, Vector DB, and dynamic privacy-aware tiering modes.',
      headings: [
        { id: 'model-router', text: 'Model Routing Tiers' },
        { id: 'privacy-modes', text: 'Privacy & Data Modes' },
      ],
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
      category: 'Memory & Twin',
      summary: 'Complete technical breakdown of Working, Episodic, Semantic, and Profile Memory.',
      headings: [
        { id: 'memory-tiers-spec', text: 'Four-Tier Specifications' },
        { id: 'storage-backends', text: 'Storage Engine Backends' },
      ],
      content: `Tier 1: Working Memory (RAM/Redis, TTL: task lifetime)
Ephemeral scratchpad for current task execution. Holds intermediate variables, subagent outputs, active locks. Discarded upon task completion.

Tier 2: Episodic Memory (SQLite + Vector, TTL: 30-90 days)
Historical log of past tasks, receipts, decisions, and outcomes. Enables retrospective learning ("Last time I compiled this project, package X had a conflicting dependency").

Tier 3: Semantic Memory (Qdrant/Chroma Vector DB, TTL: persistent)
Knowledge base of facts, extracted documents, user notes, and indexed files. Hybrid dense embedding + BM25 sparse retrieval.

Tier 4: Profile Memory / AI Twin (Encrypted SQLite + JSON, TTL: permanent)
Persistent user profile: verified preferences, active projects, connected accounts, behavioral traits, communication style.`,
      codeOrAxiom: 'Tier 1 (RAM) -> Tier 2 (SQLite) -> Tier 3 (Qdrant RAG) -> Tier 4 (Encrypted SQLite AI Twin)',
    },
    {
      id: 'sec-8',
      title: '8. Memory Lifecycle & Conflict Resolution',
      pageNum: 14,
      category: 'Memory & Twin',
      summary: 'Trust levels, provenance tracking, and the Profile Trust Escalation Gate (Invariant #20).',
      headings: [
        { id: 'trust-levels', text: 'Trust Level Hierarchy' },
        { id: 'escalation-gate', text: 'Trust Escalation Gate' },
      ],
      content: `Trust Levels for Stored Knowledge:
- VERIFIED (1.0): User explicitly stated or confirmed via UI.
- OBSERVED (0.8): Agent witnessed in local files or system configuration.
- INFERRED (0.5): Agent deduced from patterns. Flagged with confidence score.
- UNCONFIRMED (0.3): Single observation, awaiting corroboration.

Invariant #20 (Profile Trust Escalation Gate):
Inferred facts can never self-promote to VERIFIED. Only explicit user confirmation can promote a fact to Tier 4 VERIFIED status.`,
      codeOrAxiom: 'Trust Hierarchy: VERIFIED (1.0) > OBSERVED (0.8) > INFERRED (0.5) > UNCONFIRMED (0.3)',
    },
    {
      id: 'sec-10',
      title: '10. Specialization Matrix (9 Static Agents)',
      pageNum: 18,
      category: 'Agent Swarms',
      summary: 'System prompts, default tools, and risk boundaries for the 9 static agent archetypes.',
      headings: [
        { id: 'agent-matrix', text: 'The 9 Agent Archetypes' },
        { id: 'isolation-boundaries', text: 'Least-Privilege Tool Scopes' },
      ],
      content: `The 9 dedicated static agent archetypes:
1. CodingAgent: AST search, AST replace, syntax-aware refactoring, compiler auto-fix.
2. ReviewerAgent: AST vulnerability analysis, security audit reviews, unified diff checks.
3. VerifierAgent: 21 Certified Invariants formal proof checks, citation factual grounding.
4. ResearchAgent: Web crawling, ArXiv academic paper retrieval, semantic RAG indexing.
5. TerminalAgent: Shell execution, ephemeral Docker container sandboxing, CI test runner.
6. BrowserAgent: Playwright web navigation, interactive tree extraction, form submission.
7. ComputerAgent: OS desktop perception, coordinate clicks, hotkeys, screen capture.
8. DataAgent: Embedded SQLite query execution, CSV profiling, statistical anomaly detection.
9. UniversalFileAgent: Typst Rust vector compilation into PDF, DOCX, and PPTX reports.`,
      codeOrAxiom: 'Agent Specialization: Dedicated prompts + scoped tool registries + deterministic risk tiers',
    },
    {
      id: 'sec-11',
      title: '11. Dynamic Subagent Synthesis (Agent Factory)',
      pageNum: 20,
      category: 'Agent Swarms',
      summary: 'Just-in-time generation, bounded lifetime, and permission intersection.',
      headings: [
        { id: 'factory-synthesis', text: 'JIT Agent Synthesis' },
        { id: 'permission-intersection', text: 'Permission Scope Intersection' },
      ],
      content: `When a goal requires capabilities outside the 9 static agents, the Root Orchestrator invokes the Agent Factory to generate a specialized JIT subagent:
- Dynamic role definition and scoped system prompt
- Narrow tool subset assigned via permission intersection
- Strict lifetime budget (max steps, max tokens, max runtime)
- Automated teardown upon task completion

Invariant #2 (Non-Increasing Permissions):
child_scope = parent_scope ∩ requested_scope ∩ policy_allowed_scope
A dynamic subagent can NEVER have broader permissions than its spawning parent.`,
      codeOrAxiom: 'AgentFactory.spawn(spec) -> validate_scope(spec.scope <= parent.scope) -> EphemeralAgent',
    },
    {
      id: 'sec-13',
      title: '13. Subagent Lifecycle & Teardown Protocol',
      pageNum: 23,
      category: 'Agent Swarms',
      summary: 'State machine from SPAWNING to TERMINATED with zero credential and lock leaks.',
      headings: [
        { id: 'state-machine', text: 'Lifecycle State Machine' },
        { id: 'teardown-cleanup', text: 'Deterministic Teardown Protocol' },
      ],
      content: `Subagent Lifecycle States:
SPAWNING -> RUNNING -> WAITING_APPROVAL -> (RUNNING) -> COMPLETED | FAILED | TIMED_OUT | TERMINATED

Teardown Protocol (Invariant #16):
Upon entering a terminal state (COMPLETED, FAILED, TIMED_OUT, TERMINATED):
1. All active concurrency locks held by the agent are released.
2. Short-lived OAuth tokens and temporary credentials are revoked.
3. Ephemeral files in /tmp/nava_agent_<id>/ are securely shredded.
4. Final execution metrics and receipts are committed to the audit ledger.
5. Working memory is garbage-collected.`,
      codeOrAxiom: 'SPAWNING -> RUNNING -> [WAITING_APPROVAL] -> COMPLETED | FAILED | TERMINATED -> Teardown',
    },
    {
      id: 'sec-16',
      title: '16. Concurrency, Conflict Management & Locks',
      pageNum: 28,
      category: 'Agent Swarms',
      summary: 'Shared-read, exclusive-write, and file-range conflict detection across parallel swarms.',
      headings: [
        { id: 'locking-primitives', text: 'Locking Primitives' },
        { id: 'conflict-resolution', text: 'Distributed Conflict Resolution' },
      ],
      content: `Concurrency Primitives:
- SHARED_READ: Multiple agents can concurrently read the same file or resource.
- EXCLUSIVE_WRITE: Only one agent can write to a file at a time. All other reads and writes are blocked.
- FILE_RANGE: Fine-grained line-range locks for concurrent editing of different sections of large files.

Deadlock Prevention:
- Strict lock acquisition ordering (alphabetical by resource URI)
- Lock acquisition timeout: 5000ms. If exceeded, all acquired locks are released and the agent backs off.
- Maximum concurrent subagent limit: 50 (configurable via nava.yaml)`,
      codeOrAxiom: 'Locks: SHARED_READ (N readers) | EXCLUSIVE_WRITE (1 writer) | FILE_RANGE (line-level)',
    },
    {
      id: 'sec-17',
      title: '17. Tool & Skill Architecture',
      pageNum: 30,
      category: 'Tools & Execution',
      summary: 'JSON-RPC MCP integration, SKILL.md hash-locking, and zero credential leakage.',
      headings: [
        { id: 'tool-registry', text: 'MCP JSON-RPC Tool Registry' },
        { id: 'skill-integrity', text: 'SKILL.md Hash-Locking & Integrity' },
      ],
      content: `Tool Execution Architecture:
1. Tool Registry: Central repository of all available tools (built-in OS perception tools + external MCP servers).
2. MCP Stdio/SSE Client: Connects to standard Model Context Protocol servers over stdio or SSE.
3. SKILL.md Subsystem: Reusable, multi-step workflows defined in markdown with YAML frontmatter.

Skill Hash-Locking (Invariant #17):
Every loaded skill is cryptographically hashed (SHA-256). If a skill file is modified on disk during execution, its status changes to UNTRUSTED_MODIFIED and execution is immediately blocked until verified by the user.`,
      codeOrAxiom: 'Skill Security: SHA256(SKILL.md) -> verified against signed registry before every invocation',
    },
    {
      id: 'sec-19',
      title: '19. The 17-Step Action Gateway Pipeline',
      pageNum: 33,
      category: 'Governance & Gateway',
      summary: 'Mandatory 17-step sequential validation pipeline for all state-mutating actions.',
      headings: [
        { id: 'seventeen-steps', text: '17-Step Chokepoint Architecture' },
        { id: 'chokepoint-guarantee', text: 'Invariant #1 Chokepoint Guarantee' },
      ],
      content: `The 17-Step Mutation Pipeline:
0a. Emergency Kill Switch Check: Verifies out-of-band kill switch is not tripped.
0b. Request Event Log: Emits TOOL_REQUESTED audit event to the append-only ledger.
1. Schema & Parameter Validation: Validates input argument types and JSON-RPC schema.
2. Agent Identity Check: Authenticates agent UUID, parent lineage, and spawn state.
3. Agent TTL & Expiry: Enforces strict 5-minute agent lifetime ceiling.
4. Parent Scope Check: Enforces non-increasing child scope (Child <= Parent & Policy).
5. Permission Checker: Verifies tool exists within explicitly granted permissions.
6. Policy Engine Evaluation: Checks declarative user rules and security switches.
7. Additive Risk Engine: Computes blast radius risk score (LOW to CRITICAL).
8. Task Budget Engine: Verifies and consumes token, step, and runtime quotas.
9. Concurrency Lock Acquisition: Acquires shared-read or exclusive-write lock.
10. Short-Lived Credential Broker: Ephemeral credential with 5-minute TTL.
11. HITL Decision Gate: If risk >= 50 or policy requires approval, pauses for signed authorization.
12. Pre-Execution State Snapshot: Captures pre-mutation SHA-256 hash snapshot for rollback.
13. Sandboxed Tool Execution: Dispatches tool in sandboxed environment or via MCP.
14. State Observation Hash: Records file hashes, exit codes, and output payloads.
15. Post-Execution Verification: Verifies mutation integrity and 21 system invariants.
16. Cryptographic AI Receipt: Generates immutable signed execution receipt.
17. Lock Release & Teardown: Appends to audit ledger, releases locks, and revokes credentials.`,
      codeOrAxiom: 'Action -> [Steps 0-11: Pre-Flight] -> [Step 12: Snapshot] -> [Step 13: Exec] -> [Steps 14-17: Post & Receipt]',
    },
    {
      id: 'sec-21',
      title: '21. Deterministic Risk Engine',
      pageNum: 36,
      category: 'Governance & Gateway',
      summary: 'Additive risk scoring formula: base tool risk + target sensitivity + blast radius + reversibility.',
      headings: [
        { id: 'risk-formula', text: 'The Additive Risk Formula' },
        { id: 'risk-tiers', text: 'Risk Tiers & HITL Rules' },
      ],
      content: `Risk Score Formula:
Risk Score = Base Tool Risk + Target Sensitivity + Blast Radius + Reversibility Penalty + External Exposure

Risk Tiers:
- LOW (0-24): Auto-approved if policy permits. No human intervention needed.
- MEDIUM (25-49): Auto-approved with audit logging, or notified asynchronously.
- HIGH (50-74): Human approval mandatory before execution proceeds.
- CRITICAL (75-100): Human approval mandatory with biometric / 2FA confirmation, or blocked outright by policy.`,
      codeOrAxiom: 'RiskScore = BaseRisk + TargetSensitivity + BlastRadius + ReversibilityPenalty + ExternalExposure',
    },
    {
      id: 'sec-26',
      title: '26. 21 Certified System Invariants',
      pageNum: 44,
      category: 'Governance & Gateway',
      summary: 'All 21 non-negotiable mathematical contracts governing every layer of NAVA OS.',
      headings: [
        { id: 'all-invariants', text: '21 Mathematical Guarantees' },
      ],
      content: `The 21 Certified System Invariants:
#1: Universal Gateway Mediation (100% of mutations pass through Action Gateway)
#2: Append-Only Audit Ledger (tamper-evident, cryptographically signed)
#3: Receipt Immutability (signed AI receipts cannot be modified after generation)
#4: Root Security Ceiling (subagents cannot exceed nava.yaml declared permissions)
#5: Non-Increasing Permissions (child_scope = parent ∩ requested ∩ policy)
#6: Maximum Spawn Depth Bound (spawn trees strictly capped at depth <= 10)
#7: Runaway Loop Tripwire (max 3 retries on identical failure; 4th halts execution)
#8: Short-Lived Credential Isolation (scoped credentials with 5-min TTL, isolated from LLM)
#9: Write-Exclusive Resource Locking (exclusive write locks block concurrent access)
#10: Shared-Read Concurrency (parallel subagents acquire non-conflicting shared read locks)
#11: Automatic Reversible Rollback (failures restore pre-state hash snapshot)
#12: Irreversible Compensation Routing (non-reversible failures route to CompensationEngine)
#13: Bounded Cleanup Budget (rollback and compensation execute in <= 5 steps)
#14: HITL Mandatory Authorization (Score >= 50 requires explicit signed approval)
#15: Critical Risk Hard-Block (tools scoring in CRITICAL tier blocked if disallowed)
#16: Deterministic Teardown (agent teardown releases locks & revokes tokens)
#17: Skill Hash-Locking (modifying SKILL.md triggers UNTRUSTED_MODIFIED halt)
#18: Emergency Kill Switch (out-of-band kill switch halts execution in < 5ms)
#19: Untrusted Delimiter Boundary (external content wrapped in <untrusted_content> tags)
#20: Profile Trust Escalation Gate (inferred facts cannot self-promote to VERIFIED)
#21: Scope Alignment Invariant (Agent Permission ⊇ Credential Scope ⊇ Tool Scope)`,
      codeOrAxiom: 'Formally Verified: 21 Invariant unit tests in tests/test_21_invariants.py pass 100% in CI',
    },
    {
      id: 'sec-29',
      title: '29. Threat Model & Mitigation Matrix',
      pageNum: 48,
      category: 'Governance & Gateway',
      summary: 'Prompt injection, data exfiltration, runaway subagents, and credential leakage defenses.',
      headings: [
        { id: 'threat-matrix', text: 'Threat Vector Matrix' },
        { id: 'defense-in-depth', text: 'Defense-in-Depth Architecture' },
      ],
      content: `Key Threat Mitigations:
1. Indirect Prompt Injection (Untrusted Delimiter Invariant #19): External web content, PDFs, and email bodies are wrapped in <untrusted_content> delimiters and stripped of executable instruction syntax.
2. Data Exfiltration via MCP (Policy Engine Step 4): Network tools require explicit domain allowlisting. Wildcard outbound connections are blocked by default.
3. Runaway Subagent Fork Bomb (Depth Bound Invariant #6 + Budget Engine): Strict max spawn depth of 10 and max concurrent agent ceiling of 50.
4. Credential Theft (Short-Lived Broker Invariant #8): Agent code never touches raw API keys or passwords. Scoped, short-lived (5-min TTL) tokens are injected by the Gateway broker at execution time only.`,
      codeOrAxiom: 'Threat Defenses: Invariant #19 (Delimiters) + Invariant #6 (Depth Capping) + Invariant #8 (Token Broker)',
    },
  ];

  const categories = Array.from(new Set(sections.map((s) => s.category)));

  const filteredSections = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];
  const currentIndex = sections.findIndex((s) => s.id === activeSection.id);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-baseline font-extrabold tracking-tight text-xl text-slate-950 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Nava
            <span className="inline-block w-2 h-2 bg-indigo-600 rounded-[1px] ml-1 mb-0.5" />
          </button>

          <span className="text-slate-300 font-mono">/</span>

          <span className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
            <FileText size={15} className="text-indigo-600" />
            <span>55-Page Blueprint</span>
          </span>

          <span className="hidden md:inline-flex px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-mono rounded font-medium">
            Page {activeSection.pageNum} of 55
          </span>
        </div>

        {/* Global Search */}
        <div className="flex-1 max-w-md hidden sm:block relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 55-page blueprint specifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-slate-400 transition-colors placeholder:text-slate-400"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('docs')}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <BookOpen size={14} />
            <span>Docs</span>
          </button>

          <a
            href="https://pypi.org/project/nava-agent/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono rounded-lg transition-colors flex items-center gap-1.5 font-semibold"
          >
            <Terminal size={13} className="text-emerald-600" />
            <span>PyPI v0.3.1</span>
          </a>

          <a
            href="https://github.com/Aakhilshaik204/nava-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
            title="GitHub Repository"
          >
            <Github size={16} />
          </a>

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-600 hover:text-slate-950 md:hidden rounded-lg hover:bg-slate-100"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Desktop Left Sidebar */}
        <aside className="hidden md:block w-64 lg:w-72 shrink-0 border-r border-slate-200 pr-6 py-8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="space-y-6 text-xs">
            {categories.map((category) => {
              const categorySections = filteredSections.filter((s) => s.category === category);
              if (categorySections.length === 0) return null;

              return (
                <div key={category} className="space-y-1">
                  <h4 className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    {category}
                  </h4>
                  <div className="space-y-0.5">
                    {categorySections.map((sec) => {
                      const isActive = activeSection.id === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => setActiveSectionId(sec.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-slate-100 text-slate-950 font-bold'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                          }`}
                        >
                          <span className="truncate">{sec.title}</span>
                          <span className="text-[9px] font-mono text-slate-400">
                            p.{sec.pageNum}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer Links */}
          <div className="pt-4 mt-6 border-t border-slate-100 text-xs space-y-1">
            <button
              type="button"
              onClick={() => onNavigate('docs')}
              className="w-full text-left px-2.5 py-1.5 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen size={13} />
                <span>Documentation Hub</span>
              </span>
              <ArrowUpRight size={13} className="text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('license')}
              className="w-full text-left px-2.5 py-1.5 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Scale size={13} />
                <span>Open Source License</span>
              </span>
              <ArrowUpRight size={13} className="text-slate-400" />
            </button>
          </div>
        </aside>

        {/* 2. Mobile Off-Canvas Drawer */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-80 max-w-[85vw] bg-white h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl border-r border-slate-200 z-10">
              <div className="space-y-6 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-bold text-sm text-slate-950">55-Page Blueprint</span>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-900"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search blueprint..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                {categories.map((category) => {
                  const categorySections = filteredSections.filter((s) => s.category === category);
                  if (categorySections.length === 0) return null;

                  return (
                    <div key={category} className="space-y-1">
                      <h4 className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                        {category}
                      </h4>
                      <div className="space-y-0.5">
                        {categorySections.map((sec) => {
                          const isActive = activeSection.id === sec.id;
                          return (
                            <button
                              key={sec.id}
                              type="button"
                              onClick={() => {
                                setActiveSectionId(sec.id);
                                setSidebarOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                                isActive
                                  ? 'bg-slate-100 text-slate-950 font-bold'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                              }`}
                            >
                              <span className="truncate">{sec.title}</span>
                              <span className="text-[9px] font-mono text-slate-400">
                                p.{sec.pageNum}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setSidebarOpen(false);
                    onNavigate('docs');
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-slate-600 hover:text-slate-950 flex items-center justify-between"
                >
                  <span>Docs Portal</span>
                  <ArrowUpRight size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSidebarOpen(false);
                    onNavigate('license');
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-slate-600 hover:text-slate-950 flex items-center justify-between"
                >
                  <span>Open Source License</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Center Blueprint Content */}
        <main className="flex-1 min-w-0 py-8 px-4 sm:px-8 lg:px-12 max-w-3xl lg:max-w-4xl">
          {/* Breadcrumb & Actions */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-mono text-indigo-600 uppercase font-semibold text-[11px]">
                {activeSection.category}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium">{activeSection.title}</span>
            </div>

            <button
              type="button"
              onClick={copyCurrentPageMarkdown}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer transition-colors"
            >
              {pageCopied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{pageCopied ? 'Copied' : 'Copy section'}</span>
            </button>
          </div>

          {/* Section Header */}
          <div className="mt-6 mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono text-xs font-semibold">
              <span>Blueprint Section Page {activeSection.pageNum}</span>
              <span>•</span>
              <span>55-Page Architectural Spec</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              {activeSection.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              {activeSection.summary}
            </p>
          </div>

          {/* Section Body */}
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl whitespace-pre-line font-sans text-sm leading-relaxed text-slate-800">
              {activeSection.content}
            </div>

            {activeSection.codeOrAxiom && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono font-bold uppercase tracking-wider">
                  <span>Mathematical Axiom / Architectural Contract</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(activeSection.codeOrAxiom!, `axiom-${activeSection.id}`)}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    {copiedCodeId === `axiom-${activeSection.id}` ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs rounded-xl border border-slate-800 overflow-x-auto shadow-inner leading-relaxed">
                  <pre>{activeSection.codeOrAxiom}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="mt-14 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevSection ? (
              <button
                type="button"
                onClick={() => setActiveSectionId(prevSection.id)}
                className="p-4 border border-slate-200 hover:border-slate-300 rounded-xl text-left transition-all cursor-pointer bg-white group"
              >
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  ← PREVIOUS SECTION (p.{prevSection.pageNum})
                </span>
                <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                  {prevSection.title}
                </span>
              </button>
            ) : <div />}

            {nextSection && (
              <button
                type="button"
                onClick={() => setActiveSectionId(nextSection.id)}
                className="p-4 border border-slate-200 hover:border-slate-300 rounded-xl text-right transition-all cursor-pointer bg-white group"
              >
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  NEXT SECTION (p.{nextSection.pageNum}) →
                </span>
                <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                  {nextSection.title}
                </span>
              </button>
            )}
          </div>

          {/* Helpful Feedback Widget */}
          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4 text-xs">
            <span className="text-slate-600 font-medium">Was this blueprint section helpful?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFeedbackGiven('yes');
                  onShowToast('Feedback recorded', 'Thank you for your feedback on the specification.', 'success');
                }}
                className={`px-3 py-1 rounded-md border text-xs font-medium cursor-pointer transition-colors flex items-center gap-1 ${
                  feedbackGiven === 'yes'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp size={12} />
                <span>Yes</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFeedbackGiven('no');
                  onShowToast('Feedback recorded', 'We will expand this section in the next specification release.', 'info');
                }}
                className={`px-3 py-1 rounded-md border text-xs font-medium cursor-pointer transition-colors flex items-center gap-1 ${
                  feedbackGiven === 'no'
                    ? 'bg-rose-50 text-rose-700 border-rose-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ThumbsDown size={12} />
                <span>No</span>
              </button>
            </div>
          </div>
        </main>

        {/* 4. Right Sidebar ("On this page") */}
        <aside className="hidden xl:block w-56 lg:w-64 shrink-0 border-l border-slate-100 pl-6 py-8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto text-xs">
          <div className="space-y-4">
            <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              On this page
            </span>
            <nav className="space-y-1.5">
              {activeSection.headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className="block text-slate-600 hover:text-slate-950 transition-colors leading-snug truncate"
                >
                  {h.text}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => onNavigate('docs')}
                className="text-slate-500 hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer w-full text-left"
              >
                <BookOpen size={12} />
                <span>Explore Docs Portal</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('license')}
                className="text-slate-500 hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer w-full text-left"
              >
                <Scale size={12} />
                <span>View License (Apache 2.0)</span>
              </button>
              <a
                href="https://pypi.org/project/nava-agent/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-950 transition-colors flex items-center gap-1.5"
              >
                <ExternalLink size={12} />
                <span>PyPI Release v0.3.1</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
