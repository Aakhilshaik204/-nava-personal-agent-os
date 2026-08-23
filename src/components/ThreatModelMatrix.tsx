import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Eye, 
  ShieldCheck, 
  Terminal, 
  RotateCcw 
} from 'lucide-react';
import { THREAT_CATALOG } from '../data/blueprintData';

export const ThreatModelMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThreatId, setSelectedThreatId] = useState<string>('T-01');

  const filteredThreats = THREAT_CATALOG.filter(
    (t) =>
      t.threat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.attackSurface.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.mitigation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeThreat = THREAT_CATALOG.find((t) => t.id === selectedThreatId) || THREAT_CATALOG[0];

  return (
    <section id="threat-model" className="py-20 px-4 md:px-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Threat Model & Matrix
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Section 29 Threat Catalog: Attack Surface → Mitigation → Forensic Recovery.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search threat catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* List of threats */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 overflow-hidden max-h-[480px] overflow-y-auto divide-y divide-slate-100">
          {filteredThreats.map((t) => {
            const isSelected = selectedThreatId === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedThreatId(t.id)}
                className={`p-3 text-xs flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-slate-100 font-semibold text-slate-900'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-slate-400 text-[11px] w-8">
                    {t.id}
                  </span>
                  <span className="truncate">{t.threat}</span>
                </div>

                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                    t.severity === 'CRITICAL'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {t.severity}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Threat Details */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 space-y-3.5 text-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {activeThreat.id} // Threat Vector
                </span>
                <h3 className="font-display font-bold text-base text-slate-900 mt-0.5">
                  {activeThreat.threat}
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  activeThreat.severity === 'CRITICAL'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {activeThreat.severity}
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="font-mono text-[10px] text-slate-500 uppercase">Attack Surface:</div>
              <div className="text-slate-800 font-mono">{activeThreat.attackSurface}</div>
            </div>

            <div className="p-2.5 bg-emerald-50/50 rounded border border-emerald-200/80 space-y-1">
              <div className="font-mono text-[10px] text-emerald-800 uppercase">Deterministic Mitigation:</div>
              <div className="text-emerald-950 leading-relaxed">{activeThreat.mitigation}</div>
            </div>

            <div className="p-2.5 bg-indigo-50/50 rounded border border-indigo-200/80 space-y-1">
              <div className="font-mono text-[10px] text-indigo-800 uppercase">Detection Mechanism:</div>
              <div className="text-indigo-950 leading-relaxed">{activeThreat.detection}</div>
            </div>

            <div className="p-2.5 bg-slate-950 text-slate-200 rounded font-mono space-y-1">
              <div className="text-[10px] text-slate-400 uppercase">Forensic Recovery Path:</div>
              <div className="text-slate-300">{activeThreat.recovery}</div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Enforced via Action Gateway (Sec 12)</span>
            <span className="text-slate-700">100% CI Tested</span>
          </div>
        </div>
      </div>
    </section>
  );
};
