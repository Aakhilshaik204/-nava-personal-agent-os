import React, { useState } from 'react';
import { 
  Package, 
  FileCode2, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Check, 
  Copy, 
  Terminal, 
  ArrowUpRight, 
  Sparkles, 
  Code,
  AlertTriangle,
  FolderCode
} from 'lucide-react';

interface SkillsSubsystemSectionProps {
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

interface SkillPack {
  id: string;
  name: string;
  version: string;
  category: string;
  description: string;
  fingerprint: string;
  status: 'verified' | 'unapproved_locked' | 'approved';
  requiredTools: string[];
  manifestMarkdown: string;
  allowedScripts: string[];
}

const SKILL_PACKS: SkillPack[] = [
  {
    id: 'typst-pdf',
    name: 'Typst PDF Maker',
    version: 'v1.4.0',
    category: 'Publishing & Typesetting',
    description: 'Compiles rich technical specifications, formal proofs, and IEEE-standard reports into crisp PDF documents via Typst engine.',
    fingerprint: 'sha256:4a8b9f1c7d2e...93e1',
    status: 'verified',
    requiredTools: ['filesystem.read', 'typst.compile', 'artifacts.write'],
    allowedScripts: ['scripts/compile_typst.py', 'scripts/lint_markup.py'],
    manifestMarkdown: `---
name: typst-pdf-maker
version: 1.4.0
description: Compile mathematical and technical memos via Typst
author: nava-core
sha256_hash: 4a8b9f1c7d2e83109aa0f...93e1
permissions:
  - filesystem:read:tasks/**/artifacts/*
  - artifacts:write:dist/
  - subprocess:exec:typst
sandbox_isolation: container_strict
---

# Skill Instructions
1. Parse technical memorandum input.
2. Structure sections using Typst 0.11 syntax.
3. Validate math formulas and vector graphs.
4. Output compiled PDF to \`tasks/<id>/artifacts/\`.`,
  },
  {
    id: 'dsa-notes',
    name: 'DSA Notes Synthesizer',
    version: 'v2.1.0',
    category: 'Algorithms & Computer Science',
    description: 'Synthesizes algorithmic problem breakdowns, time/space complexity graphs, LeetCode patterns, and edge-case test suites.',
    fingerprint: 'sha256:9b12a830c21e...88bb',
    status: 'verified',
    requiredTools: ['rag.query_semantic', 'ast.parse', 'filesystem.write'],
    allowedScripts: ['scripts/generate_complexity_chart.py'],
    manifestMarkdown: `---
name: dsa-notes-synthesizer
version: 2.1.0
description: Algorithmic problem analysis and complexity breakdown
author: nava-community
sha256_hash: 9b12a830c21e1490fa83c...88bb
permissions:
  - rag:query:algorithms_kb
  - ast:parse:python
  - filesystem:write:notes/dsa/*
---

# Skill Instructions
- Ingest problem statement and constraints.
- Provide optimal approach with Big-O derivation.
- Generate Python & Rust implementations with type hints.
- Output visual state transition tables.`,
  },
  {
    id: 'skill-creator',
    name: 'Skill Creator (Meta-Skill)',
    version: 'v1.0.0',
    category: 'Kernel Metaprogramming',
    description: 'Meta-skill that scaffolds, unit-tests, and validates new SKILL.md packages against NAVA governance rules and hash verification.',
    fingerprint: 'sha256:1f44c988a032...029a',
    status: 'verified',
    requiredTools: ['filesystem.scaffold', 'linter.skill_spec', 'crypto.hash_sha256'],
    allowedScripts: ['scripts/scaffold_skill.py', 'scripts/verify_integrity.py'],
    manifestMarkdown: `---
name: skill-creator
version: 1.0.0
description: Meta-skill for scaffolding and certifying new skill packs
author: nava-core
sha256_hash: 1f44c988a032aa901198f...029a
permissions:
  - filesystem:write:skills/**
  - crypto:hash_sha256
---

# Skill Instructions
- Scaffold standard directory: \`skills/<name>/SKILL.md\`.
- Generate YAML frontmatter with strict capability schemas.
- Calculate SHA-256 integrity digest.
- Register with local plugin catalog.`,
  },
];

export function SkillsSubsystemSection({ onShowToast }: SkillsSubsystemSectionProps) {
  const [selectedSkillId, setSelectedSkillId] = useState<string>('typst-pdf');
  const [copied, setCopied] = useState<boolean>(false);
  const [isLockedDemo, setIsLockedDemo] = useState<boolean>(false);

  const activeSkill = SKILL_PACKS.find((s) => s.id === selectedSkillId) || SKILL_PACKS[0];

  const handleCopyManifest = async () => {
    try {
      await navigator.clipboard.writeText(activeSkill.manifestMarkdown);
      setCopied(true);
      onShowToast('SKILL.md copied', 'Standard skill specification ready for local runtime.', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('Copy unavailable', 'Select the text manually.', 'warning');
    }
  };

  const toggleLockDemo = () => {
    setIsLockedDemo((prev) => !prev);
    if (!isLockedDemo) {
      onShowToast('Skill Tamper Detected', 'Hash mismatch! Skill locked until /plugin approve is run.', 'warning');
    } else {
      onShowToast('Skill Approved', 'Cryptographic signature re-verified.', 'success');
    }
  };

  return (
    <section id="skills-subsystem" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[11px] font-mono font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              [EXTENSIBLE SKILLS ENGINE]
            </span>
            <span className="text-xs font-mono text-slate-400">HASH-LOCKED & GOVERNED</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Modular Capabilities via Governed Skill Packs
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Extend NAVA on demand using standard <code className="font-mono text-xs text-slate-800 bg-slate-200/60 px-1 py-0.5 rounded">SKILL.md</code> definitions. Skills provide domain-specific methodologies, prompt engineering templates, and sandboxed scripts without altering the underlying OS kernel.
          </p>
        </div>

        {/* Hash-Lock Security Boundary Explainer */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-sm text-slate-900">
                Cryptographic Integrity & Hash-Lock Boundary
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every skill package is sealed with a SHA-256 fingerprint. Any local tampering or unauthorized modification immediately freezes execution until explicitly authorized by the user via <code className="font-mono text-xs text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">/plugin approve &lt;skill_name&gt;</code>.
            </p>
          </div>

          {/* Interactive Hash-Lock Simulation Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleLockDemo}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 border transition-all cursor-pointer ${
                isLockedDemo
                  ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-xs'
              }`}
            >
              {isLockedDemo ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>[STATUS: TAMPER-LOCKED]</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>[STATUS: HASH-VERIFIED]</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Skill Catalog & Manifest Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Skill Catalog Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider px-1">
              Governed Skill Catalog
            </div>

            {SKILL_PACKS.map((skill) => {
              const isSelected = selectedSkillId === skill.id;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm">{skill.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {skill.version}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {skill.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? 'text-slate-400' : 'text-slate-400'}>
                      {skill.category}
                    </span>
                    <span className={isSelected ? 'text-emerald-400 font-semibold' : 'text-emerald-700 font-semibold'}>
                      ✓ {skill.requiredTools.length} tools scoped
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Live SKILL.md Inspector (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-slate-600" />
                <span className="font-mono text-xs font-semibold text-slate-800">
                  skills/{activeSkill.id}/SKILL.md
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200/70 text-slate-700 rounded">
                  [YAML FRONTMATTER]
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyManifest}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-2.5 py-1 rounded-md cursor-pointer transition-colors"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy SKILL.md'}</span>
              </button>
            </div>

            <div className="p-5 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="text-slate-300">{activeSkill.manifestMarkdown}</pre>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  SHA-256 Fingerprint:
                </span>
                <span className="font-mono text-[11px] text-slate-800 truncate">
                  {activeSkill.fingerprint}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono text-[11px] text-slate-600">
                  Approve command: <code className="text-slate-900 font-semibold bg-white px-1 py-0.5 rounded border border-slate-200">/plugin approve {activeSkill.id}</code>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
