import React, { useState } from 'react';
import { 
  FolderTree, 
  FileText, 
  Folder, 
  FolderOpen, 
  FileCode2, 
  ShieldCheck, 
  FileCheck, 
  ChevronRight, 
  Layers, 
  Database,
  ArrowUpRight,
  HardDrive
} from 'lucide-react';

interface ProjectsTaskIsolationSectionProps {
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

interface WorkspaceFile {
  id: string;
  name: string;
  type: 'project_memory' | 'task_memory' | 'artifact_pdf' | 'artifact_patch' | 'audit_ledger';
  path: string;
  badge: string;
  badgeColor: string;
  description: string;
  content: string;
}

const FILES: WorkspaceFile[] = [
  {
    id: 'project-memory',
    name: 'project_memory.md',
    type: 'project_memory',
    path: 'projects/personal-agent-os/project_memory.md',
    badge: '[DURABLE PROJECT MEMORY]',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/70',
    description: 'Long-term architectural rules, tech stack conventions, and symbol indices that persist across months.',
    content: `# Project: Personal Agent OS (NAVA)
**Last Updated:** 2026-08-23 // **Scope:** Global Core Engine

## 1. Architectural Invariants
- Runtime must execute local-first under Ollama/vLLM.
- All mutating tool executions MUST route through 12-Step Action Gateway.
- Dynamic Subagent spawn ceiling is hard-capped at MAX_DEPTH = 3.

## 2. Tech Stack & Style Conventions
- **Language:** TypeScript 5.4+ (Strict Mode, zero any).
- **Styling:** Tailwind CSS with semantic neutral palette.
- **RPC Protocol:** Model Context Protocol (MCP) JSON-RPC 2.0.
- **Persistence:** Local SQLite episodic memory + Qdrant Vector RAG.`,
  },
  {
    id: 'task-memory',
    name: 'task_memory.md',
    type: 'task_memory',
    path: 'tasks/task-2026-cve-audit/task_memory.md',
    badge: '[EPHEMERAL TASK LOG]',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/70',
    description: 'Human-readable step-by-step reasoning log, active tool scratchpad, and intermediate outputs.',
    content: `# Task: CVE Vulnerability Audit & Patch
**Task ID:** task_cve_9921 // **Status:** COMPLETED // **Runtime:** 8.4s

## Execution Trajectory
1. [0.0s] Root orchestrator spawned SecurityAnalystAgent (PID: 40182).
2. [1.2s] Ingested src/auth/jwt_provider.ts AST.
3. [3.4s] Detected unvalidated header token algorithm (CVE-2026-X).
4. [5.1s] Generated inverse diff patch in sandbox.
5. [7.0s] Executed test:invariants (21/21 passing).
6. [8.4s] Finalized deliverables to artifacts/ -> Ephemeral memory pruned.`,
  },
  {
    id: 'artifact-pdf',
    name: 'security_audit_report.pdf',
    type: 'artifact_pdf',
    path: 'tasks/task-2026-cve-audit/artifacts/security_audit_report.pdf',
    badge: '[TASK ARTIFACT]',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    description: 'Compiled deliverable stored exclusively in task sandbox. Zero root workspace pollution.',
    content: `===============================================================
NAVA OS SECURITY AUDIT DELIVERABLE (TYPST COMPILED)
Target: src/auth/jwt_provider.ts
SHA-256 Digest: 88a10f...9b2
===============================================================

Executive Summary:
AST inspection identified potential timing attack vector in token
signature verification. Verified fix synthesized via atomic AST diff.

Invariant Verification:
- Invariant #01 (Gateway-Only): PASS
- Invariant #02 (Non-Increasing Scope): PASS
- Invariant #21 (21 Test Harness): PASS

Receipt ID: rcpt_sha256_77b1029c`,
  },
  {
    id: 'audit-ledger',
    name: 'immutable_receipts.jsonl',
    type: 'audit_ledger',
    path: 'audit_ledger/immutable_receipts.jsonl',
    badge: '[APPEND-ONLY LEDGER]',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    description: 'Cryptographic append-only proof ledger storing tamper-evident AI receipts with parent hashes.',
    content: `{"receipt_id":"rcpt_001","timestamp":"2026-08-23T05:40:12Z","tool":"ast.parse","caller":"dyn_auditor","prev_hash":"00000000","hash":"sha256:1a8b..."}
{"receipt_id":"rcpt_002","timestamp":"2026-08-23T05:40:15Z","tool":"patch.apply","caller":"dyn_auditor","prev_hash":"sha256:1a8b...","hash":"sha256:7f3e..."}
{"receipt_id":"rcpt_003","timestamp":"2026-08-23T05:40:19Z","tool":"test.run","caller":"verifier_agent","prev_hash":"sha256:7f3e...","hash":"sha256:9c01..."}`,
  },
];

export function ProjectsTaskIsolationSection({ onShowToast }: ProjectsTaskIsolationSectionProps) {
  const [selectedFileId, setSelectedFileId] = useState<string>('project-memory');

  const activeFile = FILES.find((f) => f.id === selectedFileId) || FILES[0];

  return (
    <section id="projects-isolation" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[11px] font-mono font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              [WORKSPACE ISOLATION & MEMORY]
            </span>
            <span className="text-xs font-mono text-slate-400">ZERO ROOT POLLUTION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Deep Long-Term Memory Meets Pristine Task Sandboxing
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Keep codebase architectural rules strictly separated from ephemeral session outputs. Durable project context lives in <code className="font-mono text-xs text-slate-800 bg-slate-200/60 px-1 py-0.5 rounded">projects/&lt;name&gt;/project_memory.md</code>, while every task operates in its own sandboxed workspace with dedicated <code className="font-mono text-xs text-slate-800 bg-slate-200/60 px-1 py-0.5 rounded">artifacts/</code> folders.
          </p>
        </div>

        {/* Interactive Workspace Tree & File Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Workspace Directory Tree (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-slate-600" />
                <span className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                  NAVA Workspace Tree
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Click file to inspect</span>
            </div>

            {/* Visual File Tree Structure */}
            <div className="space-y-1 text-xs font-mono">
              {/* Project Folder */}
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <FolderOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>projects/personal-agent-os/</span>
                </div>
                <div className="pl-5 space-y-1">
                  <button
                    type="button"
                    onClick={() => setSelectedFileId('project-memory')}
                    className={`w-full text-left px-2 py-1 rounded flex items-center justify-between cursor-pointer transition-colors ${
                      selectedFileId === 'project-memory'
                        ? 'bg-slate-900 text-white font-medium shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <FileText className="w-3 h-3 text-indigo-400" />
                      <span>project_memory.md</span>
                    </span>
                    <span className="text-[9px] opacity-70">DURABLE</span>
                  </button>
                </div>
              </div>

              {/* Task Folder */}
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <FolderOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>tasks/task-2026-cve-audit/</span>
                </div>
                <div className="pl-5 space-y-1">
                  <button
                    type="button"
                    onClick={() => setSelectedFileId('task-memory')}
                    className={`w-full text-left px-2 py-1 rounded flex items-center justify-between cursor-pointer transition-colors ${
                      selectedFileId === 'task-memory'
                        ? 'bg-slate-900 text-white font-medium shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <FileCode2 className="w-3 h-3 text-amber-400" />
                      <span>task_memory.md</span>
                    </span>
                    <span className="text-[9px] opacity-70">EPHEMERAL</span>
                  </button>

                  <div className="pl-3 space-y-1 border-l border-slate-200">
                    <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 py-0.5">
                      <Folder className="w-2.5 h-2.5" />
                      <span>artifacts/</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFileId('artifact-pdf')}
                      className={`w-full text-left px-2 py-1 rounded flex items-center justify-between cursor-pointer transition-colors ${
                        selectedFileId === 'artifact-pdf'
                          ? 'bg-slate-900 text-white font-medium shadow-xs'
                          : 'text-slate-600 hover:bg-slate-200/70'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <FileCheck className="w-3 h-3 text-emerald-400" />
                        <span>security_audit_report.pdf</span>
                      </span>
                      <span className="text-[9px] opacity-70">DELIVERABLE</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Audit Ledger Folder */}
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <FolderOpen className="w-3.5 h-3.5 text-slate-600" />
                  <span>audit_ledger/</span>
                </div>
                <div className="pl-5 space-y-1">
                  <button
                    type="button"
                    onClick={() => setSelectedFileId('audit-ledger')}
                    className={`w-full text-left px-2 py-1 rounded flex items-center justify-between cursor-pointer transition-colors ${
                      selectedFileId === 'audit-ledger'
                        ? 'bg-slate-900 text-white font-medium shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <HardDrive className="w-3 h-3 text-slate-400" />
                      <span>immutable_receipts.jsonl</span>
                    </span>
                    <span className="text-[9px] opacity-70">SHA-256</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live File Inspector (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                <span className="font-mono text-xs font-semibold text-slate-800 truncate max-w-[280px] sm:max-w-none">
                  {activeFile.path}
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${activeFile.badgeColor}`}>
                {activeFile.badge}
              </span>
            </div>

            <div className="p-5 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto min-h-[260px]">
              <pre className="text-slate-300">{activeFile.content}</pre>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
              <span>{activeFile.description}</span>
              <span className="font-mono text-[10px] text-slate-400">Pristine Sandboxing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
