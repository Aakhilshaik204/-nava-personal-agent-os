import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

interface MemoryStatementProps {
  onOpenBlueprint: () => void;
}

export function MemoryStatement({ onOpenBlueprint }: MemoryStatementProps) {
  return (
    <section className="memory-statement" id="memory">
      <div className="memory-statement-copy">
        <p className="field-kicker">AI TWIN / FOUR-TIER MEMORY</p>
        <h2>
          Remember the work.
          <br />
          Question the claim.
        </h2>
        <p>
          Working, episodic, semantic, and profile memory keep Nava useful over time. Provenance and
          trust status prevent a retrieved suggestion from silently becoming your fact.
        </p>
        <button
          type="button"
          className="cursor-pointer inline-flex items-center gap-1 text-sm font-semibold"
          onClick={onOpenBlueprint}
        >
          <span>Read memory security controls</span>
          <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="memory-stack" aria-label="Four tier memory visualization">
        <div className="memory-layer memory-layer--one">
          <span>WORKING</span>
          <b>Active task context</b>
          <i>01</i>
        </div>

        <div className="memory-layer memory-layer--two">
          <span>EPISODIC</span>
          <b>Past tasks & events</b>
          <i>02</i>
        </div>

        <div className="memory-layer memory-layer--three">
          <span>SEMANTIC</span>
          <b>Retrievable knowledge</b>
          <i>03</i>
        </div>

        <div className="memory-layer memory-layer--four">
          <span>PROFILE</span>
          <b>User-approved facts</b>
          <i>04</i>
          <em>
            <Check size={13} />
            <span>VERIFIED ONLY</span>
          </em>
        </div>
      </div>
    </section>
  );
}
