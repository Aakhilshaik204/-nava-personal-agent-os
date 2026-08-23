import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, CircleCheck, ShieldCheck, ClipboardCheck } from 'lucide-react';

export interface InvariantItem {
  id: string;
  name: string;
  rule: string;
  effect: string;
}

export const INVARIANTS_DATA: InvariantItem[] = [
  {
    id: '01',
    name: 'Gateway-only mutation',
    rule: 'mutation → Action Gateway',
    effect: 'No tool request gets a privileged side path.',
  },
  {
    id: '02',
    name: 'Non-increasing scope',
    rule: 'child ⊆ parent ∩ requested ∩ policy',
    effect: 'Agents can reduce authority, never grow it.',
  },
  {
    id: '03',
    name: 'Deterministic decision',
    rule: 'decision = f(policy, risk, budget)',
    effect: 'The model does not decide its own authorization.',
  },
  {
    id: '04',
    name: 'Write-exclusive locks',
    rule: 'write(resource) → exclusive lock',
    effect: 'Parallel work cannot silently overwrite itself.',
  },
  {
    id: '05',
    name: 'Credential non-exposure',
    rule: 'model_view(credentials) = ∅',
    effect: 'Tools receive scoped access without revealing secrets.',
  },
  {
    id: '06',
    name: 'Human authority',
    rule: 'risk ≥ high → approval required',
    effect: 'High-impact actions wait for a human decision.',
  },
  {
    id: '07',
    name: 'Receipts and ledger',
    rule: 'execute(action) → receipt → append-only ledger',
    effect: 'Meaningful work leaves durable evidence.',
  },
  {
    id: '08',
    name: 'Memory trust gate',
    rule: 'VERIFIED(profile) → explicit user action',
    effect: 'Retrieved content cannot silently become personal truth.',
  },
  {
    id: '09',
    name: 'Untrusted content boundary',
    rule: 'external content → data, never authority',
    effect: 'Prompt injection cannot originate execution.',
  },
  {
    id: '10',
    name: 'Out-of-band halt',
    rule: 'human stop → revoke + pause + block',
    effect: 'A user can halt the system independently of the model.',
  },
  {
    id: '11',
    name: 'Bounded fan-out depth',
    rule: 'depth(sub_agents) ≤ 3 ∧ count ≤ 10',
    effect: 'Prevents runaway recursive agent explosion and resource drain.',
  },
  {
    id: '12',
    name: 'Deterministic risk scoring',
    rule: 'risk = max(tool.risk, target.risk, blast_radius)',
    effect: 'Risk evaluation is mathematically bound and cannot be prompt-coerced.',
  },
  {
    id: '13',
    name: 'Single writer per domain',
    rule: 'count(writers(domain)) ≤ 1',
    effect: 'Only the designated synthesis agent can commit file or state changes.',
  },
  {
    id: '14',
    name: 'Ephemeral credential leasing',
    rule: 'lease_time(token) ≤ action_ttl ∧ auto_revoke',
    effect: 'Zero permanent tokens exposed; credentials expire immediately upon completion.',
  },
  {
    id: '15',
    name: 'Air-gapped planning context',
    rule: 'planning_context ∩ unverified_inputs = ∅',
    effect: 'System planner cannot be hijacked by raw scraped web content.',
  },
  {
    id: '16',
    name: 'Immutable cryptographic hash-chain',
    rule: 'hash(record_i) = SHA256(record_i || hash_{i-1})',
    effect: 'Every receipt forms a tamper-evident chain stored in local SQLite.',
  },
  {
    id: '17',
    name: 'Skill promotion verification',
    rule: 'promote(skill) → user_reviewed(SKILL.md)',
    effect: 'Autonomous routines only become permanent skills with human review.',
  },
  {
    id: '18',
    name: 'Strict resource quota cap',
    rule: 'tokens_used ≤ token_cap ∧ cost_spent ≤ budget_cap',
    effect: 'Execution hard-halts if budget bounds are exceeded.',
  },
  {
    id: '19',
    name: 'Reversible fallback requirement',
    rule: 'action.reversible == TRUE ∨ requires_double_confirm',
    effect: 'Destructive mutations require explicit secondary authorization.',
  },
  {
    id: '20',
    name: 'Local-first encrypted isolation',
    rule: 'storage.mode == LOCAL_ENCRYPTED ∧ cloud == OPT_IN',
    effect: 'Personal knowledge and twin memory never leave the local environment.',
  },
  {
    id: '21',
    name: 'Graceful fault isolation',
    rule: 'fault(agent_k) → isolate(agent_k) ∧ report_to_host',
    effect: 'Individual sub-agent errors never crash the primary operating system.',
  },
];

export function ProofSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState('01');

  const filteredInvariants = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return INVARIANTS_DATA;
    return INVARIANTS_DATA.filter(
      (item) =>
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.rule.toLowerCase().includes(q) ||
        item.effect.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const activeInvariant =
    INVARIANTS_DATA.find((item) => item.id === selectedId) ?? INVARIANTS_DATA[0];

  return (
    <section className="proof-section" id="proof" aria-labelledby="proof-title">
      <div className="proof-intro">
        <p className="field-kicker">21 UNIT-TESTABLE SYSTEM INVARIANTS / BLUEPRINT §27</p>
        <h2 id="proof-title">Proof is a product feature.</h2>
        <p>
          Search the contracts that prevent Nava from becoming more privileged simply because it
          becomes more capable.
        </p>
      </div>

      <div className="proof-console">
        {/* Left Search & List */}
        <aside>
          <label>
            <Search size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contracts"
              aria-label="Search contracts"
            />
          </label>

          <div className="proof-list">
            {filteredInvariants.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`cursor-pointer ${item.id === selectedId ? 'is-active' : ''}`}
                onClick={() => setSelectedId(item.id)}
              >
                <span>{item.id}</span>
                <b>{item.name}</b>
                <ChevronRight size={14} />
              </button>
            ))}

            {filteredInvariants.length === 0 && <p>No contract found.</p>}
          </div>
        </aside>

        {/* Right Active Details Card */}
        <article>
          <div className="proof-badge">
            <CircleCheck size={16} />
            <span>RELEASE-GATED CONTRACT</span>
          </div>

          <div className="proof-path">
            <span>request</span>
            <ChevronRight size={13} />
            <span>policy</span>
            <ChevronRight size={13} />
            <span className="is-live">
              <i /> proof
            </span>
            <ChevronRight size={13} />
            <span>receipt</span>
          </div>

          <span className="proof-number">INVARIANT / {activeInvariant.id}</span>
          <h3>{activeInvariant.name}</h3>
          <code>{activeInvariant.rule}</code>
          <p>{activeInvariant.effect}</p>

          <div className="proof-footer">
            <span>
              <ShieldCheck size={15} />
              <span>unit-testable</span>
            </span>
            <span>
              <ClipboardCheck size={15} />
              <span>receipt-aware</span>
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
