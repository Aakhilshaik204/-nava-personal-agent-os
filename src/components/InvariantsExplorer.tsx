import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Play, 
  CheckCircle2, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import { SYSTEM_INVARIANTS } from '../data/invariants';
import { InvariantCategory } from '../types';

export const InvariantsExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [testedInvariants, setTestedInvariants] = useState<Record<number, boolean>>({});
  const [selectedInvId, setSelectedInvId] = useState<number>(1);

  const categories: Array<InvariantCategory | 'All'> = [
    'All',
    'Authority & Permissions',
    'Memory & AI Twin',
    'Execution & Concurrency',
    'Deterministic Governance',
    'Safety & Emergency',
  ];

  const filteredInvariants = SYSTEM_INVARIANTS.filter((inv) => {
    const matchesCategory = selectedCategory === 'All' || inv.category === selectedCategory;
    const matchesSearch =
      inv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.plainDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.mathematicalRule.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTestAll = () => {
    const allPassed: Record<number, boolean> = {};
    SYSTEM_INVARIANTS.forEach((inv) => {
      allPassed[inv.id] = true;
    });
    setTestedInvariants(allPassed);
  };

  const handleRunSingleTest = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTestedInvariants((prev) => ({ ...prev, [id]: true }));
  };

  const selectedInv = SYSTEM_INVARIANTS.find((inv) => inv.id === selectedInvId) || SYSTEM_INVARIANTS[0];

  return (
    <section id="invariants" className="py-20 px-4 md:px-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            21 System Invariants
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Deterministic mathematical contracts enforced at the Action Gateway choke point.
          </p>
        </div>

        <button
          onClick={handleTestAll}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run All CI Invariant Checks</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invariants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>
      </div>

      {/* Main Split View: List on Left, Invariant Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Invariants List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 overflow-hidden max-h-[500px] overflow-y-auto divide-y divide-slate-100">
          {filteredInvariants.map((inv) => {
            const isTested = testedInvariants[inv.id];
            const isSelected = selectedInvId === inv.id;

            return (
              <div
                key={inv.id}
                onClick={() => setSelectedInvId(inv.id)}
                className={`p-3 text-xs flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-slate-100 font-semibold text-slate-900'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="font-mono text-slate-400 text-[11px] w-6">
                    #{inv.id}
                  </span>
                  <span className="truncate">{inv.title}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isTested ? (
                    <span className="text-emerald-600 font-mono text-[10px] flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> PASSED
                    </span>
                  ) : (
                    <button
                      onClick={(e) => handleRunSingleTest(inv.id, e)}
                      className="px-2 py-0.5 text-[10px] font-mono bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-600 cursor-pointer"
                    >
                      Test
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Invariant Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {selectedInv.category} // Invariant #{selectedInv.id}
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mt-0.5">
                  {selectedInv.title}
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {selectedInv.sectionRef}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {selectedInv.plainDescription}
            </p>

            <div className="p-3 bg-slate-950 text-slate-200 rounded-lg font-mono text-xs space-y-1">
              <div className="text-[10px] text-slate-400 uppercase">Mathematical Rule:</div>
              <div className="text-indigo-300 break-all">{selectedInv.mathematicalRule}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 text-[10px] font-mono">THREAT MITIGATED</div>
                <div className="text-slate-800 mt-0.5">{selectedInv.threatMitigated}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 text-[10px] font-mono">ENFORCEMENT POINT</div>
                <div className="text-slate-800 font-mono mt-0.5">{selectedInv.enforcementPoint}</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>CI Assertion: {selectedInv.testAssertion.slice(0, 32)}...</span>
            <span className="text-emerald-600 font-semibold">100% CI Gated</span>
          </div>
        </div>
      </div>
    </section>
  );
};
