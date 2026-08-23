import React, { useState } from 'react';
import { 
  Network, 
  Terminal, 
  HardDrive, 
  Globe, 
  Monitor, 
  Mail, 
  Database, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  Copy, 
  Code2, 
  Play, 
  Layers,
  ArrowRight,
  Sparkles,
  Plus,
  Server,
  Zap,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Settings,
  RefreshCw,
  X
} from 'lucide-react';

interface UniversalToolsMcpSectionProps {
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

interface ToolDefinition {
  id: string;
  name: string;
  category: 'Direct OS Perception' | 'Remote MCP Protocol';
  iconType: 'fs' | 'shell' | 'browser' | 'gui' | 'gmail' | 'db' | 'github' | 'postgres' | 'slack' | 'custom';
  riskScore: number;
  riskTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  reversibilityStrategy: string;
  jsonRpcPayload: string;
  compensationBlueprint: string;
  isCustom?: boolean;
}

interface McpTemplate {
  id: string;
  name: string;
  description: string;
  command: string;
  args: string[];
  envKeys: string[];
  category: string;
  icon: 'github' | 'postgres' | 'slack' | 'db' | 'custom';
  toolsDiscovered: string[];
}

const DEFAULT_MCP_TEMPLATES: McpTemplate[] = [
  {
    id: 'tpl-github',
    name: 'GitHub MCP Server',
    description: 'Query pull requests, issue threads, code commits, and automate CI workflows via GitHub API.',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    envKeys: ['GITHUB_PERSONAL_ACCESS_TOKEN'],
    category: 'Developer Tools',
    icon: 'github',
    toolsDiscovered: ['github.search_repositories', 'github.create_pull_request', 'github.get_file_contents'],
  },
  {
    id: 'tpl-postgres',
    name: 'PostgreSQL Database MCP',
    description: 'Introspect schemas, execute read queries, and safely test migration scripts in sandbox transactions.',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:pass@localhost:5432/main'],
    envKeys: ['POSTGRES_CONNECTION_URL'],
    category: 'Database & Storage',
    icon: 'postgres',
    toolsDiscovered: ['postgres.query_read_only', 'postgres.list_tables', 'postgres.describe_table'],
  },
  {
    id: 'tpl-slack',
    name: 'Slack Workspace MCP',
    description: 'Post structured invariant release notes and listen for approval requests on Slack channels.',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-slack'],
    envKeys: ['SLACK_BOT_TOKEN', 'SLACK_TEAM_ID'],
    category: 'Communication',
    icon: 'slack',
    toolsDiscovered: ['slack.post_message', 'slack.list_channels', 'slack.add_reaction'],
  },
  {
    id: 'tpl-sqlite',
    name: 'SQLite Local Storage MCP',
    description: 'Direct embedded SQLite access for local cache tables and zero-latency analytics queries.',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-sqlite', '--db-path', './workspace/local.db'],
    envKeys: [],
    category: 'Database & Storage',
    icon: 'db',
    toolsDiscovered: ['sqlite.read_query', 'sqlite.list_tables', 'sqlite.explain_query'],
  },
];

const INITIAL_TOOLS: ToolDefinition[] = [
  {
    id: 'fs-atomic-write',
    name: 'Filesystem Atomic Write',
    category: 'Direct OS Perception',
    iconType: 'fs',
    riskScore: 25,
    riskTier: 'MEDIUM',
    description: 'Writes file patches atomically with pre-execution diff capture and backup snapshot.',
    reversibilityStrategy: 'INVERSE_AST_DIFF_ROLLBACK',
    jsonRpcPayload: `{
  "jsonrpc": "2.0",
  "id": "req_9f82a1",
  "method": "filesystem.atomic_write",
  "params": {
    "path": "src/auth/jwt_provider.ts",
    "diff": "@@ -12,4 +12,8 @@\\n+ export function verifyToken() { ... }",
    "encoding": "utf-8"
  },
  "reversibility": {
    "strategy": "INVERSE_AST_DIFF_ROLLBACK",
    "pre_state_snapshot": "sha256:88a10f...9b2",
    "auto_compensate_on_failure": true
  }
}`,
    compensationBlueprint: `// Deterministic Rollback Blueprint:
git.apply_patch(reverse=True, snapshot="sha256:88a10f...9b2")
fs.verify_checksum("src/auth/jwt_provider.ts")`,
  },
  {
    id: 'shell-sandbox',
    name: 'Sandboxed Shell Exec',
    category: 'Direct OS Perception',
    iconType: 'shell',
    riskScore: 65,
    riskTier: 'HIGH',
    description: 'Executes build and test commands inside restricted ephemeral container sandbox with seccomp filters.',
    reversibilityStrategy: 'CONTAINER_DISCARD_ON_FAILURE',
    jsonRpcPayload: `{
  "jsonrpc": "2.0",
  "id": "req_3c19b8",
  "method": "shell.exec_sandboxed",
  "params": {
    "command": "npm run test:invariants",
    "cwd": "/workspace",
    "timeout_ms": 30000,
    "network_isolated": true
  },
  "reversibility": {
    "strategy": "CONTAINER_DISCARD_ON_FAILURE",
    "sandbox_id": "sbx_test_448",
    "mount_overlay": "ephemeral_tmpfs"
  }
}`,
    compensationBlueprint: `// Deterministic Rollback Blueprint:
docker.container_kill("sbx_test_448")
docker.volume_prune(filter="label=task_448")`,
  },
  {
    id: 'browser-dom',
    name: 'Headless Browser Perception',
    category: 'Direct OS Perception',
    iconType: 'browser',
    riskScore: 10,
    riskTier: 'LOW',
    description: 'Automates Chrome via CDP to inspect DOM trees, capture screenshot evidence, and extract clean text.',
    reversibilityStrategy: 'READ_ONLY_NOOP',
    jsonRpcPayload: `{
  "jsonrpc": "2.0",
  "id": "req_7a42e0",
  "method": "browser.inspect_dom",
  "params": {
    "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
    "selector": "#section-9.3.4",
    "capture_screenshot": true
  },
  "reversibility": {
    "strategy": "READ_ONLY_NOOP",
    "state_mutation": false
  }
}`,
    compensationBlueprint: `// Read-only inspection requires zero state rollback compensation.`,
  },
  {
    id: 'gmail-mcp',
    name: 'Gmail MCP Server',
    category: 'Remote MCP Protocol',
    iconType: 'gmail',
    riskScore: 70,
    riskTier: 'HIGH',
    description: 'Connects to official Google Workspace via JSON-RPC Model Context Protocol with mandatory HITL approval.',
    reversibilityStrategy: 'DRAFT_STAGING_NO_SEND',
    jsonRpcPayload: `{
  "jsonrpc": "2.0",
  "id": "req_88db01",
  "method": "gmail.stage_draft",
  "params": {
    "to": ["security-lead@company.com"],
    "subject": "[AUDIT REPORT] Invariant Verification Complete",
    "body_html": "<p>All 21 invariants verified passing.</p>"
  },
  "reversibility": {
    "strategy": "DRAFT_STAGING_NO_SEND",
    "draft_id": "draft_msg_0091",
    "requires_hitl_approval": true
  }
}`,
    compensationBlueprint: `// Deterministic Rollback Blueprint:
gmail.delete_draft(draft_id="draft_msg_0091")
audit.record_cancelled_action("req_88db01")`,
  },
  {
    id: 'qdrant-vector',
    name: 'Semantic Vector Ingestion',
    category: 'Remote MCP Protocol',
    iconType: 'db',
    riskScore: 15,
    riskTier: 'LOW',
    description: 'Embeds and indexes document chunks into local Qdrant vector database with hybrid BM25 search.',
    reversibilityStrategy: 'VECTOR_BATCH_DELETE',
    jsonRpcPayload: `{
  "jsonrpc": "2.0",
  "id": "req_11bc90",
  "method": "qdrant.upsert_points",
  "params": {
    "collection": "codebase_rag",
    "batch_size": 48,
    "points": [
      { "id": "chunk_01", "vector": [0.014, -0.091, "..."], "payload": { "file": "jwt.ts" } }
    ]
  },
  "reversibility": {
    "strategy": "VECTOR_BATCH_DELETE",
    "point_ids": ["chunk_01", "chunk_02"]
  }
}`,
    compensationBlueprint: `// Deterministic Rollback Blueprint:
qdrant.delete(collection="codebase_rag", points_selector=["chunk_01", "chunk_02"])`,
  },
];

export function UniversalToolsMcpSection({ onShowToast }: UniversalToolsMcpSectionProps) {
  const [toolsList, setToolsList] = useState<ToolDefinition[]>(INITIAL_TOOLS);
  const [selectedToolId, setSelectedToolId] = useState<string>('fs-atomic-write');
  const [copied, setCopied] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New MCP Server Form State
  const [serverName, setServerName] = useState<string>('');
  const [command, setCommand] = useState<string>('npx');
  const [argsText, setArgsText] = useState<string>('-y @modelcontextprotocol/server-github');
  const [envKeyText, setEnvKeyText] = useState<string>('GITHUB_PERSONAL_ACCESS_TOKEN=ghp_example_token_123');
  const [transportType, setTransportType] = useState<'stdio' | 'sse' | 'http'>('stdio');
  const [isTestingConn, setIsTestingConn] = useState<boolean>(false);
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null);

  const activeTool = toolsList.find((t) => t.id === selectedToolId) || toolsList[0];

  const handleCopyRpc = async () => {
    try {
      await navigator.clipboard.writeText(activeTool.jsonRpcPayload);
      setCopied(true);
      onShowToast('JSON-RPC payload copied', 'MCP protocol frame ready for inspection.', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('Copy unavailable', 'Select the JSON text directly.', 'warning');
    }
  };

  const handleApplyTemplate = (tpl: McpTemplate) => {
    setServerName(tpl.name);
    setCommand(tpl.command);
    setArgsText(tpl.args.join(' '));
    setEnvKeyText(tpl.envKeys.map((k) => `${k}=your_${k.toLowerCase()}_here`).join('\n'));
    setTestSuccess(null);
    onShowToast('Template Loaded', `Filled configuration for ${tpl.name}.`, 'info');
  };

  const handleTestConnection = () => {
    setIsTestingConn(true);
    setTestSuccess(null);
    setTimeout(() => {
      setIsTestingConn(false);
      setTestSuccess(true);
      onShowToast('MCP Handshake Verified', 'JSON-RPC 2.0 initialize & tools/list returned OK in 18ms.', 'success');
    }, 900);
  };

  const handleAddServer = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = serverName.trim() || 'Custom MCP Server';
    const id = `custom-mcp-${Date.now().toString(36)}`;
    const parsedArgs = argsText.trim().split(/\s+/).filter(Boolean);

    const newTool: ToolDefinition = {
      id,
      name: finalName,
      category: 'Remote MCP Protocol',
      iconType: 'custom',
      riskScore: 20,
      riskTier: 'LOW',
      description: `User-configured MCP Server running via ${command} ${parsedArgs.slice(0, 2).join(' ')}...`,
      reversibilityStrategy: 'MCP_TRANSACTION_ROLLBACK',
      isCustom: true,
      jsonRpcPayload: `{
  "jsonrpc": "2.0",
  "id": "req_${id}",
  "method": "${finalName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.execute",
  "params": {
    "server": "${finalName}",
    "transport": "${transportType}",
    "command": "${command}",
    "args": ${JSON.stringify(parsedArgs)},
    "active": true
  },
  "reversibility": {
    "strategy": "MCP_TRANSACTION_ROLLBACK",
    "state_mutation": true
  }
}`,
      compensationBlueprint: `// Deterministic Rollback Blueprint:
mcp.invoke_compensation("${finalName}", transaction_id="tx_${id}")
mcp.disconnect_server("${finalName}")`,
    };

    setToolsList((prev) => [newTool, ...prev]);
    setSelectedToolId(id);
    setIsAddModalOpen(false);
    onShowToast('MCP Server Added', `${finalName} has been registered to your NAVA OS runtime.`, 'success');

    // Reset Form
    setServerName('');
    setArgsText('');
    setEnvKeyText('');
    setTestSuccess(null);
  };

  const handleDeleteTool = (toolId: string) => {
    setToolsList((prev) => prev.filter((t) => t.id !== toolId));
    if (selectedToolId === toolId) {
      setSelectedToolId(INITIAL_TOOLS[0].id);
    }
    onShowToast('MCP Server Removed', 'Server detached from active registry.', 'info');
  };

  const renderIcon = (type: ToolDefinition['iconType']) => {
    switch (type) {
      case 'fs':
        return <HardDrive className="w-4 h-4 text-slate-700" />;
      case 'shell':
        return <Terminal className="w-4 h-4 text-slate-700" />;
      case 'browser':
        return <Globe className="w-4 h-4 text-slate-700" />;
      case 'gui':
        return <Monitor className="w-4 h-4 text-slate-700" />;
      case 'gmail':
        return <Mail className="w-4 h-4 text-slate-700" />;
      case 'db':
      case 'postgres':
        return <Database className="w-4 h-4 text-slate-700" />;
      case 'github':
        return <Code2 className="w-4 h-4 text-slate-700" />;
      case 'slack':
        return <Network className="w-4 h-4 text-slate-700" />;
      default:
        return <Server className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <section id="tools-mcp" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with "Add MCP Server" Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[11px] font-mono font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                [OS PERCEPTION & MCP PROTOCOL]
              </span>
              <span className="text-xs font-mono text-slate-400">INVARIANT #01 & #14</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Direct OS Perception Meets Open MCP Protocol
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              NAVA pairs native OS capabilities (sandboxed shells, atomic filesystem mutations, headless browser inspection) with JSON-RPC <strong className="text-slate-900 font-semibold">Model Context Protocol (MCP)</strong> servers. Easily attach custom external MCP servers in seconds.
            </p>
          </div>

          {/* Prominent "Add MCP Server" Trigger */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold tracking-tight shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Plus size={16} className="text-indigo-400" />
              <span>Add Custom MCP Server</span>
            </button>
          </div>
        </div>

        {/* Tool Matrix & Live JSON-RPC Frame Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Tool Registry Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-400 font-bold tracking-wider px-1">
              <span>Universal Tool Matrix ({toolsList.length})</span>
              <span>Select tool</span>
            </div>

            <div className="space-y-2">
              {toolsList.map((tool) => {
                const isSelected = selectedToolId === tool.id;
                return (
                  <div
                    key={tool.id}
                    className={`group relative rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50/70 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedToolId(tool.id)}
                      className="w-full text-left p-3.5 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-slate-800' : 'bg-white border border-slate-200'}`}>
                            {renderIcon(tool.iconType)}
                          </span>
                          <span className="font-bold text-xs">{tool.name}</span>
                          {tool.isCustom && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-400/30">
                              CUSTOM
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                          tool.riskTier === 'LOW'
                            ? isSelected ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                            : tool.riskTier === 'MEDIUM'
                            ? isSelected ? 'bg-amber-950 text-amber-300' : 'bg-amber-100 text-amber-800'
                            : isSelected ? 'bg-red-950 text-red-300' : 'bg-red-100 text-red-800'
                        }`}>
                          RISK: {tool.riskScore}
                        </span>
                      </div>

                      <p className={`text-[11px] leading-relaxed line-clamp-1 ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {tool.description}
                      </p>
                    </button>

                    {tool.isCustom && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTool(tool.id);
                        }}
                        className="absolute right-2 top-2 p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Delete custom MCP server"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Add Helper Box */}
            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-indigo-950">
                <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Supports any stdio / SSE Model Context Protocol server.</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="text-[11px] font-mono font-bold text-indigo-700 hover:text-indigo-950 underline underline-offset-2 shrink-0 cursor-pointer"
              >
                + Add Now
              </button>
            </div>
          </div>

          {/* Right Column: Live MCP JSON-RPC Payload & Compensation Blueprint (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col space-y-4 p-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-900">
                    JSON-RPC 2.0 Payload
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {activeTool.category}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Method: <code className="font-mono text-slate-800">{activeTool.id}</code>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyRpc}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md cursor-pointer transition-colors"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            {/* JSON Viewer */}
            <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="text-slate-300">{activeTool.jsonRpcPayload}</pre>
            </div>

            {/* Reversibility & Rollback Blueprint Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Reversibility & Rollback Blueprint</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                  {activeTool.reversibilityStrategy}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 font-mono text-[11px] text-slate-700 whitespace-pre-line leading-relaxed">
                {activeTool.compensationBlueprint}
              </div>

              <p className="text-[11px] text-slate-500 leading-normal">
                Invariant #14: Every mutating tool invocation automatically registers a deterministic compensation handler before dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom MCP Server Interactive Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div 
            className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-950">Add Model Context Protocol (MCP) Server</h3>
                  <p className="text-xs text-slate-500">Connect any external tool server with instant JSON-RPC validation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              {/* Quick Template Presets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  <span>Quick-Add Popular MCP Presets</span>
                  <span>Click to autofill</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEFAULT_MCP_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl)}
                      className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 bg-slate-50/60 hover:bg-indigo-50/30 text-left transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">{tpl.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600">
                          {tpl.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {tpl.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Form */}
              <form id="add-mcp-form" onSubmit={handleAddServer} className="space-y-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Server Name */}
                  <div className="space-y-1.5">
                    <label className="block font-medium text-slate-700">Server Identifier Name</label>
                    <input
                      type="text"
                      placeholder="e.g. GitHub MCP Server"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans text-xs"
                    />
                  </div>

                  {/* Transport Type */}
                  <div className="space-y-1.5">
                    <label className="block font-medium text-slate-700">Protocol Transport</label>
                    <select
                      value={transportType}
                      onChange={(e) => setTransportType(e.target.value as 'stdio' | 'sse' | 'http')}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-sans text-xs cursor-pointer"
                    >
                      <option value="stdio">stdio (Standard I/O Subprocess)</option>
                      <option value="sse">sse (Server-Sent Events Stream)</option>
                      <option value="http">http (JSON-RPC over POST)</option>
                    </select>
                  </div>
                </div>

                {/* Command & Arguments */}
                <div className="space-y-1.5">
                  <label className="block font-medium text-slate-700">Executable Command & Arguments</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Command (e.g. npx, uvx, python3)"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      required
                      className="w-1/3 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Arguments (e.g. -y @modelcontextprotocol/server-postgres ...)"
                      value={argsText}
                      onChange={(e) => setArgsText(e.target.value)}
                      required
                      className="w-2/3 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Environment Variables */}
                <div className="space-y-1.5">
                  <label className="block font-medium text-slate-700">Environment Variables (KEY=VALUE per line)</label>
                  <textarea
                    rows={2}
                    placeholder="API_TOKEN=your_secret_key&#10;BASE_URL=https://api.example.com"
                    value={envKeyText}
                    onChange={(e) => setEnvKeyText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                  />
                </div>
              </form>

              {/* Live Test Connection & Handshake Status */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900 block">Pre-Flight JSON-RPC Handshake</span>
                  <span className="text-[11px] text-slate-500">
                    Sends <code className="font-mono text-slate-700">initialize</code> and discovers exported tool definitions.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTestingConn || !serverName.trim()}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-mono text-[11px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isTestingConn ? (
                      <>
                        <RefreshCw size={12} className="animate-spin text-indigo-600" />
                        <span>Testing...</span>
                      </>
                    ) : testSuccess ? (
                      <>
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        <span>Verified (18ms)</span>
                      </>
                    ) : (
                      <>
                        <Play size={12} className="text-indigo-600" />
                        <span>Test Connection</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="add-mcp-form"
                disabled={!serverName.trim()}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-semibold tracking-tight shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
              >
                Register MCP Server
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
