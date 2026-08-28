import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Cpu, 
  Terminal, 
  Key, 
  Layers
} from 'lucide-react';
import { MEMORY_TIERS, GATEWAY_STEPS } from '../data/blueprintData';

export const ArchitectureBento: React.FC = () => {
  const [selectedGatewayStep, setSelectedGatewayStep] = useState<number>(5);
  const [selectedMemoryTier, setSelectedMemoryTier] = useState<number>(4);

  const step = GATEWAY_STEPS.find((s) => s.stepNumber === selectedGatewayStep) || GATEWAY_STEPS[4];
  const tier = MEMORY_TIERS.find((t) => t.tier === selectedMemoryTier) || MEMORY_TIERS[3];

  return (
    <section id="architecture" className="py-20 px-4 md:px-6 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
          System Architecture
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Four foundational pillars and a deterministic 17-step Action Gateway.
        </p>
      </div>

      {/* 4 Core Pillar Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-sm text-slate-900">
            17-Step Action Gateway
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Single mandatory choke point for all tool calls, deterministic risk scoring, and scope enforcement.
          </p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-sm text-slate-900">
            4-Tier Memory & AI Twin
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Working, episodic, semantic, and profile tiers with explicit user governance for high-trust facts.
          </p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-sm text-slate-900">
            Dynamic Agent Swarms
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Task-specific agents composed on-demand, bounded by MAX_DEPTH = 3 and intersection scopes.
          </p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
            <Key className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-sm text-slate-900">
            Local-First Security
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Short-lived scoped credentials, zero model token exposure, and offline-capable vector storage.
          </p>
        </div>
      </div>

      {/* Interactive 17-Step Action Gateway Pipeline */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display font-bold text-base text-slate-900">
              The 17-Step Action Gateway Pipeline
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any step to inspect its deterministic rule and fail-safe policy.
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 self-start">
            Step {selectedGatewayStep} of 17
          </span>
        </div>

        {/* Horizontal Step Selector */}
        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-18 gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
          {GATEWAY_STEPS.map((s) => (
            <button
              key={s.stepNumber}
              onClick={() => setSelectedGatewayStep(s.stepNumber)}
              className={`py-2 px-1 text-center rounded text-xs font-mono transition-all cursor-pointer ${
                selectedGatewayStep === s.stepNumber
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              #{s.stepNumber}
            </button>
          ))}
        </div>

        {/* Step Preview Box */}
        <div className="p-4 bg-slate-950 text-slate-200 rounded-lg space-y-3 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] text-slate-400">SUBSYSTEM: {step.subsystem}</span>
              <div className="text-white font-bold text-sm mt-0.5">
                Step {step.stepNumber}: {step.name}
              </div>
            </div>
            <span className="text-emerald-400 text-[11px] self-start sm:self-auto">
              Fail-safe: {step.failureAction.split(';')[0]}
            </span>
          </div>

          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            {step.description}
          </p>

          <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-[11px] text-indigo-300">
            <code>{step.codeSnippet}</code>
          </div>
        </div>
      </div>
    </section>
  );
};
