import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Code2
} from 'lucide-react';

export const DeveloperStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cli' | 'python' | 'risk'>('cli');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Risk simulator state
  const [isExternal, setIsExternal] = useState(true); // +30
  const [hasAttachment, setHasAttachment] = useState(true); // +20
  const [isSensitive, setIsSensitive] = useState(false); // +40
  const [isOutsideHours, setIsOutsideHours] = useState(false); // +15

  const score = (isExternal ? 30 : 0) + (hasAttachment ? 20 : 0) + (isSensitive ? 40 : 0) + (isOutsideHours ? 15 : 0);

  const getDecision = (s: number) => {
    if (s < 20) return { tier: 'LOW', action: 'AUTO_EXECUTE (ALLOW)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (s < 50) return { tier: 'MEDIUM', action: 'AUDIT_LOG_ONLY', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (s < 75) return { tier: 'HIGH', action: 'REQUIRE HUMAN APPROVAL (HITL)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { tier: 'CRITICAL', action: 'HARD BLOCKED BY GATEWAY', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const decision = getDecision(score);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const cliCode = `# Install NAVA CLI from PyPI
pip install nava-agent

# Launch personal agent OS
nava`;

  const pythonSdkCode = `from nava.core import NavaRuntime, TaskBudget

runtime = NavaRuntime(mode="LOCAL_PREFERRED", max_spawn_depth=3)

result = runtime.execute_goal(
    goal="Analyze Q3 earnings PDF, chunk to Qdrant, generate summary",
    budget=TaskBudget(max_steps=50, max_tokens=25_000),
    require_receipt=True
)

print(f"Status: {result.status} | Receipt: {result.receipt.sha256_hash}")`;

  return (
    <section id="developer-studio" className="py-20 px-4 md:px-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Developer Studio
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Integrate NAVA into terminal workflows, Python pipelines, or test risk functions.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('cli')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'cli' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600'
            }`}
          >
            CLI Quickstart
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'python' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600'
            }`}
          >
            Python SDK
          </button>
          <button
            onClick={() => setActiveTab('risk')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'risk' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600'
            }`}
          >
            Risk Simulator
          </button>
        </div>
      </div>

      {/* Code / Playground Display */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        {activeTab === 'cli' && (
          <div className="p-5 bg-slate-950 text-slate-200 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span>bash // nava-cli v2.0</span>
              <button
                onClick={() => copyToClipboard(cliCode, 'cli')}
                className="hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedCode === 'cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === 'cli' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-indigo-300 leading-relaxed overflow-x-auto">
              <code>{cliCode}</code>
            </pre>
          </div>
        )}

        {activeTab === 'python' && (
          <div className="p-5 bg-slate-950 text-slate-200 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span>python // pipeline.py</span>
              <button
                onClick={() => copyToClipboard(pythonSdkCode, 'python')}
                className="hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedCode === 'python' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === 'python' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-slate-200 leading-relaxed overflow-x-auto">
              <code>{pythonSdkCode}</code>
            </pre>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="p-5 space-y-5 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <div className="font-display font-bold text-sm text-slate-900">
                  Deterministic Additive Risk Simulator
                </div>
                <div className="text-slate-500 text-[11px]">
                  Formula: Score = Σ (Factor_Weights). Evaluated mathematically before any tool executes.
                </div>
              </div>
              <span className="font-mono text-slate-500">Section 14.1</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <label className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-800">External Recipient</div>
                  <div className="text-[10px] text-slate-500">+30 risk points</div>
                </div>
                <input
                  type="checkbox"
                  checked={isExternal}
                  onChange={(e) => setIsExternal(e.target.checked)}
                  className="rounded text-indigo-600"
                />
              </label>

              <label className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-800">File Attachment</div>
                  <div className="text-[10px] text-slate-500">+20 risk points</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasAttachment}
                  onChange={(e) => setHasAttachment(e.target.checked)}
                  className="rounded text-indigo-600"
                />
              </label>

              <label className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-800">Sensitive / PII File</div>
                  <div className="text-[10px] text-slate-500">+40 risk points</div>
                </div>
                <input
                  type="checkbox"
                  checked={isSensitive}
                  onChange={(e) => setIsSensitive(e.target.checked)}
                  className="rounded text-indigo-600"
                />
              </label>

              <label className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-semibold text-slate-800">Outside Hours</div>
                  <div className="text-[10px] text-slate-500">+15 risk points</div>
                </div>
                <input
                  type="checkbox"
                  checked={isOutsideHours}
                  onChange={(e) => setIsOutsideHours(e.target.checked)}
                  className="rounded text-indigo-600"
                />
              </label>
            </div>

            <div className="p-3.5 bg-slate-900 text-white rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Score:</span>
                <span className="text-xl font-bold text-white">{score} / 100</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${decision.color}`}>
                  {decision.tier} RISK
                </span>
              </div>
              <div className="text-indigo-300 text-xs">
                Gateway Decision: <strong>{decision.action}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
