import React from 'react';

export function ExecutionStrip() {
  return (
    <section className="execution-strip" aria-label="Nava execution pathway">
      <div className="execution-strip-inner">
        <span>LOCAL GOAL</span>
        <i />
        <b>PLAN</b>
        <em>→</em>
        <b className="is-active">POLICY</b>
        <em>→</em>
        <b>TOOLS</b>
        <em>→</em>
        <b>RECEIPT</b>
        <i />
        <span>APPEND-ONLY LEDGER</span>
      </div>
    </section>
  );
}
