# NAVA: Autonomous Personal Agent OS

[![PyPI Version](https://img.shields.io/pypi/v/nava-agent.svg)](https://pypi.org/project/nava-agent/0.2.6/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)

> **NAVA** (Personal Agent Operating System) is a local-first, multi-agent operating layer for autonomous workspace execution, computer use, and human-AI collaboration. Governed by a **12-Step Action Gateway**, **21 Certified System Invariants**, a **4-Tier Memory Hierarchy**, and **15 Standard MCP Servers**.

---

## ⚡ Terminal CLI Agent (Live on PyPI v0.2.6)

The terminal agent CLI and interactive TUI shell are live and published on PyPI.

```bash
# 1. Install NAVA CLI from PyPI
pip install nava-agent

# 2. Or install globally using pipx
pipx install nava-agent

# 3. Launch interactive TUI shell
nava

# 4. Or execute single tasks directly
nava run "Audit current repository for secret leaks and policy violations"
```

PyPI Release: [https://pypi.org/project/nava-agent/0.2.6/](https://pypi.org/project/nava-agent/0.2.6/)

---

## 🖥️ Graphical Desktop & Web Cowork Studio (In Development)

The interactive graphical studio (desktop apps for macOS, Windows, Linux, and Web) is currently in active development.

### Running the Web Studio Preview Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local preview server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

---

## 🛡️ Core Guarantees & Architecture

- **12-Step Chokepoint Action Gateway:** Universal mediation, identity verification, risk scoring, quota enforcement, and cryptographic receipts.
- **4-Tier Memory Hierarchy:** Working, Episodic, Semantic (RAG), and Profile Memory (AI Twin).
- **Just-In-Time (JIT) Dynamic Agents:** Synthesized on demand, bounded by non-increasing scope, and ephemeral.
- **21 Certified System Invariants:** Enforced as automated regression tests.
