# NAVA: Autonomous Personal Agent OS

[![PyPI Version](https://img.shields.io/pypi/v/nava-agent.svg)](https://pypi.org/project/nava-agent/0.2.0/)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![License: Apache 2.0 / MIT](https://img.shields.io/badge/License-Apache_2.0_%2F_MIT-green.svg)](LICENSE)

NAVA is a deterministic, multi-agent personal operating system designed for autonomous workspace execution, secure computer use, deep research synthesis, and persistent human-AI collaboration.

---

## ⚡ Terminal CLI Agent (Live on PyPI v0.2.0)

The core autonomous engine is available today as a terminal CLI agent on PyPI:

```bash
pip install nava-agent
```

### Quickstart

```bash
# 1. Inspect commands & registered agents
nava --help

# 2. Execute an autonomous mission
nava run "Audit local repository for secret leaks and policy violations"
```

PyPI Release: [https://pypi.org/project/nava-agent/0.2.0/](https://pypi.org/project/nava-agent/0.2.0/)

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
