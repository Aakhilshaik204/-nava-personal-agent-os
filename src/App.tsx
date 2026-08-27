import React, { useState, useEffect } from 'react';
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
import { DocsPage } from './components/DocsPage';
import { LicensePage } from './components/LicensePage';
import { BlueprintPage } from './components/BlueprintPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'docs' | 'license' | 'blueprint'>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync hash routing e.g. #docs, #license, #blueprint, #top
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#docs')) {
        setCurrentPage('docs');
      } else if (hash.startsWith('#license')) {
        setCurrentPage('license');
      } else if (hash.startsWith('#blueprint')) {
        setCurrentPage('blueprint');
      } else {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: 'home' | 'docs' | 'license' | 'blueprint') => {
    setCurrentPage(page);
    if (page === 'docs') {
      window.location.hash = '#docs';
    } else if (page === 'license') {
      window.location.hash = '#license';
    } else if (page === 'blueprint') {
      window.location.hash = '#blueprint';
    } else {
      window.location.hash = '#top';
    }
  };

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

  if (currentPage === 'docs') {
    return (
      <div className="bg-white min-h-screen">
        <DocsPage onNavigate={navigateTo} onShowToast={addToast} />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  if (currentPage === 'license') {
    return (
      <div className="bg-white min-h-screen">
        <LicensePage onNavigate={navigateTo} onShowToast={addToast} />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  if (currentPage === 'blueprint') {
    return (
      <div className="bg-white min-h-screen">
        <BlueprintPage onNavigate={navigateTo} onShowToast={addToast} />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  return (
    <div className="field-page min-h-screen">
      {/* Navigation */}
      <Navbar
        onOpenBlueprint={() => navigateTo('blueprint')}
        onOpenDocs={() => navigateTo('docs')}
        onOpenLicense={() => navigateTo('license')}
        onShowToast={addToast}
      />

      {/* Main Content */}
      <main id="top">
        {/* 1. Hero Section */}
        <Hero
          onOpenBlueprint={() => navigateTo('blueprint')}
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
          onOpenBlueprint={() => navigateTo('blueprint')}
        />

        {/* 10. Invariants / Proof Console */}
        <ProofSection />

        {/* 11. Four-Tier Memory Statement */}
        <MemoryStatement onOpenBlueprint={() => navigateTo('blueprint')} />

        {/* 12. Developer Surfaces (CLI, MCP, Skill) */}
        <DeveloperSurfaces onShowToast={addToast} />

        {/* 13. Distribution / Downloads */}
        <DownloadSection
          onOpenBlueprint={() => navigateTo('blueprint')}
          onShowToast={addToast}
        />
      </main>

      {/* Footer & Nava Wordmark */}
      <Footer
        onOpenBlueprint={() => navigateTo('blueprint')}
        onOpenDocs={() => navigateTo('docs')}
        onOpenLicense={() => navigateTo('license')}
        onShowToast={addToast}
      />

      {/* Interactive Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
