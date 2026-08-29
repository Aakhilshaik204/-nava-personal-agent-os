import React, { useState, useEffect } from 'react';
import {
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

interface DocsPageProps {
  onNavigate: (page: 'home' | 'docs' | 'license' | 'blueprint') => void;
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

interface DocArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  badge?: string;
  headings: { id: string; text: string }[];
  content: React.ReactNode;
}

export function DocsPage({ onNavigate, onShowToast }: DocsPageProps) {
  const [activeArticleId, setActiveArticleId] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [pageCopied, setPageCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFeedbackGiven(null);
  }, [activeArticleId]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    onShowToast('Copied to clipboard', 'Code snippet copied successfully.', 'success');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const copyCurrentPageMarkdown = () => {
    const article = articles.find((a) => a.id === activeArticleId);
    if (!article) return;
    const text = `# ${article.title}\n\n${article.summary}\n\nDocumentation for NAVA Personal Agent OS (v0.3.3 on PyPI).\nRead more at https://github.com/Aakhilshaik204/nava-agent`;
    navigator.clipboard.writeText(text);
    setPageCopied(true);
    onShowToast('Page link & summary copied', 'Ready to paste or share.', 'success');
    setTimeout(() => setPageCopied(false), 2000);
  };

  const articles: DocArticle[] = [
    {
      id: 'overview',
      title: 'Overview',
      category: 'Getting started',
      summary: 'NAVA is an autonomous personal agent operating system designed for deterministic workspace execution, computer use, and human-AI collaboration.',
      headings: [
        { id: 'what-is-nava', text: 'What is NAVA?' },
        { id: 'design-axioms', text: 'Core Design Axiom' },
        { id: 'key-capabilities', text: 'Key Capabilities' },
        { id: 'available-surfaces', text: 'Available Surfaces' },
      ],
      content: (
        <div className="space-y-8">
          <section id="what-is-nava" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">What is NAVA?</h2>
            <p className="text-slate-700 leading-relaxed">
              <strong>NAVA</strong> (Personal Agent Operating System) replaces unconstrained LLM prompt chains with a deterministic, mathematically verifiable operating system kernel. It reads your codebase, edits files, manages background swarms, runs terminal commands, navigates headless web browsers, and operates desktop applications—all subject to strict policy validation, risk ceilings, resource budgets, and cryptographic receipts.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Available as a global terminal agent via PyPI (<code className="font-mono text-indigo-600 bg-slate-100 px-1.5 py-0.5 rounded text-xs">pip install nava-agent</code>), NAVA brings enterprise-grade governance to personal AI autonomy.
            </p>
          </section>

          <section id="design-axioms" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Core Design Axiom</h2>
            <div className="p-4 bg-slate-50 border-l-4 border-indigo-600 rounded-r-xl space-y-2">
              <span className="font-mono text-xs text-indigo-700 font-bold uppercase tracking-wider block">
                Non-Negotiable System Invariant
              </span>
              <p className="text-sm font-medium text-slate-900 italic">
                "NAVA can become more autonomous, but it can never become more privileged merely because it became more intelligent."
              </p>
              <p className="text-xs text-slate-600">
                Every capability—the AI Twin, four-tier memory, dynamic Agent Factory, and parallel swarms—executes strictly inside the 17-step Action Gateway, not alongside it. Autonomy is the product; governance is the constraint that makes shipping that autonomy safe.
              </p>
            </div>
          </section>

          <section id="key-capabilities" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Key Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <ShieldCheck size={16} />
                  <span>17-Step Action Gateway</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every mutation passes through schema check, policy evaluation, additive risk scoring, write locks, and cryptographic receipts.
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <Database size={16} />
                  <span>4-Tier Memory & AI Twin</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Working, Episodic, Semantic (RAG), and Profile Memory with strict Invariant #20 human verification gates.
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <Cpu size={16} />
                  <span>Dynamic Swarms & Factory</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Just-in-time dynamic subagents with non-increasing permissions (Child &le; Parent &cap; Policy) and strict MAX_DEPTH = 10 bounding.
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <Network size={16} />
                  <span>15 MCP Servers Ecosystem</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standard Model Context Protocol JSON-RPC tool suite: Playwright, Computer Use, Typst, ArXiv, SQLite, Git, Docker, and AST tools.
                </p>
              </div>
            </div>
          </section>

          <section id="available-surfaces" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Available Surfaces</h2>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Terminal CLI & TUI Cowork Shell</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono rounded font-semibold">
                      v0.3.3 LIVE ON PyPI
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Install with <code className="font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">pip install nava-agent</code> and launch with <code className="font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">nava</code>.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Desktop UI & Web Cowork Studio</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-mono rounded font-semibold">
                      IN ACTIVE DEVELOPMENT
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Graphical desktop application for macOS, Windows, and Linux. Features multi-agent visual DAG swarms, human approval triage, memory inspector, and sandbox screen monitoring.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      ),
    },
    {
      id: 'quickstart',
      title: 'Quickstart & Installation',
      category: 'Getting started',
      summary: 'Get up and running with NAVA in seconds using pip.',
      headings: [
        { id: 'prerequisites', text: 'Prerequisites' },
        { id: 'install-pypi', text: 'Installation (PyPI)' },
        { id: 'api-keys', text: 'Configure API Keys' },
        { id: 'first-mission', text: 'Run NAVA' },
      ],
      content: (
        <div className="space-y-8">
          <section id="prerequisites" className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Prerequisites</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>Python 3.10+</strong> (Check with <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-xs">python --version</code>)</li>
              <li><strong>Gemini API Key</strong> (or local OpenAI-compatible endpoint like Ollama/vLLM)</li>
            </ul>
          </section>

          <section id="install-pypi" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Installation (PyPI)</h2>
            <p className="text-sm text-slate-700">
              Install the official package from Python Package Index:
            </p>
            
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                <span>Terminal / Command Line</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('pip install nava-agent', 'pypi-cmd')}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {copiedCodeId === 'pypi-cmd' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedCodeId === 'pypi-cmd' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-slate-300">
                <span className="text-slate-500"># Install nava-agent package</span>{'\n'}
                <b className="text-white">pip install nava-agent</b>
              </pre>
            </div>
          </section>

          <section id="api-keys" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Configure API Keys</h2>
            <p className="text-sm text-slate-700">
              Export your Gemini API Key in your shell or create a <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-xs">.env</code> file in your workspace root:
            </p>

            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                <span>Environment Export</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('export GEMINI_API_KEY="AIzaSy..."', 'env-cmd')}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {copiedCodeId === 'env-cmd' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedCodeId === 'env-cmd' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-slate-300">
                <span className="text-slate-500"># Linux / macOS</span>{'\n'}
                export GEMINI_API_KEY="your_gemini_api_key"{'\n\n'}
                <span className="text-slate-500"># Windows PowerShell</span>{'\n'}
                $env:GEMINI_API_KEY="your_gemini_api_key"
              </pre>
            </div>
          </section>

          <section id="first-mission" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Run NAVA</h2>
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                <span>Terminal / Command Line</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('nava', 'run-cmd')}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {copiedCodeId === 'run-cmd' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedCodeId === 'run-cmd' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-slate-300">
                <span className="text-slate-500"># Launch personal agent OS</span>{'\n'}
                <b className="text-indigo-400">nava</b>
              </pre>
            </div>
          </section>
        </div>
      ),
    },
    {
      id: 'mcp-servers',
      title: 'Model Context Protocol (15 MCP Servers)',
      category: 'Tools & Protocols',
      badge: 'MCP Standard',
      summary: 'Detailed catalog of the 15 standard Model Context Protocol servers integrated into NAVA.',
      headings: [
        { id: 'mcp-overview', text: 'MCP Integration Architecture' },
        { id: 'server-catalog', text: '15 Standard MCP Servers Catalog' },
        { id: 'toggling-servers', text: 'Enabling & Disabling Servers' },
      ],
      content: (
        <div className="space-y-8">
          <section id="mcp-overview" className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">MCP Integration Architecture</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              NAVA speaks native <strong>Model Context Protocol (JSON-RPC 2.0 over stdio)</strong>. Rather than bundling proprietary API wrappers, NAVA connects to standardized local and remote tool servers with dynamic schema discovery, strict least-privilege scoping, and per-tool risk ratings.
            </p>
          </section>

          <section id="server-catalog" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">15 Standard MCP Servers Catalog</h2>
            
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-mono text-slate-900 font-bold">
                    <th className="p-3">Server</th>
                    <th className="p-3">Assigned Role</th>
                    <th className="p-3">Execution Command</th>
                    <th className="p-3">Key Capabilities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">context7</td>
                    <td className="p-3 text-slate-600">CodingAgent</td>
                    <td className="p-3 text-slate-500">npx -y @context7/mcp-server@latest</td>
                    <td className="p-3 text-slate-800">AST symbol graphs & definition slicing</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">superpowers</td>
                    <td className="p-3 text-slate-600">CodingAgent</td>
                    <td className="p-3 text-slate-500">uvx mcp-superpowers-code@latest</td>
                    <td className="p-3 text-slate-800">Syntax-aware AST search, replace & compiler autofix</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">git</td>
                    <td className="p-3 text-slate-600">CodingAgent, TerminalAgent</td>
                    <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-git</td>
                    <td className="p-3 text-slate-800">Branch status, delta diffs, staging & commits</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">fetch</td>
                    <td className="p-3 text-slate-600">ResearchAgent</td>
                    <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-fetch</td>
                    <td className="p-3 text-slate-800">Token-dense HTML to Markdown conversion</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">brave-search</td>
                    <td className="p-3 text-slate-600">ResearchAgent</td>
                    <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-brave-search</td>
                    <td className="p-3 text-slate-800">Real-time live web search and news queries</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">arxiv</td>
                    <td className="p-3 text-slate-600">ResearchAgent</td>
                    <td className="p-3 text-slate-500">uvx mcp-server-arxiv@latest</td>
                    <td className="p-3 text-slate-800">Academic paper search, PDF retrieval & abstracts</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">sqlite</td>
                    <td className="p-3 text-slate-600">DataAgent</td>
                    <td className="p-3 text-slate-500">uvx mcp-server-sqlite@latest</td>
                    <td className="p-3 text-slate-800">SQL query execution, table schema profiling</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">typst</td>
                    <td className="p-3 text-slate-600">DocumentAgent, UniversalFileAgent</td>
                    <td className="p-3 text-slate-500">uvx typst-mcp-server@latest</td>
                    <td className="p-3 text-slate-800">Rust vector Typst compilation into PDF/DOCX</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">sequential-thinking</td>
                    <td className="p-3 text-slate-600">ReviewerAgent, VerifierAgent</td>
                    <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-sequential-thinking</td>
                    <td className="p-3 text-slate-800">Multi-branch hypothesis reasoning & critique</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">audit-scanner</td>
                    <td className="p-3 text-slate-600">ReviewerAgent, VerifierAgent</td>
                    <td className="p-3 text-slate-500">uvx nava-audit-mcp@latest</td>
                    <td className="p-3 text-slate-800">21 Invariants automated proof & AST scanner</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">docker-sandbox</td>
                    <td className="p-3 text-slate-600">TerminalAgent</td>
                    <td className="p-3 text-slate-500">uvx docker-sandbox-mcp@latest</td>
                    <td className="p-3 text-slate-800">Ephemeral container sandbox with CPU/RAM caps</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">playwright-browser</td>
                    <td className="p-3 text-slate-600">BrowserAgent</td>
                    <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-puppeteer</td>
                    <td className="p-3 text-slate-800">Headless web navigation & interactive [#1] trees</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">desktop-automation</td>
                    <td className="p-3 text-slate-600">ComputerAgent</td>
                    <td className="p-3 text-slate-500">uvx desktop-automation-mcp@latest</td>
                    <td className="p-3 text-slate-800">Desktop screen capture, coordinate clicks, keys</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">gmail</td>
                    <td className="p-3 text-slate-600">EmailAgent</td>
                    <td className="p-3 text-slate-500">uvx gmail-mcp-server@latest</td>
                    <td className="p-3 text-slate-800">Governed email search, reading, and drafting</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600">github</td>
                    <td className="p-3 text-slate-600">GitHubAgent</td>
                    <td className="p-3 text-slate-500">npx -y @modelcontextprotocol/server-github</td>
                    <td className="p-3 text-slate-800">PR review comments, issue creation, repo search</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="toggling-servers" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Enabling & Disabling Servers</h2>
            <p className="text-sm text-slate-700">
              Each server can be enabled or disabled in <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-xs">nava.yaml</code>:
            </p>
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
              <pre className="text-slate-300">
{`mcp_servers:
  context7:
    enabled: true
    command: "npx"
    args: ["-y", "@context7/mcp-server@latest"]
    assigned_roles: ["CodingAgent"]

  docker-sandbox:
    enabled: false # Disabled to restrict container execution`}
              </pre>
            </div>
          </section>
        </div>
      ),
    },
    {
      id: 'action-gateway',
      title: 'The 17-Step Action Gateway',
      category: 'Governance & Security',
      badge: 'Invariant #1',
      summary: 'Step-by-step verification pipeline governing every mutation from authorization to cryptographic receipt.',
      headings: [
        { id: 'gateway-overview', text: 'Chokepoint Action Gateway' },
        { id: 'step-by-step', text: 'The 17 Pipeline Steps' },
        { id: 'risk-engine', text: 'Additive Risk Scoring Engine' },
        { id: 'receipts', text: 'Cryptographic AI Receipts' },
      ],
      content: (
        <div className="space-y-8">
          <section id="gateway-overview" className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Chokepoint Action Gateway</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Invariant #1 states that <strong>100% of mutations</strong> across host filesystems, terminal shells, browsers, and external APIs must pass sequentially through the 17-step <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-xs">ActionGateway</code> pipeline (<code className="font-mono text-xs">src/nava/gateway/pipeline.py</code>).
            </p>
          </section>

          <section id="step-by-step" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">The 17 Pipeline Steps</h2>
            <div className="space-y-2.5">
              {[
                { num: '00a', title: 'Emergency Kill Switch Check', desc: 'Verifies out-of-band kill switch is not tripped before processing.' },
                { num: '00b', title: 'Request Event Log', desc: 'Emits TOOL_REQUESTED audit event to the append-only ledger.' },
                { num: '01', title: 'Schema & Type Validation', desc: 'Validates input argument types and JSON-RPC parameter schemas.' },
                { num: '02', title: 'Agent Identity Check', desc: 'Authenticates agent UUID, parent lineage, and spawn credentials.' },
                { num: '03', title: 'Agent TTL & Expiry', desc: 'Enforces strict 5-minute agent lifetime ceiling and expiration.' },
                { num: '04', title: 'Parent Scope Check', desc: 'Enforces non-increasing child scope (Child <= Parent & Policy).' },
                { num: '05', title: 'Permission Checker', desc: 'Verifies tool exists within explicitly granted agent permissions.' },
                { num: '06', title: 'Policy Engine Evaluation (ALLOW)', desc: 'Evaluates declarative user rules, security switches, and path boundaries.' },
                { num: '07', title: 'Additive Risk Engine', desc: 'Calculates mathematical blast radius risk score (LOW to CRITICAL tier).' },
                { num: '08', title: 'Task Budget & Quota Engine', desc: 'Verifies and consumes token ceilings, step limits, and retry tripwires.' },
                { num: '09', title: 'Concurrency Lock Manager', desc: 'Acquires exclusive write lock or shared read locks on target resources.' },
                { num: '10', title: 'Credential Broker Token', desc: 'Generates scoped, short-lived (5-min TTL) OAuth token for tool dispatch.' },
                { num: '11', title: 'HITL Gatekeeper', desc: 'Pauses execution for signed user authorization if Risk Score ≥ 50 or policy requires.' },
                { num: '12', title: 'Dry-Run & Pre-State Snapshot', desc: 'Captures pre-mutation SHA-256 hash snapshot for automatic rollback.' },
                { num: '13', title: 'Sandboxed Tool Dispatch', desc: 'Dispatches tool locally or to isolated JSON-RPC MCP server.' },
                { num: '14', title: 'State Observation Hash', desc: 'Records mutated file hashes, exit codes, and output payloads.' },
                { num: '15', title: 'Post-Execution Verification', desc: 'Verifies output integrity, path validity, and 21 system invariants.' },
                { num: '16', title: 'Cryptographic AI Receipt', desc: 'Issues immutable signed SHA-256 receipt committed to SQLite & audit ledger.' },
                { num: '17', title: 'Lock Release & Teardown', desc: 'Releases concurrency locks, revokes temporary tokens, and syncs episodic memory.' },
              ].map((st) => (
                <div key={st.num} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs">
                  <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 shrink-0">
                    Step {st.num}
                  </span>
                  <div>
                    <b className="text-slate-900 text-sm block font-sans">{st.title}</b>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ),
    },
    {
      id: 'four-tier-memory',
      title: 'Four-Tier Memory & AI Twin',
      category: 'Memory & Trust',
      badge: '80% Token Savings',
      summary: 'Working, Episodic, Semantic, and Profile Memory with strict Invariant #20 trust gates.',
      headings: [
        { id: 'memory-tiers', text: 'The Four Memory Tiers' },
        { id: 'on-demand-memory', text: 'On-Demand Memory (80% Token Savings)' },
        { id: 'invariant-20', text: 'Invariant #20 (Profile Trust Escalation Gate)' },
      ],
      content: (
        <div className="space-y-8">
          <section id="memory-tiers" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">The Four Memory Tiers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Tier 1</span>
                <h3 className="font-bold text-slate-900 text-sm">Working Memory</h3>
                <p className="text-slate-600">Ephemeral task-scoped scratchpad. Automatically discarded upon task teardown.</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Tier 2</span>
                <h3 className="font-bold text-slate-900 text-sm">Episodic Memory</h3>
                <p className="text-slate-600">Historical task trajectories, debugging hurdle solutions, and execution diffs (TTL 30-90 days).</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Tier 3</span>
                <h3 className="font-bold text-slate-900 text-sm">Semantic Memory (RAG)</h3>
                <p className="text-slate-600">Persistent vector knowledge base of PDFs, markdown notes, and codebases indexed via hybrid BM25 + Qdrant.</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Tier 4</span>
                <h3 className="font-bold text-slate-900 text-sm">Profile Memory (AI Twin)</h3>
                <p className="text-slate-600">User-visible durable facts: preferred tech stack, coding style, working hours, and project policies.</p>
              </div>
            </div>
          </section>

          <section id="on-demand-memory" className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">On-Demand Memory (80% Token Savings)</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Instead of stuffing massive chat logs into context windows, NAVA passes compact pointers (<code className="font-mono text-xs">task_id</code>, <code className="font-mono text-xs">project_name</code>). Subagents inspect context on demand via <code className="font-mono text-xs">file.read("project_memory.md")</code>, reducing token usage by up to 80%.
            </p>
          </section>
        </div>
      ),
    },
    {
      id: 'invariants',
      title: 'The 21 Certified System Invariants',
      category: 'Formal Verification',
      badge: '21 Invariants',
      summary: '21 mathematically proven operating system contracts verified via automated CI regression tests.',
      headings: [
        { id: 'invariants-table', text: 'All 21 Invariants' },
        { id: 'kill-switch', text: 'Invariant #18 (Out-of-Band Kill Switch)' },
      ],
      content: (
        <div className="space-y-8">
          <section id="invariants-table" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">All 21 Certified Invariants</h2>
            <div className="space-y-2">
              {[
                { id: '01', title: 'Universal Gateway Mediation', rule: '100% of mutations must pass through Action Gateway.' },
                { id: '02', title: 'Append-Only Audit Ledger', rule: 'nava_audit.jsonl is strictly append-only; records cannot be modified.' },
                { id: '03', title: 'Receipt Immutability', rule: 'Signed execution receipts are cryptographic & immutable.' },
                { id: '04', title: 'Root Security Ceiling', rule: 'Subagents cannot exceed permissions declared in nava.yaml.' },
                { id: '05', title: 'Non-Increasing Permissions', rule: 'Child_Scope = Parent_Scope ∩ Spec_Scope ∩ Policy_Scope.' },
                { id: '06', title: 'Maximum Spawn Depth Bound', rule: 'Dynamic spawn trees strictly limited to depth ≤ 10.' },
                { id: '07', title: 'Runaway Loop Tripwire', rule: 'Max 3 retries on identical failure; 4th halts execution.' },
                { id: '08', title: 'Short-Lived Credential Isolation', rule: 'Scoped tokens have 5-min TTL, isolated from LLM context.' },
                { id: '09', title: 'Write-Exclusive Resource Locking', rule: 'Exclusive write locks block concurrent read and write access.' },
                { id: '10', title: 'Shared-Read Concurrency', rule: 'Multiple agents acquire non-conflicting shared read locks.' },
                { id: '11', title: 'Automatic Reversible Rollback', rule: 'Failures trigger automatic pre-snapshot state restoration.' },
                { id: '12', title: 'Irreversible Compensation Routing', rule: 'Non-reversible failures route to CompensationEngine.' },
                { id: '13', title: 'Bounded Cleanup Budget', rule: 'Rollback & compensation execute in ≤ 5 steps.' },
                { id: '14', title: 'HITL Mandatory Authorization', rule: 'High-risk operations (Score ≥ 50) require signed user sign-off.' },
                { id: '15', title: 'Critical Risk Hard-Block', rule: 'Tools scoring in CRITICAL tier are blocked from execution.' },
                { id: '16', title: 'Deterministic Teardown', rule: 'Agent termination releases locks & revokes temporary tokens.' },
                { id: '17', title: 'Skill Hash-Locking', rule: 'Modifying SKILL.md on disk triggers UNTRUSTED_MODIFIED halt.' },
                { id: '18', title: 'Emergency Kill Switch', rule: 'Out-of-band kill switch halts execution in < 5ms.' },
                { id: '19', title: 'Untrusted Delimiter Boundary', rule: 'External content wrapped in strict <untrusted_content> tags.' },
                { id: '20', title: 'Profile Trust Escalation Gate', rule: 'Inferred facts cannot self-promote to VERIFIED tier.' },
                { id: '21', title: 'Scope Alignment Invariant', rule: 'Agent Permission ⊇ Credential Scope ⊇ Tool Scope.' },
              ].map((inv) => (
                <div key={inv.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs">
                  <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Inv #{inv.id}
                  </span>
                  <div>
                    <strong className="text-slate-900 text-sm block font-sans">{inv.title}</strong>
                    <p className="text-slate-600 font-mono text-[11px] mt-0.5">{inv.rule}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ),
    },
    {
      id: 'config-reference',
      title: 'Configuration Reference (nava.yaml)',
      category: 'Configuration',
      badge: 'YAML Reference',
      summary: 'Complete reference for user-configurable security switches and resource quotas.',
      headings: [
        { id: 'yaml-schema', text: 'nava.yaml Specification' },
        { id: 'security-switches', text: 'Security Feature Switches' },
      ],
      content: (
        <div className="space-y-8">
          <section id="yaml-schema" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">nava.yaml Specification</h2>
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
              <pre className="text-slate-300">
{`# Global Resource Budgets
budget:
  max_agents: 50
  max_depth: 10
  max_steps: 1000
  max_tokens: 1000000

# User-Configurable Security Switches
security_switches:
  enable_terminal_execution: true    # Shell & terminal execution
  enable_docker_sandboxing: true     # Docker container sandboxing
  enable_desktop_gui_control: true   # ComputerAgent mouse/keyboard control
  enable_browser_automation: true    # Playwright headless browser
  enable_code_mutation: true         # CodingAgent write permissions
  enable_external_integrations: true # External web MCPs, Gmail & GitHub
  enable_deep_audit_gates: true      # Sequential thinking & AST scanners
  enforce_codebase_isolation: true   # Strict internal framework isolation`}
              </pre>
            </div>
          </section>
        </div>
      ),
    },
    {
      id: 'tui-shell',
      title: 'Interactive TUI Cowork Shell',
      category: 'Interface',
      badge: 'Slash Commands',
      summary: 'Using the interactive terminal shell, slash commands (/mcp, /twin, /skills, /kill), and project memory.',
      headings: [
        { id: 'launching-shell', text: 'Launching the Shell' },
        { id: 'slash-commands', text: 'Slash Commands Reference' },
      ],
      content: (
        <div className="space-y-8">
          <section id="launching-shell" className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Launching the Shell</h2>
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
              <pre className="text-slate-300">
                <span className="text-slate-500"># Launch TUI</span>{'\n'}
                <b className="text-indigo-400">nava</b>{'\n\n'}
                <span className="text-slate-500"># Or from repo clone</span>{'\n'}
                <b className="text-indigo-400">python nava_shell.py</b>
              </pre>
            </div>
          </section>

          <section id="slash-commands" className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Slash Commands Reference</h2>
            <div className="space-y-2 font-mono text-xs">
              {[
                { cmd: '/mcp', desc: 'Inspect active MCP servers, registered tools, and risk tiers.' },
                { cmd: '/mcp approve <server> <tool>', desc: 'Approve new or modified MCP tool definitions into hash ledger.' },
                { cmd: '/twin', desc: 'Inspect or update AI Twin persona facts and preferences.' },
                { cmd: '/skills', desc: 'Inspect loaded SKILL.md skills and SHA-256 integrity hash status.' },
                { cmd: '/budget', desc: 'View live token, step, and agent consumption metrics.' },
                { cmd: '/kill', desc: 'Trigger the out-of-band Emergency Kill Switch circuit breaker.' },
                { cmd: 'tasks / task resume <id>', desc: 'List historical task sessions or resume existing context.' },
                { cmd: 'projects / project use <name>', desc: 'Switch between isolated project workspaces.' },
              ].map((c) => (
                <div key={c.cmd} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                  <span className="font-bold text-indigo-700">{c.cmd}</span>
                  <span className="text-slate-600 text-right">{c.desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      ),
    },
    {
      id: 'verification-tests',
      title: 'Automated Verification & Test Suite',
      category: 'Testing & CI',
      badge: '8 Test Suites',
      summary: 'Running the 8 automated test suites verifying invariants, security switches, and MCP tools.',
      headings: [
        { id: 'running-tests', text: 'Running the Test Suites' },
      ],
      content: (
        <div className="space-y-8">
          <section id="running-tests" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Running the Test Suites</h2>
            <p className="text-sm text-slate-700">
              NAVA includes comprehensive automated test suites using Python's standard <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">unittest</code> module:
            </p>

            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                <span>Test Execution Commands</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('python -m unittest tests/test_21_invariants.py -v\npython -m unittest tests/test_security_switches.py -v\npython -m unittest tests/test_browser_computer_mcp.py -v\npython -m unittest tests/test_terminal_agent_mcp.py -v', 'test-run-cmd')}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {copiedCodeId === 'test-run-cmd' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedCodeId === 'test-run-cmd' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-slate-300">
                <span className="text-slate-500"># 1. Verify all 21 Certified System Invariants</span>{'\n'}
                python -m unittest tests/test_21_invariants.py -v{'\n\n'}
                <span className="text-slate-500"># 2. Verify User Security Switches & MCP Disabling</span>{'\n'}
                python -m unittest tests/test_security_switches.py -v{'\n\n'}
                <span className="text-slate-500"># 3. Verify Browser & Desktop Computer Use Suite</span>{'\n'}
                python -m unittest tests/test_browser_computer_mcp.py -v{'\n\n'}
                <span className="text-slate-500"># 4. Verify Terminal DevOps & Docker Sandboxing Suite</span>{'\n'}
                python -m unittest tests/test_terminal_agent_mcp.py -v{'\n\n'}
                <span className="text-slate-500"># 5. Verify Core Codebase Isolation Invariant</span>{'\n'}
                python -m unittest tests/test_codebase_isolation.py -v
              </pre>
            </div>
          </section>
        </div>
      ),
    },
  ];

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeArticle = articles.find((a) => a.id === activeArticleId) || articles[0];
  const currentIndex = articles.findIndex((a) => a.id === activeArticle.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 h-14 flex items-center justify-between gap-4">
        {/* Brand and Breadcrumbs */}
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
            <BookOpen size={15} className="text-indigo-600" />
            <span>Docs</span>
          </span>

          <span className="hidden md:inline-flex px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-mono rounded font-medium">
            v0.3.3
          </span>
        </div>

        {/* Global Search */}
        <div className="flex-1 max-w-md hidden sm:block relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documentation (e.g. Invariants, Gateway, MCP)..."
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
            onClick={() => onNavigate('blueprint')}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <FileText size={14} />
            <span className="hidden sm:inline">Blueprint</span>
          </button>

          <a
            href="https://pypi.org/project/nava-agent/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono rounded-lg transition-colors flex items-center gap-1.5 font-semibold"
          >
            <Terminal size={13} className="text-emerald-600" />
            <span>PyPI v0.3.3</span>
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

      {/* Main 3-Column Documentation Layout */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Desktop Left Sidebar Navigation */}
        <aside className="hidden md:block w-64 lg:w-72 shrink-0 border-r border-slate-200 pr-6 py-8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="space-y-6 text-xs">
            {categories.map((category) => {
              const categoryArticles = filteredArticles.filter((a) => a.category === category);
              if (categoryArticles.length === 0) return null;

              return (
                <div key={category} className="space-y-1">
                  <h4 className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    {category}
                  </h4>
                  <div className="space-y-0.5">
                    {categoryArticles.map((article) => {
                      const isActive = activeArticle.id === article.id;
                      return (
                        <button
                          key={article.id}
                          type="button"
                          onClick={() => setActiveArticleId(article.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-slate-100 text-slate-950 font-bold'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                          }`}
                        >
                          <span className="truncate">{article.title}</span>
                          {article.badge && (
                            <span className="text-[9px] font-mono text-slate-400">
                              {article.badge}
                            </span>
                          )}
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
              onClick={() => onNavigate('blueprint')}
              className="w-full text-left px-2.5 py-1.5 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <FileText size={13} />
                <span>55-Page Blueprint</span>
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
                  <span className="font-bold text-sm text-slate-950">Documentation</span>
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
                    placeholder="Search docs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                {categories.map((category) => {
                  const categoryArticles = filteredArticles.filter((a) => a.category === category);
                  if (categoryArticles.length === 0) return null;

                  return (
                    <div key={category} className="space-y-1">
                      <h4 className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                        {category}
                      </h4>
                      <div className="space-y-0.5">
                        {categoryArticles.map((article) => {
                          const isActive = activeArticle.id === article.id;
                          return (
                            <button
                              key={article.id}
                              type="button"
                              onClick={() => {
                                setActiveArticleId(article.id);
                                setSidebarOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                                isActive
                                  ? 'bg-slate-100 text-slate-950 font-bold'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                              }`}
                            >
                              <span className="truncate">{article.title}</span>
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
                    onNavigate('blueprint');
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-slate-600 hover:text-slate-950 flex items-center justify-between"
                >
                  <span>55-Page Blueprint</span>
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

        {/* 3. Center Article Content */}
        <main className="flex-1 min-w-0 py-8 px-4 sm:px-8 lg:px-12 max-w-3xl lg:max-w-4xl">
          {/* Breadcrumb & Top Actions */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-mono text-indigo-600 uppercase font-semibold text-[11px]">
                {activeArticle.category}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium">{activeArticle.title}</span>
            </div>

            <button
              type="button"
              onClick={copyCurrentPageMarkdown}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer transition-colors"
            >
              {pageCopied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{pageCopied ? 'Copied Page' : 'Copy page'}</span>
            </button>
          </div>

          {/* Article Header */}
          <div className="mt-6 mb-8 space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              {activeArticle.title}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              {activeArticle.summary}
            </p>
          </div>

          {/* Article Body */}
          <div className="text-slate-700">
            {activeArticle.content}
          </div>

          {/* Pagination Controls */}
          <div className="mt-14 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <button
                type="button"
                onClick={() => setActiveArticleId(prevArticle.id)}
                className="p-4 border border-slate-200 hover:border-slate-300 rounded-xl text-left transition-all cursor-pointer bg-white group"
              >
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  ← PREVIOUS
                </span>
                <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                  {prevArticle.title}
                </span>
              </button>
            ) : <div />}

            {nextArticle && (
              <button
                type="button"
                onClick={() => setActiveArticleId(nextArticle.id)}
                className="p-4 border border-slate-200 hover:border-slate-300 rounded-xl text-right transition-all cursor-pointer bg-white group"
              >
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  NEXT →
                </span>
                <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                  {nextArticle.title}
                </span>
              </button>
            )}
          </div>

          {/* Was this page helpful widget */}
          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4 text-xs">
            <span className="text-slate-600 font-medium">Was this page helpful?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFeedbackGiven('yes');
                  onShowToast('Feedback received', 'Thank you for your feedback!', 'success');
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
                  onShowToast('Feedback received', 'We will work on improving this section.', 'info');
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

        {/* 4. Right "On this page" TOC Sidebar */}
        <aside className="hidden xl:block w-56 lg:w-64 shrink-0 border-l border-slate-100 pl-6 py-8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto text-xs">
          <div className="space-y-4">
            <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              On this page
            </span>
            <nav className="space-y-1.5">
              {activeArticle.headings.map((h) => (
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
              <a
                href="https://github.com/Aakhilshaik204/nava-agent/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5"
              >
                <ExternalLink size={12} />
                <span>Feedback & Issues</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate('license')}
                className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Scale size={12} />
                <span>View License (Apache 2.0)</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
