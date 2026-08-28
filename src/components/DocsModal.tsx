import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  BookOpen,
  Terminal,
  Server,
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
  Box
} from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

interface DocSection {
  id: string;
  title: string;
  category: string;
  badge?: string;
  summary: string;
  content: React.ReactNode;
}

export const DocsModal: React.FC<DocsModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'quickstart',
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string>(initialTopic);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  useEffect(() => {
    if (initialTopic) {
      setActiveTopicId(initialTopic);
    }
  }, [initialTopic, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 1800);
  };

  const sections: DocSection[] = [
    {
      id: 'quickstart',
      title: '1. Getting Started & Quickstart',
      category: 'Installation',
      badge: 'PyPI v0.3.1',
      summary: 'Prerequisites, installation via pip / pipx, environment keys, and running the agent CLI.',
      content: (
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <p>
            NAVA is published as a standalone Python package on PyPI (<code className="font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">nava-agent</code>). You can install it on macOS, Linux, or Windows with Python 3.10+.
          </p>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Installation Methods
            </h4>
            
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs relative overflow-hidden border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                <span>Standard pip / pipx install</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('pip install nava-agent\nplaywright install chromium', 'inst-pip')}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {copiedCodeId === 'inst-pip' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedCodeId === 'inst-pip' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-slate-300">
                <span className="text-slate-500"># Install from PyPI</span>{'\n'}
                <b className="text-white">pip install nava-agent</b>{'\n\n'}
                <span className="text-slate-500"># Or install as global isolated CLI tool via pipx</span>{'\n'}
                <b className="text-white">pipx install nava-agent</b>{'\n\n'}
                <span className="text-slate-500"># Install headless Chromium for BrowserAgent</span>{'\n'}
                <b className="text-white">playwright install chromium</b>
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900">Environment Configuration</h4>
            <p className="text-xs text-slate-600">
              Set your Gemini API key (or OpenAI / Anthropic / Local Ollama endpoint) in your shell environment:
            </p>
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                <span>API Keys & Environment</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('export GEMINI_API_KEY="your_api_key_here"', 'inst-env')}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {copiedCodeId === 'inst-env' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedCodeId === 'inst-env' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-slate-300">
                <span className="text-slate-500"># Linux / macOS</span>{'\n'}
                export GEMINI_API_KEY="your_gemini_api_key_here"{'\n\n'}
                <span className="text-slate-500"># Windows PowerShell</span>{'\n'}
                $env:GEMINI_API_KEY="your_gemini_api_key_here"
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900">Running the Agent</h4>
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
              <pre className="text-slate-300">
                <span className="text-slate-500"># 1. Launch interactive TUI Cowork Shell</span>{'\n'}
                <b className="text-indigo-300">nava</b>{'\n\n'}
                <span className="text-slate-500"># 2. Or execute a direct autonomous mission</span>{'\n'}
                <b className="text-indigo-300">nava run "audit project security and summarize in typst report"</b>
              </pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'architecture',
      title: '2. System Architecture & Kernel Controller',
      category: 'Architecture',
      badge: 'Core Engine',
      summary: 'NAVA Root Orchestrator Kernel, Subagent lifecycle supervisor, and hierarchical goal decomposition.',
      content: (
        <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
          <p>
            NAVA replaces unconstrained LLM prompt chains with a deterministic operating system kernel. Every tool call—whether modifying code, executing shell commands, clicking desktop GUI windows, or querying external APIs via MCP—is treated as a managed system call subject to policy validation, risk scoring, resource quotas, and concurrency locking.
          </p>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
            <pre className="leading-relaxed text-slate-300">
{`                           USER OBJECTIVE / SHELL
                                     │
                                     ▼
                    ┌─────────────────────────────────┐
                    │     NAVA ROOT ORCHESTRATOR      │
                    │   (Executive Kernel Controller) │
                    └────────────────┬────────────────┘
                                     │
                        Decompose Objective
                                     │
                                     ▼
                            [ GoalPlanner ]
                 Stage 1 (Parallel) ──► Stage 2 (Sequential)
                                     │
                                     ▼
                            [ AgentFactory ]
                 JIT Dynamic Synthesis & Scope Intersect:
            Child_Scope = Parent_Scope ∩ Spec_Scope ∩ Policy_Scope`}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">Hierarchical Execution Guarantees:</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Root Security Ceilings (Section 26):</strong> Subagents can never acquire permissions or tool access beyond what is granted to the Root Agent in <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">nava.yaml</code>.</li>
              <li><strong>Autonomous Goal Decomposition:</strong> Complex natural-language tasks are decomposed into sequential stages with parallel sub-goals.</li>
              <li><strong>Deterministic Teardown:</strong> Upon task completion or failure, thread locks are released, temporary credentials revoked, and child states set to <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">TERMINATED</code>.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'mcp-ecosystem',
      title: '3. Model Context Protocol (MCP) Ecosystem (15 Servers)',
      category: 'Tools & Protocols',
      badge: '15 MCP Servers',
      summary: 'Complete JSON-RPC 2.0 standard MCP tool catalog for Git, Typst, ArXiv, Docker, Playwright, and AST tools.',
      content: (
        <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
          <p>
            NAVA implements the official standard <strong>Model Context Protocol (JSON-RPC 2.0 over stdio)</strong> via <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">StdioMCPClient</code> and <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">MCPClientManager</code>. Every server can be individually toggled via <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">enabled: true / false</code> in <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">nava.yaml</code>.
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold font-mono">
                  <th className="p-3">MCP Server</th>
                  <th className="p-3">Assigned Roles</th>
                  <th className="p-3">Package & Command</th>
                  <th className="p-3">Key Capabilities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                <tr>
                  <td className="p-3 font-bold text-indigo-700">context7</td>
                  <td className="p-3 text-slate-600">CodingAgent</td>
                  <td className="p-3 text-slate-500">npx -y @context7/mcp-server@latest</td>
                  <td className="p-3 text-slate-800">AST repo symbol graphs & context definition slicing</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">superpowers</td>
                  <td className="p-3 text-slate-600">CodingAgent</td>
                  <td className="p-3 text-slate-500">uvx mcp-superpowers-code@latest</td>
                  <td className="p-3 text-slate-800">Syntax-aware AST search, replace & compiler auto-fix</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">git</td>
                  <td className="p-3 text-slate-600">CodingAgent, TerminalAgent</td>
                  <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-git@latest</td>
                  <td className="p-3 text-slate-800">Branch inspection, diffs, staging, and atomic commits</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">fetch</td>
                  <td className="p-3 text-slate-600">ResearchAgent</td>
                  <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-fetch@latest</td>
                  <td className="p-3 text-slate-800">HTML-to-Markdown conversion and HTTP header inspection</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">brave-search</td>
                  <td className="p-3 text-slate-600">ResearchAgent</td>
                  <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-brave-search@latest</td>
                  <td className="p-3 text-slate-800">Real-time web search and recent news queries</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">arxiv</td>
                  <td className="p-3 text-slate-600">ResearchAgent</td>
                  <td className="p-3 text-slate-500">uvx mcp-server-arxiv@latest</td>
                  <td className="p-3 text-slate-800">Academic paper search, PDF retrieval, and abstracts</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">sqlite</td>
                  <td className="p-3 text-slate-600">DataAgent</td>
                  <td className="p-3 text-slate-500">uvx mcp-server-sqlite@latest</td>
                  <td className="p-3 text-slate-800">SQL query execution, table inspection & schema profiling</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">typst</td>
                  <td className="p-3 text-slate-600">DocumentAgent, UniversalFileAgent</td>
                  <td className="p-3 text-slate-500">uvx typst-mcp-server@latest</td>
                  <td className="p-3 text-slate-800">Rust vector Typst compilation into PDF/DOCX reports</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">sequential-thinking</td>
                  <td className="p-3 text-slate-600">ReviewerAgent, VerifierAgent</td>
                  <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-sequential-thinking</td>
                  <td className="p-3 text-slate-800">Multi-branch hypothesis reasoning and thought revision</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">audit-scanner</td>
                  <td className="p-3 text-slate-600">ReviewerAgent, VerifierAgent</td>
                  <td className="p-3 text-slate-500">uvx nava-audit-mcp@latest</td>
                  <td className="p-3 text-slate-800">21 System Invariant tests & AST security scanning</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">docker-sandbox</td>
                  <td className="p-3 text-slate-600">TerminalAgent</td>
                  <td className="p-3 text-slate-500">uvx docker-sandbox-mcp@latest</td>
                  <td className="p-3 text-slate-800">Ephemeral container execution with CPU/RAM bounds</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">playwright-browser</td>
                  <td className="p-3 text-slate-600">BrowserAgent</td>
                  <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-puppeteer</td>
                  <td className="p-3 text-slate-800">Headless web navigation, interactive tree ([#1]), clicks</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">desktop-automation</td>
                  <td className="p-3 text-slate-600">ComputerAgent</td>
                  <td className="p-3 text-slate-500">uvx desktop-automation-mcp@latest</td>
                  <td className="p-3 text-slate-800">Desktop screenshots, coordinate mouse clicks, hotkeys</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">gmail</td>
                  <td className="p-3 text-slate-600">EmailAgent</td>
                  <td className="p-3 text-slate-500">uvx gmail-mcp-server@latest</td>
                  <td className="p-3 text-slate-800">Email search, thread reading, and governed drafting</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700">github</td>
                  <td className="p-3 text-slate-600">GitHubAgent</td>
                  <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-github@latest</td>
                  <td className="p-3 text-slate-800">Repo search, PR reviews, and issue creation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'specialized-agents',
      title: '4. Specialized Agent Suite & JIT Dynamic Agents',
      category: 'Agent Swarms',
      badge: '9 Static Agents',
      summary: 'Purpose-built static agents and Just-In-Time dynamic subagent synthesis with permission intersection.',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            NAVA maintains a hybrid model of 9 dedicated static agent archetypes alongside Just-In-Time (JIT) ephemeral dynamic agents spawned on demand:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <b className="text-slate-900 font-mono text-xs block mb-1">1. CodingAgent</b>
              <p className="text-xs text-slate-600">AST structural refactoring, syntax-aware replacement, and compiler auto-fix.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <b className="text-slate-900 font-mono text-xs block mb-1">2. ReviewerAgent</b>
              <p className="text-xs text-slate-600">AST vulnerability scanning, security audit reviews, and unified diff verification.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <b className="text-slate-900 font-mono text-xs block mb-1">3. VerifierAgent</b>
              <p className="text-xs text-slate-600">21 System Invariant formal proof checks and citation factual grounding.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <b className="text-slate-900 font-mono text-xs block mb-1">4. ResearchAgent</b>
              <p className="text-xs text-slate-600">Web crawling, ArXiv academic paper retrieval, and semantic RAG indexing.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <b className="text-slate-900 font-mono text-xs block mb-1">5. TerminalAgent</b>
              <p className="text-xs text-slate-600">Shell execution, ephemeral Docker container sandboxing, and CI test runner.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <b className="text-slate-900 font-mono text-xs block mb-1">6. BrowserAgent</b>
              <p className="text-xs text-slate-600">Playwright web navigation, interactive tree extraction, and form submission.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <b className="text-slate-900 font-mono text-xs block mb-1">7. ComputerAgent</b>
              <p className="text-xs text-slate-600">OS desktop perception, high-res screen understanding, coordinate clicks, and hotkeys.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <b className="text-slate-900 font-mono text-xs block mb-1">8. DataAgent</b>
              <p className="text-xs text-slate-600">Embedded SQLite query execution, CSV profiling, and statistical anomaly detection.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:col-span-2">
              <b className="text-slate-900 font-mono text-xs block mb-1">9. UniversalFileAgent</b>
              <p className="text-xs text-slate-600">Publication-grade Typst Rust vector compilation into formatted PDF, DOCX, and PPTX reports.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'action-gateway',
      title: '5. The 17-Step Chokepoint Action Gateway',
      category: 'Governance & Security',
      badge: 'Invariant #1',
      summary: 'Mandatory 17-stage sequential validation pipeline for all state-mutating actions.',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Every mutating action in NAVA must pass sequentially through the 17-step <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">ActionGateway</code> chokepoint (<code className="font-mono text-xs">src/nava/gateway/pipeline.py</code>). No LLM prompt reasoning can bypass this choke point:
          </p>

          <div className="space-y-2 font-mono text-xs">
            {[
              { num: '00a', title: 'Emergency Kill Switch', desc: 'Verifies out-of-band kill switch is not tripped.' },
              { num: '00b', title: 'Request Event Log', desc: 'Emits TOOL_REQUESTED audit event to the append-only ledger.' },
              { num: '01', title: 'Schema Validation', desc: 'Validates input argument types and JSON-RPC parameter schemas.' },
              { num: '02', title: 'Agent Identity Check', desc: 'Authenticates agent UUID and parent spawn lineage.' },
              { num: '03', title: 'Agent TTL & Expiry', desc: 'Enforces strict 5-minute agent lifetime ceiling.' },
              { num: '04', title: 'Parent Scope Check', desc: 'Enforces non-increasing child permission scope.' },
              { num: '05', title: 'Permission Checker', desc: 'Verifies tool in declared agent permissions.' },
              { num: '06', title: 'Policy Engine (ALLOW)', desc: 'Matches action against declarative user rules & security switches.' },
              { num: '07', title: 'Additive Risk Engine', desc: 'Computes deterministic risk score: recipient, attachment, sensitive file.' },
              { num: '08', title: 'Task Budget Engine', desc: 'Verifies remaining token, step, runtime, and agent spawn quotas.' },
              { num: '09', title: 'Concurrency Lock Manager', desc: 'Acquires shared read or exclusive write locks on target resources.' },
              { num: '10', title: 'Credential Broker Token', desc: 'Generates scoped, short-lived (5-min TTL) OAuth token.' },
              { num: '11', title: 'HITL Gatekeeper', desc: 'Pauses high-risk operations (Score ≥ 50) for signed human approval.' },
              { num: '12', title: 'Dry-Run & Pre-State Snapshot', desc: 'Captures pre-execution SHA-256 hash snapshot for rollback.' },
              { num: '13', title: 'Sandboxed Tool Execution', desc: 'Dispatches tool locally or via isolated JSON-RPC MCP server.' },
              { num: '14', title: 'State Observation Hash', desc: 'Records mutated file hashes, exit codes, and output payloads.' },
              { num: '15', title: 'Post-Execution Verification', desc: 'Verifies mutation integrity, path validity, and 21 invariants.' },
              { num: '16', title: 'Cryptographic Receipt', desc: 'Generates immutable signed SHA-256 receipt committed to ledger.' },
              { num: '17', title: 'Lock Release & Teardown', desc: 'Releases concurrency locks, revokes temporary tokens, and syncs memory.' },
            ].map((st) => (
              <div key={st.num} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
                <span className="font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[11px] shrink-0">{st.num}</span>
                <div>
                  <b className="text-slate-900 text-xs block">{st.title}</b>
                  <span className="text-slate-500 text-[11px]">{st.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'memory-twin',
      title: '6. Four-Tier Memory Hierarchy & AI Twin',
      category: 'Memory & Trust',
      badge: '80% Token Savings',
      summary: 'Working, Episodic, Semantic, and Profile Memory with strict Invariant #20 trust gates.',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            NAVA manages memory across 4 distinct tiers with on-demand pointers, yielding up to <strong>80% token savings</strong> and zero LLM context saturation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase block">TIER 1</span>
              <b className="text-slate-900 text-sm block mb-1">Working Memory</b>
              <p className="text-slate-600">Ephemeral task-scoped scratchpad. Discarded automatically on task completion or teardown.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase block">TIER 2</span>
              <b className="text-slate-900 text-sm block mb-1">Episodic Memory</b>
              <p className="text-slate-600">Append-only historical task receipts, debugging trajectories, and execution experiences (TTL 30-90 days).</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase block">TIER 3</span>
              <b className="text-slate-900 text-sm block mb-1">Semantic Memory (RAG)</b>
              <p className="text-slate-600">Chunked knowledge base, PDF indices, and codebases indexed via hybrid vector + BM25 search.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase block">TIER 4</span>
              <b className="text-slate-900 text-sm block mb-1">Profile Memory (AI Twin)</b>
              <p className="text-slate-600">User-visible, durable facts and preferences. Protected by Invariant #20 trust gates.</p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            <strong>Invariant #20 (Profile Trust Escalation Gate):</strong> External untrusted content (web scrapes, downloaded PDFs, model inferences) can NEVER silently write or upgrade memories to <code className="font-mono font-bold">VERIFIED</code> status without explicit human confirmation.
          </div>
        </div>
      ),
    },
    {
      id: 'invariants',
      title: '7. The 21 Certified System Invariants',
      category: 'Formal Verification',
      badge: '21 Invariants',
      summary: 'Non-negotiable unit-testable mathematical contracts enforced against the gateway and kernel.',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            NAVA mathematically guarantees 21 core operating system invariants enforced via automated CI regression tests:
          </p>

          <div className="space-y-1.5 font-mono text-xs">
            {[
              '01. Mutation Gate Chokepoint: 100% of state mutations pass through Action Gateway.',
              '02. Append-Only Audit Ledger: nava_audit.jsonl is strictly append-only.',
              '03. Receipt Immutability: Cryptographic execution receipts are immutable once written.',
              '04. Root Ceiling Enforcement: Subagents cannot exceed nava.yaml security ceilings.',
              '05. Non-Increasing Permissions: Child_Scope = Parent_Scope ∩ Spec_Scope ∩ Policy_Scope.',
              '06. Maximum Spawn Depth Bound: Dynamic agent spawn trees strictly capped at depth ≤ 10.',
              '07. Runaway Loop Bound: Maximum 3 retries on identical failure; 4th halts execution.',
              '08. Short-Lived Credential Isolation: Scoped credentials have 5-min TTL, isolated from LLM.',
              '09. Write-Exclusive Locking: Exclusive write locks block concurrent read/write access.',
              '10. Shared-Read Concurrency: Parallel subagents acquire non-conflicting read locks.',
              '11. Automatic Reversible Rollback: Failures restore pre-state hash snapshot.',
              '12. Irreversible Compensation Routing: Non-reversible failures route to CompensationEngine.',
              '13. Bounded Cleanup Budget: Rollback and compensation routines execute under ≤ 5 steps.',
              '14. HITL Escalation Gate: Policy APPROVAL strictly mandates signed user approval record.',
              '15. Critical Risk Hard-Block: Tools scoring in CRITICAL tier are blocked from execution.',
              '16. Deterministic Resource Teardown: Agent teardown releases locks & revokes tokens.',
              '17. Skill Hash-Locking: Modifying SKILL.md on disk triggers UNTRUSTED_MODIFIED halt.',
              '18. Out-of-Band Emergency Kill Switch: Halts running threads & revokes credentials in < 5ms.',
              '19. Untrusted Delimiter Boundary: External untrusted content wrapped in <untrusted_content>.',
              '20. Profile Trust Escalation Gate: Inferred facts cannot self-promote to VERIFIED tier.',
              '21. Scope Alignment Invariant: Agent Permission ⊇ Credential Scope ⊇ Tool Scope.',
            ].map((inv) => (
              <div key={inv} className="p-2 bg-slate-50 border border-slate-200/80 rounded-md text-[11px] text-slate-800">
                {inv}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'config-security',
      title: '8. Configuration & Security Feature Switches',
      category: 'Configuration',
      badge: 'nava.yaml',
      summary: 'Global resource budgets and user-configurable feature switches.',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Configure runtime security switches and execution quotas in <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">nava.yaml</code>:
          </p>

          <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
              <span>nava.yaml configuration snippet</span>
              <button
                type="button"
                onClick={() => copyToClipboard(`security_switches:\n  enable_terminal_execution: true\n  enable_docker_sandboxing: true\n  enable_desktop_gui_control: true\n  enable_browser_automation: true\n  enable_code_mutation: true\n  enable_external_integrations: true\n  enable_deep_audit_gates: true\n  enforce_codebase_isolation: true`, 'cfg-yaml')}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
              >
                {copiedCodeId === 'cfg-yaml' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedCodeId === 'cfg-yaml' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-slate-300">
{`budget:
  max_agents: 50
  max_depth: 10
  max_steps: 1000
  max_tokens: 1000000

security_switches:
  enable_terminal_execution: true    # Toggle shell/terminal execution
  enable_docker_sandboxing: true     # Toggle ephemeral Docker container creation
  enable_desktop_gui_control: true   # Toggle ComputerAgent GUI control
  enable_browser_automation: true    # Toggle Playwright browser navigation
  enable_code_mutation: true         # Toggle CodingAgent write permissions
  enable_external_integrations: true # Toggle external MCP web/Gmail/GitHub
  enable_deep_audit_gates: true      # Toggle sequential thinking & AST scanners
  enforce_codebase_isolation: true   # Strict isolation of internal framework files`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: 'tui-shell',
      title: '9. Interactive TUI Cowork Shell',
      category: 'Interface',
      badge: 'CLI Commands',
      summary: 'Interactive terminal UI, slash commands (/mcp, /twin, /skills, /kill), and task management.',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Launch the interactive terminal shell with <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">nava</code> or <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">python nava_shell.py</code>:
          </p>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <span className="font-bold text-indigo-700">/mcp</span>
              <span className="text-slate-600">Inspect active MCP servers, registered tools, and risk tiers.</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <span className="font-bold text-indigo-700">/twin</span>
              <span className="text-slate-600">Inspect or update AI Twin persona facts and preferences.</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <span className="font-bold text-indigo-700">/skills</span>
              <span className="text-slate-600">Inspect loaded SKILL.md skills and SHA-256 hash status.</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <span className="font-bold text-indigo-700">/budget</span>
              <span className="text-slate-600">View live task token, step, and agent consumption metrics.</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <span className="font-bold text-rose-700">/kill</span>
              <span className="text-slate-600">Trigger out-of-band Emergency Kill Switch circuit breaker.</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <span className="font-bold text-slate-900">tasks / project use &lt;name&gt;</span>
              <span className="text-slate-600">List historical task sessions or switch isolated project workspaces.</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'testing',
      title: '10. Automated Verification & Test Suite',
      category: 'Testing & CI',
      badge: '8 Test Suites',
      summary: 'Automated test suite commands for security switches, MCP servers, and the 21 invariants.',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Run NAVA's verification suites using Python's standard <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">unittest</code> runner:
          </p>

          <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
              <span>Test Suite Commands</span>
              <button
                type="button"
                onClick={() => copyToClipboard(`python -m unittest tests/test_21_invariants.py -v\npython -m unittest tests/test_security_switches.py -v\npython -m unittest tests/test_browser_computer_mcp.py -v\npython -m unittest tests/test_terminal_agent_mcp.py -v`, 'tests-cmd')}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
              >
                {copiedCodeId === 'tests-cmd' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedCodeId === 'tests-cmd' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-slate-300">
              <span className="text-slate-500"># 1. Verify all 21 Certified System Invariants</span>{'\n'}
              python -m unittest tests/test_21_invariants.py -v{'\n\n'}
              <span className="text-slate-500"># 2. Verify User Security Switches & MCP Dynamic Disabling</span>{'\n'}
              python -m unittest tests/test_security_switches.py -v{'\n\n'}
              <span className="text-slate-500"># 3. Verify Browser & Desktop Computer Use MCP Suite</span>{'\n'}
              python -m unittest tests/test_browser_computer_mcp.py -v{'\n\n'}
              <span className="text-slate-500"># 4. Verify Terminal DevOps & Docker Sandboxing Suite</span>{'\n'}
              python -m unittest tests/test_terminal_agent_mcp.py -v
            </pre>
          </div>
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  const filteredSections = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeIndex = sections.findIndex((s) => s.id === activeTopicId);
  const activeSection = sections[activeIndex >= 0 ? activeIndex : 0];

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveTopicId(sections[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < sections.length - 1) {
      setActiveTopicId(sections[activeIndex + 1].id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/50 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200/90 w-full max-w-5xl h-[88vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-slate-950 text-white rounded-lg">
              <BookOpen size={16} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-950 text-sm tracking-tight">NAVA Documentation</h3>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono rounded font-semibold">
                  v0.3.1 PyPI
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Personal Agent OS Kernel Specification
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative w-44 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none focus:bg-white focus:border-slate-400 transition-colors placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <aside className="w-72 sm:w-80 border-r border-slate-100 flex flex-col bg-slate-50/50">
            <div className="p-3 border-b border-slate-100/80 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Documentation Chapters
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredSections.map((sec) => {
                const isSelected = activeTopicId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveTopicId(sec.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex flex-col gap-0.5 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold truncate">{sec.title}</span>
                      {sec.badge && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                            isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-200/70 text-slate-600'
                          }`}
                        >
                          {sec.badge}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[11px] line-clamp-1 ${
                        isSelected ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      {sec.summary}
                    </span>
                  </button>
                );
              })}

              {filteredSections.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching chapters found.
                </div>
              )}
            </div>
          </aside>

          {/* Main Body */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white flex flex-col justify-between gap-6">
            <div className="space-y-6 max-w-3xl">
              {/* Header Meta */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-indigo-600 font-semibold uppercase tracking-wider">
                    {activeSection.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mt-1">
                    {activeSection.title}
                  </h2>
                </div>
                <span className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60 font-semibold">
                  {activeSection.badge || 'DOCS'}
                </span>
              </div>

              {/* Body */}
              <div className="space-y-4">{activeSection.content}</div>
            </div>

            {/* Linear Navigation Footer */}
            <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-950 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors font-medium"
              >
                <ChevronLeft size={15} />
                <span>Previous Chapter</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === sections.length - 1}
                className="flex items-center gap-1.5 text-slate-950 font-bold hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <span>Next Chapter</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </main>
        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>NAVA Personal Agent OS</span>
            <span>•</span>
            <a
              href="https://pypi.org/project/nava-agent/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>pypi.org/project/nava-agent</span>
              <ExternalLink size={11} />
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-200/60 rounded-md cursor-pointer transition-colors"
          >
            Close Docs
          </button>
        </div>
      </div>
    </div>
  );
};
