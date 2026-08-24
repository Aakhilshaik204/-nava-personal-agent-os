import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RuntimeWindow } from './components/RuntimeWindow';
import { ExecutionStrip } from './components/ExecutionStrip';
import { DynamicAgentsSection } from './components/DynamicAgentsSection';
import { ParallelSwarmSection } from './components/ParallelSwarmSection';
import { SkillsSubsystemSection } from './components/SkillsSubsystemSection';
import { UniversalToolsMcpSection } from './components/UniversalToolsMcpSection';
import { ProjectsTaskIsolationSection } from './components/ProjectsTaskIsolationSection';
import { ProductSurfaces } from './components/ProductSurfaces';
import { ProofSection } from './components/ProofSection';
import { MemoryStatement } from './components/MemoryStatement';
import { DeveloperSurfaces } from './components/DeveloperSurfaces';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { BlueprintModal } from './components/BlueprintModal';

export default function App() {
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    title: string,
    description?: string,
    type: 'info' | 'success' | 'warning' = 'info'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="field-page min-h-screen">
      {/* Navigation */}
      <Navbar
        onOpenBlueprint={() => setIsBlueprintOpen(true)}
        onShowToast={addToast}
      />

      {/* Main Content */}
      <main id="top">
        {/* 1. Hero Section */}
        <Hero
          onOpenBlueprint={() => setIsBlueprintOpen(true)}
          onShowToast={addToast}
        />

        {/* 2. Runtime Window / Live Execution Field */}
        <RuntimeWindow onShowToast={addToast} />

        {/* 3. Execution Strip */}
        <ExecutionStrip />

        {/* 4. ⚡ Dynamic Agents (JIT Synthesis & Teardown) */}
        <DynamicAgentsSection onShowToast={addToast} />

        {/* 5. 🔀 Multi-Agent Parallel Swarm Execution */}
        <ParallelSwarmSection onShowToast={addToast} />

        {/* 6. 🧠 Extensible Skills Subsystem (Hash-Locked & Governed) */}
        <SkillsSubsystemSection onShowToast={addToast} />

        {/* 7. 🔌 Universal Tool Suite & Model Context Protocol (MCP) */}
        <UniversalToolsMcpSection onShowToast={addToast} />

        {/* 8. 📁 Claude-Style Projects & Task Isolation */}
        <ProjectsTaskIsolationSection onShowToast={addToast} />

        {/* 9. Statement & Product Surfaces (Gateway, Runtime, Memory Trust) */}
        <ProductSurfaces
          onShowToast={addToast}
          onOpenBlueprint={() => setIsBlueprintOpen(true)}
        />

        {/* 10. Invariants / Proof Console */}
        <ProofSection />

        {/* 11. Four-Tier Memory Statement */}
        <MemoryStatement onOpenBlueprint={() => setIsBlueprintOpen(true)} />

        {/* 12. Developer Surfaces (CLI, MCP, Skill) */}
        <DeveloperSurfaces onShowToast={addToast} />

        {/* 13. Distribution / Downloads */}
        <DownloadSection
          onOpenBlueprint={() => setIsBlueprintOpen(true)}
          onShowToast={addToast}
        />
      </main>

      {/* Footer & Nava Wordmark */}
      <Footer
        onOpenBlueprint={() => setIsBlueprintOpen(true)}
        onShowToast={addToast}
      />

      {/* 55-Page Blueprint Interactive Explorer Modal */}
      <BlueprintModal
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
      />

      {/* Interactive Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
